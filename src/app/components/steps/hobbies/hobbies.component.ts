import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { Observable, of, filter } from 'rxjs';

@Component({
  selector: 'app-hobbies',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, TagInputModule],
  templateUrl: './hobbies.component.html',
  styleUrl: './hobbies.component.scss',
})
export class HobbiesComponent {
  @Input({ required: true }) parentForm!: FormGroup;
  get hobbiesArray(): FormControl {
    return this.parentForm.get('hobbiesArray') as FormControl;
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
