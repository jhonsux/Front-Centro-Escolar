import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTutorComponent } from './crear-tutor.component';

describe('CrearTutorComponent', () => {
  let component: CrearTutorComponent;
  let fixture: ComponentFixture<CrearTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
