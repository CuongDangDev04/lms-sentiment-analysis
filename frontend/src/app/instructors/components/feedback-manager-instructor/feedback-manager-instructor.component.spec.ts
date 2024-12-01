import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackManagerInstructorComponent } from './feedback-manager-instructor.component';

describe('FeedbackManagerInstructorComponent', () => {
  let component: FeedbackManagerInstructorComponent;
  let fixture: ComponentFixture<FeedbackManagerInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackManagerInstructorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackManagerInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
