import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRtfComponent } from './admin-rtf.component';

describe('AdminRtfComponent', () => {
  let component: AdminRtfComponent;
  let fixture: ComponentFixture<AdminRtfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRtfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRtfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
