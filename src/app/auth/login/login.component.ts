import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../../core/services/api-service.service';
import { AuthService } from '../../core/services/auth-service.service';
import { UpdateUserService } from '../../core/services/update-user.service';
import { ProjectLogoComponent } from '../../core/shared/project-logo/project-logo.component';
import { LoaderBtnComponent } from '../../core/shared/loader-btn/loader-btn.component';
import { delay, finalize, forkJoin, timer } from 'rxjs';
import { LoaderComponent } from '../../core/shared/loader/loader.component';
import { ThemeService } from '../../core/services/theme.service';
declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _service: ApiServiceService,
    private _authService: AuthService,
    private _toaster: ToastrService,
    private _userUpdate: UpdateUserService,
    public theme: ThemeService
  ) {}
  @ViewChild('hiddenGoogleButtonContainer', { static: true })
  hiddenGoogleButtonContainer!: ElementRef;

  isLogin: boolean = true;
  isLoading: boolean = false;
  loginFormGrp!: FormGroup;

  state = 'initial';

  ngOnInit() {
    this.initForm();
  }

  ngAfterViewInit() {
    if (
      typeof google !== 'undefined' &&
      google.accounts &&
      google.accounts.id
    ) {
      google.accounts.id.initialize({
        client_id:
          '693595215851-jj5g2qs7b6ogvofq19uptldl5iqeh2ei.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        itp_support: true,
      });

      google.accounts.id.renderButton(
        this.hiddenGoogleButtonContainer.nativeElement,
        {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          text: 'continue_with',
          shape: 'rectangular',
          logo_alignment: 'left',
        }
      );

      const customButton = document.getElementById('g_id_onload');
      if (customButton) {
        customButton.addEventListener('click', () => {
          const googleButton =
            this.hiddenGoogleButtonContainer.nativeElement.querySelector(
              'div[role="button"]'
            );

          if (googleButton) {
            (googleButton as HTMLElement).click();
          } else {
            console.warn(
              'Google button element not found inside hidden container.'
            );
          }
        });
      }
    } else {
      console.warn('Google Identity Services script not loaded.');
    }
  }

  handleCredentialResponse(response: any) {
    console.log(response, 'response from google');
    this.isLoading = true;
    const idToken = response.credential;

    const apiCall$ = this._authService.googleLogin({ idToken });
    const minDelay$ = timer(2000);

    forkJoin([apiCall$, minDelay$])
      .pipe(
        delay(1500),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: ([res]: any) => {
          this.isLoading = false;
          localStorage.setItem('LoggedInUser', JSON.stringify(res));
          this._router.navigate(['/resume/builder']);
        },
        error: (err) => {
          this.isLoading = false;
          this._toaster.error('Login failed. Please try again.');
        },
      });
  }

  triggerGoogleLogin(): void {
    google.accounts.id.prompt();
  }

  initForm() {
    this.loginFormGrp = this._fb.group({
      email: [''],
      password: [''],
    });
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
    const apiCall$ = this._authService.login(formData);
    const minDelay$ = timer(2000);
    console.log(minDelay$, ' minDelay$');
    this.isLoading = true;

    forkJoin([apiCall$, minDelay$])
      .pipe(
        delay(1500),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: ([resp]) => {
          if (resp) {
            this.isLoading = false;
            this._toaster.success(resp.message);
            this._userUpdate.setUser(resp.data);
            this._service.checkLoginStatus();
            this._router.navigate(['/resume/builder']);
          }
        },
        error: (error) => {
          this._toaster.error(error.message);
        },
      });
  }
}
