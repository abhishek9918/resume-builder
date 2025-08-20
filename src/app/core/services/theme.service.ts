// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeKey = 'theme';
  constructor() {
    this.loadTheme(); // Page load hote hi theme apply karega
  }
  toggleTheme(): void {
    const html = document.documentElement;
    let newTheme: 'light' | 'dark';

    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      newTheme = 'light';
    } else {
      html.classList.add('dark');
      newTheme = 'dark';
    }

    localStorage.setItem(this.themeKey, newTheme);
  }

  private loadTheme(): void {
    const savedTheme = localStorage.getItem(this.themeKey);

    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Agar kuch save nahi hai to system preference follow kare
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(this.themeKey, 'dark');
      } else {
        localStorage.setItem(this.themeKey, 'light');
      }
    }
  }
}
