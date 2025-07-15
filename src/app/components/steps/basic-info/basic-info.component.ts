import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-basic-info',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './basic-info.component.html',
  styleUrl: './basic-info.component.scss',
})
export class BasicInfoComponent {
  @Input({ required: true }) parentForm!: FormGroup;
}
