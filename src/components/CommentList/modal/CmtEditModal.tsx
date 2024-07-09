import Image from "next/image";
import React from "react";
import CmtToModi from "./CmtToModi";

//클릭한 comment_id props로 넘겨주기

const CmtEditModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[1000px] h-[450px] bg-white rounded-[30px] shadow-modal-custom">
        <div className="w-[1000px] h-[65px] flex justify-end items-center rounded-tl-[30px] rounded-tr-[30px] bg-[#10AF86]">
          <Image
            src="/cancel.png"
            width={50}
            height={50}
            alt="취소"
            className="w-[50px] h-[50px] mr-[10px] hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="w-[900px] mt-[30px] mb-[30px] font-semibold text-[#10AF86] text-[30px]">
            댓글 수정
          </h2>
          <CmtToModi onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default CmtEditModal;
