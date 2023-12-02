import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isDataLoaded: Boolean = false;
  isLoggedIn: Boolean = false;
// @ts-ignore
  username: string;
  // @ts-ignore
  photo: File;

  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken()
    if (this.isLoggedIn) {
      this.userService.getCurrentUser()
        .subscribe(data => {
            console.log(data)
            this.username = data.username;
            this.photo = data.imageData;
            this.isDataLoaded = true;
          },
          error => {
            console.log(error)
          })
    } else {
      this.router.navigate(['/login'])
    }
  }

  logout(): void {
    this.tokenService.logOut()
    this.router.navigate(['/login'])
  }

  formatImage(img: any) {
    if (img == null) {
      return null;
    }
    return 'data:image\jpeg;base64,' + img;
  }


}
