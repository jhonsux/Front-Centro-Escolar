import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaJustificantesComponent } from './lista-justificantes.component';

describe('ListaJustificantesComponent', () => {
  let component: ListaJustificantesComponent;
  let fixture: ComponentFixture<ListaJustificantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaJustificantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaJustificantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
