import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarComentariosComponent } from './listar-comentarios.component';

describe('ListarComentariosComponent', () => {
  let component: ListarComentariosComponent;
  let fixture: ComponentFixture<ListarComentariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarComentariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
