import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css'],
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<any>();
  constructor(
    firestore: AngularFirestore,
    private db: AngularFirestore,
    private router: Router,
    private Mensaje: MensajesService
  ) {
    this;
    firestore
      .collection('clientes')
      .get()
      .subscribe((resultado) => {
        for (let item of resultado.docs) {
          let cliente = item.data();
          cliente.id = item.id; //Para asignar el id
          cliente.ref = item.ref;
          this.clientes.push(cliente);
        }
      });
  }

  ngOnInit() {}

  borrarUsuario(id: string) {
    console.log('Llega');
    this.db
      .collection('clientes')
      .doc(id)
      .delete()
      .then(() => {
        this.Mensaje.mensajeSuccess(
          'Usuario eliminado',
          'Se ha eliminado el usuario en la base de datos correctamente'
        );
      })
      .catch((error) => {
        this.Mensaje.mensajeError('Error', 'Ha ocurrido un error al borrar el usuario');
      });
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}
