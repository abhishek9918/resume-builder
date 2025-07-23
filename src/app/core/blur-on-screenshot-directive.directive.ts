// blur.directive.ts
import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { BlurService } from './services/blur.service';
// import { BlurService } from './blur.service';

@Directive({
  selector: '[appBlurOnScreenshot]',
})
export class BlurOnScreenshotDirective implements OnInit, OnDestroy {
  private subscription!: Subscription;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private blurService: BlurService
  ) {}

  ngOnInit() {
    this.subscription = this.blurService.blurState$.subscribe((isBlurred) => {
      if (isBlurred) {
        this.renderer.setStyle(this.el.nativeElement, 'filter', 'blur(8px)');
        this.renderer.setStyle(
          this.el.nativeElement,
          'transition',
          'filter 0.3s ease'
        );
      } else {
        this.renderer.removeStyle(this.el.nativeElement, 'filter');
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
