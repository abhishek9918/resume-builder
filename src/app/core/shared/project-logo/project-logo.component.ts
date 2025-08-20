import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-logo',
  imports: [CommonModule],
  templateUrl: './project-logo.component.html',
  styleUrl: './project-logo.component.scss',
})
export class ProjectLogoComponent implements OnInit {
  @Input() customClass: string = '';
  @Input() customSubClass: string = '';
  @Input() customSubHr: string = '';
  logoLetters = ['i', 'n', 't', 'r', 'o', 'v', 'i', 'a'];

  ngOnInit(): void {}
  getLetterClass(index: number, letter: string): string {
    const gold = 'text-amber-500 drop-shadow-lg';
    const gradient =
      'bg-gradient-to-r from-cyan-500 to-fuchsia-500 bg-clip-text text-transparent';
    const base =
      'transition transform duration-500 ease-in-out opacity-0 animate-letter-in';

    if (index >= 5) return `${base} ${gold} ${gradient}`;
    return `${base} text-blue-900`;
  }
}
