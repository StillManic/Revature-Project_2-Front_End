import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinhistoryComponent } from './vinhistory.component';

describe('VinhistoryComponent', () => {
  let component: VinhistoryComponent;
  let fixture: ComponentFixture<VinhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VinhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VinhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
