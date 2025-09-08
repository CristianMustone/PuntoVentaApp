import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoVuelto } from './pago-vuelto';

describe('PagoVuelto', () => {
  let component: PagoVuelto;
  let fixture: ComponentFixture<PagoVuelto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoVuelto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoVuelto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
