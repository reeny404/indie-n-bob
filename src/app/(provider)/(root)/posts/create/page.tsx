"use client";

import useUserData from "@/hooks/useUserData";
import supabase from "@/utils/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const CreatePostPage = () => {
  const router = useRouter();
  const { data: userData } = useUserData();
  const defaultImageUrl =
    "https://stfauxrjudaltlmspsnv.supabase.co/storage/v1/object/public/posts/public/post_default.png";
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [hashtag, setHashtag] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");

  const keywords = ["내요듣", "숨듣명", "내밴소"];

  const handleKeywordClick = (keyword) => {
    setSelectedKeyword(keyword);
  };

  const postImageUpload = async (file) => {
    const bucket = "posts";
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(`recommendation/${fileName}`, file);

    if (error) {
      console.error("버킷 이미지 업로드 실패", error);
      return;
    }

    console.log("버킷 이미지 업로드 성공", data);

    const publicUrl = supabase.storage
      .from(bucket)
      .getPublicUrl(`recommendation/${fileName}`).data.publicUrl;

    return publicUrl;
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !title.trim() ||
      !content.trim() ||
      !hashtag.trim() ||
      !selectedKeyword
    ) {
      Swal.fire({
        icon: "error",
        title: !selectedKeyword
          ? "필수 태그를 선택해주세요."
          : "모든 필드를 채워주세요.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    let uploadedImageUrl: string | undefined = imageUrl;
    if (imageFile) {
      uploadedImageUrl = await postImageUpload(imageFile);
    }

    const tagsArray = [
      selectedKeyword,
      ...hashtag.split(",").map((tag) => tag.trim()),
    ];

    const { error: insertError } = await supabase
      .from("recommendation_posts")
      .insert({
        author_id: userData?.userData?.user_id,
        title,
        content,
        image: uploadedImageUrl,
        hashtag: { tags: tagsArray },
        author_nickname: userData?.userData?.nickname,
      });

    if (insertError) {
      console.error("포스트 생성 실패", insertError);
      Swal.fire({
        icon: "error",
        title: "게시글 등록에 실패하였습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "게시글을 등록하였습니다.",
      text: "목록 페이지로 이동합니다.",
      showConfirmButton: false,
      timer: 1500,
    });

    // ToDo : 쿼리키 무효화가 안 됨 -저승사자-
    await queryClient.invalidateQueries({ queryKey: ["posts"] });
    router.replace("/posts");
    router.refresh();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div>
      <input
        className="border-b-[1px] border-[#DDDDDD] text-[30px] w-full py-[25px]"
        placeholder="제목을 입력하세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="mt-[49px] mb-[65px] flex gap-[32px]">
        <Image
          src={imageUrl}
          alt="post-image"
          width={276}
          height={276}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div className="mt-auto">
          <input
            id="image-file"
            className="hidden"
            type="file"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="image-file"
            className="cursor-pointer bg-main-color w-[257px] h-[61px] flex justify-center items-center rounded-[10px] text-white text-[20px]"
          >
            이미지 첨부하기
          </label>
        </div>
      </div>
      <textarea
        className="bg-[#F4F4F4] rounded-[15px] p-[30px] w-full h-[465px] resize-none mt-[55px]"
        placeholder="내용을 입력하세요."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-[10px] mt-[20px]">
        {keywords.map((keyword) => (
          <button
            key={keyword}
            className={`px-[15px] py-[10px] rounded-[10px] ${
              selectedKeyword === keyword
                ? "bg-main-color text-white"
                : "bg-[#E3E3E3] text-black"
            }`}
            onClick={() => handleKeywordClick(keyword)}
          >
            {keyword}
          </button>
        ))}
      </div>
      <input
        className="border-b-[1px] border-[#DDDDDD] text-[20px] w-full py-[15px] mt-[20px]"
        placeholder="해쉬태그를 입력하세요 (쉼표로 구분)"
        value={hashtag}
        onChange={(e) => setHashtag(e.target.value)}
      />
      <div className="flex justify-end gap-[14px] mt-[39px] mb-[100px]">
        <button
          className="w-[145px] h-[61px] rounded-[10px] bg-[#E3E3E3] text-[25px]"
          onClick={handleCancel}
        >
          취소하기
        </button>
        <button
          className="w-[145px] h-[61px] rounded-[10px] bg-main-color text-white text-[25px]"
          onClick={handleSubmit}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default CreatePostPage;
