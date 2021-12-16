import { Component, OnInit }                   from '@angular/core';
import { Router }                              from '@angular/router';
import { HttpClient, 
         HttpHeaders, 
         HttpHandler, 
         HttpEvent, 
         HttpRequest, 
         HttpInterceptor }                     from '@angular/common/http';
import { FormBuilder, 
         Validators, 
         FormArray, 
         FormGroup, 
         FormControl }                         from '@angular/forms';

//Servicios
import { AuthService }                         from "../../Service/auth.service";
import { TokenInterceptorService }             from "../../Service/token-interceptor.service";
import { ToastrService }                       from 'ngx-toastr';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
   
   
  Correo_Usuario = new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]);
  Password_Usuario = new FormControl('', [Validators.required,  Validators.minLength(5)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private tokenInterceptorService: TokenInterceptorService,
              private toastr: ToastrService) { }

  ngOnInit() {
  }

showError(msgError: string) {
    this.toastr.error(msgError ,'Usuario no actualizado',{
      progressBar: true
    });
  }
//Validaciones Angultar material
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
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }


//Registro rapido Momentaneo
  public  onLoginClick(){
   console.log(this.email.value, "El email");
   console.log(this.Correo_Usuario.value, "El correo");
   console.log(this.Correo_Usuario.value, "El correo");
 if (this.Password_Usuario.value == '' || this.Correo_Usuario.value == ''){
     this.showError("Complete todos los campos");
 }else if (this.Password_Usuario.invalid || this.Correo_Usuario.invalid) {
     this.showError("Siga las indicaciones del formulario");
   } else {
     const user = { Correo_Usuario : this.Correo_Usuario.value, Password_Usuario: this.Password_Usuario.value};
     console.log(user, "El suuario");
     this.authService.Login(user)
      .subscribe( async res => {
           localStorage.setItem("token", res.token);
           this.router.navigate(['/Home/Resumen']); 
        }, err => {
          this.showError(err.error);
        });
   }
   
  }
}
