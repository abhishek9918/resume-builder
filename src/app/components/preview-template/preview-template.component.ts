import { Component, Input, input, OnInit } from '@angular/core';
import { fakeJson } from '../../core/models/json';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../core/services/auth-service.service';
import {
  faEnvelope,
  faGlobe,
  faLocationDot,
  faLocationPin,
  faPhone,
  faRightLong,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-preview-template',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './preview-template.component.html',
  styleUrl: './preview-template.component.scss',
})
export class PreviewTemplateComponent implements OnInit {
  // @Input() resumeData: any;
  @Input() resumeData: any;
  faPhone = faPhone;
  faLocationPin = faEnvelope;
  faLocationDot = faLocationDot;
  faRightLong = faRightLong;
  faGlobe = faGlobe;
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private authService: AuthService
  ) {}
  resumes: any;
  ngOnInit(): void {
    this.resumes = this.resumeData;
  }
  // data = fakeJson;
  // resume = fakeJson;

  onDownloadClick() {
    this.downloadResume();
  }

  downloadResume() {}
}
