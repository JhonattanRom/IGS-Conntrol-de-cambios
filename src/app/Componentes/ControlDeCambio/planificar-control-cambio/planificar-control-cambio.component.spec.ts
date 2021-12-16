import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificarControlCambioComponent } from './planificar-control-cambio.component';

describe('PlanificarControlCambioComponent', () => {
  let component: PlanificarControlCambioComponent;
  let fixture: ComponentFixture<PlanificarControlCambioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanificarControlCambioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanificarControlCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
