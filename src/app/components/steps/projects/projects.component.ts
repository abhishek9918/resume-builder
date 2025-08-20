import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-projects',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  constructor(private _fb: FormBuilder, private _router: Router) {}
  faPlus = faPlus;
  faMinus = faSubtract;
  @Input({ required: true }) parentForm!: FormGroup;

  get projectsArray(): FormArray {
    return this.parentForm.get('projectsArray') as FormArray;
  }
  newProject() {
    return this._fb.group({
      title: ['', Validators.required],
      duration: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addNewEducations() {
    this.projectsArray.push(this.newProject());
  }
  removeProjects(index: number) {
    if (this.projectsArray.length > 1) {
      this.projectsArray.removeAt(index);
    }
  }
}
