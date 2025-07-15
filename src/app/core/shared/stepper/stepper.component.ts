import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
})
export class StepperComponent implements OnInit {
  constructor(private _fb: FormBuilder, private _router: Router) {}

  stepperContainer!: ElementRef;
  isSticky = false;
  ngOnInit(): void {}
  @Input() steps: string[] = [];

  /** कौन‑सा स्टेप active है (0‑based index) */
  @Input() current = 0;

  /** जब यूज़र किसी step dot पर क्लिक करे */
  @Output() stepChange = new EventEmitter<number>();

  /** अगले/पिछले बटन इवेंट */
  next() {
    if (this.current < this.steps.length - 1)
      this.stepChange.emit(this.current + 1);
  }
  prev() {
    if (this.current > 0) this.stepChange.emit(this.current - 1);
  }
}
