import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTransferPendingComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: AdminTransferPendingComponent;
  let fixture: ComponentFixture<AdminTransferPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTransferPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTransferPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
