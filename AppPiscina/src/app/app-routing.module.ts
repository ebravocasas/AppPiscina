import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AppComponent } from './app.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { TarifasComponent } from './tarifas/tarifas.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { ListadoInscripcionesComponent } from './listado-inscripciones/listado-inscripciones.component';

const routes: Routes = [
  { path: '', redirectTo: 'inscripcion', pathMatch: 'full' },
  { path: 'listado-clientes', component: ListadoClientesComponent },
  { path: 'agregar-cliente', component: AgregarClienteComponent },
  { path: 'agregar-cliente/:clienteID', component: AgregarClienteComponent },
  { path: 'tarifas', component: TarifasComponent },
  { path: 'inscripcion', component: InscripcionComponent },
  { path: 'listado-inscripciones', component: ListadoInscripcionesComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
