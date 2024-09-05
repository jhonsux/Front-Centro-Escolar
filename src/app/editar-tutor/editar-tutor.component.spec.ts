import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTutorComponent } from './editar-tutor.component';

describe('EditarTutorComponent', () => {
  let component: EditarTutorComponent;
  let fixture: ComponentFixture<EditarTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTutorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
