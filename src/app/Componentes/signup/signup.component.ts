import { Component, OnInit }                      from '@angular/core';
import { Router }                                 from '@angular/router';
import { AuthService }                            from "../../Service/auth.service";
import {FormControl, Validators}                  from '@angular/forms';
import { ToastrService }                          from 'ngx-toastr';
//Servicios
import { ServiciosService }                       from '../../Service/servicios.service';
import { CargosService }                          from '../../Service/cargos.service';
import { RolesService }                           from "../../Service/roles.service";
//Class
import { Cargo }                                  from '../../Class/cargo';
import { Servicio }                               from "../../Class/servicio";
import { Rol }                                    from "../../Class/rol";
import Swal                                       from "sweetalert2";
export interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
   Cargos: Cargo[];
   servicios: Servicio[];
   roles = []; 
   user = {
     Cedula_Usuario: "",
     Nombre_Usuario: "",
     Apellido_Usuario: "",
     Id_Cargo_Usuario: 0,
     Id_Rol_Usuario: 0,
     Correo_Usuario:"",
     Password_Usuario: ""   
   };

   Id_Cargo_Usuario = new FormControl('', [Validators.required]);
   Id_Rol_Usuario = new FormControl('', [Validators.required]);
   Nombre_Usuario = new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(30)]);
   Apellido_Usuario = new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(9)]);
   Cedula_Usuario = new FormControl("", [Validators.required, Validators.pattern('^[0-9]{5,9}$'), Validators.maxLength(9)]);
   Correo_Usuario = new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]);
   Password_Usuario = new FormControl('', [Validators.required,  Validators.minLength(5)]);
  
  constructor(private router: Router,
              private authService: AuthService,
              private serviciosService: ServiciosService,
              private cargosService: CargosService,
              private rolesService: RolesService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getCargos();
    this.getRoles();
  }
  showSuccess() {
    this.toastr.success('Registro exitoso', 'Usuario registrado!', {
      progressBar: true
    });
  }
  showError(msgError: string) {
    this.toastr.error(msgError ,'Error',{
      progressBar: true
    });
  }

  RegistrarUsuario(){
  if (this.Id_Cargo_Usuario.value == '' || this.Id_Rol_Usuario.value == '' || this.Nombre_Usuario.value == '' || 
      this.Apellido_Usuario.value == '' || this.Cedula_Usuario.value == '' ||this.Correo_Usuario.value == '' ||
      this.Password_Usuario.value == '' ) {

    this.showError("Complete todos los campos");
  }else if((this.Id_Cargo_Usuario.invalid) || (this.Id_Rol_Usuario.invalid ) || (this.Nombre_Usuario.invalid ) || 
      (this.Apellido_Usuario.invalid ) || (this.Cedula_Usuario.invalid ) || (this.Correo_Usuario.invalid) ||
      (this.Password_Usuario.invalid ) ){
     this.showError("Siga las indicaciones del formulario");
  }else {
    console.log();
     const  formulario = {
     Cedula_Usuario: this.Cedula_Usuario.value,
     Nombre_Usuario: this.Nombre_Usuario.value,
     Apellido_Usuario: this.Apellido_Usuario.value,
     Id_Cargo_Usuario: this.Id_Cargo_Usuario.value,
     Id_Rol_Usuario: this.Id_Rol_Usuario.value,
     Correo_Usuario:this.Correo_Usuario.value,
     Password_Usuario: this.Password_Usuario.value, 
   };
   console.log(formulario);
   console.log(this.user);
   this.authService.Registrar(formulario)
     .subscribe( async res => {
           console.log("Todo bien");
           console.log(res);
           //this.tokenInterceptorService.intercept();
           this.router.navigate(['/Home/ListarUsuarios']);
           this.showSuccess(); 
        }, err => {
          if(err.error.details.name == "SequelizeUniqueConstraintError" && 
             err.error.details.parent.constraint == "Tb_Usuario_Cedula_Usuario_key"){
             this.showError("La Cedula de identidad ya esta ocupada");
          }else if( err.error.details.name == "SequelizeUniqueConstraintError"&& err.error.details.parent.constraint =='Tb_Usuario_Correo_Usuario_key'){
            this.showError("El correo ya fue asignado a otro usuario");
          }
        });
  }
}
  ClickAlert(Estado:boolean, Id: number){
    Swal.fire({
      title: 'Registro de Usuario',
      text: "Realizar registro?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Registrar',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.value) {
      return this.RegistrarUsuario();
      }
      })
  }
    getCargos(){
    return this.cargosService.getCargos()
      .subscribe(
          cargos => {
            console.log(cargos);
            this.Cargos = cargos;
           }
       );
  }
    getRoles(){ 
      return this.rolesService.getRoles()
        .subscribe(
            roles => {
              console.log(roles);
              this.roles = roles;
            });
    }

 
  
  
//Validaciones Angultar material
 ValidacionNombre_Usuario() {
    return this.Nombre_Usuario.hasError('required') ? 'Debes indicar el nombre de usuario' :
        this.Nombre_Usuario.hasError('maxLength') ? 'El nombre de usuario debe contener un maximo de 30 caracteres' :
             this.Nombre_Usuario.hasError('pattern') ? "El nombre solo puede contener letras" : ""
  }
  ValidacionApellido_Usuario() {
    return this.Apellido_Usuario.hasError('required') ? 'Debes indicar el apellido del usuario' :
        this.Apellido_Usuario.hasError('maxLength') ? 'El apellido del usuario debe contener un maximo de 30 caracteres' :
             this.Apellido_Usuario.hasError('pattern') ? "El apellido solo puede contener letras" : ""
  }
  ValidacionCedula(){
     return this.Cedula_Usuario.hasError('required') ? 'Debes indicar la cedula de identidad del usuario' :
        this.Cedula_Usuario.hasError('maxLength') ? 'La cedula de identidad se sobrepasa de 9 caracteres' :
             this.Cedula_Usuario.hasError('pattern') ? "El formato de la cedula no es valido" : ""
  }
  ValidacionPassword() {
    return this.Password_Usuario.hasError('required') ? 'Debes indicar su clave de usuario' :
        this.Password_Usuario.hasError('minLength') ? '' :
            'Su clave de usuario debe contener 5 o mas caracteres';
  }
  ValidacionCorreoDeUsuario() {
    return this.Correo_Usuario.hasError('required') ? 'Se require un correo de usuario' :
        this.Correo_Usuario.hasError('email') ? 'Indique un email valido' :
            this.Correo_Usuario.hasError('minLength') ? '' :
            'Debe contener un minimo de 5 caracteres';
  }



}
