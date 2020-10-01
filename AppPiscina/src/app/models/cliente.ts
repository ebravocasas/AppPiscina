import { DocumentReference } from '@angular/fire/firestore';

export class Cliente {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  dni: string;
  imagen: string;
  telefono: number;
  fechaNacimiento: Date;
  ref: DocumentReference;
  visible: boolean;
  constructor() {}
}
