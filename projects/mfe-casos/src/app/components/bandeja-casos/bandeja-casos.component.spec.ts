import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandejaCasosComponent } from './bandeja-casos.component';

describe('BandejaCasosComponent', () => {
  let component: BandejaCasosComponent;
  let fixture: ComponentFixture<BandejaCasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandejaCasosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandejaCasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
