import { Component, OnInit, ViewChild,
         ViewChildren, QueryList  }      from '@angular/core';
import { MatTableDataSource, MatSort  }  from '@angular/material';
import { TooltipPosition }               from '@angular/material/tooltip';
import { FormControl}                    from '@angular/forms';
import { ActivatedRoute, Params }        from "@angular/router";
import {MatPaginator}                    from '@angular/material/paginator';

//Clases
import { Empresa }                       from '../../../../Class/empresa';
import { Sucursal }                      from "../../../../Class/sucursal";
//Servicios
import { EmpresasService }               from '../../../../Service/empresas.service';
import { SucursalesService}              from "../../../../Service/sucursales.service";
import { ClientesService }               from "../../../../Service/clientes.service";
//Otros
import { ToastrService }                 from 'ngx-toastr';
import Swal                              from "sweetalert2";
export interface Tickets {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-listar-empresas',
  templateUrl: './listar-empresas.component.html',
  styleUrls: ['./listar-empresas.component.css']
})
export class ListarEmpresasComponent implements OnInit {
	
  sucursales: Sucursal[];
	empresas: Empresa[];
 
  buscador = "";
  buscador1 = "";
  //dataSource2 = new MatTableDataSource<Sucursal>(this.sucursales);
	displayedColumns: string[] = ['Id_Empresa', 'Nombre_empresa', 'Rif_empresa', 'Estado_empresa', 'Opciones'];
  displayedColumns1: string[] = ['Id_sucursal', 'Nombre_sucursal', 'Id_empresa', 'Telefono_sucursal', "Estado_sucursal", 'Opciones'];
	estados: Tickets[] = [
	      {value: '0', viewValue: 'Todos'},
	      {value: 'true', viewValue: 'Habilitados'},
	      {value: 'false', viewValue: 'Deshabilitados'}
	    ];

//Paginaciones
  dataSource = new MatTableDataSource<Empresa>(this.empresas);
  dataSource1 = new MatTableDataSource<Sucursal>(this.sucursales);
  @ViewChild(MatPaginator, {static: true }) paginator: MatPaginator;
  @ViewChild('SucursalPaginator', { read: MatPaginator, static: true  }) 
   SucursalPaginator: MatPaginator;
 // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
 //@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
 // @ViewChild(MatPaginator, {static: true}) paginator1: MatPaginator;
  constructor(private empresasService : EmpresasService,
              private sucursalesService : SucursalesService,
              private toastr: ToastrService,
              private clientesService: ClientesService) { }

   ngOnInit(): void {
  	this.getEmpresas();
    this.getSucursales();
    this.dataSource1.paginator = this.SucursalPaginator;
    this.dataSource.paginator = this.paginator;
   // this.dataSource.paginator = this.paginator.toArray()[0];
    //this.dataSource1.paginator = this.paginator.toArray()[1];
  }
  mostrarInputs(estado, filterValue: string ) {
    this.buscador = "";
    console.log(estado);
    filterValue = estado.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue, "este es el filtro");
   //this.dataSource.filter = filterValue.trim().toLowerCase();
  }
mostrarInputs1(estado, filterValue: string ) {
    this.buscador1 = "";
    console.log(estado);
    filterValue = estado.value;
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    console.log(filterValue, "este es el filtro");
   //this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue, "empresa");
  }
  applyFilter1(filterValue: string) {
    this.dataSource1.filter = filterValue.trim().toLowerCase();
    console.log(filterValue, "Sucursales");
    
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
  getEmpresas(){
  	return this.empresasService.getEmpresas()
  		.subscribe(
  		    empresas => {
  		    	console.log(empresas);
  		    	this.empresas = empresas;
            this.dataSource = new MatTableDataSource(this.empresas);
            this.dataSource.paginator = this.paginator;
  		   	}
  		);
    }
  getSucursales(){
    return this.sucursalesService.getSucursales() 
      .subscribe(
        sucursales => {
            console.log(sucursales);
            this.sucursales = sucursales;
            this.dataSource1 = new MatTableDataSource(this.sucursales);
            this.dataSource1.paginator = this.SucursalPaginator;
           }
      );
    }

  AlterEstado(Estado:boolean, Id: number){
    
    //this.usuario.Estado_Usuario = !Estado;
    Estado = !Estado;
    console.log(Estado, "Al contrario")
    var DataSucursal = {
      Id_sucursal: Id,
      Estado_sucursal : Estado
    };
    console.log(DataSucursal, "pasando parametro!!");
    
    return this.sucursalesService.alterHabSucursal(DataSucursal)
        .subscribe( sucursal =>{
      if (Estado == true) {
        this.showSuccess("Sucursal Habilitada");
      }else if(Estado == false){
        this.showSuccess("Sucursal Deshabilitada");
      }
      
      console.log(sucursal, "Datos cambiados");
      this. getSucursales();
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
    AlterEstadoCliente(Estado:boolean, Id: number){
    
    //this.usuario.Estado_Usuario = !Estado;
    Estado = !Estado;
    console.log(Estado, "Al contrario")
    var DataCliente = {
      Id_Empresa: Id,
      Estado_empresa : Estado
    };
    console.log(DataCliente, "pasando parametro!!");
    
    return this.clientesService.alterHabCliente(DataCliente)
        .subscribe( cliente =>{
      if (Estado == true) {
        this.showSuccess("Sucursal Habilitada");
      }else if(Estado == false){
        this.showSuccess("Sucursal Deshabilitada");
      }
      
      console.log(cliente, "Datos cambiados");
      this.getEmpresas();
      this. getSucursales();
    })
  }
  ClickAlertCliente(Estado:boolean, Id: number){
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
    return this.AlterEstadoCliente(Estado, Id);
   }
   })
  }
}
