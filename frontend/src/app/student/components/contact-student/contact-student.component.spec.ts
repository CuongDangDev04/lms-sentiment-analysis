import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactStudentComponent } from './contact-student.component';

describe('ContactStudentComponent', () => {
  let component: ContactStudentComponent;
  let fixture: ComponentFixture<ContactStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
