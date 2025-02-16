import { Routes } from '@angular/router';
import { authenticationGuard } from './services/authentication/authentication.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authenticationGuard] },
  { path: 'login', component: LoginComponent },
];
