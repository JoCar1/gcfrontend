import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormorganizativaComponent } from './formorganizativa.component';

describe('FormorganizativaComponent', () => {
  let component: FormorganizativaComponent;
  let fixture: ComponentFixture<FormorganizativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormorganizativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormorganizativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
