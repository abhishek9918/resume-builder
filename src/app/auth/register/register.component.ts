import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../../core/services/api-service.service';
import { AuthService } from '../../core/services/auth-service.service';
import { UpdateUserService } from '../../core/services/update-user.service';
import {
  trigger,
  transition,
  style,
  animate,
  state,
  keyframes,
} from '@angular/animations';
import { ProjectLogoComponent } from '../../core/shared/project-logo/project-logo.component';
@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ProjectLogoComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
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
export class RegisterComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _service: ApiServiceService,
    private _authService: AuthService,
    private _toaster: ToastrService,
    private _userUpdate: UpdateUserService
  ) {}
  isLogin: boolean = true;
  registerFormGrp!: FormGroup;
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

  ngOnInit() {
    setTimeout(() => {
      this.state = 'final';
    }, 100);
    this.initForm();
  }
  initForm() {
    this.registerFormGrp = this._fb.group({
      name: [''],
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
    if (this.registerFormGrp.invalid) {
      this._toaster.error('Please fill in all required fields.');
      return;
    }
    const register = this.registerFormGrp.value;
    this.postUser(register);
  }

  postUser(formData: any) {
    const service = this._authService.createUser(formData);

    service.subscribe({
      next: (resp) => {
        if (resp) {
          this._toaster.success(resp.message);
          this._userUpdate.setUser(resp.data);
          this._service.checkLoginStatus();
          this._router.navigate(['/auth/login']);
        }
      },
      error: (error) => {
        this._toaster.error(error.message);
      },
    });
  }
}
