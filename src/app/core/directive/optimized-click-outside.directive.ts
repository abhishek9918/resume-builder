import {
  Directive,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class OptimizedClickOutsideDirective implements OnInit, OnDestroy {
  @Output() clickOutside = new EventEmitter<void>();

  private clickListener?: (event: Event) => void;

  constructor(private elementRef: ElementRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.clickListener = (event: Event) => {
        const target = event.target as Node;
        const clickedInside = this.elementRef.nativeElement.contains(target);

        if (!clickedInside) {
          this.ngZone.run(() => {
            this.clickOutside.emit();
          });
        }
      };

      document.addEventListener('click', this.clickListener);
      document.addEventListener('touchstart', this.clickListener);
    });
  }

  ngOnDestroy(): void {
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
      document.removeEventListener('touchstart', this.clickListener);
    }
  }
}
