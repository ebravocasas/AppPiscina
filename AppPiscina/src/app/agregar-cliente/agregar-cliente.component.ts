import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  imagenUrl: string = '';
  editable: boolean = false;
  id: string;
  constructor(
    private fb: FormBuilder, 
    private storage: AngularFireStorage, 
    private db:  AngularFirestore, 
    private activeRoute: ActivatedRoute,
    private mensaje: MensajesService
    ) { }

  ngOnInit(){
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      dni: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imagen:['']
    })

    this.id = this.activeRoute.snapshot.params.clienteID;
    if(this.id != undefined){
      this.editable = true;
      this.db.doc<any>('clientes' + '/' +this.id).valueChanges().subscribe((cliente) =>{
        console.log(cliente)
        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          email: cliente.email,
          dni: cliente.dni,
          fechaNacimiento: new Date(cliente.fechaNacimiento.seconds * 1000).toISOString().substr(0,10),
          telefono: cliente.telefono,
          imagen: ''
        })
        this.imagenUrl = cliente.imagen;
      })
    }
  }

  crear(){
    this.formularioCliente.value.imagen = this.imagenUrl;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    console.log(this.formularioCliente.value);
    this.db.collection('clientes').add(this.formularioCliente.value).then((finalizado) => {
      this.mensaje.mensajeSuccess('Cliente Creado', 'Se ha guardado el cliente en la base de datos correctamente')
    }).catch(()=>{
      this.mensaje.mensajeError('Error','Ha ocurrido un error al crear el cliente');
    })
  }

  editar(){
    this.formularioCliente.value.imagen = this.imagenUrl;
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento);
    this.db.doc('clientes/' + this.id).update(this.formularioCliente.value).then((resultado) =>{
      this.mensaje.mensajeSuccess('Cliente Editado', 'Se ha editado el cliente correctamente')
    }).catch(()=>{
      this.mensaje.mensajeError('Error','Ha ocurrido un error al editar el cliente');
    })
  }

  subirArchivo(event){
    if(event.target.files.length > 0){
      let nombre = new Date().getTime().toString()
      let archivo = event.target.files[0]
      let formato = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))
      let archivoRuta = 'clientes/' + nombre + formato;
      let ref = this.storage.ref(archivoRuta)
      let subida = ref.put(archivo)
      subida.then((objeto) => {
        console.log("Archivo subido con éxito");

        ref.getDownloadURL().subscribe((url) => {
          this.imagenUrl = url;
        })
      });
      subida.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeSubida = parseInt(porcentaje.toString())
      })
    }
    
    
  }

}
