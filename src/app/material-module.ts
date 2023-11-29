import {NgModule} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  exports:[
  MatIconModule,MatMenuModule,
    MatFormFieldModule,MatCardModule,
    MatButtonModule, MatInputModule,
    MatSnackBarModule, MatToolbarModule,
    MatDividerModule, MatDialogModule,
    MatSlideToggleModule
]})




export class MaterialModule {


}
