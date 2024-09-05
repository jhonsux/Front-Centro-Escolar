import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoTutorComponent } from './alumno-tutor.component';

describe('AlumnoTutorComponent', () => {
  let component: AlumnoTutorComponent;
  let fixture: ComponentFixture<AlumnoTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoTutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnoTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
