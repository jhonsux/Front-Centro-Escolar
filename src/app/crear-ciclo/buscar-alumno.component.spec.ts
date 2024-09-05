import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAlumnoComponent } from './buscar-alumno.component';

describe('BuscarAlumnoComponent', () => {
  let component: BuscarAlumnoComponent;
  let fixture: ComponentFixture<BuscarAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
