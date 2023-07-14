import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoverComponent } from './contratover.component';

describe('ContratoverComponent', () => {
  let component: ContratoverComponent;
  let fixture: ComponentFixture<ContratoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
