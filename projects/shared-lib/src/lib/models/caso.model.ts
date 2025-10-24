export interface Documento {
  id: string;
  nombreArchivo: string;
  onlyOfficeKey: string;
  storagePath: string;
}

export interface Caso {
  id: string;
  nuc: string;
  titulo: string;
  fiscalAsignadoId: string;
  estado: 'RECEPCIONADO' | 'REQUIERE_ACUSACION' | 'ACUSADO' | 'ARCHIVADO';
  documentos: Documento[];
}
