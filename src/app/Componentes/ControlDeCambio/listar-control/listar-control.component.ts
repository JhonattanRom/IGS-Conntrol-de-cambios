import { Component, OnInit, ViewChild }      from '@angular/core';
import {animate, 
        state, 
        style, 
        transition, 
        trigger}                             from '@angular/animations';
import {MatPaginator}                        from '@angular/material/paginator';

import { MatTableDataSource, MatSort  }      from '@angular/material';
import { TooltipPosition }                   from '@angular/material/tooltip';
import { ActivatedRoute, Params }            from "@angular/router";
import {FormBuilder,
        FormGroup,
        Validators,
        FormControl}                         from '@angular/forms';
import {MatDatepickerInputEvent}             from '@angular/material/datepicker';
//Clases
import { ControlDeCambio }                   from "../../../Class/ControlDeCambio";
import { Usuario }                           from "../../../Class/usuario"; 
//Servicios
import { AuthService }                       from "../../../Service/auth.service";
import { ControlCambioService }              from "../../../Service/control-cambio.service";
import { GenerateExportService }             from "../../../Service/generate-export.service";
import { UsuariosService }                   from "../../../Service/usuarios.service";
//Otros
import { ToastrService }                     from 'ngx-toastr';
import Swal                                  from "sweetalert2";
import * as moment                           from 'moment';
export interface Tickets {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-listar-control',
  templateUrl: './listar-control.component.html',
  styleUrls: ['./listar-control.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ListarControlComponent implements OnInit {
  test = "";
  personal = [];
  selectedEncargado: number;
  Sableye: boolean = true;
  events: string[] = [];
  firstFormGroup: FormGroup;
  FechaActual = moment().format('MM/DD/YYYY');
  maxDate = new Date(this.FechaActual);
  minDate2;
  MinimaFecha;
  usuario = new Usuario;
  buscador = "";
  Reporte_ControlCambio = [];
  controlesDeCambio : any[];
  dataSource = new MatTableDataSource<ControlDeCambio>(this.controlesDeCambio);
  columnsToDisplay: string[] = ["Id_Control_Cambio",
                                'Nombre_Control_Cambio',
                                'Estatus_Control_Cambio', 
                                'Fecha_Solicitud',
                                "Prioridad_CC", 
                                "Id_servicio", 
                                'Opciones'];

  estados: Tickets[] = [
      {value: '', viewValue: 'Todos'},
      {value: 'Alta', viewValue: 'Alta'},
      {value: 'Media', viewValue: 'Media'},
      {value: 'Baja', viewValue: 'Baja'},
    ];



@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private controlCambioService: ControlCambioService,
              private authService: AuthService,
              private toastr: ToastrService,
              private generateExportService: GenerateExportService,
              private _formBuilder: FormBuilder,
              private usuariosService: UsuariosService) {}

  ngOnInit() {
    this.getControlesDeCambios();
    this. getEncargados();
    this.decodeToken();
    this.dataSource.paginator = this.paginator;
    
    this.firstFormGroup = this._formBuilder.group({
      Personal: ['', Validators.required],
      RolCC: ['', Validators.required],
      fechaInicioCtrl: ["" , Validators.required],
      fechaFinalCtrl: ["", [Validators.required]]
    });
  }
  getEncargados(){
        this.usuariosService.getUsuarios()
          .subscribe(personal =>{
            this.personal = personal;
            console.log(this.personal, "lista de personal");

          })
   }
  showSuccess(msg: string, title: string) {
    this.toastr.success(msg, title, {
      progressBar: true
    });
  }
  showError(msg: string, title: string) {
    this.toastr.error(msg , title,{
      progressBar: true
    });
  }

   mostrarInputs(estado, filterValue: string ) {
    this.buscador = "";
    console.log(estado);
    filterValue = estado.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue, "este es el filtro");
    console.log(this.dataSource.data, "Datasource");
   //this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue, "Esto es lo que busco");
    
  }
