import { Component, OnInit }                   from '@angular/core';
import { Usuario }                             from '../../../Class/usuario';
import {FormControl, Validators}               from '@angular/forms';
import { ActivatedRoute, Params }              from '@angular/router';
import { Location }                            from '@angular/common';
import { Router }                              from '@angular/router'; 
//Service
import { UsuariosService }                     from '../../../Service/usuarios.service';
import { CargosService }                       from '../../../Service/cargos.service';
import { RolesService }                        from "../../../Service/roles.service";
//Class
import { Cargo }                               from '../../../Class/cargo';
import { Servicio }                            from "../../../Class/servicio";
import { Rol }                                 from "../../../Class/rol";
//otros
import { ToastrService }                       from 'ngx-toastr';
import Swal                                    from "sweetalert2";
@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {
  

  user = new Usuario();
  Cargos: Cargo[];
  servicios: Servicio[];
  roles = []; 
  id;
  submitted = false; 
  message: string;;
  msgError;
  selectedCargo: number;
  selectedCRol: number;

   Id_Cargo_Usuario = new FormControl('', [Validators.required]);
   Id_Rol_Usuario = new FormControl('', [Validators.required]);
   Nombre_Usuario = new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(30)]);
   Apellido_Usuario = new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(9)]);
   Cedula_Usuario = new FormControl("", [Validators.required, Validators.pattern('^[0-9]{5,9}$'), Validators.maxLength(9)]);
   Correo_Usuario = new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]);
   Password_Usuario = new FormControl('', [Validators.required,  Validators.minLength(5)]);
  


  constructor( private usuariosService: UsuariosService,
               private route: ActivatedRoute,
               private location: Location,
               private toastr: ToastrService,
               private cargosService: CargosService,
               private rolesService: RolesService,
               private router: Router) {}


   /////////////////////////////////////////////////////
  ngOnInit(): void {
    this.getCargos();
    this.getRoles();
  	this.getUsuario();
  }

 ////////////////////////////////////////////////////
 showSuccess() {
    this.toastr.success('Actualizacion realizada', 'Usuario actualizado!', {
      progressBar: true
    });
  }
  showError(msgError: string) {
    this.toastr.error(msgError ,'Usuario no actualizado',{
      progressBar: true
    });

  }
  getUsuario(){
    this.id = +this.route.snapshot.paramMap.get("id");
    console.log(this.id)
    this.usuariosService.getUsuario(this.id)
      .subscribe(user => {
        this.user = user; 
        console.log(this.id);
        this.selectedCargo = user.Id_Cargo_Usuario;
        this.selectedCRol= user.Id_Rol_Usuario;
       this.Id_Cargo_Usuario = new FormControl(this.user.Id_Cargo_Usuario, [Validators.required]);
       this.Id_Rol_Usuario = new FormControl(this.user.Id_Rol_Usuario, [Validators.required]);
       this.Nombre_Usuario = new FormControl(this.user.Nombre_Usuario, [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(30)]);
       this.Apellido_Usuario = new FormControl(this.user.Apellido_Usuario, [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(9)]);
       this.Cedula_Usuario = new FormControl(this.user.Cedula_Usuario, [Validators.required, Validators.pattern('^[0-9]{5,9}$'), Validators.maxLength(9)]);
       this.Correo_Usuario = new FormControl(this.user.Correo_Usuario, [Validators.required, Validators.email, Validators.minLength(5)]);
       this.Password_Usuario = new FormControl(this.user.Password_Usuario, [Validators.required,  Validators.minLength(5)]);
      });
  }
  updateUsuario(){
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
     Id_Usuario:  this.id
   };
    this.user.Id_Usuario = this.id;
  	console.log(this.user, "Datos a enviar");
    return this.usuariosService.updateUsuario(formulario)
              .subscribe(
                usuario => {
                  console.log(usuario);
                  this.user = usuario;
                  this.showSuccess();
                  this.router.navigate(['/Home/ListarUsuarios']);
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
  ClickAlert(){
    Swal.fire({
  title: 'Actualizar Usuario',
  text: "Podra realizar mas cambios posteriormente!",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Alterar'
  }).then((result) => {
  if (result.value) {
    return this.updateUsuario();
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
