import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenverComponent } from './ordenver.component';

describe('OrdenverComponent', () => {
  let component: OrdenverComponent;
  let fixture: ComponentFixture<OrdenverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
