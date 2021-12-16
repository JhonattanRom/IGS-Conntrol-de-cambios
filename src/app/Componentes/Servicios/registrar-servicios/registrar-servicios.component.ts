import { Component, OnInit }        from '@angular/core';
import { Location }                 from '@angular/common';
import { Router }                   from '@angular/router';
import { ActivatedRoute, Params }   from '@angular/router';
import {FormControl, Validators}                  from '@angular/forms';
//Clases
import { Servicio }                 from '../../../Class/servicio';
import { Usuario }                  from "../../../Class/usuario"; 
//Servicios
import { ServiciosService }         from '../../../Service/servicios.service';
import { AuthService }              from "../../../Service/auth.service";
//Otros
import { ToastrService }            from 'ngx-toastr';
import Swal                         from "sweetalert2";
@Component({
  selector: 'app-registrar-servicios',
  templateUrl: './registrar-servicios.component.html',
  styleUrls: ['./registrar-servicios.component.css']
})
export class RegistrarServiciosComponent implements OnInit  {
  usuario = new Usuario();
  servicio;
  submitted = false;
  msgError;
  Formateado;
  
Nombre_servicio = new FormControl("", [Validators.required, Validators.maxLength(20)]);
Descripcion_servicio = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  constructor(private servicioService: ServiciosService,
              private location: Location,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute
              ){}
 
 ngOnInit() {
      
      this.decodeToken();
    
    }
    
 //No recuerdo que hace XD
  newServicio(): void {
    this.submitted = false; 
    this.servicio = new Servicio();

  }

//Valida el servicio (Tengo que arreglar)
  addService() {
    if (this.Nombre_servicio.value == '' || this.Descripcion_servicio.value == ''){
       this.showError("Complete todos los campos");
       this.Formateado = "";
    }else if ((this.Nombre_servicio.invalid) || (this.Descripcion_servicio.invalid )){
       this.showError("Siga las indicaciones del formulario");
       

    }else{
      this.submitted = true;
      console.log(this.Nombre_servicio.value, "Este es el nombre");
      
     const resto = this.Nombre_servicio.value.toLowerCase();
     this.Formateado = this.Nombre_servicio.value.charAt(0).toUpperCase() + resto.slice(1);
     // this.servicio.Nombre_servicio = this.servicio.Nombre_servicio.toLowerCase();
     this.servicio = {
        Nombre_servicio: this.Formateado ,
        Descripcion_servicio: this.Descripcion_servicio.value
      };
     console.log(this.servicio, "Data Service");
    }
    this.save();
  }

//Retorna a la ruta anterior
  goBack(): void {
    this.location.back();
  }

//Funcion para guardar en bd el servicio
  private save(): void {
    this.servicioService.addServicio(this.servicio)
        .subscribe( res => {
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
  title: 'Registrar Servicio',
  text: "Podra realizar cambios posteriormente!",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Registrar'
  }).then((result) => {
  if (result.value) {
    return this.addService();
   }
   })
  }
//Funcion para hacer el decode al Token del localStorage.
    decodeToken(){
    this.usuario = this.authService.decodeToken();
    console.log(this.usuario, "Desde aqui");
    }
//Funcion para configurar el Toast de exito
   showSuccess() {
    this.toastr.success('Registro exitoso', 'Servicio Incluido!', {
      progressBar: true
    });
  }
//Funcion para configurar el Toast de error
  showError(msgError: string) {
    this.toastr.error(msgError ,'Error en el registro',{
      progressBar: true
    });

  }
 
  //Validaciones Angultar material
 validacionNombreServicio() {
    return this.Nombre_servicio.hasError('required') ? 'Debes indicar el nombre del servicio' :
        this.Nombre_servicio.hasError('maxLength') ? "":'El nombre del servicio debe contener un maximo de 20 caracteres'
  }
  validacionDescripcion(){
     return this.Descripcion_servicio.hasError('required') ? 'Debes indicar una descipcion del servicio' :
        this.Descripcion_servicio.hasError('maxLength') ? "":'La descripcion del servicio debe contener un maximo de 50 caracteres'
  }
}



