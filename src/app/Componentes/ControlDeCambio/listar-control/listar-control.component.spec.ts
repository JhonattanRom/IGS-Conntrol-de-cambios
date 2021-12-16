import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarControlComponent } from './listar-control.component';

describe('ListarControlComponent', () => {
  let component: ListarControlComponent;
  let fixture: ComponentFixture<ListarControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
