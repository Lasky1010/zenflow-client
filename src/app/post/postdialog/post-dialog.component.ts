import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Post} from "../../models/Post";
import {CommentService} from "../../service/comment.service";
import {PostService} from "../../service/post.service";
import {CommentDialogComponent} from "../comment-dialog/comment-dialog.component";


@Component({
  selector: 'app-postdialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.css']
})
export class PostDialogComponent {
  constructor(private dialogRef: MatDialogRef<CommentDialogComponent>,
              private postDialogRef: MatDialogRef<PostDialogComponent>,
              // @ts-ignore
              @Inject(MAT_DIALOG_DATA) public data: { post, mainUser },
              private commentService: CommentService,
              private postService: PostService,
              private dialog: MatDialog
  ) {
    this.getCommentsToPost(this.data.post.comments);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  getCommentsToPost(post: Post): void {

    this.commentService.getCommentsToPost(this.data.post.id)
      //@ts-ignore
      .subscribe(data => {
        this.data.post.comments = data
      })
  }

  likePost(): void {
    console.log(this.data.post);

    if (!this.data.post.whoLikes.includes(this.data.mainUser.username)) {
      //@ts-ignore
      this.postService.likePost(this.data.post.id, this.data.mainUser.username)
        .subscribe(() => {
          this.data.post.whoLikes.push(this.data.mainUser.username);
        });
    } else {
      //@ts-ignore
      this.postService.likePost(this.data.post.id, this.data.mainUser.username)
        .subscribe(() => {
          const index = this.data.post.whoLikes.indexOf(this.data.mainUser.username, 0);
          if (index > -1) {
            this.data.post.whoLikes.splice(index, 1);
          }
        });
    }
  }


  deletePost() {
    this.postService.deletePost(this.data.post.id).subscribe(data => {
      console.log(data)
      console.log(this.data.mainUser.posts.indexOf(this.data.post))
      this.data.mainUser.posts.splice(this.data.mainUser.posts.indexOf(this.data.post), 1)
      this.dialogRef.close()
    })

  }
  showCommentMenu(id: number | undefined): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '200x';
    dialogUserEditConfig.height = '100px';
    dialogUserEditConfig.data = {
      id: id,
      mainUser: this.data.mainUser,
      post: this.data.post
    };
    this.dialog.open(CommentDialogComponent, dialogUserEditConfig);
  }


  //@ts-ignore
  postComment(message: string): void {
    console.log(this.data.post);
    //@ts-ignore
    this.commentService.addToCommentToPost(this.data.post.id, message)
      //@ts-ignore
      .subscribe(data => {
        console.log(data);
        this.data.post.comments.push(data);
      });
  }


}
