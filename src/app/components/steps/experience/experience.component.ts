import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],

  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  faPlus = faPlus;
  faMinus = faSubtract;
  constructor(private _fb: FormBuilder) {}
  @Input({ required: true }) parentForm!: FormGroup;

  get experiencesArray(): FormArray {
    return this.parentForm.get('experiencesArray') as FormArray;
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

  addExperience() {
    this.experiencesArray.push(this.createExperienceGroup());
  }
  removeExperience(index: number) {
    if (this.experiencesArray.length > 1) {
      this.experiencesArray.removeAt(index);
    }
  }
}
