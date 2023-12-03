import {Comment} from './Comment';
import {User} from "./User";

export interface Post {

  id?: number;

  likes?: number;

  location: string;

  imageData?: File;

  description: string;

  whoLikes: string[];

  user: User;

  comments: Comment[];
}
