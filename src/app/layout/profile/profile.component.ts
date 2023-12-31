import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {TokenStorageService} from '../../service/token-storage.service';
import {PostService} from '../../service/post.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';


import {UserService} from '../../service/user.service';
import {ImageService} from "../../service/image.service";
import {ActivatedRoute} from "@angular/router";
import {EditComponent} from "../../user/edit/edit.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Post} from "../../models/Post";
import {PostDialogComponent} from "../../post/postdialog/post-dialog.component";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {


  isSubscribed = false;
  isCurrentUser = false;
  isUserDataLoaded = false;
  //@ts-ignore
  user: User;
  //@ts-ignore
  mainUser: User;
  //@ts-ignore
  selectedFile: File;
  //@ts-ignore

  previewImgURL: any;

  constructor(private tokenService: TokenStorageService,
              private postService: PostService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private imageService: ImageService,
              private userService: UserService,
              private router: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.router.paramMap.subscribe(() => {
      const userId = Number(this.router.snapshot.paramMap.get('userId'));
      this.userService.getCurrentUser()
        .subscribe(data => {
          console.log(data);
          this.mainUser = data;
          if (this.mainUser.id == userId) {
            this.isCurrentUser = true;
            this.user = this.mainUser;
            this.isUserDataLoaded = true;
          } else {
            this.userService.getUserById(userId)
              .subscribe(data => {
                this.user = data;
                this.isUserDataLoaded = true;
                this.isCurrentUser = false;
              });
          }
          this.postService.getPostsForUserId(userId).subscribe(data => {
            console.log(data);
            this.user.posts = data;
            this.getImagesToPosts(this.user.posts)
          }, error => {
            console.log(error)
          })
        }, error => {
          console.log(error)
        });
    });
  }

  openPostDialog(post: Post): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '1000px';
    dialogUserEditConfig.height = '640px';
    dialogUserEditConfig.data = {
      post: post,
      mainUser: this.mainUser
    };
    this.dialog.open(PostDialogComponent, dialogUserEditConfig);
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

  getIsSubscribed(): boolean {
    for (let sub of this.user.subscribers) {
      if (sub.username === this.mainUser.username) {
        this.isSubscribed = true;
        break;
      } else {
        this.isSubscribed = false;
        break;
      }
    }
    return this.isSubscribed;
  }

  subscribe(id: number): void {

    this.userService.subscribe(id).subscribe(data => {

        this.user = data;
        this.isSubscribed = !this.isSubscribed;
        window.location.reload()
      },
      error => {
        console.log(error)
      });


  }

  change() {
    let elem = document.getElementById("showEmail");
    // @ts-ignore
    if (elem.value == "Email") elem.value = this.user.email;
    else { // @ts-ignore
      elem.value = "Email";
    }
  }


  openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '350px';
    dialogUserEditConfig.height = '530px';
    dialogUserEditConfig.data = {
      user: this.user
    };
    this.dialog.open(EditComponent, dialogUserEditConfig);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImgURL = reader.result;
    };
  }

  onUpload(): void {
    if (this.selectedFile != null) {
      this.imageService.uploadImageToUser(this.selectedFile)
        .subscribe(() => {
          this.snackbar.open('Profile Image updated successfully', undefined, {
            duration: 2000
          });
        });
    }
  }

}
