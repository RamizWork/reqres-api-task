import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {DataService} from "./services/data.service";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {PreviewUserComponent} from './components/home-page/preview-user/preview-user.component';
import {PreviewResourceComponent} from './components/home-page/preview-resource/preview-resource.component';
import { ModalWindowComponent } from './components/user-page/modal-window/modal-window.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserPageComponent,
    PreviewUserComponent,
    PreviewResourceComponent,
    ModalWindowComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()
    ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
