import { Component, OnInit, 
         ViewChild, AfterViewInit}      from '@angular/core';
import {MatPaginator}                   from '@angular/material/paginator';
import { MatTableDataSource, MatSort  } from '@angular/material';
import { TooltipPosition }              from '@angular/material/tooltip';
import { FormControl}                   from '@angular/forms';
import { ActivatedRoute, Params }       from "@angular/router";
//Clases
import { Usuario }                      from "../../../Class/usuario"; 
import { Servicio }                     from '../../../Class/servicio';
//Servicios
import { ServiciosService }             from '../../../Service/servicios.service';
import { AuthService }                  from "../../../Service/auth.service";
//Otros
import { ToastrService }                from 'ngx-toastr';
import * as jwt_decode                  from 'jwt-decode';
import Swal                             from "sweetalert2";
export interface Tickets {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-listar-servicios',
  templateUrl: './listar-servicios.component.html',
  styleUrls: ['./listar-servicios.component.css']
})

export class ListarServiciosComponent implements OnInit {
  usuario = new Usuario;
	servicios: Servicio[];
  buscador = "";
  dataSource = new MatTableDataSource<Servicio>(this.servicios);
  displayedColumns: string[] = ['Id_servicio_app',
                                'Nombre_servicio',
                                'Descripcion_servicio',
                                'Estado_servicio',
                                'Opciones'];
   estados: Tickets[] = [
        {value: '0', viewValue: 'Todos'},
        {value: 'true', viewValue: 'Habilitados'},
        {value: 'false', viewValue: 'Deshabilitados'}
      ];
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private servicioService: ServiciosService,
              private authService : AuthService,
              private toastr: ToastrService) {}

  ngOnInit(): void {

    this.decodeToken();
  	this.getServicios(); 
    this.dataSource.paginator = this.paginator;
  
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

//Funcion para obtener los servicios
  getServicios() {
  	
    return this.servicioService.getServicios()
  		.subscribe(
  		    servicios => {
  		    	this.servicios = servicios;
            this.dataSource = new MatTableDataSource(this.servicios);
            this.dataSource.paginator = this.paginator;
  		   	}
  		 );

  }
  AlterEstado(Estado:boolean, Id: number){
    
    //this.usuario.Estado_Usuario = !Estado;
    Estado = !Estado;
    console.log(Estado, "Al contrario")
    var DataServicio = {
      Id_servicio_app: Id,
      Estado_servicio : Estado
    };
    console.log(DataServicio, "pasando parametro!!");
    
    return this.servicioService.alterHabServicio(DataServicio)
        .subscribe( servicio =>{
      if (Estado == true) {
        this.showSuccess("Servicio Habilitado");
      }else if(Estado == false){
        this.showSuccess("Servicio Deshabilitado");
      }
      
      console.log(servicio, "Datos cambiados");
      this.getServicios();
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

//Funcion para hacer el decode al Token del localStorage.
    decodeToken(){
    this.usuario = this.authService.decodeToken();
    console.log(this.usuario, "Desde aqui");
    }

}
