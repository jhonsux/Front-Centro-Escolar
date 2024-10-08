import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaComunicadosComponent } from './lista-comunicados.component';

describe('ListaComunicadosComponent', () => {
  let component: ListaComunicadosComponent;
  let fixture: ComponentFixture<ListaComunicadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaComunicadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaComunicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
