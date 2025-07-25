import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { ApiServiceService } from '../../services/api-service.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth-service.service';
import { UpdateUserService } from '../../services/update-user.service';

@Component({
  selector: 'app-login-sign-up-modal',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-sign-up-modal.component.html',
  styleUrl: './login-sign-up-modal.component.scss',
  animations: [
    trigger('popupBackdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('popupContent', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({ opacity: 0, transform: 'scale(0.95)' })
        ),
      ]),
    ]),
  ],
})
export class LoginSignUpModalComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _service: ApiServiceService,
    private _authService: AuthService,
    private _toaster: ToastrService,
    private _userUpdate: UpdateUserService
  ) {}
  @ViewChild('loginAndSigIn') loginAndSigIn!: ElementRef;
  isModalOpen: boolean = false;
  loginHeading = [
    'Create an account to get your resume',
    'Welcome back! Please sign in.',
  ];
  userFormGroup!: FormGroup;
  isSignUp: boolean = true;

  ngOnInit(): void {
    this.initForm();
  }
  toggleForm(isSignUp: boolean) {
    this.isSignUp = isSignUp;
  }
  initForm() {
    this.userFormGroup = this._fb.group({
      loginForm: this._fb.group({
        email: [''],
        password: [''],
      }),
      signInForm: this._fb.group({
        name: [''],
        email: [''],
        password: [''],
      }),
    });
  }
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  submitForm() {
    const loginForm = this.userFormGroup.get('loginForm')?.value;
    const signInForm = this.userFormGroup.get('signInForm')?.value;
    this.isSignUp ? this.postUser(signInForm) : this.postUser(loginForm);
  }

  postUser(formData: any) {
    const service = this.isSignUp
      ? this._authService.createUser(formData)
      : this._authService.login(formData);

    service.subscribe({
      next: (resp) => {
        if (resp) {
          this._toaster.success(resp.message);
          this._userUpdate.setUser(resp.data);
          this._service.checkLoginStatus();
          this.isModalOpen = false;
        }
      },
      error: (error) => {
        this._toaster.error(error.message);
      },
    });
  }
  checkUserIsLoggedIn() {
    const url = 'users/check-login';
    this._service.get(url).subscribe((resp) => {});
  }
}
