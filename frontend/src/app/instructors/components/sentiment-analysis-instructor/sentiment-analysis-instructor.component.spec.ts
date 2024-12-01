import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentAnalysisInstructorComponent } from './sentiment-analysis-instructor.component';

describe('SentimentAnalysisInstructorComponent', () => {
  let component: SentimentAnalysisInstructorComponent;
  let fixture: ComponentFixture<SentimentAnalysisInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentimentAnalysisInstructorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SentimentAnalysisInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
