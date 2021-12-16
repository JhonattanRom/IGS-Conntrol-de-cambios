import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarControlDeCambioComponent } from './solicitar-control-de-cambio.component';

describe('SolicitarControlDeCambioComponent', () => {
  let component: SolicitarControlDeCambioComponent;
  let fixture: ComponentFixture<SolicitarControlDeCambioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitarControlDeCambioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarControlDeCambioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
