import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-seleccion-cliente',
  templateUrl: './seleccion-cliente.component.html',
  styleUrls: ['./seleccion-cliente.component.css'],
})
export class SeleccionClienteComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>();
  @Input('nombre') nombre: string;
  @Output('clienteSeleccionado') clienteSeleccionado = new EventEmitter();
  @Output('clienteCancelado') clienteCancelado = new EventEmitter();
  constructor(private db: AngularFirestore) {}

  ngOnInit(): void {
    this.db
      .collection<any>('clientes')
      .get()
      .subscribe((result) => {
        this.clientes.length = 0;
        result.docs.forEach((item) => {
          let cliente: any = item.data();
          cliente.id = item.id;
          cliente.ref = item.ref;
          cliente.visible = false;
          this.clientes.push(cliente);
        });
      });
  }

  buscador(nombre: string) {
    this.clientes.forEach((cliente) => {
      if (cliente.nombre.toLowerCase().includes(nombre.toLowerCase())) {
        cliente.visible = true;
      } else {
        cliente.visible = false;
      }
    });
  }

  seleccionar(cliente: Cliente) {
    this.nombre = cliente.nombre + ' ' + cliente.apellido;
    this.clientes.forEach((cliente) => {
      cliente.visible = false;
    });
    this.clienteSeleccionado.emit(cliente);
  }

  cancelar() {
    this.nombre = undefined;
    this.clienteCancelado.emit();
  }
}
