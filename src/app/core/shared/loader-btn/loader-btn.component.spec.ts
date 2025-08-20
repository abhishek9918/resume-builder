import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderBtnComponent } from './loader-btn.component';

describe('LoaderBtnComponent', () => {
  let component: LoaderBtnComponent;
  let fixture: ComponentFixture<LoaderBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
