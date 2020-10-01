import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup;
  datosCorrectos: boolean = true;
  textoError: string = '';
  constructor(
    private fb: FormBuilder,
    public auth: AngularFireAuth,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formularioLogin = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.formularioLogin.valid) {
      this.datosCorrectos = true;
      this.spinner.show();
      this.auth
        .signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password)
        .then((usuario) => {
          console.log(usuario);
          this.spinner.hide();
          this.router.navigate(['/listado-clientes']);
        })
        .catch((error) => {
          this.datosCorrectos = false;
          this.textoError = error.message;
          this.spinner.hide();
        });
    } else {
      this.datosCorrectos = false;
      this.textoError = 'Por favor, revise que los datos introducidos son correctos';
    }
  }
}
