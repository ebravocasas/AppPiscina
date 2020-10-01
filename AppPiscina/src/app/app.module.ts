import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { Error404Component } from './error404/error404.component';
import { MensajesService } from './services/mensajes.service'

/*Import de Bootstrap*/ 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

/*Import de Firebase*/
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { AngularFireStorageModule } from '@angular/fire/storage';

/*Import del loading*/ 
import { NgxSpinnerModule } from "ngx-spinner";
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { TarifasComponent } from './tarifas/tarifas.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { SeleccionClienteComponent } from './seleccion-cliente/seleccion-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    Error404Component,
    LoginComponent,
    EncabezadoComponent,
    ListadoClientesComponent,
    AgregarClienteComponent,
    TarifasComponent,
    InscripcionComponent,
    SeleccionClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule,
    ProgressbarModule.forRoot(),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    MensajesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
