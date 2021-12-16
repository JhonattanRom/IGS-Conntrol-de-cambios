import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTareasPersonalComponent } from './listar-tareas-personal.component';

describe('ListarTareasPersonalComponent', () => {
  let component: ListarTareasPersonalComponent;
  let fixture: ComponentFixture<ListarTareasPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTareasPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTareasPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
