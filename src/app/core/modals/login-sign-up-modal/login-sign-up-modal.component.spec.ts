import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignUpModalComponent } from './login-sign-up-modal.component';

describe('LoginSignUpModalComponent', () => {
  let component: LoginSignUpModalComponent;
  let fixture: ComponentFixture<LoginSignUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSignUpModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSignUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
