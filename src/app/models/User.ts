import {Post} from "./Post";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  imageData: File;
  password: string;
  posts: Post[];
  permissions: any;
  authorities: any;
  createdAt: any;
  bio: string;
  subscribers: User[];
  onWhoSubscribe: User[];
}
