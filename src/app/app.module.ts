import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule, Routes, Route } from '@angular/router';


import { AppComponent } from './app.component';
import { ListaComponent } from './Componentes/lista/lista.component';
import { UsuarioComponent } from './Componentes/usuario/usuario.component';
import {AboutComponent} from './Componentes/about/about.component';
import { DashboardComponent } from './Componentes/dashboard/dashboard.component';
import { MainNavComponent } from './Componentes/main-nav/main-nav.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
// Auth
import { AuthGuard } from "./Guards/auth.guard";
import { AuthService } from "./Service/auth.service";
import { TokenInterceptorService } from "./Service/token-interceptor.service";
//Graficas
import { ChartsModule } from "ng2-charts";

//ControlDeCambios
import { ListarControlComponent } from "./Componentes/ControlDeCambio/listar-control/listar-control.component";
import { SolicitarControlDeCambioComponent } from "./Componentes/ControlDeCambio/solicitar-control-de-cambio/solicitar-control-de-cambio.component";
import { ActualizarBorradorComponent} from "./Componentes/ControlDeCambio/actualizar-borrador/actualizar-borrador.component";
import { PlanificarControlCambioComponent } from "./Componentes/ControlDeCambio/planificar-control-cambio/planificar-control-cambio.component";
import { ActualizarPlanificacionComponent } from "./Componentes/ControlDeCambio/actualizar-planificacion/actualizar-planificacion.component";

//Usuarios
import { SigninComponent } from "./Componentes/signin/signin.component";
import { SignupComponent } from "./Componentes/signup/signup.component";
import {RegisterUserComponent} from './Componentes/register-user/register-user.component';
import  { PerfilUsuarioComponent } from "./Componentes/Usuarios/perfil-usuario/perfil-usuario.component";
import { RegistroUsuariosComponent } from './Componentes/registro-usuarios/registro-usuarios.component';
import { ListarUsuariosComponent } from "./Componentes/Usuarios/listar-usuarios/listar-usuarios.component";
import { DatosUsuarioComponent } from "./Componentes/Usuarios/datos-usuario/datos-usuario.component";

//Servicios
import { RegistrarServiciosComponent } from './Componentes/Servicios/registrar-servicios/registrar-servicios.component'; 
import { ListarServiciosComponent} from './Componentes/Servicios/listar-servicios/listar-servicios.component'; 
import { DatosServicioComponent } from "./Componentes/Servicios/datos-servicio/datos-servicio.component"
//Cargos
import { RegistrarCargosComponent } from "./Componentes/Cargos/registrar-cargos/registrar-cargos.component";
import { DatosCargoComponent } from "./Componentes/Cargos/datos-cargo/datos-cargo.component";
import { ListarCargosComponent} from "./Componentes/Cargos/listar-cargos/listar-cargos.component";
//Clientes
//Empresa
import { DatosEmpresaComponent } from "./Componentes/Clientes/Empresa/datos-empresa/datos-empresa.component";
import { ListarEmpresasComponent } from "./Componentes/Clientes/Empresa/listar-empresas/listar-empresas.component";
import { RegistrarEmpresasComponent } from "./Componentes/Clientes/Empresa/registrar-empresas/registrar-empresas.component";
//Sucursal
import { RegistrarSucursalComponent } from "./Componentes/Clientes/Sucursal/registrar-sucursal/registrar-sucursal.component";
import { ActualizarSucursalComponent } from "./Componentes/Clientes/Sucursal/actualizar-sucursal/actualizar-sucursal.component";

//Tareas
import { ListarTareasComponent } from "./Componentes/Tareas/Tareas/listar-tareas/listar-tareas.component";
import { ActualizarTareaComponent } from "./Componentes/Tareas/Tareas/actualizar-tarea/actualizar-tarea.component";
import { RegistrarTareasComponent } from "./Componentes/Tareas/Tareas/registrar-tareas/registrar-tareas.component";
import { ListarTareasPersonalComponent } from "./Componentes/Tareas/Tareas/listar-tareas-personal/listar-tareas-personal.component";

//Comentarios
import { ListarComentariosComponent } from "./Componentes/Tareas/Comentarios/listar-comentarios/listar-comentarios.component";
import { RealizarComentarioComponent } from "./Componentes/Tareas/Comentarios/realizar-comentario/realizar-comentario.component";
//Reportes
import { SolicitarReporteComponent } from "./Componentes/Reportes/solicitar-reporte/solicitar-reporte.component";

//
import { DataService } from './Service/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './app.material.module';

//Rutas
import { AppRoutingModule } from './app-routing/app-routing.module';



import { ToastrModule } from 'ngx-toastr';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  declarations: [
    AppComponent,
    ListaComponent,
    UsuarioComponent,
    AboutComponent,
    DashboardComponent,
    MainNavComponent,
    RegisterUserComponent,
    RegistroUsuariosComponent,
    RegistrarServiciosComponent,
    ListarServiciosComponent,
    DatosServicioComponent,
    RegistrarCargosComponent,
    DatosCargoComponent,
    ListarCargosComponent,
    DatosEmpresaComponent,
    ListarEmpresasComponent,
    RegistrarEmpresasComponent,
    SigninComponent,
    SignupComponent,
    ListarUsuariosComponent,
    DatosUsuarioComponent,
    PerfilUsuarioComponent,
    ListarControlComponent,
    SolicitarControlDeCambioComponent,
    ActualizarBorradorComponent,
    PlanificarControlCambioComponent,
    RegistrarSucursalComponent,
    ActualizarSucursalComponent,
    ListarTareasComponent,
    ActualizarTareaComponent,
    RegistrarTareasComponent,
    ListarComentariosComponent,
    RealizarComentarioComponent,
    SolicitarReporteComponent,
    ListarTareasPersonalComponent,
    ActualizarPlanificacionComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    DragDropModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot(),
    ToastrModule.forRoot() ,
    ChartsModule
  ],
  providers: [
  DataService,
  AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
