import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Post} from "../../models/Post";
import {PostService} from "../../service/post.service";
import {Router} from "@angular/router";
import {ImageService} from "../../service/image.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
//@ts-ignore
  postForm: FormGroup;
  //@ts-ignore
  selectedFile: File;
  isPostCreated = false;
  //@ts-ignore
  createdPost: Post;
  previewImgURL: any;
  //@ts-ignore
  mainUser: User;

  constructor(private postService: PostService,
              private imageService: ImageService,
              private router: Router,
              private fb: FormBuilder,
              private snackbar: MatSnackBar,
              private userService: UserService,
              private title: Title,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.title.setTitle("Create post")
    //@ts-ignore
    this.userService.getCurrentUser().subscribe(data => {
        this.mainUser = data;
      }
    )
    this.postForm = this.createPostForm();

  }

  createPostForm(): FormGroup {
    return this.fb.group({
      title: [''],
      description: [''],
    });
  }

  submit(): void {
    this.postService.createPost({
      //@ts-ignore
      description: this.postForm.value.description
    }).subscribe(data => {
      this.createdPost = data;
      console.log(data);
      if (this.createdPost.id != null) {
        this.imageService.uploadImageToPost(this.selectedFile, this.createdPost.id)
          .subscribe((data) => {
          });
        this.snackbar.open('Post created successfully');
        this.isPostCreated = true;
        this.router.navigate(['profile/' + this.mainUser.id]);
      }
    });
  }

  //@ts-ignore
  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.size > 4000000) {
      this.snackBar.open("File size more than 4MB")
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = (e) => {
      this.previewImgURL = reader.result;
    };
  }

}
