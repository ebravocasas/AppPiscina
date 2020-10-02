import { DocumentReference } from '@angular/fire/firestore';

export class Inscripcion {
  fecha: Date;
  fechaFinalizacion: Date;
  cliente: DocumentReference;
  tarifas: DocumentReference;
  subTotal: number;
  iva: number;
  total: number;
  constructor() {
    this.fecha = null;
    this.fechaFinalizacion = null;
    this.cliente = this.cliente;
    this.tarifas = this.tarifas;
    this.subTotal = this.subTotal;
    this.iva = this.iva;
    this.total = this.total;
  }

  validacion(): any {
    let response = {
      valido: false,
      mensaje: '',
    };
    if (this.cliente == null || this.cliente == undefined) {
      response.valido = false;
      response.mensaje = 'No hay cliente seleccionado';
      return response;
    }
    if (this.tarifas == null || this.tarifas == undefined) {
      response.valido = false;
      response.mensaje = 'No hay tarifa seleccionada';
      return response;
    }
    if (this.fecha == null || this.fecha == undefined) {
      response.valido = false;
      response.mensaje = 'No hay fecha de inicio seleccionada';
      return response;
    }
    if (this.fechaFinalizacion == null || this.fechaFinalizacion == undefined) {
      response.valido = false;
      response.mensaje = 'No hay fecha de finalización seleccionada';
      return response;
    }
    if (this.subTotal == null || this.subTotal == undefined) {
      response.valido = false;
      response.mensaje = 'No hay subtotal calculado';
      return response;
    }
    if (this.iva == null || this.iva == undefined) {
      response.valido = false;
      response.mensaje = 'No hay iva calculado';
      return response;
    }
    if (this.total == null || this.total == undefined) {
      response.valido = false;
      response.mensaje = 'No hay ningún total calculado';
      return response;
    }
    response.valido = true;
    return response;
  }
}
