export type Auth = {
  email: string;
  password: string;
  nickname: string;
  is_admin: boolean;
  favorite_artist: string[];
  profile_image: string;
  user_metadata: {
    nickname: string;
  };
};

export type AuthStore = {
  email: string;
  nickname: string;
  password: string;
  favorite_artist: string[];
  is_admin: boolean;
  error: {
    email:string;
    password: string;
    nickname: string;
  };

  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setNickname: (nickname: string) => void;
  setFavoriteArtists: (favoriteArtists: string[]) => void;
  setIsAdmin: (is_admin: boolean) => void;
  setError: (error: Partial<AuthStore["error"]>) => void;
};
