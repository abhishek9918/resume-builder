import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../core/shared/header/header.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { StepperComponent } from '../../core/shared/stepper/stepper.component';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { SidebarComponent } from '../../core/shared/sidebar/sidebar.component';

@Component({
  selector: 'app-resume-layout',
  imports: [RouterOutlet, CommonModule, SidebarComponent],
  templateUrl: './resume-layout.component.html',
  styleUrl: './resume-layout.component.scss',
})
export class ResumeLayoutComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private route: ActivatedRoute
  ) {}
  current = 0;
  steps = [
    'Basic',
    'Experience',
    'Education',
    'Skills',
    'Projects',
    'Languages',
    'Hobbies',
    'Preview',
  ];
  ngOnInit(): void {
    this.route.firstChild?.url.subscribe((url) => {
      const currentPath = url[0]?.path;
      this.current = this.steps.indexOf(currentPath || '');
    });
  }
  step = 0;

  goToStep(index: number) {
    this._router.navigate(['builder', this.steps[index]]);
  }

  next() {
    if (this.current < this.steps.length - 1) {
      this.goToStep(this.current + 1);
    }
  }

  prev() {
    if (this.current > 0) {
      this.goToStep(this.current - 1);
    }
  }
}
