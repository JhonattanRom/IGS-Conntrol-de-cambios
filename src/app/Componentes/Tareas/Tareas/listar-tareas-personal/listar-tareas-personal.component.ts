import { Component, 
	     OnInit, 
	     ViewChild, 
	     AfterViewInit}                 from '@angular/core';
import { Location }                   from '@angular/common';
import { Router }                     from '@angular/router'; 
import { ActivatedRoute, Params }     from '@angular/router';
import { MatPaginator }               from '@angular/material/paginator';
import { MatTableDataSource }         from '@angular/material/table';
import { TooltipPosition }            from '@angular/material/tooltip';
import { FormControl }                from '@angular/forms';
//Servicios  
import {TareasService} from "../../../../Service/tareas.service";
import { AuthService }                from "../../../../Service/auth.service";
//Clases
import { Tarea }                      from '../../../../Class/tareas';
import { Usuario }                    from "../../../../Class/usuario"; 
//Otros
import { ToastrService }              from 'ngx-toastr';
import Swal                           from "sweetalert2";
export interface Tickets {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-listar-tareas-personal',
  templateUrl: './listar-tareas-personal.component.html',
  styleUrls: ['./listar-tareas-personal.component.css']
})
export class ListarTareasPersonalComponent implements OnInit {
  tareas = [];
  id;
  usuario;
  buscador = "";
  position = new FormControl("above");
  displayedColumns: string[] = ['ID_Tarea',
                                'Nombre_Tarea',
                                'Descripcion_Tarea', 
                                'Estado_Tarea', 
                                "ID_Encargado",
                                'Opciones'];
  dataSource = new MatTableDataSource<Tarea>(this.tareas);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  estados: Tickets[] = [
        {value: '0', viewValue: 'Todos'},
        {value: 'true', viewValue: 'Terminadas'},
        {value: 'false', viewValue: 'Incompletas'}
      ];
  constructor(private tareasService: TareasService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private toastr: ToastrService) { }

  ngOnInit() {
  	this.getTareasPersonal();
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
  getTareasPersonal(){
  	const id = +this.route.snapshot.paramMap.get("id");
  	const idPersonal = +this.route.snapshot.paramMap.get("idPersonal");
  	return this.tareasService.getTareasPersonal(idPersonal,id).subscribe(tareas => {
  		this.tareas = tareas;
  		this.tareas.forEach((item, index) => {
            this.tareas[index]["Encargado"] = this.tareas[index].encargados.Correo_Usuario;
          })
  		this.dataSource = new MatTableDataSource(this.tareas);
  		console.log(this.tareas);
  		this.dataSource.paginator = this.paginator;
  	})
  }
  CompletarTaraea(id: any){
    this.id = +this.route.snapshot.paramMap.get("id");
    const idTarea = {
      "ID_Tarea": id 
    };
    return this.tareasService.CompletarTaraea(idTarea)
               .subscribe(data => {
                 console.log(data, "listar-tareas.component.cssse ");
                 this.getTareasPersonal();
                 this.showSuccess("Tarea Completada");
               }, error => {
                  this.showError("Error al completar tarea");
                 console.log(error);
               })
  }
  ClickAlert(id: any){
    Swal.fire({
  title: 'Completar Tarea',
  text: "No se podra revertir el cambio realizado!",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Alterar'
  }).then((result) => {
  if (result.value) {

    return this.CompletarTaraea(id);
   }
   })
  }
 //Funcion para hacer el decode al Token del localStorage.
    decodeToken(){
    this.usuario = this.authService.decodeToken();
    console.log(this.usuario, "Desde aqui");
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
}
