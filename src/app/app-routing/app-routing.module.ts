import { NgModule } from '@angular/core';
import { RouterModule,  Route } from '@angular/router';


//import { AppComponent } from './app.component';
import { ListaComponent } from '../Componentes/lista/lista.component';
import { UsuarioComponent } from '../Componentes/usuario/usuario.component';
import { AboutComponent} from '../Componentes/about/about.component';
import { DashboardComponent } from '../Componentes/dashboard/dashboard.component';
import { MainNavComponent } from '../Componentes/main-nav/main-nav.component';


//ControlDeCambio
import {ListarControlComponent} from "../Componentes/ControlDeCambio/listar-control/listar-control.component";
import { SolicitarControlDeCambioComponent } from "../Componentes/ControlDeCambio/solicitar-control-de-cambio/solicitar-control-de-cambio.component";
import { ActualizarBorradorComponent }  from "../Componentes/ControlDeCambio/actualizar-borrador/actualizar-borrador.component";
import { PlanificarControlCambioComponent } from "../Componentes/ControlDeCambio/planificar-control-cambio/planificar-control-cambio.component";
import { ActualizarPlanificacionComponent } from "../Componentes/ControlDeCambio/actualizar-planificacion/actualizar-planificacion.component";


//Guard Auth
import { AuthGuard } from "../Guards/auth.guard";
//import { IdUsuarioGuard } from "../Guards/id-usuario.guard";
//Usuarios
import { SigninComponent } from "../Componentes/signin/signin.component";
import { SignupComponent } from "../Componentes/signup/signup.component";
import { RegisterUserComponent} from '../Componentes/register-user/register-user.component';
import { RegistroUsuariosComponent } from '../Componentes/registro-usuarios/registro-usuarios.component';
import { ListarUsuariosComponent } from "../Componentes/Usuarios/listar-usuarios/listar-usuarios.component";
import { DatosUsuarioComponent } from "../Componentes/Usuarios/datos-usuario/datos-usuario.component";
import  { PerfilUsuarioComponent } from "../Componentes/Usuarios/perfil-usuario/perfil-usuario.component";


//Servicios
import { RegistrarServiciosComponent } from '../Componentes/Servicios/registrar-servicios/registrar-servicios.component';
import { ListarServiciosComponent } from '../Componentes/Servicios/listar-servicios/listar-servicios.component';
import { DatosServicioComponent } from "../Componentes/Servicios/datos-servicio/datos-servicio.component"
//Cargos
import { RegistrarCargosComponent } from "../Componentes/Cargos/registrar-cargos/registrar-cargos.component";
import { DatosCargoComponent } from "../Componentes/Cargos/datos-cargo/datos-cargo.component";
import { ListarCargosComponent} from "../Componentes/Cargos/listar-cargos/listar-cargos.component";

//Clientes
//Empresa
import { DatosEmpresaComponent } from "../Componentes/Clientes/Empresa/datos-empresa/datos-empresa.component";
import { ListarEmpresasComponent } from "../Componentes/Clientes/Empresa/listar-empresas/listar-empresas.component";
import { RegistrarEmpresasComponent } from "../Componentes/Clientes/Empresa/registrar-empresas/registrar-empresas.component";
//Sucursal
import { RegistrarSucursalComponent } from "../Componentes/Clientes/Sucursal/registrar-sucursal/registrar-sucursal.component";
import { ActualizarSucursalComponent } from "../Componentes/Clientes/Sucursal/actualizar-sucursal/actualizar-sucursal.component";
//Tareas
import { ListarTareasComponent } from "../Componentes/Tareas/Tareas/listar-tareas/listar-tareas.component";
import { ActualizarTareaComponent } from "../Componentes/Tareas/Tareas/actualizar-tarea/actualizar-tarea.component";
import { RegistrarTareasComponent } from "../Componentes/Tareas/Tareas/registrar-tareas/registrar-tareas.component";
import { ListarTareasPersonalComponent } from "../Componentes/Tareas/Tareas/listar-tareas-personal/listar-tareas-personal.component";

//Comentarios
import { ListarComentariosComponent } from "../Componentes/Tareas/Comentarios/listar-comentarios/listar-comentarios.component";
import { RealizarComentarioComponent } from "../Componentes/Tareas/Comentarios/realizar-comentario/realizar-comentario.component";
//Reportes
import { SolicitarReporteComponent } from "../Componentes/Reportes/solicitar-reporte/solicitar-reporte.component";


//import { } from "";
const routes: Route[] = [
  {path: 'Home' , 
  component: MainNavComponent, 
  canActivate: [AuthGuard],
  children: [
    {path: 'About', component: AboutComponent},
    {path: 'Resumen', component: DashboardComponent },
    {path: 'RegistrarUsuario', component: SignupComponent  },
    {path: 'PerfilUsuario', component: PerfilUsuarioComponent  },
    {path: 'RegistrarServicio', component: RegistrarServiciosComponent },
    {path: 'ListarServicios', component: ListarServiciosComponent },
    {path: 'DatosServicios/:id', component: DatosServicioComponent },
    {path: "RegistrarCargos",  component: RegistrarCargosComponent },
    {path: "ListarCargos",  component: ListarCargosComponent },
    {path: "DatosCargo/:id",  component: DatosCargoComponent },
    {path: "RegistrarEmpresa", component: RegistrarEmpresasComponent },
    {path: "ListarEmpresas", component: ListarEmpresasComponent },
    {path: "DatosEmpresa/:id", component: DatosEmpresaComponent },
    {path: "ListarUsuarios", component: ListarUsuariosComponent },
    {path: "DatosUsuario/:id", component: DatosUsuarioComponent },
    
    {path: 'ListarControlDeCambios', component: ListarControlComponent },
    {path: 'SolicitarControlDeCambios', component: SolicitarControlDeCambioComponent },
    {path: 'ActualizarBorrador/:id', component: ActualizarBorradorComponent },
    {path: 'PlanificarControlDeCambio/:id', component: PlanificarControlCambioComponent },
    {path: 'ActualizarPlanificacion/:id', component: ActualizarPlanificacionComponent },
        
    {path: 'RegistrarSucursal/:id', component: RegistrarSucursalComponent },
    {path: 'ActualizarSucursal/:id', component: ActualizarSucursalComponent },

    {path: 'ListarTareas/ControlCambio/:id', component: ListarTareasComponent },
    {path: 'ListarTareasPersonal/ControlCambio/:idPersonal/:id', component: ListarTareasPersonalComponent },
    {path: 'ActualizarTarea/ControlCambio/:id', component: ActualizarTareaComponent },
    {path: 'RegistrarTarea/ControlCambio/:id', component: RegistrarTareasComponent },

    {path: 'Comentarios/Tarea/:id', component: ListarComentariosComponent },
    {path: 'RegistrarComentario/ControlCambio/:id', component: RealizarComentarioComponent },

    {path: 'Reportes', component: SolicitarReporteComponent },
  ],
  },
  {
    path: '' , 
    component: SigninComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
 
export class AppRoutingModule {}