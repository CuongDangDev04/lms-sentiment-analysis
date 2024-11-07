import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackManagerAdminComponent } from './feedback-manager-admin.component';

describe('FeedbackManagerAdminComponent', () => {
  let component: FeedbackManagerAdminComponent;
  let fixture: ComponentFixture<FeedbackManagerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackManagerAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FeedbackManagerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
