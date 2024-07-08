'use client';

import { useState } from 'react';
import ProfileEditModal from './ProfileEditModal';

export default function ProfileEditButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className="ml-auto px-4 py-2 bg-gray-200 rounded-full" onClick={() => setIsModalOpen(true)}>
        프로필 수정
      </button>
      {isModalOpen && <ProfileEditModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}