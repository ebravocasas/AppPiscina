import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './error404/error404.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { AppComponent } from './app.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';


const routes: Routes = [
  { path: 'listado-clientes', component: ListadoClientesComponent },
  { path: 'agregar-cliente', component: AgregarClienteComponent }
  /*{ path: '**', component: Error404Component }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
