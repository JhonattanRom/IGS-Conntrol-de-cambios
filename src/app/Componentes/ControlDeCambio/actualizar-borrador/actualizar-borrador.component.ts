import { Component, OnInit }          from '@angular/core';
import { Router }                     from '@angular/router';
import { Location }                   from '@angular/common';
import { ActivatedRoute, Params }     from '@angular/router';
import { FormControl, Validators }    from '@angular/forms';
//Clases
import { ControlDeCambio }            from '../../../Class/ControlDeCambio';
import { Usuario }                    from "../../../Class/usuario";
import { Prioridad }                  from "../../../Class/prioridad";
import { Servicio }                   from "../../../Class/servicio";
//Servicios
import { AuthService }                from "../../../Service/auth.service";
import { CargosService }              from '../../../Service/cargos.service';
import { ControlCambioService }       from '../../../Service/control-cambio.service';
import { PrioridadesService }         from "../../../Service/prioridades.service";
import { ServiciosService }           from "../../../Service/servicios.service";
//Otros
import { ToastrService }              from 'ngx-toastr';
import * as moment                    from 'moment';

@Component({
  selector: 'app-actualizar-borrador',
  templateUrl: './actualizar-borrador.component.html',
  styleUrls: ['./actualizar-borrador.component.css']
})
export class ActualizarBorradorComponent implements OnInit {
FechaCreacion;
maxDate;
//formato = moment(this.FechaActual, 'MM/DD/YYYY' );
minDate = new Date(2000, 0, 1);
controlCambio = new ControlDeCambio;
prioridades: Prioridad[] = [];
servicios: Servicio[] = [];
Id_prioridad = new FormControl('', [Validators.required]);
Id_servicio_app = new FormControl('', [Validators.required]);

  constructor(  private controlCambioService: ControlCambioService,
                private location: Location,
                private toastr: ToastrService,
                private router: Router,
                private prioridadesService: PrioridadesService,
                private serviciosService: ServiciosService,
                private authService: AuthService,
                private route: ActivatedRoute,) { }

  ngOnInit() {
  	this.getServicios();
  	this.getPrioridades();
  	const id = +this.route.snapshot.paramMap.get("id");
  	this.controlCambioService.getControlCambio(id)
  		.subscribe(control => {
  			this.FechaCreacion = moment(control.createdAt).format('MM/DD/YYYY');
  			console.log(this.FechaCreacion, "Esta es lal fecha");
  			console.log(control.createdAt, "Esta es la fecha desde bd");
			this.maxDate = new Date(this.FechaCreacion);
  			this.controlCambio = control;
  			console.log(this.controlCambio, "este es el control");

  		});
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
    UpdateControlCambio(){
    	 this.controlCambioService.updateControlCambio(this.controlCambio)
	        .subscribe(res => {
	        	console.log(res, "Actualizacion completada");
            //this.showSuccess();
            
          }, err => {
            if (err.error.details.name === 'SequelizeUniqueConstraintError') {
            console.log("El error es de duplicidad" , err.error.details.name);
           // console.log(err.error.details.detail);
            //this.msgError = "El Cargo ya existe"; 
           // this.showError(this.msgError);
          }else if(err.error.details.name ==="SequelizeValidationError"){
              console.log("El error es de campo nulo" , err.error.details.name);
              console.log(err.error.details.errors[0].message);
             // this.msgError = err.error.details.errors[0].message;
             // this.showError(this.msgError);
            }
        });
    }
}
