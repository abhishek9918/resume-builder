import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeDownlaodComponent } from './resume-downlaod.component';

describe('ResumeDownlaodComponent', () => {
  let component: ResumeDownlaodComponent;
  let fixture: ComponentFixture<ResumeDownlaodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeDownlaodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeDownlaodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
