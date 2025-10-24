import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasosTablaComponent } from './casos-tabla.component';

describe('CasosTablaComponent', () => {
  let component: CasosTablaComponent;
  let fixture: ComponentFixture<CasosTablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasosTablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasosTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
