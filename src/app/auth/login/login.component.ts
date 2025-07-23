import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  isLogin: boolean = true;

  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  email: string = '';
  Math = Math;
  password: string = '';

  onSubmit() {
    console.log('Login submitted', {
      email: this.email,
      password: this.password,
    });
    // Add your login logic here
  }
}
