import { Component, OnInit }                         from '@angular/core';
import { FormBuilder, 
         Validators, 
         FormArray, 
         FormGroup, 
         FormControl }                               from '@angular/forms';
import { Router }                                    from '@angular/router';
//Clases
import { Empresa }                                   from '../../../../Class/empresa';
//Servicios
import { EmpresasService }                           from '../../../../Service/empresas.service';
//otros
import { ScrollToService, ScrollToConfigOptions }    from '@nicky-lenaers/ngx-scroll-to';
import Swal                                          from "sweetalert2";
import { ToastrService }                             from 'ngx-toastr';
@Component({
  selector: 'app-registrar-empresas',
  templateUrl: './registrar-empresas.component.html',
  styleUrls: ['./registrar-empresas.component.css']
})
export class RegistrarEmpresasComponent implements OnInit {
  myGroup;
  empresa = new Empresa();
  test;
  constructor(private formBuilder: FormBuilder,
              private empresaService: EmpresasService,
              private toastr: ToastrService,
              private router: Router ) { 

  /*this.myGroup = new FormGroup({
       firstName: new FormControl()
    });*/
 }
  get Nombre_empresa() {
    return this.registerForm.get('Nombre_empresa');
  }

  get Rif_empresa() {
    return this.registerForm.get('Rif_empresa');
  }

  get sucursales(){
    return this.registerForm.get('sucursales') as FormArray;
  }

  

  ngOnInit() {
  }

  registerForm = this.formBuilder.group({
    Nombre_empresa: ['', {
      validators: [Validators.required, Validators.minLength(1)],
      updateOn: 'blur'
    }],
    Rif_empresa: ['', {
      validators: [Validators.required, Validators.minLength(4)]
    }],
    sucursales: this.formBuilder.array([])
  });

    agregarSucursal(){
	    const SucursalFormGroup  = this.formBuilder.group({
	     Nombre_sucursal : '',
	     Telefono_sucursal: ''
	    });
	    this.sucursales.push(SucursalFormGroup);
	  }

	  removerTelefono(indice: number) {
	    this.sucursales.removeAt(indice);
	  }
	  refrescar() {
    this.registerForm.patchValue({
      Nombre_empresa: '',
      Rif_empresa: '',
    });
    this.sucursales.controls.splice(0, this.sucursales.length);
  }
  mostrar(){
    console.log(this.registerForm.value);
    this.refrescar();
  }

  GuardarEmpresa(): void {
console.log(this.registerForm.value);
        this.empresaService.addEmpresa(this.registerForm.value)
        .subscribe( res => {
            //this.showSuccess();
            this.showSuccess();
            this.router.navigate(['/Home/ListarEmpresas']);
        }, err => {
            this.showError("Error");
        /*  if (err.error.details.name === 'SequelizeUniqueConstraintError') {
            console.log("El error es de duplicidad" , err.error.details.name);
           // console.log(err.error.details.detail);
           // this.msgError = "El Servicio ya existe"; 
           // this.showError(this.msgError);
          }else{
            console.log("El error es de campo nulo" , err.error.details.name);
            console.log(err.error.details.errors[0].message);
            //this.msgError = err.error.details.errors[0].message;
            //this.showError(this.msgError);
            console.log("Error");
          }*/console.log(err);
        });
        // this.mostrar();
  }
  ClickAlert(){
    Swal.fire({
  title: 'Registrar Cliente',
  text: "Podra realizar cambios posteriormente!",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Alterar'
  }).then((result) => {
  if (result.value) {
    return this.GuardarEmpresa();
   }
   })
  }
  //Funcion para configurar el Toast de exito.
  showSuccess() {
    this.toastr.success('Registro realizado', 'Cliente registrado!', {
     progressBar: true
    });
  }

//Funcion para confgurar el Toast de error.
  showError(msgError: string) {
    this.toastr.error(msgError ,'Error en el registro',{
      progressBar: true
    });
  }


  }

