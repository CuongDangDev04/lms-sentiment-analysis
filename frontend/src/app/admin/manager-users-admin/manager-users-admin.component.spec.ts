import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerUsersAdminComponent } from './manager-users-admin.component';

describe('ManagerUsersAdminComponent', () => {
  let component: ManagerUsersAdminComponent;
  let fixture: ComponentFixture<ManagerUsersAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerUsersAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerUsersAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
