import { Component, OnInit }                 from '@angular/core';
import {animate, 
        state, 
        style, 
        transition, 
        trigger}                             from '@angular/animations';
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
import { ReportesService }                   from "../../../Service/reportes.service";
//Otros
import { ToastrService }                     from 'ngx-toastr';
import Swal                                  from "sweetalert2";
import * as moment                           from 'moment';
@Component({
  selector: 'app-solicitar-reporte',
  templateUrl: './solicitar-reporte.component.html',
  styleUrls: ['./solicitar-reporte.component.css']
})
export class SolicitarReporteComponent implements OnInit {
	//usuario logeado
  usuario = new Usuario;
  Reporte_ControlCambio = [];
  firstFormGroup: FormGroup;
  personal = [];
  ReportePersonalCC: any[];
  ID_Personal;
  constructor(private controlCambioService: ControlCambioService,
              private authService: AuthService,
              private toastr: ToastrService,
              private generateExportService: GenerateExportService,
              private _formBuilder: FormBuilder,
              private usuariosService: UsuariosService,
              private reportesService: ReportesService) { }

  
   ngOnInit() {

    this. getEncargados();
    this.decodeToken();
    
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
   //Funcion para hacer el decode al Token del localStorage.
    decodeToken(){
    this.usuario = this.authService.decodeToken();
    console.log(this.usuario, "Desde aqui");
    }
    
    testeoExport(){
   
    this.firstFormGroup.value.fechaInicioCtrl = moment(this.firstFormGroup.value.fechaInicioCtrl).format('MM/DD/YYYY');
    this.firstFormGroup.value.fechaFinalCtrl = moment(this.firstFormGroup.value.fechaFinalCtrl).format('MM/DD/YYYY');
    
    
    var dateInit = moment(this.firstFormGroup.value.fechaInicioCtrl).toISOString();
    this.firstFormGroup.value.fechaInicioCtrl = moment(dateInit).format("YYYY-MM-DD HH:mm:ss-SS");
    console.log(this.firstFormGroup.value.fechaInicioCtrl, "Fecha inicial");

    var dateEnd =  moment(this.firstFormGroup.value.fechaFinalCtrl).toISOString();
    this.firstFormGroup.value.fechaFinalCtrl = moment(dateEnd).add(10, 'ms').format("YYYY-MM-DD HH:mm:ss-SS");
    console.log(this.firstFormGroup.value.fechaFinalCtrl, "Fecha Final")
    
    
    console.log(this.firstFormGroup.value, "Despues");

    return this.reportesService.getdataReportPersonal(this.firstFormGroup.value)
    		.subscribe(data =>{
          this.ReportePersonalCC = data;
          console.log(this.ReportePersonalCC, "Esta es la data");
          this.ExportExcel();
    			console.log(data)
    		}, err => {
    			console.log(err);
    		})
  	}


    FormatearJsonControlCambos(){
    
    this.ReportePersonalCC.forEach((item, index) => {
      var evaluadorNombreNull;
      var administradorNombreNull;
      var responsableNombreNull;
      var estadoNull;
      var fechaInicioNull;
      var fechaFinalNull;
      var verificadorNulll;
      console.log(this.ReportePersonalCC[index]["solicitante.Nombre_Usuario"], "Muestra algo agu");
      //Evaluador
      if (this.ReportePersonalCC[index]["evaluador.Nombre_Usuario"] === null) {
        evaluadorNombreNull = "Por Definir";
      }else {
        evaluadorNombreNull = this.ReportePersonalCC[index]["evaluador.Nombre_Usuario"]  + " " +
                              this.ReportePersonalCC[index]["evaluador.Apellido_Usuario"] ;
      }
      //Administrador
      if (this.ReportePersonalCC[index]["administrador.Nombre_Usuario"] === null) {
        administradorNombreNull = "Por Definir";
      }else {
        administradorNombreNull = this.ReportePersonalCC[index]["administrador.Nombre_Usuario"] + " " +
                              this.ReportePersonalCC[index]["administrador.Apellido_Usuario"];
      }
      //Responsable
      if (this.ReportePersonalCC[index]["responsable.Nombre_Usuario"] === null) {
        responsableNombreNull = "Por Definir";
      }else {
        responsableNombreNull = this.ReportePersonalCC[index]["responsable.Nombre_Usuario"] + " " +
                              this.ReportePersonalCC[index]["responsable.Apellido_Usuario"];
      }
      //Verificador
      if (this.ReportePersonalCC[index]["verificador.Nombre_Usuario"] === null) {
        verificadorNulll = "Por Definir";
      }else {
        verificadorNulll = this.ReportePersonalCC[index]["verificador.Nombre_Usuario"] + " " +
                              this.ReportePersonalCC[index]["verificador.Apellido_Usuario"];
      }
      //FechaInicioFinal
      if (this.ReportePersonalCC[index].Fecha_Inicio === null || this.ReportePersonalCC[index].Fecha_Final === null) {
        fechaInicioNull = "Por Definir";
        fechaFinalNull = "Por Definir";
      }else {
        fechaInicioNull = moment(this.ReportePersonalCC[index].Fecha_Inicio).format('DD/MM/YYYY');
        fechaFinalNull = moment(this.ReportePersonalCC[index].Fecha_Final).format('DD/MM/YYYY');
      }
        this.Reporte_ControlCambio.push({ID: item.Id_Control_Cambio, 
                                    Solicitante:  this.ReportePersonalCC[index]["solicitante.Nombre_Usuario"] +" " 
                                    +  this.ReportePersonalCC[index]["solicitante.Apellido_Usuario"],
                                    Evaluador:  evaluadorNombreNull,
                                    Planificador:  administradorNombreNull,
                                    Responsable: responsableNombreNull,
                                    Verificador: verificadorNulll,
                                    NombreControlCambio: item.Nombre_Control_Cambio,
                                    Descripcion: this.ReportePersonalCC[index].Descripcion_Control_Cambio,
                                    Estado: this.ReportePersonalCC[index]['estatus.Nombre_Estatus'], 
                                    Prioridad : this.ReportePersonalCC[index]['prioridad.Nombre_Prioridad'],
                                    Fecha_Solicitud: item.Fecha_Solicitud,
                                    Fecha_De_Registro : moment(this.ReportePersonalCC[index].createdAt).format('DD/MM/YYYY'),
                                    Fecha_De_Inicio: fechaInicioNull,
                                    Fecha_Final: fechaFinalNull
                                    });
      this.ID_Personal =  item.Id_Control_Cambio;
    }); 
    console.log( this.Reporte_ControlCambio, "Reporte");
  }
   ExportExcel(){
    this.FormatearJsonControlCambos();
    return this.generateExportService.exportToExcel( this.Reporte_ControlCambio, "ReportesPersonal" + this.ID_Personal  );
  }
}
