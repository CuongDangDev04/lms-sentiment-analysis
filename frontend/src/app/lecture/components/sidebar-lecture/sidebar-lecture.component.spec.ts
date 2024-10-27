import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarLectureComponent } from './sidebar-lecture.component';

describe('SidebarLectureComponent', () => {
  let component: SidebarLectureComponent;
  let fixture: ComponentFixture<SidebarLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarLectureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
