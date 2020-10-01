import { DocumentReference } from '@angular/fire/firestore';

export class Tarifa {
  id: string;
  nombre: string;
  coste: number;
  duracion: number;
  tipoDuracion: string;
  ref: DocumentReference;
}
