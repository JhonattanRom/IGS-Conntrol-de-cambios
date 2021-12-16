import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSucursalComponent } from './registrar-sucursal.component';

describe('RegistrarSucursalComponent', () => {
  let component: RegistrarSucursalComponent;
  let fixture: ComponentFixture<RegistrarSucursalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarSucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
