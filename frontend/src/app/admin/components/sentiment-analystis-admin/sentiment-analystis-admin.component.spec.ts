import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimentAnalystisAdminComponent } from './sentiment-analystis-admin.component';

describe('SentimentAnalystisAdminComponent', () => {
  let component: SentimentAnalystisAdminComponent;
  let fixture: ComponentFixture<SentimentAnalystisAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentimentAnalystisAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SentimentAnalystisAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
