import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ImageService} from "../../service/image.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-sub-dialog',
  templateUrl: './sub-dialog.component.html',
  styleUrls: ['./sub-dialog.component.css']
})
export class SubDialogComponent implements OnInit {
  //@ts-ignore
  subs: User[];

  constructor(private dialogRef: MatDialogRef<SubDialogComponent>,
              // @ts-ignore
              @Inject(MAT_DIALOG_DATA) public data,
              private imageService: ImageService) {

  }

  ngOnInit(): void {
    this.subs = this.data;
    for (let sub of this.subs) {
      this.imageService.getProfileImageById(sub.id).subscribe(d => {
        sub.imageData = d.imageData;
      })
    }
  }


  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }
}
