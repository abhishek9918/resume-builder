import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-d',
  imports: [CommonModule],
  templateUrl: './d.component.html',
  styleUrl: './d.component.scss',
})
export class DComponent {
  constructor(private router: Router) {}

  signIn() {
    this.router.navigate(['/login']);
  }

  signUp() {
    this.router.navigate(['/register']);
  }

  signUpWithProvider(provider: string) {
    alert(`Sign up with ${provider} clicked`);
    // Integrate your provider auth logic here
  }
  closeAuthPage() {
    this.router.navigate(['/']); // Change to desired route after closing auth screen
  }
}
