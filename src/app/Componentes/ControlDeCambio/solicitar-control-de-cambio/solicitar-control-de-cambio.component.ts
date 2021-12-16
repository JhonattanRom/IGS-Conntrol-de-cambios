import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators }  from '@angular/forms';
import { Router }                   from '@angular/router';
import { Location }                 from '@angular/common';
//Clases
import { ControlDeCambio }          from "../../../Class/ControlDeCambio";
import { Usuario }                  from "../../../Class/usuario"; 
//Servicios
import { AuthService }              from "../../../Service/auth.service";
import { ControlCambioService }     from '../../../Service/control-cambio.service';
import { PrioridadesService }       from "../../../Service/prioridades.service";
import { ServiciosService }         from "../../../Service/servicios.service";
//Otros
import { ToastrService }            from 'ngx-toastr';
import * as moment                  from 'moment';

@Component({
  selector: 'app-solicitar-control-de-cambio',
  templateUrl: './solicitar-control-de-cambio.component.html',
  styleUrls: ['./solicitar-control-de-cambio.component.css']
})
export class SolicitarControlDeCambioComponent implements OnInit{
    FechaActual = moment().format('MM/DD/YYYY');
    //formato = moment(this.FechaActual, 'MM/DD/YYYY' );
    minDate = new Date(2000, 0, 1);
    maxDate = new Date(this.FechaActual);
    usuario = new Usuario;
    controlCambio;
    prioridades = [];
    servicios = [];
    Formateado;

    Id_prioridad = new FormControl('', [Validators.required]);
    Id_servicio_app = new FormControl('', [Validators.required]);
    Nombre_Control_Cambio = new FormControl("", [Validators.required, Validators.maxLength(20)]);
    Descripcion_Control_Cambio = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    Fecha_Solicitud = new FormControl('', [Validators.required]);
    constructor(private controlCambioService: ControlCambioService,
                private location: Location,
                private toastr: ToastrService,
                private router: Router,
                private prioridadesService: PrioridadesService,
                private serviciosService: ServiciosService,
                private authService: AuthService){}
    
    ngOnInit() {
      this.getPrioridades();
      this.getServicios();
      this.decodeToken();
      console.log(this.FechaActual, "Esta es la fecha");
    }
    showSuccess() {
    this.toastr.success('Registro exitoso', 'Control de cambio solicitado', {
      progressBar: true
    });
    }
    showError(msgError: string) {
    this.toastr.error(msgError ,'Error en el registro',{
      progressBar: true
    });
  }
//Funcion para el btn y solicitar el control de cambio.
    private Solicitar(){
      if (this.Id_prioridad.value == '' || this.Id_servicio_app.value == ''||
       this.Nombre_Control_Cambio.value == ''|| this.Descripcion_Control_Cambio.value == ''){
       this.showError("Complete todos los campos");
       this.Formateado = "";
    }else if ((this.Id_prioridad.invalid) || (this.Id_servicio_app.invalid ) ||
              (this.Nombre_Control_Cambio.invalid) || (this.Descripcion_Control_Cambio.invalid )){
       this.showError("Siga las indicaciones del formulario");
       
    }else{
    this.controlCambio = {
        Prioridad_CC: this.Id_prioridad.value,
        Id_servicio: this.Id_servicio_app.value,
        Nombre_Control_Cambio: this.Nombre_Control_Cambio.value,
        Descripcion_Control_Cambio:this.Descripcion_Control_Cambio.value,
        Id_solicitante: this.usuario.Id_Usuario,
        Fecha_Solicitud: this.Fecha_Solicitud.value
    }  
    console.log(this.controlCambio, "Data cc");
          return this.controlCambioService.addControlDeCambio(this.controlCambio)
           .subscribe( async res => {
             this.showSuccess()
             this.router.navigate(['/Home/ListarControlDeCambios']); 
          }, err => {
          console.log(err);
          });
    }


      
    }

//Funcion para traer todos los niveles de prioridad de bd.
    getPrioridades(){
      return this.prioridadesService.getPrioridades()
        .subscribe(
            prioridades => {
              console.log(prioridades);
              this.prioridades = prioridades;
            });
    }

//Funcion para traer todos los servicios que presta la empresa.
    getServicios(){
      return this.serviciosService.getServicios()
        .subscribe(
            servicios => {
              console.log(servicios);
              this.servicios = servicios;
            });
    }

//Funcion para hacer el decode al Token del localStorage.
    decodeToken(){
    this.usuario = this.authService.decodeToken();
    console.log(this.usuario, "Desde aqui");
    }
    //Validaciones Angultar material
 validacionNombreCc() {
    return this.Nombre_Control_Cambio.hasError('required') ? 'Debes indicar el nombre del control de cambio' :
        this.Nombre_Control_Cambio.hasError('maxLength') ? "":'El nombre del cargo debe contener un maximo de 50 caracteres'
  }
  validacionDescripcion(){
     return this.Descripcion_Control_Cambio.hasError('required') ? 'Debes indicar una descipcion del control de cambio' :
        this.Descripcion_Control_Cambio.hasError('maxLength') ? "":'La descripcion del control de cambio debe contener un maximo de 50 caracteres'
  }

}
