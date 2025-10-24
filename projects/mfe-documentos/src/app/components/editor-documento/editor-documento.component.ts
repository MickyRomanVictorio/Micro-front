import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Caso, MessageBusService } from 'shared-lib';
import { DocumentoService, OnlyOfficeConfig } from '../../services/documento.service';

// 1. Importa el módulo del editor
import { DocumentEditorModule, IConfig } from '@onlyoffice/document-editor-angular';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-editor-documento',
  standalone: true,
  imports: [ CommonModule, DocumentEditorModule, MatIcon ],
  templateUrl: './editor-documento.component.html',
  styleUrl: './editor-documento.component.scss'
})
export class EditorDocumentoComponent implements OnInit, OnDestroy {

  private messageBus = inject(MessageBusService);
  private documentoService = inject(DocumentoService);
  private busSubscription: Subscription | undefined;

  // URL del servidor OnlyOffice en Docker
  apiEndpoint = 'http://localhost:8081/';

  // Configuración que se pasará al componente
  editorConfig: IConfig | undefined;

  estaCargando = false;

  casoSeleccionado: Caso | null = null;

  ngOnInit(): void {
    // 3. (Rubro 06) Nos suscribimos al evento del MessageBus
    this.busSubscription = this.messageBus.listen<Caso>('CASO_SELECCIONADO')
      .subscribe(caso => {
        console.log('MFE-DOCUMENTOS recibió el caso:', caso);
        this.casoSeleccionado = caso;
        this.cargarDocumento(caso);
      });
  }

  cargarDocumento(caso: Caso): void {
    if (!caso.documentos || caso.documentos.length === 0) {
      console.error('El caso no tiene documentos para editar');
      this.editorConfig = undefined; // Limpiamos la config anterior
      return;
    }

    this.estaCargando = true;
    this.editorConfig = undefined;

    // 4. (Para este demo, cargamos el *primer* documento del caso)
    const docId = caso.documentos[0].id;

    // 5. Llamamos al servicio de este MFE
    this.documentoService.getConfig(docId).subscribe({
      next: backendConfig => {
        console.log('Configuración recibida del backend:', backendConfig);

        // 6. Armamos la configuración final para el componente de Angular
        this.editorConfig = {
          ...backendConfig,
          document: {
            ...backendConfig.document,
            permissions: {
              edit: backendConfig.editorConfig.mode === 'edit',
              review: true
            }
          },
          editorConfig: {
            ...backendConfig.editorConfig,
            customization: {
            }
          },
          height: '100%'
        };
        this.estaCargando = false;
      },
      error: err => {
        console.error('Error al cargar la configuración del documento:', err);
        this.estaCargando = false;
        // Aquí podrías mostrar un mensaje de error al usuario
      }
    });
  }

  ngOnDestroy(): void {
    // Limpiamos la suscripción
    this.busSubscription?.unsubscribe();
  }
}
