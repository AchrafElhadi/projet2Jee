import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccoutnsComponent } from './accoutns.component';

describe('AccoutnsComponent', () => {
  let component: AccoutnsComponent;
  let fixture: ComponentFixture<AccoutnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccoutnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccoutnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
