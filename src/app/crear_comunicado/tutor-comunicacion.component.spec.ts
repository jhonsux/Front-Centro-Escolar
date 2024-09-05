import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorComunicacionComponent } from './tutor-comunicacion.component';

describe('TutorComunicacionComponent', () => {
  let component: TutorComunicacionComponent;
  let fixture: ComponentFixture<TutorComunicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorComunicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorComunicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
