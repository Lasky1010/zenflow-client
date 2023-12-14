import {Component, OnInit} from '@angular/core';
import {User} from '../../models/User';
import {TokenStorageService} from '../../service/token-storage.service';
import {PostService} from '../../service/post.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NotificationService} from '../../service/notification.service';

import {UserService} from '../../service/user.service';
import {ImageService} from "../../service/image.service";
import {ActivatedRoute} from "@angular/router";
import {EditComponent} from "../../user/edit/edit.component";
import {subscribeOn} from "rxjs";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isCurrentUser = true;
  isUserDataLoaded = false;
  //@ts-ignore
  user: User;
  //@ts-ignore
  selectedFile: File;
  //@ts-ignore
  previewImgURL: any;

  isSubscribed = false;

  constructor(private tokenService: TokenStorageService,
              private postService: PostService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageService: ImageService,
              private userService: UserService,
              private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.router.paramMap.subscribe(() => {
      const userId = Number(this.router.snapshot.paramMap.get('userId'));
      this.userService.getCurrentUser()
        .subscribe(data => {
          this.user = data;
          this.isUserDataLoaded = true;
          if (userId != this.user.id) {
            this.userService.getUserById(userId)
              .subscribe(data => {
                this.user = data;
                this.isCurrentUser = false;
                this.isUserDataLoaded = true;
              });
          }

        });
      console.log(userId);
    });
  }

  subscribe(): void {
    this.isSubscribed = !this.isSubscribed;
  }


  openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '400px';
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
          this.notificationService.showMessage('Profile Image updated successfully');
        });
    }
  }

  protected readonly subscribeOn = subscribeOn;
}
