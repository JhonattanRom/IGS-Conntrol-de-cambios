import { Component, OnInit }          from '@angular/core';
import { ActivatedRoute, Params }     from '@angular/router';
import { Location }                   from '@angular/common';
import { Router }                     from '@angular/router'; 
//Clases
import { Cargo }                      from '../../../../Class/cargo';
import { Usuario }                    from "../../../../Class/usuario";
import { Sucursal }                   from "../../../../Class/sucursal";
//Servicios
import { AuthService }                from "../../../../Service/auth.service";
import { CargosService }              from '../../../../Service/cargos.service';
import { SucursalesService }          from "../../../../Service/sucursales.service";
//Otros
import { ToastrService }              from 'ngx-toastr';
import Swal                           from "sweetalert2";

@Component({
  selector: 'app-actualizar-sucursal',
  templateUrl: './actualizar-sucursal.component.html',
  styleUrls: ['./actualizar-sucursal.component.css']
})
export class ActualizarSucursalComponent implements OnInit {
  usuario = new Usuario;
  sucursal = new Sucursal();
  submitted = false; 
  message: string;
  msgError;
  id;
  constructor(private cargosService: CargosService,
              private route: ActivatedRoute,
              private location: Location,
              private toastr: ToastrService,
              private authService: AuthService,
              private sucursalesService: SucursalesService,
              private router: Router) { }

  ngOnInit() {
  	 this.id = +this.route.snapshot.paramMap.get("id");
  	console.log(this.id, "Esta es la id");
  	this.sucursalesService.getSucursal(this.id)
  		.subscribe(sucursal => {this.sucursal = sucursal;
  		console.log(this.sucursal, "Esta es la susucrsal");
  	}, err => {
  			console.log(err);
  		});	
  }

  updateSucursal(){
    this.sucursal.Id_sucursal = this.id;
    console.log(this.sucursal, "Datos a enviar");
    return this.sucursalesService.updateSucursal(this.sucursal)
              .subscribe(
                sucursal => {
                  console.log(sucursal);
                  this.sucursal = sucursal;
                  this.showSuccess();
                  this.router.navigate(['/Home/ListarEmpresas']);
                 }, err => {
                   this.showError("Error en la actualizacion");
                   console.log(err);
                 });
  }
  ClickAlert(){
    Swal.fire({
  title: 'Actualizar Sucursal',
  text: "Podra realizar mas cambios posteriormente!",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Alterar'
  }).then((result) => {
  if (result.value) {
    return this.updateSucursal();
   }
   })
  }
  showSuccess() {
    this.toastr.success('Actualizacion realizada', 'Sucursal actualizada!', {
      progressBar: true
    });
  }
  showError(msgError: string) {
    this.toastr.error(msgError ,'Sucursal no actualizada',{
      progressBar: true
    });

  }

}
