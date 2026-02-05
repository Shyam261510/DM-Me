export interface User {
  id: string;
  email: string;
  username: string;
  reciverId?: string;
  reels: Reel[];
  team?: Team;
  member?: TeamMember;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  teamMembers: TeamMember[];
}

export interface TeamMember {
  id: string;
  userId: string;
  teamId: string;
  role: Role;
  user: User;
  team: Team;
}

export interface Reel {
  id: string;
  userId: string;
  reelId: string;
  reel: {
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
  };
}

export enum Role {
  ADMIN,
  MEMBER,
}
