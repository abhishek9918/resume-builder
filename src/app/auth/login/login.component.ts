import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  trigger,
  transition,
  style,
  animate,
  state,
  keyframes,
} from '@angular/animations';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../../core/services/api-service.service';
import { AuthService } from '../../core/services/auth-service.service';
import { UpdateUserService } from '../../core/services/update-user.service';
declare const google: any;

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('logoAnimation', [
      state(
        'initial',
        style({
          opacity: 0,
          transform: 'scale(0.95) translateY(20px)',
        })
      ),
      state(
        'final',
        style({
          opacity: 1,
          transform: 'scale(1) translateY(0)',
        })
      ),
      transition('initial => final', [
        animate(
          '1200ms ease-in-out',
          keyframes([
            style({
              opacity: 0,
              transform: 'scale(0.95) translateY(20px)',
              offset: 0,
            }),
            style({
              opacity: 0.5,
              transform: 'scale(1.05) translateY(-5px)',
              offset: 0.5,
            }),
            style({
              opacity: 1,
              transform: 'scale(1) translateY(0)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
    trigger('letterAnimation', [
      state(
        'initial',
        style({
          opacity: 0,
          transform: '{{transform}} scale(0.8)',
        }),
        { params: { transform: 'translateX(0px)' } }
      ),
      state(
        'final',
        style({
          opacity: 1,
          transform: 'translateX(0) scale(1)',
        })
      ),
      transition(
        'initial => final',
        [
          animate(
            '700ms ease-in-out',
            keyframes([
              style({
                opacity: 0,
                transform: '{{transform}} scale(0.8)',
                offset: 0,
              }),
              style({
                opacity: 0.6,
                transform: 'translateX(0) scale(1.1)',
                offset: 0.5,
              }),
              style({
                opacity: 1,
                transform: 'translateX(0) scale(1)',
                offset: 1,
              }),
            ])
          ),
        ],
        { params: { transform: 'translateX(0px)' } }
      ),
    ]),
  ],
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _service: ApiServiceService,
    private _authService: AuthService,
    private _toaster: ToastrService,
    private _userUpdate: UpdateUserService
  ) {}
  isLogin: boolean = true;
  loginFormGrp!: FormGroup;
  letterTransforms = [
    'translateX(-40px) translateY(20px)',
    'translateX(40px) translateY(-20px)',
    'translateX(-30px) translateY(15px)',
    'translateX(30px) translateY(-15px)',
    'translateX(-20px) translateY(10px)',
    'translateX(20px) translateY(-10px)',
    'translateX(-10px) translateY(5px)',
    'translateX(10px) translateY(-5px)',
  ];
  state = 'initial';

  ngAfterViewInit() {
    console.log('Google API script loaded', google);
    google?.accounts?.id?.initialize({
      client_id:
        '693595215851-jj5g2qs7b6ogvofq19uptldl5iqeh2ei.apps.googleusercontent.com', // from Google console
      callback: this.handleCredentialResponse.bind(this),
    });

    google.accounts.id.renderButton(document.getElementById('g_id_onload'), {
      theme: 'outline',
      size: 'large',
    });
  }

  handleCredentialResponse(response: any) {
    const idToken = response.credential;

    this._authService.googleLogin({ idToken }).subscribe({
      next: (res: any) => {
        localStorage.setItem('LoggedInUser', JSON.stringify(res));
        this._router.navigate(['/app']);
      },
      error: (err) => {
        console.error('Login failed', err);
      },
    });
  }

  triggerGoogleLogin(): void {
    google.accounts.id.prompt(); // shows Google login popup
  }
  ngOnInit() {
    setTimeout(() => {
      this.state = 'final';
    }, 100);
    this.initForm();
  }
  initForm() {
    this.loginFormGrp = this._fb.group({
      email: [''],
      password: [''],
    });
  }
  getCharAnimationParams(index: number) {
    return { transform: this.letterTransforms[index] || 'translateX(10px)' };
  }
  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  email: string = '';
  Math = Math;
  password: string = '';

  onSubmit(event?: Event) {
    if (this.loginFormGrp.invalid) {
      this._toaster.error('Please fill in all required fields.');
      return;
    }
    const loginForm = this.loginFormGrp.value;
    this.postUser(loginForm);
  }

  postUser(formData: any) {
    // const service = this.isSignUp
    // ? this._authService.createUser(formData)
    const service = this._authService.login(formData);

    service.subscribe({
      next: (resp) => {
        if (resp) {
          this._toaster.success(resp.message);
          this._userUpdate.setUser(resp.data);
          this._service.checkLoginStatus();
          this._router.navigate(['/app']);
        }
      },
      error: (error) => {
        this._toaster.error(error.message);
      },
    });
  }
}
