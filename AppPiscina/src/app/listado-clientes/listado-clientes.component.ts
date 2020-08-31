import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit {
  clientes: any[] = new Array<any>();
  constructor(firestore: AngularFirestore) {
    this
    firestore.collection('clientes').get().subscribe((resultado) => {
      for(let item of resultado.docs){
        let cliente = item.data();
        cliente.id = item.id; //Para asignar el id
        cliente.ref = item.ref;
        this.clientes.push(cliente);
      }

    });
   }

  ngOnInit() {
  }

}
