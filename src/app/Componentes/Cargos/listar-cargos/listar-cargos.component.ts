import { Component, OnInit, ViewChild, AfterViewInit}  from '@angular/core';
import {MatPaginator}                   from '@angular/material/paginator';
import {MatTableDataSource}             from '@angular/material/table';
import { TooltipPosition }              from '@angular/material/tooltip';
import { FormControl}                   from '@angular/forms';
import { ActivatedRoute, Params }       from "@angular/router";
//Clases
import { Cargo }                        from '../../../Class/cargo';
import { Usuario }                      from "../../../Class/usuario"; 
//Servicios
import { CargosService }                from '../../../Service/cargos.service';
import { AuthService }                  from "../../../Service/auth.service";
//otros
import { ToastrService }                from 'ngx-toastr';
import Swal                             from "sweetalert2";
export interface Tickets {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-listar-cargos',
  templateUrl: './listar-cargos.component.html',
  styleUrls: ['./listar-cargos.component.css']
})

export class ListarCargosComponent implements OnInit, AfterViewInit {
  usuario: Usuario[] = [];
	cargos: Cargo[] = [];
  buscador = "";
  dataSource = new MatTableDataSource<Cargo>(this.cargos);
	displayedColumns: string[] = ['Id_tipo_cargo',
                                'Nombre_cargo',
                                'Descripcion_cargo', 
                                'Estado_cargo', 
                                'Opciones'];
	estados: Tickets[] = [
        {value: '0', viewValue: 'Todos'},
        {value: 'true', viewValue: 'Habilitados'},
        {value: 'false', viewValue: 'Deshabilitados'}
      ];
@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private cargosService: CargosService,
              private authService: AuthService,
              private toastr: ToastrService){}

   ngOnInit(): void {

    	this.getCargo();
      this.decodeToken();
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
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator
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
//Funcion para obtener todos los cargos
    getCargo(){
    	return this.cargosService.getCargos()
    		.subscribe(
    		    cargos => {
    		    	this.cargos = cargos;
               this.dataSource = new MatTableDataSource(this.cargos);
               this.dataSource.paginator = this.paginator;
              
              console.log(this.dataSource, "El dataSource!!!");
    		   	}
    		 );
    }

  AlterEstado(Estado:boolean, Id: number){
    
    //this.usuario.Estado_Usuario = !Estado;
    Estado = !Estado;
    console.log(Estado, "Al contrario")
    var DataCargo = {
      Id_tipo_cargo: Id,
      Estado_cargo : Estado
    };
    console.log(DataCargo, "pasando parametro!!");
    
    return this.cargosService.alterHabCargo(DataCargo)
        .subscribe( cargo =>{
      if (Estado == true) {
        this.showSuccess("Cargo Habilitado");
      }else if(Estado == false){
        this.showSuccess("Cargo Deshabilitado");
      }
      
      console.log(cargo, "Datos cambiados");
      this.getCargo();
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
