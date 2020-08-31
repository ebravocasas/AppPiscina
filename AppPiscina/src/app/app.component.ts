import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppPiscina';
  usuario: User;
  cargando: boolean = true;

  constructor(public auth: AngularFireAuth){
    this.auth.user.subscribe((usuario)=>{
        this.cargando = false;
        this.usuario = usuario; //referencia el usuario que declaramos arriva con el que tenemos en el subscribe
    })
  }
  
}
