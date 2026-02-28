export interface User {
  id: string;
  email: string;
  username: string;
  reciverId?: string;
}

export interface Group {
  id: string;
  groupName: string;
  groupMembers: GroupMember[];
  adminId: string;
  admin: User;
  createdAt: Date;
  updatedAt: Date;
}
export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  user: User;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserReel {
  id: string;
  userId: string;
  reelId: string;
  reel: Reel;
}

export interface Reel {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  audioTranscribe: string;
  niche: string;
  subNiche: string;
  nicheEmbeddings: number[];
  subNicheEmbeddings: number[];
  titleEmbeddings: number[];
  audioTranscribeEmbeddings: number[];
  ig_reel_id: string;
  createdAt: Date;
}

export interface GroupInfo {
  id: string;
  groupName: string;
  adminId: string;
  reels: string[];
  createdAt: Date;
  groupMembers: {
    username: string;
    userId: string;
    role: Role;
    id: string;
  }[];
}
export type Role = "ADMIN" | "MEMBER";
