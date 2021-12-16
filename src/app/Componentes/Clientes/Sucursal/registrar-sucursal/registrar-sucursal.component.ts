import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { ActivatedRoute, Params } from '@angular/router';
import { Router }                   from '@angular/router';
//Servicios
import { EmpresasService } from '../../../../Service/empresas.service';
import { SucursalesService } from '../../../../Service/sucursales.service';
//Clases
import { Empresa } from '../../../../Class/empresa';
//otros
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar-sucursal',
  templateUrl: './registrar-sucursal.component.html',
  styleUrls: ['./registrar-sucursal.component.css']
})
export class RegistrarSucursalComponent implements OnInit {
  myGroup;
  empresa = new Empresa();
  id ;
  constructor(private formBuilder: FormBuilder,
              private empresaService: EmpresasService,
              private sucursalesService: SucursalesService,
              private route: ActivatedRoute,
              private location: Location,
              private router: Router,
              private toastr: ToastrService
               ) { }

 registerForm = this.formBuilder.group({
    sucursales: this.formBuilder.array([])
  });

  showSuccess() {
    this.toastr.success('Registro exitoso', 'Sucursal(es) Registrada(s)!', {
      progressBar: true
    });
  }
  showError(msgError: string) {
    this.toastr.error(msgError ,'Error en el registro',{
      progressBar: true
    });

  }
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
  test(){
  	this.id = +this.route.snapshot.paramMap.get("id");
  	console.log(this.id, "Esto es la id");
  	console.log(this.registerForm, "Formulario");
  	console.log(this.registerForm.value.sucursales, "Datos a enviar");
  	const Sucursales = [];
  	const sucursal = this.registerForm.value.sucursales;
  	//console.log(sucursal.Nombre_sucursal[1], "Primer nombre");
  	console.log(sucursal[0]);
  	console.log(sucursal.length);

	for (var i = 0; i < sucursal.length; i++) {
		Sucursales.push({
				"Nombre_sucursal": sucursal[i].Nombre_sucursal,
				"Id_empresa":this.id,
				"Telefono_sucursal": sucursal[i].Telefono_sucursal
			})
    }

    console.log(Sucursales, "Objeto de los registros");



  	//console.log(sucursal.lenght);
  	this.sucursalesService.addSucursales(Sucursales)
  	     .subscribe(res => {
  	     	console.log("Sucursales registradas");
           this.router.navigate(['/Home/ListarEmpresas']); 
           this.showSuccess();
  	     }, err => {
			console.log(err);
      this.showError("Error en el registro");
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
          }*/
        });
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
  	 const SucursalFormGroup  = this.formBuilder.group({
	     Nombre_sucursal : '',
	     Telefono_sucursal: ''
	    });
	    this.sucursales.push(SucursalFormGroup);
  }

}
