import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CommentService} from "../../service/comment.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.css']
})
export class CommentDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<CommentDialogComponent>,
    // @ts-ignore
    @Inject(MAT_DIALOG_DATA) public data: { id, mainUser, post },
    private commentService: CommentService,
    private snackBar: MatSnackBar
  ) {
  }


  deleteComment() {
    this.commentService.deleteComment(this.data.id).subscribe(data => {
      this.snackBar.open('Comment was deleted')
    })
    this.dialogRef.close()
    window.location.reload()

  }

}
