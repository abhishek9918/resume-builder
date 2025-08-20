import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { LoginSignUpModalComponent } from '../login-sign-up-modal/login-sign-up-modal.component';
import { AuthService } from '../../services/auth-service.service';
import { ApiServiceService } from '../../services/api-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resume-downlaod',
  imports: [
    CommonModule,
    FormsModule,
    LoginSignUpModalComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './resume-downlaod.component.html',
  animations: [
    trigger('modalBackdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))]),
    ]),
    trigger('modalContent', [
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
  styleUrl: './resume-downlaod.component.scss',
})
export class ResumeDownlaodComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private _service: ApiServiceService,
    private _toaster: ToastrService
  ) {}
  downloadForm!: FormGroup;

  @ViewChild('OpenDownloadModal') OpenDownloadModal!: ElementRef;
  @ViewChild('loginAndSigIn') loginAndSigIn!: LoginSignUpModalComponent;
  ngOnInit(): void {
    const userDetails = this.auth.getUserInfo();

    this.downloadForm = this.fb.group({
      resumeName: ['', Validators.required],
    });
  }

  isDownloadModal = false;
  selectedFormat = 'pdf';
  resumeName = '';
  data: any;
  openPopup(data?: any) {
    this.data = data;
    if (data.resumeName) {
      this.downloadForm.patchValue({
        resumeName: data.resumeName,
      });
    }
    console.log(this.data, 'data in openPopup');

    this.isDownloadModal = true;
  }

  closePopup() {
    this.isDownloadModal = false;
  }

  onBackdropClick(event: MouseEvent) {}

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  downloadResume() {
    if (this.downloadForm.invalid) return;
    const { resumeName } = this.downloadForm.value;
    const data = {
      ...this.data,
      resumeName: resumeName,
      userId: this.auth.getUserInfo().user._id,
    };
    this.postResume(data);
    this.isDownloadModal = false;
  }
  count = 0;
  postResume(formData: FormData) {
    console.log('called ', this.count + 1 + 'time');

    const url = 'resumes/create-resume';
    this._service.post(url, formData).subscribe({
      next: (resp: any) => {
        this._toaster.success('Resume posted successfully!');
        this._router.navigate(['/resume/preview']);
      },
      error: (err: any) => {
        console.error('Error posting resume:', err);
        this._toaster.error('Failed to post resume. Please try again.');
      },
    });
  }

  checkUserIsLoggedIn() {
    const url = 'users/check-login';
    this._service.get(url).subscribe((resp) => {
      console.log(resp);
    });
  }
}
