import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-languages',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.scss',
})
export class LanguagesComponent implements OnInit {
  @Input({ required: true }) languagesArray!: FormArray;

  /** local editor form (add / edit) */
  languageForm!: FormGroup;

  quickList = ['English', 'Hindi', 'Tamil', 'Telugu', 'Marathi'];
  selectedLanguage = '';

  adding = true;
  editingIndex: number | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.resetEditor();
    this.adding = true;
    this.editingIndex = null;
  }

  private resetEditor(data: { language?: string; level?: string } = {}): void {
    this.languageForm = this.fb.group({
      language: [data.language ?? '', Validators.required],
      level: [data.level ?? '', Validators.required],
    });

    this.selectedLanguage = data.language ?? '';
    this.adding = true;
  }

  quickSelect(e: any, lang: string): void {
    e.preventDefault();
    this.selectedLanguage = lang;

    this.languageForm?.get('language')?.setValue(lang);

    if (!this.adding && this.editingIndex === null) {
      this.resetEditor({ language: lang });
    }
  }

  save(e: any): void {
    e.preventDefault();
    if (this.languageForm.invalid) return;

    const value = this.languageForm.value;

    if (this.editingIndex === null) {
      this.languagesArray.push(this.fb.group(value));
    } else {
      (this.languagesArray.at(this.editingIndex) as FormGroup).patchValue(
        value
      );
    }

    this.languageForm.reset();
    this.adding = false;
    this.editingIndex = null;
    this.selectedLanguage = '';
  }

  cancel(): void {
    this.editingIndex = null;
    this.resetEditor();
  }

  addAnother(e: any): void {
    e.preventDefault();
    this.resetEditor();
  }

  edit(idx: number, event: any): void {
    event.preventDefault();
    event.stopPropagation();
    const grp = this.languagesArray.at(idx) as FormGroup;
    this.editingIndex = idx;
    this.resetEditor(grp.value);
  }

  delete(idx: number, event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.languagesArray.removeAt(idx);
    if (this.editingIndex === idx) this.cancel();
  }

  levelLabel(code: string): string {
    const map: Record<string, string> = {
      C2: 'Bilingual or Proficient | C2',
      C1: 'Advanced | C1',
      B2: 'Upper Intermediate | B2',
      B1: 'Intermediate | B1',
      A2: 'Elementary | A2',
      A1: 'Beginner | A1',
    };
    return map[code] ?? code;
  }
}
