import { Routes } from '@angular/router';
import { ResumeFormComponentComponent } from './components/resume-form-component/resume-form-component.component';
import { ResumeLayoutComponent } from './Layout/resume-layout/resume-layout.component';
import { TemplateComponent } from './components/resume-template/template/template.component';
import { AuthLayoutComponent } from './Layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guard/auth.guard';
import { NoPageComponent } from './core/shared/no-page/no-page.component';
import { NoAuthGuard } from './core/guard/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        canActivate: [NoAuthGuard],
        loadComponent: () =>
          import('../app/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        canActivate: [NoAuthGuard],
        loadComponent: () =>
          import('../app/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },

  {
    path: 'resume',
    component: ResumeLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'builder',
        component: ResumeFormComponentComponent,
      },
      {
        path: 'builder/:id',
        component: ResumeFormComponentComponent,
      },
      {
        path: 'preview',
        component: TemplateComponent,
      },
      {
        path: '',
        redirectTo: 'builder',
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', component: NoPageComponent },
];
