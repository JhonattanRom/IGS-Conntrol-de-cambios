import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
//Servicios
import { AuthService }                       from "../../Service/auth.service";
import { ControlCambioService }              from "../../Service/control-cambio.service";
import * as moment                           from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

//Contadores
ContadorArray = [];

//Grafica para comparacion en linea
LastYear = {LastYear: moment().subtract(1, 'year').format("YYYY")};
LastYearControlCambio;
LastYearArray = [0,0,0,0,0,0,0,0,0,0,0,0];
PresentYearControlCambio;
PresentYearArray = [0,0,0,0,0,0,0,0,0,0,0,0];
//Contador de servicios
listadoServicios;
listadoPrioridades;

//Grafica 1 PresentYearControlCambio

public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    labels : {
      fontColor: 'White',
    }
  };
public barChartLabels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', "Julio", 'Agosto', "Septiembre", "Octubre", "Noviembre", "Diciembre"];
public barChartType = "bar";
public barChartLegends = true;
public barChartData = [
  {data: [0,0,0,0,0,0,0,0,0,0,0,0],label: "Año Actual"},
  {data: [0,0,0,0,0,0,0,0,0,0,0,0],label: "Año Anterior"},
];

//Grafica 2 Top servicios
labelsTopServiceArray = [];
barcharTopServiceArray = [];
public TortaChartDataChartLabels = ['Red','Yellow','Blue']
//public TortaChartDataChartOptions
public TortaChartDataChartLegends = true;
public TortaChartDataChartType =  'pie';
public TortaChartData = [10,20,30];

//Grafica 3 Prioridades Solicitadas
labelsTopPrioridadArray = [];
barcharTopPrioridadArray = [];
PriTortaChartDataChartLabels = ['Alta','Baja','Media'];
PriTortaChartDataChartType =  'pie';
PriTortaChartData = [30,50,90];;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 1 },
        { title: 'Card 4', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private controlCambioService: ControlCambioService) {}

  ngOnInit() {
    this.getPresentYearCC();
    this.getLastYearCC();
    this.getListadoServiciosContador();
    this.getPrioridades();
    this.getContadoresCC()
    
  }
  getContadoresCC(){
    return this.controlCambioService.getContadoresCC()
      .subscribe(DataCC => {
        this.ContadorArray = DataCC;
        console.log(this.ContadorArray, "Arreglo de contadores");
      })
  }
  getPrioridades(){
    return this.controlCambioService.getprioridadesSolicitadas()
      .subscribe(data =>{
        console.log(data, "Prioridades");
        this.listadoPrioridades = data;
        this.listadoPrioridades.forEach((item, index) => {
          this.labelsTopPrioridadArray.push(item["prioridades.Nombre"]);
          this.barcharTopPrioridadArray.push(item["contador"]);
          this.PriTortaChartDataChartLabels = this.labelsTopPrioridadArray;
          this.PriTortaChartData =  this.barcharTopPrioridadArray;
        })
      })
  }
  getListadoServiciosContador(){
    return this.controlCambioService. getServiceSolicitados()
     .subscribe(dataCC => {
       this.listadoServicios = dataCC;
       console.log(this.listadoServicios, "TopServicios");
       this.listadoServicios.forEach((item, index) => {
         this.labelsTopServiceArray.push(item["servicios.Nombre_servicio"]);
         this.barcharTopServiceArray.push(item.contador);
         console.log(this.labelsTopServiceArray, "labels");
         console.log(this.barcharTopServiceArray, "Cotadores");
         this.TortaChartDataChartLabels = this.labelsTopServiceArray;
         this.TortaChartData = this.barcharTopServiceArray;
       })
     })
  }
  getLastYearCC(){
    return this.controlCambioService.getLastYearCount(this.LastYear)
      .subscribe(CCData => {
        this.LastYearControlCambio = CCData;
        console.log(this.LastYearControlCambio, "holis del pasado");
        this.FormatJsnLastYear();
      }, err => {
       console.log(err);
    })
  }
  FormatJsnLastYear(){
    this.LastYearControlCambio.forEach((item, index) => {
      this.LastYearArray[(item.mes - 1)] = parseInt(item.contador)
    });
    console.log(this.LastYearArray, "Arreglo para grafica");
    //this.barChartData.push({data: this.LastYearArray, label: "Año pasado"});

  }
  getPresentYearCC(){
    return this.controlCambioService.getPrsenteYearCount().subscribe(CCdata => {
      this.PresentYearControlCambio = CCdata;
      console.log(this.PresentYearControlCambio, "holis");
      this.FormatJsnPresentYear();
    }, err => {
       console.log(err);
    })
  }
  FormatJsnPresentYear(){
    this.PresentYearControlCambio.forEach((item, index) => {
      this.PresentYearArray[(item.mes - 1)] = parseInt(item.contador)  
    });
    console.log(this.PresentYearArray);
    this.barChartData =  [{data:  this.PresentYearArray,label: "Año Actual"}]; 
    //this.barChartData.push({data: [33, 22 , 11 , 45 , 23 , 12, 33 ], label: "Año pasado"});
    this.barChartData.push({data: this.LastYearArray, label: "Año pasado"});
  }
}
