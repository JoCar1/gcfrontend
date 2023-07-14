import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsocioComponent } from './formsocio.component';

describe('FormsocioComponent', () => {
  let component: FormsocioComponent;
  let fixture: ComponentFixture<FormsocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
