import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorContratosComponent } from './proveedor-contratos.component';

describe('ProveedorContratosComponent', () => {
  let component: ProveedorContratosComponent;
  let fixture: ComponentFixture<ProveedorContratosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorContratosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
