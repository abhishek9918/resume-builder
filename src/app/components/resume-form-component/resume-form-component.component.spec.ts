import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeFormComponentComponent } from './resume-form-component.component';

describe('ResumeFormComponentComponent', () => {
  let component: ResumeFormComponentComponent;
  let fixture: ComponentFixture<ResumeFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
