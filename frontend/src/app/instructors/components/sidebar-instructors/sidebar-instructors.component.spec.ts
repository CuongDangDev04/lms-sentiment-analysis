import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarInstructorsComponent } from './sidebar-instructors.component';

describe('SidebarInstructorsComponent', () => {
  let component: SidebarInstructorsComponent;
  let fixture: ComponentFixture<SidebarInstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarInstructorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarInstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
