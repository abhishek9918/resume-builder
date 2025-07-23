import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { ApiServiceService } from '../../services/api-service.service';
import { UpdateUserService } from '../../services/update-user.service';

export interface userDetails {
  isUserLoggedIn: boolean;
  message: string;
  user: User;
}

export interface User {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userData: userDetails | null = null;

  loggedInUser = signal<any>(null);
  constructor(public api: ApiServiceService, private _user: UpdateUserService) {
    effect(() => {
      this.userData = this._user.user();
    });
  }
  ngOnInit(): void {}
  isMenuOpen = false;

  isUserLoggedIn: boolean = false;
  userName: string = '';

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this._user.clearUser();
  }

  navigateToLogin() {}
}
