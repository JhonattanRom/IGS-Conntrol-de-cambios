import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCargoComponent } from './datos-cargo.component';

describe('DatosCargoComponent', () => {
  let component: DatosCargoComponent;
  let fixture: ComponentFixture<DatosCargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosCargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
