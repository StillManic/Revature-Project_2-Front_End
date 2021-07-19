import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompletedWorkorderComponent } from './view-completed-workorder.component';

describe('ViewCompletedWorkorderComponent', () => {
  let component: ViewCompletedWorkorderComponent;
  let fixture: ComponentFixture<ViewCompletedWorkorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCompletedWorkorderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompletedWorkorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
