import { Component } from '@angular/core';
import { fakeJson } from '../../core/models/json';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-preview-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-template.component.html',
  styleUrl: './preview-template.component.scss',
})
export class PreviewTemplateComponent {
  constructor(private _fb: FormBuilder, private _router: Router) {}

  resumeData = fakeJson;
  data = fakeJson;
  resume = fakeJson;
  // resumes = jsss;
}
