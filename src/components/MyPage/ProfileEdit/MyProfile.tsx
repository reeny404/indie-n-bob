import ProfileEditButton from "./ProfileEditButton";

export default function MyProfile({ userData }: { userData: any }) {
    if (!userData) {
        return <div>유저 데이터를 불러올 수 없습니다.</div>;
    }
    return (
        <div className="flex items-center space-x-4 w-full">
            <img src={userData.profile_image} alt="Profile" className="w-40 h-40 rounded-full" />
            <div className="flex-1 flex items-center justify-between w-full">
                <div className="w-full">
                    <div className="flex items-center justify-between w-full">
                        <span className="text-4xl font-bold">{userData.nickname}</span>
                        <ProfileEditButton userData={userData} />
                    </div>
                    <hr className="border-gray-300 w-full mt-4" />
                    <div className='mt-2'>
                        <p className="flex items-center">
                            <img src="/favorite_artist_icon.svg" alt="Favorite Artist Icon" className="inline-block w-4 h-4 mr-2 animate-pulse" />
                            선호하는 뮤지션
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {Array.isArray(userData.favorite_artist) && userData.favorite_artist.map((artist: string, index: number) => (
                                <span key={index} className="text-sm text-main-color">#{artist}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}