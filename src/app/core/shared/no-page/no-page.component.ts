import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-page',
  imports: [],
  templateUrl: './no-page.component.html',
  styleUrl: './no-page.component.scss',
})
export class NoPageComponent {
  constructor(private router: Router) {}
  redirectUser() {
    const token = localStorage.getItem('LoggedInUser');
    if (token) {
      this.router.navigate(['/resume/builder']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }
}
