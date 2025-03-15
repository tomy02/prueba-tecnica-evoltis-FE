import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserListComponent } from './components/user-list/user-list.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./components/login/login.module').then(t => t.LoginModule)  },
  { path: 'register', loadChildren: () => import('./components/register/register.module').then(t => t.RegisterModule)  },
  { path: 'users', loadChildren: () => import('./components/user-list/user-list.module').then(t => t.UserModule)  },
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
