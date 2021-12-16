import { Component, OnInit, ViewChild}      from '@angular/core';
import { MatTableDataSource, MatSort  }     from '@angular/material';
import { TooltipPosition }                  from '@angular/material/tooltip';
import { FormControl}                       from '@angular/forms';
import { ActivatedRoute, Params }           from "@angular/router";
import {MatPaginator}                       from '@angular/material/paginator';


//Clases
import { Usuario }                          from '../../../Class/usuario';
//Servicios
import { UsuariosService }                  from '../../../Service/usuarios.service';
//Otros
import { ToastrService }                    from 'ngx-toastr';
import Swal                                 from "sweetalert2";




export interface Tickets {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  buscador = "";
  usuarios = [];
  usuariosformat = [];
  dataSource = new MatTableDataSource<Usuario>(this.usuarios);
/*
  export class Usuario {
	Id_Usuario: number;
	Cedula_Usuario: string;
	Nombre_Usuario: string;
	Apellido_Usuario: string;
	Id_Cargo_Usuario: number;
	Id_Rol_Usuario: number;
	Correo_Usuario: string;
	Password_Usuario: string;
	Estado_Usuario: number;
}dataSource
*/
  displayedColumns: string[] = ['Id_Usuario',
                                'Cedula_Usuario', 
                                'Nombre_Usuario',
                                "Apellido_Usuario", 
                                "Id_Cargo_Usuario", 
                                "Id_Rol_Usuario", 
                                "Correo_Usuario",  
                                'Estado_Usuario', 
                                'Opciones'];
  estados: Tickets[] = [
        {value: '0', viewValue: 'Todos'},
        {value: 'true', viewValue: 'Habilitados'},
        {value: 'false', viewValue: 'Deshabilitados'}
      ];

@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    
  constructor(private usuariosService: UsuariosService,
              private toastr: ToastrService) { }


  showSuccess(msg: string) {
    this.toastr.success(msg, 'Actualizacion', {
      progressBar: true
    });
  }
  showError(msgError: string) {
    this.toastr.error(msgError ,'Error en la Planificacion',{
      progressBar: true
    });

  }
  mostrarInputs(estado, filterValue: string ) {
    this.buscador = "";
    console.log(estado);
    filterValue = estado.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue, "este es el filtro");
    
   //this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue, "Esto es lo que busco");
    
  }
  ngOnInit() {
  	this.getUsuarios();
    this.dataSource.paginator = this.paginator;
      
  }
  getUsuarios() {
  	return this.usuariosService.getUsuarios()
  		.subscribe(
  		    usuarios => {
  		    	console.log(usuarios);
            
  		    	this.usuarios = usuarios;
            this.dataSource = new MatTableDataSource(this.usuarios);
               this.dataSource.paginator = this.paginator;

            this.usuarios.forEach((item, index) => {
              this.usuarios[index]["Cargo"] = this.usuarios[index].cargos.Nombre_cargo;
            })
  		   	}
  		 );
  }
  AlterEstado(Estado:boolean, Id: number){
    
    //this.usuario.Estado_Usuario = !Estado;
    Estado = !Estado;
    console.log(Estado, "Al contrario")
    var DataUser = {
      Id_Usuario: Id,
      Estado_Usuario : Estado
    };
    console.log(DataUser, "pasando parametro!!");
    
    return this.usuariosService.alterHabUsuario(DataUser)
        .subscribe( usuario =>{
      if (Estado == true) {
        this.showSuccess("Usuario Habilitado");
      }else if(Estado == false){
        this.showSuccess("Usuario Deshabilitado");
      }
      
      console.log(usuario, "Datos cambiados");
      this.getUsuarios();
    })
  }

  ClickAlert(Estado:boolean, Id: number){
    Swal.fire({
  title: 'Alterar estado',
  text: "Podra revertir el cambio realizado!",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Alterar'
  }).then((result) => {
  if (result.value) {
    return this.AlterEstado(Estado, Id);
   }
   })
  }

}
