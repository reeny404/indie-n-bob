import { useState } from 'react';

const ProfileEditModal = ({ onClose }: { onClose: () => void }) => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">프로필 수정</h2>
        <div className="mb-4">
          <label className="block mb-2">닉네임:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">이메일:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded mr-2">
            취소
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;