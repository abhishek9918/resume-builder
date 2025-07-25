import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { ApiServiceService } from '../../services/api-service.service';
import { UpdateUserService } from '../../services/update-user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faInfo,
  faInfoCircle,
  faSign,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';

export interface userDetails {
  isUserLoggedIn: boolean;
  message: string;
  user: User;
}

export interface User {
  userId: string;
  email: string;
  iat: number;
  name: string;
  exp: number;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userData: userDetails | null = null;
  SIGNOUT = faSignOut;
  INFO = faInfoCircle;

  loggedInUser = signal<any>(null);
  constructor(
    public api: ApiServiceService,
    private _user: UpdateUserService
  ) {}
  ngOnInit(): void {
    this.checkUserIsLoggedIn();
  }
  checkUserIsLoggedIn() {
    const url = 'users/check-login';
    this.api.get(url).subscribe({
      next: (response: userDetails) => {
        
        this.userData = response;
        this.isLoggedIn = response.isUserLoggedIn;
        
        
      },
      error: (error) => {
        console.error('Error checking login status:', error);
      },
    });
  }
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

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
