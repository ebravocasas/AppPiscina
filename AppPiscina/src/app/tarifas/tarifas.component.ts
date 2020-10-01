import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarifas',
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.css'],
})
export class TarifasComponent implements OnInit {
  formularioTarifa: FormGroup;
  constructor(private fb: FormBuilder, private db: AngularFirestore) {}

  ngOnInit(): void {
    this.formularioTarifa = this.fb.group({
      nombre: ['', Validators.required],
      coste: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required],
    });
  }

  agregar() {
    this.db
      .collection('tarifas')
      .add(this.formularioTarifa.value)
      .then(() => {});
    console.log(this.formularioTarifa.value);
  }
  //6:51 - Mergear servicio de mensajes
}
