import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperComponent } from '../../core/shared/stepper/stepper.component';
import { BasicInfoComponent } from '../steps/basic-info/basic-info.component';
import { ExperienceComponent } from '../steps/experience/experience.component';
import { EducationComponent } from '../steps/education/education.component';
import { SkillsComponent } from '../steps/skills/skills.component';
import { PreviewTemplateComponent } from '../preview-template/preview-template.component';
import { ProjectsComponent } from '../steps/projects/projects.component';
import { LanguagesComponent } from '../steps/languages/languages.component';
import { HobbiesComponent } from '../steps/hobbies/hobbies.component';
import { ApiServiceService } from '../../core/services/api-service.service';
import { AuthService } from '../../core/services/auth-service.service';
import { ToastrService } from 'ngx-toastr';
import { ResumeDownlaodComponent } from '../../core/modals/resume-downlaod/resume-downlaod.component';

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
    ResumeDownlaodComponent,
  ],
  templateUrl: './resume-form-component.component.html',
  styleUrl: './resume-form-component.component.scss',
})
export class ResumeFormComponentComponent implements OnInit {
  currentStep = 0;
  maxStepReached = 0;
  resumeFormGroup!: FormGroup;
  isOpen = false;
  extractedDataFromId: any;
  step = 0;
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
  constructor(
    private _toaster: ToastrService,
    private _fb: FormBuilder,
    private _router: Router,
    private _apiService: ApiServiceService,
    private _authService: AuthService,
    private _activateRoute: ActivatedRoute
  ) {}
  @ViewChild('OpenDownloadModal') OpenDownloadModal!: ResumeDownlaodComponent;
  routerId: any;
  ngOnInit(): void {
    this.routerId = this._activateRoute.snapshot.params['id'];
    this.initForm();
    if (this.routerId) {
      this.getResumeByUserId(this.routerId);
    }

    const userDetails = this._authService.getUserInfo();
  }
  initForm() {
    this.resumeFormGroup = this._fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      jobTitle: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]],
      summary: ['', Validators.required],

      experiencesArray: this._fb.array([this.createExperienceGroup()]),
      educationsArray: this._fb.array([this.createEducationGroup()]),
      projectsArray: this._fb.array([this.newProject()]),
      languagesArray: this._fb.array([]),
      skills: this._fb.control([], Validators.required),
      hobbiesArray: ['', Validators.required],
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
      title: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', [Validators.required]],
    });
  }

  get experiencesArray(): FormArray {
    return this.resumeFormGroup.get('experiencesArray') as FormArray;
  }

  private createExperienceGroup(): FormGroup {
    return this._fb.group({
      company: ['', Validators.required],
      position: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      description: ['', [Validators.required, Validators.minLength(20)]],
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
      institution: ['', Validators.required],
      degree: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
    });
  }

  addNewEducations() {
    this.educationsArray.push(this.createEducationGroup());
  }

  submit() {
    if (this.resumeFormGroup.invalid) {
      this.resumeFormGroup.markAllAsTouched();
      return;
    }
    let formData;
    if (this.routerId) {
      formData = {
        ...this.resumeFormGroup.value,
        _id: this.routerId,
        resumeName: this.extractedDataFromId.resumeName || '',
      };
    } else {
      formData = this.resumeFormGroup.value;
    }
    this.OpenDownloadModal.openPopup(formData);
  }

  goToStep(index: number) {
    this.step = index;
  }

  onStepChange(step: number) {
    if (step <= this.maxStepReached) {
      this.step = step;
      this.currentStep = step;
    }
  }

  next() {
    const stepControlsMap: { [key: number]: string[] } = {
      0: ['fullName', 'jobTitle', 'email', 'phone', 'summary'],
      1: ['experiencesArray'],
      2: ['educationsArray'],
      3: ['skills'],
      4: ['projectsArray'],
      5: ['languagesArray'],
      6: ['hobbiesArray'],
    };

    const controlsToCheck = stepControlsMap[this.step] || [];
    let stepValid = true;

    controlsToCheck.forEach((controlName) => {
      const control = this.resumeFormGroup.get(controlName);

      if (!control) return;

      if (control instanceof FormArray) {
        if (controlName === 'languagesArray' && control.length === 0) {
          alert('Please add at least one language');
          stepValid = false;
          return;
        }

        control.controls.forEach((group) => {
          if (group instanceof FormGroup) {
            Object.keys(group.controls).forEach((field) => {
              const c = group.get(field);
              c?.markAsTouched();
              if (c?.invalid) stepValid = false;
            });
          } else {
            group?.markAsTouched();
            if (group?.invalid) stepValid = false;
          }
        });
      } else if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((field) => {
          const c = control.get(field);
          c?.markAsTouched();
          if (c?.invalid) stepValid = false;
        });
      } else {
        control.markAsTouched();
        if (control.invalid) stepValid = false;
      }
    });

    if (!stepValid) {
      return;
    }

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

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  getResumeByUserId(id: any) {
    const URL = `resumes/get-resume-by-id/${id}`;
    this._apiService.get(URL).subscribe({
      next: (res: any) => {
        setTimeout(() => {
          this.extractedDataFromId = res.data;
          this.patchFormValue(res.data);
        }, 0);
      },
      error: (err: any) => {
        console.error('Error fetching resumes:', err);
      },
    });
  }

  patchFormValue(formData: any) {
    this.resumeFormGroup.patchValue({
      fullName: formData.fullName || '',
      jobTitle: formData.jobTitle || '',
      email: formData.email || '',
      phone: formData.phone || '',
      summary: formData.summary || '',
      skills: Array.isArray(formData.skills) ? formData.skills : [],
      hobbiesArray: Array.isArray(formData.hobbiesArray)
        ? formData.hobbiesArray
        : [],
    });

    const expArray = this.resumeFormGroup.get('experiencesArray') as FormArray;
    expArray.clear();
    formData?.experiencesArray?.forEach((exp: any) => {
      expArray.push(
        this._fb.group({
          company: [exp.company || '', Validators.required],
          position: [exp.position || '', Validators.required],
          startDate: [exp.startDate || '', Validators.required],
          endDate: [exp.endDate || ''],
          description: [
            exp.description || '',
            [Validators.required, Validators.minLength(20)],
          ],
        })
      );
    });

    const projArray = this.resumeFormGroup.get('projectsArray') as FormArray;
    projArray.clear();
    formData?.projectsArray?.forEach((proj: any) => {
      projArray.push(
        this._fb.group({
          title: [proj.title || '', Validators.required],
          duration: [proj.duration || '', Validators.required],
          description: [proj.description || '', Validators.required],
        })
      );
    });

    const langArray = this.resumeFormGroup.get('languagesArray') as FormArray;
    langArray.clear();
    formData?.languagesArray?.forEach((lang: any) => {
      langArray.push(
        this._fb.group({
          language: [lang.language || '', Validators.required],
          level: [lang.level || '', Validators.required],
        })
      );
    });

    const eduArray = this.resumeFormGroup.get('educationsArray') as FormArray;
    eduArray.clear();
    formData?.educationsArray?.forEach((edu: any) => {
      eduArray.push(
        this._fb.group({
          institution: [edu.institution || '', Validators.required],
          degree: [edu.degree || '', Validators.required],
          startDate: [edu.startDate || '', Validators.required],
          endDate: [edu.endDate || ''],
        })
      );
    });
    console.log(this.resumeFormGroup.value);
  }

  patchFormValues(formData: any) {
    this.resumeFormGroup.patchValue({
      fullName: formData?.fullName || '',
      jobTitle: formData?.jobTitle || '',
      email: formData?.email || '',
      phone: formData?.phone || '',
      summary: formData?.summary || '',
      skills: Array.isArray(formData?.skills) ? formData.skills.join(', ') : '',
      hobbiesArray: Array.isArray(formData?.hobbiesArray)
        ? formData.hobbiesArray.join(', ')
        : '',
    });

    const expArray = this.resumeFormGroup.get('experiencesArray') as FormArray;
    expArray.clear();
    (formData?.experiencesArray || []).forEach((exp: any) => {
      expArray.push(
        this._fb.group({
          company: [exp?.company || '', Validators.required],
          position: [exp?.position || '', Validators.required],
          startDate: [exp?.startDate || '', Validators.required],
          endDate: [exp?.endDate || ''],
          description: [
            exp?.description || '',
            [Validators.required, Validators.minLength(20)],
          ],
        })
      );
    });

    const projArray = this.resumeFormGroup.get('projectsArray') as FormArray;
    projArray.clear();
    (formData?.projectsArray || []).forEach((proj: any) => {
      projArray.push(
        this._fb.group({
          title: [proj?.title || '', Validators.required],
          duration: [proj?.duration || '', Validators.required],
          description: [proj?.description || '', Validators.required],
        })
      );
    });

    const langArray = this.resumeFormGroup.get('languagesArray') as FormArray;
    langArray.clear();
    (formData?.languagesArray || []).forEach((lang: any) => {
      langArray.push(
        this._fb.group({
          language: [lang?.language || '', Validators.required],
          level: [lang?.level || '', Validators.required],
        })
      );
    });

    const eduArray = this.resumeFormGroup.get('educationsArray') as FormArray;
    eduArray.clear();
    (formData?.educationsArray || []).forEach((edu: any) => {
      eduArray.push(
        this._fb.group({
          institution: [edu?.institution || '', Validators.required],
          degree: [edu?.degree || '', Validators.required],
          startDate: [edu?.startDate || '', Validators.required],
          endDate: [edu?.endDate || ''],
        })
      );
    });
  }
}
