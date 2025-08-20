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
import { ToastrService } from 'ngx-toastr';
import { ApiServiceService } from '../../services/api-service.service';
import { AuthService } from '../../services/auth-service.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { DataUpdateService } from '../../services/data-update.service';
@Component({
  selector: 'app-common-modal',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './common-modal.component.html',
  styleUrl: './common-modal.component.scss',
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
})
export class CommonModalComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private fb: FormBuilder,
    private auth: AuthService,
    private _service: ApiServiceService,
    private _toaster: ToastrService,
    private dataUpdateService: DataUpdateService
  ) {}
  downloadForm!: FormGroup;

  @ViewChild('OpenDownloadModal') OpenDownloadModal!: ElementRef;
  heading = '';
  subHeading = '';
  ngOnInit(): void {
    const userDetails = this.auth.getUserInfo();

    this.downloadForm = this.fb.group({
      resumeName: ['', Validators.required],
    });
  }

  getResumeById(id: any, isDuplicate = false) {
    const url = `resumes/get-resume-by-id/${id}`;
    this._service.get(url).subscribe({
      next: (res) => {
        let { resumeName } = res.data;
        if (isDuplicate) {
          resumeName = `${resumeName} Copy`;
        }
        console.log(resumeName);
        this.downloadForm.patchValue({
          resumeName: resumeName,
        });

        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isDownloadModal = false;
  selectedFormat = 'pdf';
  resumeName = '';
  data: any;
  openPopup(data?: any) {
    console.log(data);
    this.data = data;
    // data === 'Rename ' ? this.getResumeById(data._id) : null;
    if (data.key === 'Rename') {
      this.getResumeById(data._id, false);
    } else if (data.key === 'Duplicate') {
      this.getResumeById(data._id, true); // ✅ " Copy" add ho jayega
    }
    this.isDownloadModal = true;
  }

  duplicateResume(obj: any) {
    const URL = `resumes/resume_duplicate/${obj._id}`;
    this._service
      .post(URL, {
        resumeName: obj.resumeName,
      })
      .subscribe({
        next: (resp) => {
          this._toaster.success('Resume Duplicate successfully!');
          this.dataUpdateService.notifyComponentAShouldUpdate();
          console.log(resp);
          this.isDownloadModal = false;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  updateResume(data: any) {
    console.log('bugger');
    const url = 'resumes/create-resume';
    this._service
      .post(url, { resumeName: data.resumeName, _id: data._id })
      .subscribe({
        next: (resp: any) => {
          this._toaster.success('Resume posted successfully!');
          this.dataUpdateService.notifyComponentAShouldUpdate();
          this.isDownloadModal = false;
        },
        error: (err: any) => {
          console.error('Error posting resume:', err);
          this._toaster.error('Failed to post resume. Please try again.');
        },
      });
  }
  closePopup() {
    this.isDownloadModal = false;
  }

  onBackdropClick(event: MouseEvent) {}

  stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  updateChanges() {
    if (this.downloadForm.invalid) return;
    console.log('called');
    const { resumeName } = this.downloadForm.value;
    const data = {
      resumeName: resumeName,
      _id: this.data._id,
    };

    if (this.data.key === 'Rename') {
      this.updateResume(data);
    } else if (this.data.key === 'Duplicate') {
      this.duplicateResume(data);
    }
  }
}
