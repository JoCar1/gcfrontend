import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcategoriaComponent } from './formcategoria.component';

describe('FormcategoriaComponent', () => {
  let component: FormcategoriaComponent;
  let fixture: ComponentFixture<FormcategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormcategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
