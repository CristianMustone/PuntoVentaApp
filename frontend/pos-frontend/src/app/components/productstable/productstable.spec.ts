import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productstable } from './productstable';

describe('Productstable', () => {
  let component: Productstable;
  let fixture: ComponentFixture<Productstable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productstable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productstable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
