import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResumeFormComponentComponent } from './components/resume-form-component/resume-form-component.component';
import { HeaderComponent } from './core/shared/header/header.component';
import { StepperComponent } from './core/shared/stepper/stepper.component';
import { ResumeLayoutComponent } from './Layout/resume-layout/resume-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
// import { RouterOutlet } from '../../node_modules/@angular/router/router_module.d-Bx9ArA6K';
// import {   } from "../../node_modules/@angular/router/router_module.d-Bx9ArA6K";

@Component({
  selector: 'app-root',
  // imports: [HeaderComponent, RouterOutlet, ResumeLayoutComponent],
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'resume-builder-app';
  step = 0;

  // goToStep(index: number) {
  //   // validation logic: अगर current step valid ना हो तो return
  //   this.step = index;
  // }

  // nextStep() {
  //   this.goToStep(this.step + 1);
  // }
  // prevStep() {
  //   this.goToStep(this.step - 1);
  // }
}
