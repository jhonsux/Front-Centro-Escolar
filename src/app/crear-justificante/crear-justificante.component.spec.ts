import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearJustificanteComponent } from './crear-justificante.component';

describe('CrearJustificanteComponent', () => {
  let component: CrearJustificanteComponent;
  let fixture: ComponentFixture<CrearJustificanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearJustificanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearJustificanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
