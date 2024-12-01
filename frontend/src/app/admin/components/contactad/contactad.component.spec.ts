import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactadComponent } from './contactad.component';

describe('ContactadComponent', () => {
  let component: ContactadComponent;
  let fixture: ComponentFixture<ContactadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
