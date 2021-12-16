import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarCargosComponent } from './registrar-cargos.component';

describe('RegistrarCargosComponent', () => {
  let component: RegistrarCargosComponent;
  let fixture: ComponentFixture<RegistrarCargosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarCargosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
