import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderLectureComponent } from './header-lecture.component';

describe('HeaderLectureComponent', () => {
  let component: HeaderLectureComponent;
  let fixture: ComponentFixture<HeaderLectureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLectureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
