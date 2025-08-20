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

  @Input() steps: string[] = [];
  @Input() current = 0;
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
    if (index <= this.current || index === this.current + 1) {
      this.stepChange.emit(index);
    }
  }

  get progressWidth(): string {
    if (this.steps.length <= 1) return '0%';
    const containerWidthPercentage = window.innerWidth >= 640 ? 80 : 90;
    const progress =
      (this.current / (this.steps.length - 1)) * containerWidthPercentage;
    return `${Math.min(progress, containerWidthPercentage)}%`;
  }
}
