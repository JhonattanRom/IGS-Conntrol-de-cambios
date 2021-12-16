import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarSucursalComponent } from './actualizar-sucursal.component';

describe('ActualizarSucursalComponent', () => {
  let component: ActualizarSucursalComponent;
  let fixture: ComponentFixture<ActualizarSucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarSucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