//Funcion para obtener controles de cambio  
  getControlesDeCambios() {
  	return this.controlCambioService.getControlesDeCambio()
  		.subscribe(
  		    controles => {
            controles.forEach((fecha, index) => fecha.Fecha_Solicitud = moment(fecha.Fecha_Solicitud).format('DD/MM/YYYY'));            
            this.controlesDeCambio = controles;
            this.controlesDeCambio.forEach((item, index) => {
              this.controlesDeCambio[index]["Prioridad"] = this.controlesDeCambio[index].prioridad.Nombre_Prioridad;
              this.controlesDeCambio[index]["Estado"] = this.controlesDeCambio[index].estatus.Nombre_Estatus;
              this.controlesDeCambio[index]["Servicio"] = this.controlesDeCambio[index].servicios.Nombre_servicio;
            });
            console.log( this.controlesDeCambio, "Controles de cambio");
            this.dataSource = new MatTableDataSource(this.controlesDeCambio);
            this.dataSource.paginator = this.paginator;
            this.FormatearJsonControlCambos();
  		   	}
  		 );
  }
  evaluarControlCambio(id: number, Id_Evaluador: number, Estado: number){
    console.log(id, "Este es el id"); 
    console.log(Id_Evaluador, "Este es el Id_Evaluador");
    console.log(Estado, "Este es el id del Estado");

    var DataEvaluacion = {
      "Id_Evaluador": Id_Evaluador,
      "Id_Control_Cambio" : id,
      "Estatus_Control_Cambio":Estado
    };
    console.log(DataEvaluacion, "Data");
    return this.controlCambioService.evaluarControlCambio(DataEvaluacion)
           .subscribe(data => {
             console.log(data);
             this.getControlesDeCambios()
             this.showSuccess("Evaluacion del control de cambio realizada", "Evaluacion")
           }, err => {
             console.log(err);
             this.showError("Error en la Evaluacion de control de cambio", "Error!");
           })


  }

  ClickEvaluar(id: number, Id_Evaluador: number){
    Swal.fire({
  title: 'Evaluar Control de Cambio',
  text: "Esta a punto de Evaluar un control de cambio!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Aprobar',
  cancelButtonText: "Rechazar"
  }).then((result) => {
  if (result.value) {
    const Estado = 3;
    return this.evaluarControlCambio(id, Id_Evaluador, Estado);
   }else if (
    /* Read more about handling dismissals below */
    result.dismiss === Swal.DismissReason.cancel
   ){
     const Estado = 2;
    return this.evaluarControlCambio(id, Id_Evaluador, Estado);
   }
   })
  }
  FinalizarControlCambio(id: number, Id_verificador: number, Estado: number){
    console.log(id, "Este es el id"); 
    console.log(Id_verificador, "Este es el Id_Evaluador");
    console.log(Estado, "Este es el id del Estado");

    var DataFinalizacion = {
      "Id_verificador": Id_verificador,
      "Id_Control_Cambio" : id,
      "Estatus_Control_Cambio":Estado
    };
    console.log(DataFinalizacion, "Data");
    return this.controlCambioService.FinalizarControlCambio(DataFinalizacion)
           .subscribe(data => {
             console.log(data);
             this.showSuccess("Finalizacion del control de cambio realizado", "Finalizado");
             this.getControlesDeCambios()
           }, err => {
             this.showError("Error en la finalizacion de control de cambio", "Error!");
             console.log(err);
           })
  }
  ClickFinalizar(id: number, Id_Evaluador: number){
    Swal.fire({
  title: 'Finalizar Control de Cambio',
  text: "Esta a punto de finalizar un control de cambio!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Terminar',
  cancelButtonText: "Cancelar"
  }).then((result) => {
  if (result.value) {
    const Estado = 7;
    return this.FinalizarControlCambio(id, Id_Evaluador, Estado);
   }
   })
  }
  EjecutarControlCambio(id: number, Estado: number){
    console.log(id, "Este es el id"); 
   //console.log(Id_verificador, "Este es el Id_Evaluador");
    console.log(Estado, "Este es el id del Estado");

    var DataEjecucion = {
      "Id_Control_Cambio" : id,
      "Estatus_Control_Cambio":Estado
    };
    console.log(DataEjecucion, "Data");
    return this.controlCambioService.EjecutarControlCambio(DataEjecucion)
           .subscribe(data => {
             console.log(data);
             this.showSuccess("Control de cambio en Ejecucion", "Ejecucion")
             this.getControlesDeCambios();
           }, err => {
             this.showError("Error en el inicio de ejecucion para control de cambio", "Error!");
             console.log(err);
           })
  }
  ClickEjecutar(id: number){
    Swal.fire({
  title: 'Ejecucion de Control de Cambio',
  text: "Esta a punto de ejecutar un control de cambio!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Ejecutar',
  cancelButtonText: "Cancelar"
  }).then((result) => {
  if (result.value) {
    const Estado = 6;
    return this.EjecutarControlCambio(id, Estado);
   }
   })
  }

  FormatearJsonControlCambos(){
    
    this.controlesDeCambio.forEach((item, index) => {
      var evaluadorNombreNull;
      var administradorNombreNull;
      var responsableNombreNull;
      var estadoNull;
      var fechaInicioNull;
      var fechaFinalNull;
      var verificadorNulll;
      //Evaluador
      if (this.controlesDeCambio[index].evaluador === null) {
        evaluadorNombreNull = "Por Definir";
      }else {
        evaluadorNombreNull = this.controlesDeCambio[index].evaluador.Nombre_Usuario + " " +
                              this.controlesDeCambio[index].evaluador.Nombre_Usuario;
      }
      //Administrador
      if (this.controlesDeCambio[index].administrador === null) {
        administradorNombreNull = "Por Definir";
      }else {
        administradorNombreNull = this.controlesDeCambio[index].administrador.Nombre_Usuario + " " +
                              this.controlesDeCambio[index].administrador.Nombre_Usuario;
      }
      //Responsable
      if (this.controlesDeCambio[index].responsable === null) {
        responsableNombreNull = "Por Definir";
      }else {
        responsableNombreNull = this.controlesDeCambio[index].responsable.Nombre_Usuario + " " +
                              this.controlesDeCambio[index].responsable.Nombre_Usuario;
      }
      //Verificador
      if (this.controlesDeCambio[index].verificador === null) {
        verificadorNulll = "Por Definir";
      }else {
        verificadorNulll = this.controlesDeCambio[index].verificador.Nombre_Usuario + " " +
                              this.controlesDeCambio[index].verificador.Nombre_Usuario;
      }
      //Estado
      if (this.controlesDeCambio[index].responsable === null) {
        responsableNombreNull = "Por Definir";
      }else {
        responsableNombreNull = this.controlesDeCambio[index].responsable.Nombre_Usuario + " " +
                              this.controlesDeCambio[index].responsable.Nombre_Usuario;
      }
      //FechaInicioFinal
      if (this.controlesDeCambio[index].Fecha_Inicio === null || this.controlesDeCambio[index].Fecha_Final === null) {
        fechaInicioNull = "Por Definir";
        fechaFinalNull = "Por Definir";
      }else {
        fechaInicioNull = moment(this.controlesDeCambio[index].Fecha_Inicio).format('DD/MM/YYYY');
        fechaFinalNull = moment(this.controlesDeCambio[index].Fecha_Final).format('DD/MM/YYYY');
      }
        this.Reporte_ControlCambio.push({ID: item.Id_Control_Cambio, 
                                    Solicitante:  this.controlesDeCambio[index].solicitante.Nombre_Usuario +" " 
                                    +  this.controlesDeCambio[index].solicitante.Apellido_Usuario,
                                    Evaluador:  evaluadorNombreNull,
                                    Planificador:  administradorNombreNull,
                                    Responsable: responsableNombreNull,
                                    Verificador: verificadorNulll,
                                    NombreControlCambio: item.Nombre_Control_Cambio,
                                    Descripcion: this.controlesDeCambio[index].Descripcion_Control_Cambio,
                                    Estado: this.controlesDeCambio[index].estatus.Nombre_Estatus, 
                                    Prioridad : this.controlesDeCambio[index].prioridad.Nombre_Prioridad,
                                    Fecha_Solicitud: item.Fecha_Solicitud,
                                    Fecha_De_Registro : moment(this.controlesDeCambio[index].createdAt).format('DD/MM/YYYY'),
                                    Fecha_De_Inicio: fechaInicioNull,
                                    Fecha_Final: fechaFinalNull
                                     })
    }); 
    console.log( this.Reporte_ControlCambio, "Reporte");
  }
  ExportExcel(){
    return this.generateExportService.exportToExcel( this.Reporte_ControlCambio, "ReporteControlDeCambios" );
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.events.push(`${type}: ${event.value}`);
      console.log(`${type}: ${event.value}`);
      this.minDate2 = `${type}: ${event.value}`;
      this.minDate2 =  moment(this.minDate2).format('MM/DD/YYYY');
      this.MinimaFecha = new Date(this.minDate2);
      this.Sableye = false;
  }

//Funcion para hacer el decode al Token del localStorage.
    decodeToken(){
    this.usuario = this.authService.decodeToken();
    console.log(this.usuario, "Desde aqui");
    }
  testeoExport(){
   
    this.firstFormGroup.value.fechaInicioCtrl = moment(this.firstFormGroup.value.fechaInicioCtrl).format('MM/DD/YYYY');
    this.firstFormGroup.value.fechaFinalCtrl = moment(this.firstFormGroup.value.fechaFinalCtrl).format('MM/DD/YYYY');
    console.log(this.firstFormGroup.value, "Despues");

  }
}
