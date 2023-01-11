import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {UserPageComponent} from "./components/user-page/user-page.component";
import {SingInComponent} from "./components/sing-in/sing-in.component";
import {SingUpComponent} from "./components/sing-up/sing-up.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'sing-in', component: SingInComponent},
  {path: 'sing-up', component: SingUpComponent},
  {path: 'user/:id', component: UserPageComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
