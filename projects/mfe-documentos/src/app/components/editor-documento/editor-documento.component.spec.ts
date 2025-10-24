import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorDocumentoComponent } from './editor-documento.component';

describe('EditorDocumentoComponent', () => {
  let component: EditorDocumentoComponent;
  let fixture: ComponentFixture<EditorDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorDocumentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
