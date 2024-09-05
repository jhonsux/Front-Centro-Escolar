import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTutoresComponent } from './lista-tutores.component';

describe('ListaTutoresComponent', () => {
  let component: ListaTutoresComponent;
  let fixture: ComponentFixture<ListaTutoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTutoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTutoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
