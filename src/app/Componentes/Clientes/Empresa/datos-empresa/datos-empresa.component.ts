import { Component, OnInit }          from '@angular/core';
import { ActivatedRoute, Params }     from '@angular/router';
import { Location }                   from '@angular/common';
import { Router }                     from '@angular/router'; 
//Clases
import { Cargo }                      from '../../../../Class/cargo';
import { Usuario }                    from "../../../../Class/usuario";
import { Empresa }                    from "../../../../Class/empresa";
//Servicios
import { AuthService }                from "../../../../Service/auth.service";
import { CargosService }              from '../../../../Service/cargos.service';
import { EmpresasService }              from "../../../../Service/empresas.service";
//Otros
import { ToastrService }              from 'ngx-toastr';
import Swal                           from "sweetalert2";

@Component({
  selector: 'app-datos-empresa',
  templateUrl: './datos-empresa.component.html',
  styleUrls: ['./datos-empresa.component.css']
})
export class DatosEmpresaComponent implements OnInit {
  usuario = new Usuario;
  empresa = new Empresa();
  submitted = false; 
  message: string;
  msgError;
  id;
  constructor(private cargosService: CargosService,
              private route: ActivatedRoute,
              private location: Location,
              private toastr: ToastrService,
              private authService: AuthService,
              private empresasService: EmpresasService,
              private router: Router) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get("id");
    console.log(this.id, "Esta es la id");
    this.empresasService.getEmpresa(this.id)
      .subscribe(empresa => {this.empresa = empresa;
       console.log(this.empresa, "Esta es la empresa");
    }, err => {
        console.log(err);
      });  
  }
  updateEmpresa(){
    this.empresa.Id_Empresa = this.id;
    console.log(this.empresa, "Datos a enviar");
    return this.empresasService.updateEmpresa(this.empresa)
              .subscribe(
                empresa => {
                  console.log(empresa);
                  this.empresa = empresa;
                  //this.showSuccess();
                  this.router.navigate(['/Home/ListarEmpresas']);
                 }, err => {
                   //this.showError("Error en la actualizacion");
                   console.log(err);
                 });
  }
  ClickAlert(){
    Swal.fire({
  title: 'Actualizar Empresa',
  text: "Podra realizar mas cambios posteriormente!",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Alterar'
  }).then((result) => {
  if (result.value) {
    return this.updateEmpresa();
   }
   })
  }

}
