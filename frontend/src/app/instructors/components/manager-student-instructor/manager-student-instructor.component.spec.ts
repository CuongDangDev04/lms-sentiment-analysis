import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerStudentInstructorComponent } from './manager-student-instructor.component';

describe('ManagerStudentInstructorComponent', () => {
  let component: ManagerStudentInstructorComponent;
  let fixture: ComponentFixture<ManagerStudentInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerStudentInstructorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerStudentInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
