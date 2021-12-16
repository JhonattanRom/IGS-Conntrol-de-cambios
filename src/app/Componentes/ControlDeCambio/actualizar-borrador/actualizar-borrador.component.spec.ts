import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarBorradorComponent } from './actualizar-borrador.component';

describe('ActualizarBorradorComponent', () => {
  let component: ActualizarBorradorComponent;
  let fixture: ComponentFixture<ActualizarBorradorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActualizarBorradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarBorradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
