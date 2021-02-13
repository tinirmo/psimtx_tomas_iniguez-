import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

const APP_ROUTES: Routes = [
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'home', component: HomeComponent },
   { path: '**',  pathMatch: 'full', redirectTo: 'login' }
];

export const APP_ROUTING =  RouterModule.forRoot(APP_ROUTES); 