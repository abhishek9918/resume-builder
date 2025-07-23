import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlurOnScreenshot]',
})
export class BlurOnScreenshotDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  // Blur when PrintScreen key is pressed
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'PrintScreen') {
      this.applyBlur();
    }
  }

  // Blur if DevTools or other visibility change happens
  @HostListener('document:visibilitychange', [])
  onVisibilityChange() {
    if (document.visibilityState !== 'visible') {
      this.applyBlur();
    }
  }

  private applyBlur() {
    this.renderer.setStyle(this.el.nativeElement, 'filter', 'blur(10px)');
    setTimeout(() => {
      this.renderer.removeStyle(this.el.nativeElement, 'filter');
    }, 2000); // Remove blur after 2 seconds
  }
}
