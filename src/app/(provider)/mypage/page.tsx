import ProfileEditButton from '@/components/ProfileEditButton';
import MyPageLayout from './layout';

async function fetchPosts() {
  const response = await fetch('http://localhost:3000/api/mypage');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
}

export default async function MyPage() {
  const posts = await fetchPosts();

  return (
    <MyPageLayout>
      <div className="w-full">
        <div className="p-4 mx-auto max-w-4xl">
          <div className="flex items-center space-x-4">
            <img src="https://stfauxrjudaltlmspsnv.supabase.co/storage/v1/object/public/users/public/user_default.png" alt="Profile" className="w-40 h-40 rounded-full" />
            <div className="flex-1">
              <span className="text-2xl font-bold">병준원영</span>
              <p>선호하는 뮤지션</p>
              <div className="flex space-x-2">
                <span className="text-sm text-blue-500">#실리카겔</span>
                <span className="text-sm text-blue-500">#검정치마</span>
                <span className="text-sm text-blue-500">#브로콜리너마저</span>
                <span className="text-sm text-blue-500">#창원영</span>
              </div>
            </div>
            <ProfileEditButton />
          </div>
          <div className='mt-8'>
            <span className="text-2xl font-bold">내가 쓴 게시글</span>
          </div>
        </div>
        <span>리스트 보기</span>
        <span>갤러리 보기</span>
      </div>
    </MyPageLayout>
  );
}