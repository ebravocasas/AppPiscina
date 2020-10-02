import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inscripcion } from '../models/inscripcion';

@Component({
  selector: 'app-listado-inscripciones',
  templateUrl: './listado-inscripciones.component.html',
  styleUrls: ['./listado-inscripciones.component.css'],
})
export class ListadoInscripcionesComponent implements OnInit {
  inscripciones: any[] = [];
  contador: number = 0;
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.inscripciones.length = 0;
    this.db
      .collection('inscripciones')
      .get()
      .subscribe((result) => {
        result.forEach((inscripcion) => {
          let ins = inscripcion.data();
          ins.id = inscripcion.id;
          this.db
            .doc(inscripcion.data().cliente.path)
            .get()
            .subscribe((cliente) => {
              ins.clienteIns = cliente.data();
              ins.fecha = new Date(ins.fecha.seconds * 1000);
              ins.fechaFinalizacion = new Date(ins.fechaFinalizacion.seconds * 1000);
              this.inscripciones.push(ins);
            });
        });
      });
  }
}
