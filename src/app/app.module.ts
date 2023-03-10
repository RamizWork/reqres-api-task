import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ToastrModule} from "ngx-toastr";

import {AppRoutingModule} from './app-routing.module';
import {DataService} from "./services/data.service";
import {AppComponent} from './app.component';
import {PreviewUserComponent} from './components/home-page/preview-user/preview-user.component';
import {PreviewResourceComponent} from './components/home-page/preview-resource/preview-resource.component';
import {ModalWindowComponent} from './components/user-page/modal-window/modal-window.component';
import {HomePageComponent} from './components/home-page/home-page.component';
import {UserPageComponent} from './components/user-page/user-page.component';
import {HeaderComponent} from './components/header/header.component';
import {SingInComponent} from "./components/sing-in/sing-in.component";
import {SingUpComponent} from "./components/sing-up/sing-up.component";

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserPageComponent,
    PreviewUserComponent,
    PreviewResourceComponent,
    ModalWindowComponent,
    HeaderComponent,
    SingInComponent,
    SingUpComponent
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
