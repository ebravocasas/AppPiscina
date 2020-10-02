import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarifa } from '../models/tarifa';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.css'],
})
export class TarifasComponent implements OnInit {
  formularioTarifa: FormGroup;
  tarifas: Tarifa[] = new Array<Tarifa>();
  esEditar: boolean = false;
  id: string;
  constructor(private fb: FormBuilder, private db: AngularFirestore, private mensaje: MensajesService) {}

  ngOnInit(): void {
    this.formularioTarifa = this.fb.group({
      nombre: ['', Validators.required],
      coste: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required],
    });

    this.recogerDatos();
  }

  recogerDatos() {
    this.tarifas.length = 0;
    this.db
      .collection<Tarifa>('tarifas')
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

  agregar() {
    this.db
      .collection<Tarifa>('tarifas')
      .add(this.formularioTarifa.value)
      .then(() => {
        this.mensaje.mensajeSuccess('Agregado', 'Se agregó correctamente');
        this.formularioTarifa.reset();
        this.recogerDatos();
      })
      .catch(() => {
        this.mensaje.mensajeError('Error', 'Error al agregar');
      });
    console.log(this.formularioTarifa.value);
  }

  mostrarTarifa(tarifa: Tarifa) {
    this.esEditar = true;
    this.formularioTarifa.setValue({
      nombre: tarifa.nombre,
      coste: tarifa.coste,
      duracion: tarifa.duracion,
      tipoDuracion: tarifa.tipoDuracion,
    });
    this.id = tarifa.id;
  }

  editar() {
    this.db
      .doc('tarifas/' + this.id)
      .update(this.formularioTarifa.value)
      .then(() => {
        this.mensaje.mensajeSuccess('Editado', 'Se editado correctamente');
        this.formularioTarifa.reset();
        this.esEditar = false;
        this.recogerDatos();
      })
      .catch(() => {
        this.mensaje.mensajeError('Error', 'Error al editar');
      });
  }
}
