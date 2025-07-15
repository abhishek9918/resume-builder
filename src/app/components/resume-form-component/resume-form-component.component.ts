import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { TagModel } from '../../core/models/TagModel.model';
import { filter, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { StepperComponent } from '../../core/shared/stepper/stepper.component';
import { BasicInfoComponent } from '../steps/basic-info/basic-info.component';
import { ExperienceComponent } from '../steps/experience/experience.component';
import { EducationComponent } from '../steps/education/education.component';
import { SkillsComponent } from '../steps/skills/skills.component';
import { PreviewTemplateComponent } from '../preview-template/preview-template.component';
import { ProjectsComponent } from '../steps/projects/projects.component';
import { LanguagesComponent } from '../steps/languages/languages.component';
import { HobbiesComponent } from '../steps/hobbies/hobbies.component';
// import { RouterOutlet } from '../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K';

@Component({
  selector: 'app-resume-form-component',
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TagInputModule,
    // BasicInfoComponent,
    // ExperienceComponent,
    // EducationComponent,
    // SkillsComponent,
    // PreviewTemplateComponent,
    // ProjectsComponent,
    // LanguagesComponent,
    // HobbiesComponent,
    RouterOutlet,
  ],
  templateUrl: './resume-form-component.component.html',
  styleUrl: './resume-form-component.component.scss',
})
export class ResumeFormComponentComponent implements OnInit {
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
    console.log(this.resumeFormGroup.value);
    if (this.resumeFormGroup.valid) {
      console.log(this.resumeFormGroup.value);
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

  nextStep() {
    this.goToStep(this.step + 1);
  }
  prevStep() {
    this.goToStep(this.step - 1);
  }
}
