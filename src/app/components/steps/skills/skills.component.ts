import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { Observable, of, filter } from 'rxjs';

@Component({
  selector: 'app-skills',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, TagInputModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  @Input({ required: true }) parentForm!: FormGroup;
  get skills(): FormControl {
    return this.parentForm.get('skills') as FormControl;
  }
  onAdding(tag: any): Observable<any> {
    const confirm = window.confirm('Do you want to add this skill?');
    return of(tag).pipe(filter(() => confirm));
  }

  onRemoving(tag: any): Observable<any> {
    const confirm = window.confirm('Do you want to remove this skill?');
    return of(tag).pipe(filter(() => confirm));
  }
}
