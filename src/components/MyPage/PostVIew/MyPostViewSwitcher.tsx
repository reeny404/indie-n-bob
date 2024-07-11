'use client';

import { useState } from 'react';
import MyPostListView from './MyPostListView';
import MyPostGalleryView from './MyPostGalleyView';

export default function PostSwitcher() {
    const [viewType, setViewType] = useState<'list' | 'gallery'>('list');

    return (
        <>
            <div className="flex items-center justify-end space-x-4 mt-4">
                <button className={`px-4 py-2 ${viewType === 'list' ? 'bg-gray-200' : 'bg-white'}`} onClick={() => setViewType('list')}>
                    <img src="/List_View_Icon.svg" alt="List View Icon" className="w-4 h-4" />
                </button>
                <button className={`px-4 py-2 ${viewType === 'gallery' ? 'bg-gray-200' : 'bg-white'}`} onClick={() => setViewType('gallery')}>
                    <img src="/Gallery_View_Icon.svg" alt="Gallery View Icon" className="w-4 h-4" />
                </button>
            </div>
            <div className="mt-4">
                {viewType === 'list' ? <MyPostListView /> : <MyPostGalleryView />}
            </div>
        </>
    );
}