import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faMinus, faSubtract } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  faPlus = faPlus;
  faMinus = faSubtract;
  constructor(private _fb: FormBuilder) {}
  @Input({ required: true }) parentForm!: FormGroup;

  get educationsArray(): FormArray {
    return this.parentForm.get('educationsArray') as FormArray;
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
  removeEducation(index: number) {
    if (this.educationsArray.length > 1) {
      this.educationsArray.removeAt(index);
    }
  }
}
