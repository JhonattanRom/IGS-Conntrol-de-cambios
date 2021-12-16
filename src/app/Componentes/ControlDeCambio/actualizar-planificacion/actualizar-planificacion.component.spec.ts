import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPlanificacionComponent } from './actualizar-planificacion.component';

describe('ActualizarPlanificacionComponent', () => {
  let component: ActualizarPlanificacionComponent;
  let fixture: ComponentFixture<ActualizarPlanificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarPlanificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarPlanificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
