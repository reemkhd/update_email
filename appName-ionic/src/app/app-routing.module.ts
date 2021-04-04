import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] 
  },
  {
    path: 'list', loadChildren: './list/list.module#ListPageModule', canActivate: [AuthGuard]
  },
  {
    path: 'reset',
    loadChildren: () => import('./pages/auth/reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'new-pass',
    loadChildren: () => import('./pages/auth/new-pass/new-pass.module').then( m => m.NewPassPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/auth/profile/profile.module').then( m => m.ProfilePageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, 
      { preloadingStrategy: PreloadAllModules }
      )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}