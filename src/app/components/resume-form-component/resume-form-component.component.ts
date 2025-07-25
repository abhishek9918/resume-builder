import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { Router } from '@angular/router';
import { StepperComponent } from '../../core/shared/stepper/stepper.component';
import { BasicInfoComponent } from '../steps/basic-info/basic-info.component';
import { ExperienceComponent } from '../steps/experience/experience.component';
import { EducationComponent } from '../steps/education/education.component';
import { SkillsComponent } from '../steps/skills/skills.component';
import { PreviewTemplateComponent } from '../preview-template/preview-template.component';
import { ProjectsComponent } from '../steps/projects/projects.component';
import { LanguagesComponent } from '../steps/languages/languages.component';
import { HobbiesComponent } from '../steps/hobbies/hobbies.component';
import { RegisterComponent } from '../../auth/register/register.component';

@Component({
  selector: 'app-resume-form-component',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TagInputModule,
    BasicInfoComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    PreviewTemplateComponent,
    ProjectsComponent,
    LanguagesComponent,
    HobbiesComponent,
    StepperComponent,
  ],
  templateUrl: './resume-form-component.component.html',
  styleUrl: './resume-form-component.component.scss',
})
export class ResumeFormComponentComponent implements OnInit {
  currentStep = 0;
  maxStepReached = 0;
  steps = [
    'Basic',
    'Experience',
    'Education',
    'Skills',
    'Projects',
    'Languages',
    'Hobbies',
    'Preview',
  ];
  resumeFormGroup!: FormGroup;

  constructor(private _fb: FormBuilder, private _router: Router) {}
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.resumeFormGroup = this._fb.group({
      fullName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      summary: [''],
      experiencesArray: this._fb.array([this.createExperienceGroup()]),
      educationsArray: this._fb.array([this.createEducationGroup()]),
      projectsArray: this._fb.array([this.newProject()]),
      languagesArray: this._fb.array([]),
      skills: [],
      hobbiesArry: [],
    });
  }

  get projectsArray(): FormArray {
    return this.resumeFormGroup.get('projectsArray') as FormArray;
  }

  get languagesArray(): FormArray {
    return this.resumeFormGroup.get('languagesArray') as FormArray;
  }
  newlanguages() {
    return this._fb.group({
      language: ['', Validators.required],
      level: ['', Validators.required],
    });
  }
  newProject() {
    return this._fb.group({
      title: [''],
      duration: [''],
      description: [''],
    });
  }

  get experiencesArray(): FormArray {
    return this.resumeFormGroup.get('experiencesArray') as FormArray;
  }

  private createExperienceGroup(): FormGroup {
    return this._fb.group({
      company: [''],
      position: [''],
      startDate: [''],
      endDate: [''],
      description: [''],
    });
  }

  addExperience(): void {
    this.experiencesArray.push(this.createExperienceGroup());
  }

  get educationsArray(): FormArray {
    return this.resumeFormGroup.get('educationsArray') as FormArray;
  }

  private createEducationGroup(): FormGroup {
    return this._fb.group({
      institution: [''],
      degree: [''],
      startDate: [''],
      endDate: [''],
    });
  }

  addNewEducations() {
    this.educationsArray.push(this.createEducationGroup());
  }

  submit() {
    console.log('Submitting form...', this.resumeFormGroup.controls);
    console.log('Form submitted:', this.resumeFormGroup.value);
    if (this.resumeFormGroup.valid) {
      this._router.navigate(['/preview']);
    } else {
      console.warn('Form invalid');
      this.resumeFormGroup.markAllAsTouched();
    }
  }

  step = 0;

  goToStep(index: number) {
    this.step = index;
  }

  onStepChange(step: number) {
    console.log(
      `Step changed to: ${step}, Max step reached: ${this.maxStepReached}`
    );
    if (step <= this.maxStepReached) {
      this.step = step;
      this.currentStep = step;
    }
  }

  next() {
    if (this.step < this.steps.length - 1) {
      this.step++;
      this.currentStep = this.step;

      if (this.step > this.maxStepReached) {
        this.maxStepReached = this.step;
      }
    }
  }

  prev() {
    if (this.step > 0) {
      this.step--;
      this.currentStep = this.step;
    }
  }

  isOpen = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
