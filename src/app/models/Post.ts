import {Comment} from './Comment';
export interface Post {

  id?: number;

  likes?: number;

  location: string;

  image?: File;

  description: string;

  whoLikes: string[];

  username: string;

  comments: Comment[];
}
