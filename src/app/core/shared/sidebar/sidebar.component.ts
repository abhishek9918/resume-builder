import { Component, ElementRef, HostListener, NgZone } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  query,
  stagger,
} from '@angular/animations';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faClose,
  faHome,
  faTimes,
  faBars,
  faSignOut,
  faInfoCircle,
  faFile,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons';
import { ApiServiceService } from '../../services/api-service.service';
import { UpdateUserService } from '../../services/update-user.service';
import { ProjectLogoComponent } from '../project-logo/project-logo.component';
import { PulseComponent } from '../pulse/pulse.component';
import { OptimizedClickOutsideDirective } from '../../directive/optimized-click-outside.directive';

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    OptimizedClickOutsideDirective,
    RouterLink,
    RouterLinkActive,
  ],

  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('iconToggle', [
      state('open', style({ transform: 'rotate(90deg)' })),
      state('closed', style({ transform: 'rotate(0deg)' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SidebarComponent {
  constructor(
    public api: ApiServiceService,
    private _user: UpdateUserService,
    private ngZone: NgZone,
    private eRef: ElementRef
  ) {}
  // isMenuOpen = false;
  // faHome = faTimes;
  // faClose = faClose;
  // faBars = faBars;
  // toggleMenu() {
  //   this.isMenuOpen = !this.isMenuOpen;
  //   document.body.classList.toggle('no-scroll', this.isMenuOpen);
  // }

  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent) {
  //   const target = event.target as HTMLElement;
  //   const nav = document.querySelector('nav');
  //   const hamburger = document.querySelector('.hamburger');

  //   if (
  //     this.isMenuOpen &&
  //     nav &&
  //     hamburger &&
  //     !nav.contains(target) &&
  //     !hamburger.contains(target)
  //   ) {
  //     this.isMenuOpen = false;
  //     document.body.classList.remove('no-scroll');
  //   }
  // }
  faBars = faBars;
  faClose = faTimes; // Use faTimes for close icon to match common practice, ensure import
  SIGNOUT = faSignOut;
  INFO = faInfoCircle;
  faLayerGroup = faLayerGroup;
  isMenuOpen = false;
  fileIcon = faFile;
  isPopupOpen = false;
  // isMenuOpen = false;
  isUserMenuOpen = false;

  // isMenuOpen = false;
  // isUserMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUserMenu(event: Event) {
    console.log('zzz');
    event.stopPropagation(); // avoid affecting nav link states
    this.ngZone.run(() => {
      this.isUserMenuOpen = !this.isUserMenuOpen;
      console.log('isUserMenuOpen:', this.isUserMenuOpen);
    });
  }
  logout(event: Event) {
    console.log('adasdsad');
    event.stopPropagation();
    this._user.clearUser();
    this.isUserMenuOpen = false;
  }
  close() {
    this.isUserMenuOpen = false;
  }
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (
      this.isUserMenuOpen &&
      !this.eRef.nativeElement.contains(event.target)
    ) {
      this.isUserMenuOpen = false;
    }
  }
}
