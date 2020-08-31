import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  isCollapsed = false;
  usuario: User;
  constructor(public auth: AngularFireAuth) { }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
  }

}
