import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {User} from "../../models/User";
import {CommentService} from "../../service/comment.service";
import {PostService} from "../../service/post.service";
import {UserService} from "../../service/user.service";
import {ImageService} from "../../service/image.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  //@ts-ignore
  posts: Post[];
  //@ts-ignore
  user: User;
  isDataLoaded = false;
  isUserDataLoaded = false;
  showComments = false;

  constructor(private commentService: CommentService,
              private userService: UserService,
              private postService: PostService,
              private imageService: ImageService,
  ) {
  }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(data => {
          console.log(data)
          this.posts = data;
          this.getImagesToPosts(this.posts);
          this.getCommentsToPosts(this.posts);
          this.isDataLoaded = true;
        },
        err => {
          console.log(err);
        })
    this.userService.getCurrentUser()
      .subscribe(data => {
          console.log(data)
          this.user = data
          this.isUserDataLoaded = true
        },
        err => {
          console.log(err);
        })


  }

  toggleComments() {
    this.showComments = !this.showComments;
  }

  getImagesToPosts(posts: Post[]): void {
    posts.forEach(p => {
      //@ts-ignore
      this.imageService.getPostImage(p.id)
        .subscribe(data => {
          p.imageData = data.imageData;
        })
    });
  }

  getCommentsToPosts(posts: Post[]): void {
    posts.forEach(p => {
      //@ts-ignore
      this.commentService.getCommentsToPost(p.id)
        .subscribe(data => {
          p.comments = data
        })
    });
  }

  likePost(postId: number | undefined, postIndex: number): void {
    const post: Post = this.posts[postIndex];
    console.log(post);

    if (!post.whoLikes.includes(this.user.username)) {
      //@ts-ignore
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          post.whoLikes.push(this.user.username);
        });
    } else {
      //@ts-ignore
      this.postService.likePost(postId, this.user.username)
        .subscribe(() => {
          const index = post.whoLikes.indexOf(this.user.username, 0);
          if (index > -1) {
            post.whoLikes.splice(index, 1);
          }
        });
    }
  }


  //@ts-ignore
  postComment(message: string, postId: number | undefined, postIndex: number): void {
    const post = this.posts[postIndex];

    console.log(post);
    //@ts-ignore
    this.commentService.addToCommentToPost(postId, message)
      .subscribe(data => {
        console.log(data);
        post.comments.push(data);
      });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  protected readonly print = print;
}
