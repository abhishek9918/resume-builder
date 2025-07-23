// blur.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlurService {
  private blurState = new BehaviorSubject<boolean>(false);
  blurState$ = this.blurState.asObservable();

  enableBlur() {
    this.blurState.next(true);
  }

  disableBlur() {
    this.blurState.next(false);
  }
}
