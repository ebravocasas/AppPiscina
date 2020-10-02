import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';
import { Inscripcion } from '../models/inscripcion';
import { Tarifa } from '../models/tarifa';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css'],
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  clienteSeleccionado: Cliente = new Cliente();
  tarifaSeleccionada: Tarifa = new Tarifa();
  idTarifa: string = 'null';
  tarifas: Tarifa[] = new Array<Tarifa>();
  constructor(private db: AngularFirestore, private Mensaje: MensajesService) {}

  ngOnInit(): void {
    this.db
      .collection('tarifas')
      .get()
      .subscribe((result) => {
        result.docs.forEach((resultdata) => {
          let tarifa = resultdata.data() as Tarifa;
          tarifa.id = resultdata.id;
          tarifa.ref = resultdata.ref;
          this.tarifas.push(tarifa);
        });
      });
  }

  asignarCliente(cliente: Cliente) {
    this.inscripcion.cliente = cliente.ref;
    this.clienteSeleccionado = cliente;
  }

  cancelarClienteOutput() {
    this.clienteSeleccionado = new Cliente();
    this.inscripcion.cliente = undefined;
    this.tarifaSeleccionada = new Tarifa();
    this.idTarifa = 'null';
    this.inscripcion.fecha = null;
    this.inscripcion.fechaFinalizacion = null;
    this.inscripcion.tarifas = null;
    this.inscripcion.subTotal = null;
    this.inscripcion.iva = null;
    this.inscripcion.total = null;
  }

  guardar() {
    if (this.inscripcion.validacion().valido) {
      let inscripcionInsert = {
        fecha: this.inscripcion.fecha,
        fechaFinalizacion: this.inscripcion.fechaFinalizacion,
        cliente: this.inscripcion.cliente,
        tarifas: this.inscripcion.tarifas,
        subTotal: this.inscripcion.subTotal,
        iva: this.inscripcion.iva,
        total: this.inscripcion.total,
      };
      this.db
        .collection('inscripciones')
        .add(inscripcionInsert)
        .then((result) => {
          this.inscripcion = new Inscripcion();
          this.clienteSeleccionado = new Cliente();
          this.tarifaSeleccionada = new Tarifa();
          this.idTarifa = 'null';
          this.Mensaje.mensajeSuccess(
            'Inscripción Guardada',
            'Se ha guardado la inscripcion en la base de datos correctamente'
          );
        });
    } else {
      this.Mensaje.mensajeError('Error', this.inscripcion.validacion().mensaje);
    }
  }

  seleccionarTarifa(id: string) {
    if (id != 'null') {
      this.tarifaSeleccionada = this.tarifas.find((x) => x.id == id);
      this.inscripcion.tarifas = this.tarifaSeleccionada.ref;
      this.inscripcion.total = this.tarifaSeleccionada.coste;
      this.inscripcion.iva = this.inscripcion.total * 0.21;
      this.inscripcion.subTotal = this.inscripcion.total - this.inscripcion.iva;

      /*this.inscripcion.subTotal = this.tarifaSeleccionada.coste;
      this.inscripcion.iva = this.inscripcion.subTotal * 0.21;
      this.inscripcion.total = this.inscripcion.subTotal + this.inscripcion.iva; */
      this.inscripcion.fecha = new Date();

      if (this.tarifaSeleccionada.tipoDuracion == 'dia') {
        let dias: number = this.tarifaSeleccionada.duracion;
        let fechaFinalizacion = new Date(
          this.inscripcion.fecha.getFullYear(),
          this.inscripcion.fecha.getMonth(),
          this.inscripcion.fecha.getDate() + dias
        );
        this.inscripcion.fechaFinalizacion = fechaFinalizacion;
      }

      if (this.tarifaSeleccionada.tipoDuracion == 'semana') {
        let dias: number = this.tarifaSeleccionada.duracion * 7;
        let fechaFinalizacion = new Date(
          this.inscripcion.fecha.getFullYear(),
          this.inscripcion.fecha.getMonth(),
          this.inscripcion.fecha.getDate() + dias
        );
        this.inscripcion.fechaFinalizacion = fechaFinalizacion;
      }

      if (this.tarifaSeleccionada.tipoDuracion == 'quincena') {
        let dias: number = this.tarifaSeleccionada.duracion * 15;
        let fechaFinalizacion = new Date(
          this.inscripcion.fecha.getFullYear(),
          this.inscripcion.fecha.getMonth(),
          this.inscripcion.fecha.getDate() + dias
        );
        this.inscripcion.fechaFinalizacion = fechaFinalizacion;
      }

      if (this.tarifaSeleccionada.tipoDuracion == 'mes') {
        let dias: number = this.inscripcion.fecha.getDate();
        let meses: number = this.inscripcion.fecha.getMonth() + this.tarifaSeleccionada.duracion;
        let ano: number = this.inscripcion.fecha.getFullYear();
        let fechaFinalizacion = new Date(ano, meses, dias);
        this.inscripcion.fechaFinalizacion = fechaFinalizacion;
      }

      if (this.tarifaSeleccionada.tipoDuracion == 'ano') {
        let dias: number = this.inscripcion.fecha.getDate();
        let meses: number = this.inscripcion.fecha.getMonth();
        let ano: number = this.inscripcion.fecha.getFullYear() + this.tarifaSeleccionada.duracion;
        let fechaFinalizacion = new Date(ano, meses, dias);
        this.inscripcion.fechaFinalizacion = fechaFinalizacion;
      }
    } else {
      this.tarifaSeleccionada = new Tarifa();
      this.inscripcion.fecha = null;
      this.inscripcion.fechaFinalizacion = null;
      this.inscripcion.tarifas = null;
      this.inscripcion.subTotal = 0;
      this.inscripcion.iva = 0;
      this.inscripcion.total = 0;
    }
  }
}
