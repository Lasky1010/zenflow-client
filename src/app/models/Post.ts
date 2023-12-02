import {Comment} from './Comment';

export interface Post {

  id?: number;

  likes?: number;

  location: string;

  imageData?: File;

  description: string;

  whoLikes: string[];

  username: string;

  comments: Comment[];
}
