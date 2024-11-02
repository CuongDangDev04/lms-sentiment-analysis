import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCoursesAdminComponent } from './manager-courses-admin.component';

describe('ManagerCoursesAdminComponent', () => {
  let component: ManagerCoursesAdminComponent;
  let fixture: ComponentFixture<ManagerCoursesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerCoursesAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerCoursesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
