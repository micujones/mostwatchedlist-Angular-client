import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpateComponent } from './user-upate.component';

describe('UserUpateComponent', () => {
  let component: UserUpateComponent;
  let fixture: ComponentFixture<UserUpateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserUpateComponent]
    });
    fixture = TestBed.createComponent(UserUpateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
