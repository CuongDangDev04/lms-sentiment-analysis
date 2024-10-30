import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInstructorsComponent } from './header-instructors.component';

describe('HeaderInstructorsComponent', () => {
  let component: HeaderInstructorsComponent;
  let fixture: ComponentFixture<HeaderInstructorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderInstructorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderInstructorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
