import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { Router }                 from '@angular/router';
import {FormControl, Validators}                  from '@angular/forms';
//Clases
import { Servicio }               from '../../../Class/servicio';
import { Usuario }                from "../../../Class/usuario"; 
//Servicios
import { AuthService }            from "../../../Service/auth.service";
import { ServiciosService }       from '../../../Service/servicios.service';
//Otros
import { ToastrService }          from 'ngx-toastr';
import Swal                       from "sweetalert2";
@Component({
  selector: 'app-datos-servicio',
  templateUrl: './datos-servicio.component.html',
  styleUrls: ['./datos-servicio.component.css']
})
export class DatosServicioComponent implements OnInit {
  usuario = new Usuario;
	servicio;
	submitted = false; 
	message: string;;
  msgError;
  Nombre_servicio = new FormControl("", [Validators.required, Validators.maxLength(20)]);
  Descripcion_servicio = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  Formateado;
  id;
  constructor(
              private serviciosService: ServiciosService,
              private route: ActivatedRoute,
              private location: Location,
              private toastr: ToastrService,
              private authService: AuthService,
              private router:Router) {}

  ngOnInit(): void {
    this.decodeToken();
  	this.id = +this.route.snapshot.paramMap.get("id");
  	this.serviciosService.getServicio(this.id)
  		.subscribe(servicio => {
        this.servicio = servicio 
        console.log(this.servicio);
        this.Nombre_servicio = new FormControl(this.servicio.Nombre_servicio , [Validators.required, Validators.maxLength(20)]);
        this.Descripcion_servicio = new FormControl(this.servicio.Descripcion_servicio, [Validators.required, Validators.maxLength(50)]);
        console.log(this.Nombre_servicio);
      });
  }

//Funcion para validar eel servicio, Toca arreglar esto.
  updateService(){
    if (this.Nombre_servicio.value == '' || this.Descripcion_servicio.value == ''){
           this.showError("Complete todos los campos");
           this.Formateado = "";
        }else if ((this.Nombre_servicio.invalid) || (this.Descripcion_servicio.invalid )){
           this.showError("Siga las indicaciones del formulario");
        }else{
          const resto = this.Nombre_servicio.value.toLowerCase();
          this.Formateado = this.Nombre_servicio.value.charAt(0).toUpperCase() + resto.slice(1);
         // this.servicio.Nombre_servicio = this.servicio.Nombre_servicio.toLowerCase();
         this.servicio = {
            Nombre_servicio: this.Formateado ,
            Descripcion_servicio: this.Descripcion_servicio.value,
            Id_servicio_app: this.id 
          };
          console.log(this.servicio, "Data Service");
          this.update();
        }
       // this.servicio.Nombre_servicio = this.servicio.Nombre_servicio.toLowerCase();
       
       
     }
//Funcion para hacer la actualizacion a la bd del registro del servicio.
  private update(): void {
	    this.submitted = true;
	    this.serviciosService.updateServicio(this.servicio)
	        .subscribe(res => {
            this.showSuccess();
            this.router.navigate(['/Home/ListarServicios']);
          }, err => {
            if (err.error.details.name === 'SequelizeUniqueConstraintError' 
              && err.error.details.parent.constraint === "Tb_Servicio_App_Nombre_servicio_key") {
           // console.log(err.error.details.detail);
            this.msgError = "El Servicio ya existe"; 
            this.showError(this.msgError);
          }else if (err.error.details.name === 'SequelizeUniqueConstraintError' && 
                    err.error.details.parent.constraint ==='Tb_Servicio_App_Nombre_servicio_key'){
            console.log("El error es de campo nulo" , err.error.details.name);
            console.log(err.error.details.errors[0].message);
            this.msgError = err.error.details.errors[0].message;
            this.showError("Indique el nombre del servicio");
          }
        });
  }
  ClickAlert(){
    Swal.fire({
  title: 'Actualizar Servicio',
  text: "Podra realizar cambios posteriormente!",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Actualizar'
  }).then((result) => {
  if (result.value) {
    return this.updateService();
   }
   })
  }

//Funcion para retornar ir un paso atras a la ruta.
  goBack(): void {
  	this.location.back();
  }

 //Funcion para configurar el Toast de exito.
  showSuccess() {
    this.toastr.success('Actualizacion realizada', 'Servicio actualizado!', {
     progressBar: true
    });
  }

//Funcion para confgurar el Toast de error.
  showError(msgError: string) {
    this.toastr.error(msgError ,'Error en el registro',{
      progressBar: true
    });
  }
   
//Funcion para hacer el decode al Token del localStorage.
    decodeToken(){
    this.usuario = this.authService.decodeToken();
    console.log(this.usuario, "Desde aqui");
    }
      //Validaciones Angultar material
 validacionNombreServicio() {
    return this.Nombre_servicio.hasError('required') ? 'Debes indicar el nombre de servicio' :
        this.Nombre_servicio.hasError('maxLength') ? "":'El nombre de servicio debe contener un maximo de 20 caracteres'
  }
  validacionDescripcion(){
     return this.Descripcion_servicio.hasError('required') ? 'Debes indicar una descipcion del servicio' :
        this.Descripcion_servicio.hasError('maxLength') ? "":'La descripcion del servicio debe contener un maximo de 50 caracteres'
  }
}
