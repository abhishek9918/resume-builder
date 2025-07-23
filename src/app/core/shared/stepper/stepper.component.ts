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
// export class StepperComponent implements OnInit {
//   constructor(private _fb: FormBuilder, private _router: Router) {}

//   stepperContainer!: ElementRef;
//   isSticky = false;
//   ngOnInit(): void {}
//   @Input() steps: string[] = [];

//   @Input() current = 0;

//   @Output() stepChange = new EventEmitter<number>();
//   @Input() maxCompletedStep = 0;

//   maxCompleted = 0;
//   next() {
//     if (this.current < this.steps.length - 1) {
//       const nextIndex = this.current + 1;
//       this.stepChange.emit(nextIndex);
//       this.maxCompleted = Math.max(this.maxCompleted, nextIndex);
//     }
//   }

//   prev() {
//     if (this.current > 0) this.stepChange.emit(this.current - 1);
//   }

//   currentActive = 1;

//   get progressWidth(): string {
//     if (this.steps.length <= 1) return '0%';
//     const progress = (this.current / (this.steps.length - 1)) * 90;
//     return `${progress}%`;
//   }
//   goToStep(index: number) {
//     if (index <= this.maxCompletedStep) {
//       this.stepChange.emit(index);
//     }
//   }
// }
export class StepperComponent implements OnInit {
  constructor(private _fb: FormBuilder, private _router: Router) {}

  @Input() steps: string[] = [];
  @Input() current = 0; // 0-based index
  @Output() stepChange = new EventEmitter<number>();

  maxCompleted = 0;

  ngOnInit(): void {
    this.maxCompleted = this.current;
  }

  next() {
    if (this.current < this.steps.length - 1) {
      const nextIndex = this.current + 1;
      this.maxCompleted = Math.max(this.maxCompleted, nextIndex);
      this.stepChange.emit(nextIndex);
    }
  }

  prev() {
    if (this.current > 0) {
      this.stepChange.emit(this.current - 1);
    }
  }

  goToStep(index: number) {
    if (index <= this.maxCompleted) {
      this.stepChange.emit(index);
    }
  }

  get progressWidth(): string {
    if (this.steps.length <= 1) return '0%';
    const progress = (this.current / (this.steps.length - 1)) * 90;
    return `${progress}%`;
  }
}
