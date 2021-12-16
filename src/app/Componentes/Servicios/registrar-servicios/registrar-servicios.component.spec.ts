import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarServiciosComponent } from './registrar-servicios.component';

describe('RegistrarServiciosComponent', () => {
  let component: RegistrarServiciosComponent;
  let fixture: ComponentFixture<RegistrarServiciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
