import {NgModule} from "@angular/core";
import {SingUpComponent} from "./sing-up/sing-up.component";
import {SingInComponent} from "./sing-in/sing-in.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'register', component: SingUpComponent},
      {path: 'login', component: SingInComponent}
    ]
  },
];

@NgModule({
  declarations: [
    SingUpComponent,
    SingInComponent,
    AdminLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: []
})

export class AdminModule {
}
