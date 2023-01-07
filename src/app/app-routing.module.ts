import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from "./components/home-page/home-page.component";
import {UserPageComponent} from "./components/user-page/user-page.component";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', component: HomePageComponent},
      {path: 'user/:id', component: UserPageComponent},
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  {path: '**', redirectTo: '/', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
