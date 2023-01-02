import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {UserPageComponent} from "./components/user-page/user-page.component";

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'user/:id', component: UserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
