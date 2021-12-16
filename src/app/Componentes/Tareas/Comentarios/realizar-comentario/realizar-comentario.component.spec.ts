import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarComentarioComponent } from './realizar-comentario.component';

describe('RealizarComentarioComponent', () => {
  let component: RealizarComentarioComponent;
  let fixture: ComponentFixture<RealizarComentarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealizarComentarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealizarComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
