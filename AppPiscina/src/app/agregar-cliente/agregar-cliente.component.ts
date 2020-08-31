import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  imagenUrl: string = '';
  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private db:  AngularFirestore) { }

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
      imagen:['', Validators.required]
    })
  }

  crear(){
    this.formularioCliente.value.imagen = this.imagenUrl
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)
    console.log(this.formularioCliente.value);
    this.db.collection('clientes').add(this.formularioCliente.value).then((finalizado) => {
      console.log('Registro creado en la BBDD')
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
