import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnInit,
  viewChild,
  ViewChild,
} from '@angular/core';
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
import { faL } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth-service.service';
import { ApiServiceService } from '../../services/api-service.service';

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
    private _service: ApiServiceService
  ) {}
  downloadForm!: FormGroup;

  @ViewChild('OpenDownloadModal') OpenDownloadModal!: ElementRef;
  @ViewChild('loginAndSigIn') loginAndSigIn!: LoginSignUpModalComponent;
  ngOnInit(): void {
    this.downloadForm = this.fb.group({
      format: ['', Validators.required],
      resumeName: ['', Validators.required],
    });
  }

  isDownloadModal = false;
  selectedFormat = 'pdf';
  resumeName = '';

  openPopup() {
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

    const { format, resumeName } = this.downloadForm.value;
    console.log(format, resumeName);
    // this.checkUserIsLoggedIn();
    this.isDownloadModal = false;
    this.loginAndSigIn.openModal();
  }

  checkUserIsLoggedIn() {
    const url = 'users/check-login';
    this._service.get(url).subscribe((resp) => {
      console.log(resp);
    });
  }
}
