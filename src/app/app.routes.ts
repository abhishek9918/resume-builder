import { Routes } from '@angular/router';
import { ResumeFormComponentComponent } from './components/resume-form-component/resume-form-component.component';
import { PreviewTemplateComponent } from './components/preview-template/preview-template.component';
import { BasicInfoComponent } from './components/steps/basic-info/basic-info.component';
import { ExperienceComponent } from './components/steps/experience/experience.component';
import { EducationComponent } from './components/steps/education/education.component';
import { ResumeLayoutComponent } from './Layout/resume-layout/resume-layout.component';
import { TemplateComponent } from './components/resume-template/template/template.component';
import { AuthLayoutComponent } from './Layout/auth-layout/auth-layout.component';
import { authGuard } from './core/guard/auth.guard';
import { NoPageComponent } from './core/shared/no-page/no-page.component';
import { NoAuthGuard } from './core/guard/no-auth.guard';

// export const routes: Routes = [
//   { path: '', redirectTo: 'builder', pathMatch: 'full' },
//   { path: 'builder', component: ResumeFormComponentComponent },
//   { path: 'preview', component: PreviewTemplateComponent },
//   { path: 'final', component: TemplateComponent },
//   { path: '**', redirectTo: 'builder' },
// ];

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
    path: 'app',
    canActivate: [authGuard],
    component: ResumeLayoutComponent,
    children: [
      {
        path: 'builder',
        component: ResumeFormComponentComponent,
        children: [
          { path: 'basic', component: BasicInfoComponent },
          { path: 'experience', component: ExperienceComponent },
          { path: 'education', component: EducationComponent },

          { path: '', redirectTo: 'basic', pathMatch: 'full' },
        ],
      },
      { path: 'preview', component: PreviewTemplateComponent },
      { path: '', redirectTo: 'builder', pathMatch: 'full' },
    ],
  },
  { path: '**', component: NoPageComponent },
];
