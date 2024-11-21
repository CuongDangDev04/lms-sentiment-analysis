import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerCategoryAdminComponent } from './manager-category-admin.component';

describe('ManagerCategoryAdminComponent', () => {
  let component: ManagerCategoryAdminComponent;
  let fixture: ComponentFixture<ManagerCategoryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerCategoryAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagerCategoryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
