import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  viewChildren,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ResumeDownlaodComponent } from '../../../core/modals/resume-downlaod/resume-downlaod.component';
import { LoginSignUpModalComponent } from '../../../core/modals/login-sign-up-modal/login-sign-up-modal.component';
import { BlurService } from '../../../core/services/blur.service';

@Component({
  selector: 'app-template',
  imports: [CommonModule, ResumeDownlaodComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private blurService: BlurService
  ) {}

  @ViewChild('OpenDownloadModal') OpenDownloadModal!: ResumeDownlaodComponent;

  onDownloadClick() {
    this.OpenDownloadModal.openPopup();
  }

  onPrintClick() {
    window.print();
  }

  onEmailClick() {
    alert('Feature coming soon!');
  }

  onFinishClick() {
    this._router.navigate(['/dashboard']);
  }

  downloadResume() {
    console.log('Downloading resume...');
  }
}
