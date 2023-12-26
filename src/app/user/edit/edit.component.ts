import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";
import {MatSnackBar} from "@angular/material/snack-bar";

class EditUserComponent {
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  //@ts-ignore
  public profileEditForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<EditUserComponent>,
              private fb: FormBuilder,
              // @ts-ignore
              @Inject(MAT_DIALOG_DATA) public data,
              private userService: UserService,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

  // @ts-ignore
  getPlaceholder(key: string) {

    if (key == "email") {
      // @ts-ignore
      return this.data.user.email;
    } else {
      // @ts-ignore
      return this.data.user.username;
    }


  }

  createProfileForm(): FormGroup {
    return this.fb.group({
      name: [],
      username: [],
      email: [],
      password: [],
      bio: []
    });
  }

  submit() {
    this.userService.updateUser(this.updateUser())
      .subscribe(() => {
        this.snackbar.open('User updated successfully', undefined, {
          duration: 2000
        })
        this.dialogRef.close();
        window.location.reload()
      });
  }

  private updateUser(): User {
    this.data.user.name = this.profileEditForm.value.name;
    this.data.user.username = this.profileEditForm.value.username;
    this.data.user.email = this.profileEditForm.value.email;
    this.data.user.password = this.profileEditForm.value.password;
    this.data.user.bio = this.profileEditForm.value.bio;
    return this.data.user;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
