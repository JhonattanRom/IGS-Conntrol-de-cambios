import { Component }                from '@angular/core';
import { Router }                   from '@angular/router';
import { Location }                 from '@angular/common';
import {FormControl, Validators}                  from '@angular/forms';
//Clases
import { Cargo }                    from '../../../Class/cargo';
//Servicios
import { CargosService }            from "../../../Service/cargos.service";
//otros
import { ToastrService }            from 'ngx-toastr';
import Swal                         from "sweetalert2";
import * as moment                  from 'moment';
@Component({
  selector: 'app-registrar-cargos',
  templateUrl: './registrar-cargos.component.html',
  styleUrls: ['./registrar-cargos.component.css']
})
export class RegistrarCargosComponent   {

  cargo;
  submitted = false;
  msgError;
  Formateado;
  Nombre_cargo = new FormControl("", [Validators.required, Validators.maxLength(20)]);
  Descripcion_cargo = new FormControl('', [Validators.required, Validators.maxLength(50)]);

  constructor(private cargosService: CargosService,
              private location: Location,
              private toastr: ToastrService,
              private router: Router
              ){}

  showSuccess() {
    this.toastr.success('Registro exitoso', 'Cargo Incluido!', {
      progressBar: true
    });
  }
  showError(msgError: string) {
    this.toastr.error(msgError ,'Error en el registro',{
      progressBar: true
    });
  }
  newCargo(): void {
    this.submitted = false; 
    this.cargo = new Cargo();
  }
  addCargo() {
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
        Descripcion_cargo: this.Descripcion_cargo.value
      };
      console.log(this.cargo, "Data Service");
      this.save();
    }
    }
  
  goBack(): void {
    this.location.back();
  }
  private save(): void {
    this.cargosService.addCargo(this.cargo)
        .subscribe( res => {
            this.showSuccess();
            this.router.navigate(['/Home/ListarCargos']);
        }, err => {

           if (err.error.details.name === 'SequelizeUniqueConstraintError' 
              && err.error.details.parent.constraint === "Tb_Tipo_Cargo_Nombre_cargo_key") {
           // console.log(err.error.details.detail);
            this.msgError = "El cargo ya existe"; 
            this.showError(this.msgError);
          }else if (err.error.details.name === 'SequelizeUniqueConstraintError' && 
                    err.error.details.parent.constraint ==='Tb_Servicio_App_Nombre_servicio_key'){
            console.log("El error es de campo nulo" , err.error.details.name);
            console.log(err.error.details.errors[0].message);
            this.msgError = err.error.details.errors[0].message;
            this.showError("Indique el nombre del cargo");
          }
        });
  }
  ClickAlert(){
    Swal.fire({
  title: 'Registrar Cargo',
  text: "Podra realizar cambios posteriormente!",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Registrar'
  }).then((result) => {
  if (result.value) {
    return this.addCargo();
   }
   })
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
