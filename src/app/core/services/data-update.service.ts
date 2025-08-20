import { Injectable, signal } from '@angular/core';
import { ApiServiceService } from './api-service.service';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class DataUpdateService {
  private _needsUpdate = signal<boolean>(false);
  needsUpdate = this._needsUpdate.asReadonly();

  // API कॉल की स्थिति ट्रैक करने के लिए एक और Signal
  private _apiStatus = signal<'idle' | 'pending' | 'success' | 'error'>('idle');
  apiStatus = this._apiStatus.asReadonly(); // सिर्फ रीड-ओनली एक्सेस
  constructor(
    private _service: ApiServiceService,
    private _authService: AuthService
  ) {}

  notifyComponentAShouldUpdate() {
    console.log('Service: Notifying Component A that an update is needed.');
    this._needsUpdate.set(true);
  }

  // Component A API कॉल से पहले इसे कॉल करेगा
  setApiPending() {
    this._apiStatus.set('pending');
  }

  // Component A API सक्सेस होने पर इसे कॉल करेगा
  setApiSuccess() {
    this._apiStatus.set('success');
  }

  // Component A API फेल होने पर इसे कॉल करेगा
  setApiError() {
    this._apiStatus.set('error');
  }

  // Component A जब API प्रोसेस कर ले तो इस सिग्नल को रीसेट करे
  resetUpdateAndStatus() {
    this._needsUpdate.set(false);
    this._apiStatus.set('idle');
  }
}
