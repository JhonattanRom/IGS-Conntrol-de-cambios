import { Component, OnInit }          from '@angular/core';
import { ActivatedRoute, Params }     from '@angular/router';
import { Location }                   from '@angular/common';
import { Router }                     from '@angular/router';
import {FormControl, Validators}                  from '@angular/forms';
//Clases
import { Cargo }                      from '../../../Class/cargo';
import { Usuario }                    from "../../../Class/usuario"; 
//Servicios
import { AuthService }                from "../../../Service/auth.service";
import { CargosService }              from '../../../Service/cargos.service';
//Otros
import { ToastrService }              from 'ngx-toastr';
import Swal                           from "sweetalert2";

@Component({
  selector: 'app-datos-cargo',
  templateUrl: './datos-cargo.component.html',
  styleUrls: ['./datos-cargo.component.css']
})
export class DatosCargoComponent implements OnInit {
  usuario = new Usuario;
  cargo;
  submitted = false; 
  message: string;
  msgError;
  Nombre_cargo = new FormControl("", [Validators.required, Validators.maxLength(20)]);
  Descripcion_cargo = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  Formateado;
  id;

  constructor(private cargosService: CargosService,
              private route: ActivatedRoute,
              private location: Location,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router){}

  ngOnInit(): void {
  	this.id = +this.route.snapshot.paramMap.get("id");
    
  	this.cargosService.getCargo(this.id)
  		.subscribe(cargo => {
        this.cargo = cargo
        this.Nombre_cargo = new FormControl(this.cargo.Nombre_cargo, [Validators.required, Validators.maxLength(20)]);
        this.Descripcion_cargo = new FormControl(this.cargo.Descripcion_cargo, [Validators.required, Validators.maxLength(50)]);
  
      });
  }
//Funcion para validacion
  updateCargo(){
    if (this.Nombre_cargo.value == '' || this.Descripcion_cargo.value == ''){
           this.showError("Complete todos los campos");
           this.Formateado = "";
        }else if ((this.Nombre_cargo.invalid) || (this.Descripcion_cargo.invalid )){
           this.showError("Siga las indicaciones del formulario");
        }else{
          const resto = this.Nombre_cargo.value.toLowerCase();
          this.Formateado = this.Nombre_cargo.value.charAt(0).toUpperCase() + resto.slice(1);
           // this.servicio.Nombre_servicio = this.servicio.Nombre_servicio.toLowerCase();
           this.cargo = {
              Nombre_cargo: this.Formateado ,
              Descripcion_cargo: this.Descripcion_cargo.value,
              Id_tipo_cargo: this.id 
            };
       this.update();
        }
     
      
      
  }
//Funcion para actualizar el registro en bd
  private update(): void {
	    this.submitted = true;
	    this.cargosService.updateCargo(this.cargo)
	        .subscribe(res => {
            this.showSuccess();
            this.router.navigate(['/Home/ListarCargos']);
          }, err => {
           if (err.error.details.name === 'SequelizeUniqueConstraintError' 
              && err.error.details.parent.constraint === "Tb_Tipo_Cargo_Nombre_cargo_key") {
           // console.log(err.error.details.detail);
            this.msgError = "El Cargo ya existe"; 
            this.showError(this.msgError);
          }
        });
  }
  ClickAlert(){
    Swal.fire({
  title: 'Actualizar Cargo',
  text: "Podra realizar cambios posteriormente!",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Actualizar'
  }).then((result) => {
  if (result.value) {
    return this.updateCargo();
   }
   })
  }

//Funcion para configurar el Tost de exito
  showSuccess() {
    this.toastr.success('Actualizacion realizada', 'Cargo actualizado!', {
    progressBar: true
    });
   }

//Funcion para configurar el Toastde error
   showError(msgError: string) {
    this.toastr.error(msgError ,'Error en el registro',{
      progressBar: true
    });

  }
   //Validaciones Angultar material
 validacionNombreCargo() {
    return this.Nombre_cargo.hasError('required') ? 'Debes indicar el nombre del cargo' :
        this.Nombre_cargo.hasError('maxLength') ? "":'El nombre del cargo debe contener un maximo de 20 caracteres'
  }
  validacionDescripcion(){
     return this.Descripcion_cargo.hasError('required') ? 'Debes indicar una descipcion del cargo' :
        this.Descripcion_cargo.hasError('maxLength') ? "":'La descripcion del cargo debe contener un maximo de 50 caracteres'
  }


}
