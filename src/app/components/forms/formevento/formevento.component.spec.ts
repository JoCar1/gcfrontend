import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormeventoComponent } from './formevento.component';

describe('FormeventoComponent', () => {
  let component: FormeventoComponent;
  let fixture: ComponentFixture<FormeventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormeventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormeventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
