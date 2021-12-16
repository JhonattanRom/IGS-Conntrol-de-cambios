import { Component, OnInit, 
         VERSION, 
         ViewChild}                   from '@angular/core';
import { Router }                     from '@angular/router';
import { Location }                   from '@angular/common';
import { ActivatedRoute, Params }     from '@angular/router';
import {FormBuilder,
        FormGroup,
        Validators,
        FormControl}                   from '@angular/forms';
import {SelectionModel}                from '@angular/cdk/collections';
import {MatTableDataSource}            from '@angular/material/table';
import {MatDatepickerInputEvent}       from '@angular/material/datepicker';
import {MatPaginator}                  from '@angular/material/paginator';
//Clases
import { ControlDeCambio }            from '../../../Class/ControlDeCambio';
import { Usuario }                    from "../../../Class/usuario";
import { Prioridad }                  from "../../../Class/prioridad";
import { Servicio }                   from "../../../Class/servicio";
//Servicios
import { AuthService }                from "../../../Service/auth.service";
import { CargosService }              from '../../../Service/cargos.service';
import { ControlCambioService }       from '../../../Service/control-cambio.service';
import { PrioridadesService }         from "../../../Service/prioridades.service";
import { ServiciosService }           from "../../../Service/servicios.service";
import { UsuariosService }            from "../../../Service/usuarios.service";
import { ClientesService }            from "../../../Service/clientes.service";    
//Otros
import { ToastrService }              from 'ngx-toastr';
import * as moment                    from 'moment';
import { MatStepper }                 from '@angular/material/stepper';
export interface Tickets {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-actualizar-planificacion',
  templateUrl: './actualizar-planificacion.component.html',
  styleUrls: ['./actualizar-planificacion.component.css']
})
export class ActualizarPlanificacionComponent implements OnInit {
  FechaCreacion;
  maxDate;
  minDate2;
  buscador = "";
  buscarod2 = "";
  usuario = new Usuario;
  MinimaFecha;
  Sableye: boolean = true;
  events: string[] = [];
  id;
  usuarios: Array<any> = [];
  clientes;
  selectedPrioridad: number;
  selectedServicios: number;
  selectedResponsable: number;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  TherdFormGroup: FormGroup;
  controlCambio = new ControlDeCambio;
  Id_responsable = new FormControl('', [Validators.required]);
  Fecha_Inicio = new FormControl('', [Validators.required]);
  displayedColumns: string[] = ['Nombre', 'Apellido', 'Correo', 'Cargo', "Seleccionar"];
  dataSource;
  displayedColumns2: string[] = ['Nombre', 'Sucursal', 'Telefono', "Seleccionar"];
  dataSource2;
  Cliente : Array<any> = [];
  Team : Array<any> = [];
  @ViewChild('stepper', {static: false}) stepper: MatStepper;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('SucursalPaginator', { read: MatPaginator, static: true  }) 
   SucursalPaginator: MatPaginator;
  estados: Tickets[] = [
        {value: '0', viewValue: 'Todos'},
        {value: 'true', viewValue: 'Habilitados'},
        {value: 'false', viewValue: 'Deshabilitados'}
      ];
   cargos = [];
  constructor(private authService:AuthService ,
			  private controlCambioService:ControlCambioService,
			  private prioridadesService:PrioridadesService,
			  private serviciosService:ServiciosService,
			  private toastrService:ToastrService,
			  private usuariosService: UsuariosService,
              private clientesService: ClientesService,
              private _formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private cargosService: CargosService) { }

  ngOnInit() {
  	this.decodeToken();
  	this.getPrioridades();
  	this.getServicios();
  	this.getClientes();
  	this.getPersonal();
  	this.getCargos();
  	const id = +this.route.snapshot.paramMap.get("id");
  	this.controlCambioService.getControlCambio(id)
  		.subscribe(control => {
  			this.FechaCreacion = moment(control.createdAt).format('MM/DD/YYYY');
  			console.log(this.FechaCreacion, "Esta es lal fecha");
  			console.log(control.createdAt, "Esta es la fecha desde bd");
			this.maxDate = new Date(this.FechaCreacion);
  			this.controlCambio = control;
  			this.selectedResponsable = this.controlCambio.Id_responsable;

  			console.log(this.controlCambio, "este es el control");

  		}, err => {
  			console.log(err);
  		});

  	this.firstFormGroup = this._formBuilder.group({
      Id_Responsable: [1, Validators.required],
      fechaInicioCtrl: ["" , Validators.required],
      fechaFinalCtrl: ["", [Validators.required]]
    });
    this.secondFormGroup = this._formBuilder.group({
     secondCtrl: ['', Validators.required],
     buscador: [''],
    });
    this.TherdFormGroup = this._formBuilder.group({
      Clientes: ['', Validators.required],
      buscador2: [''],
    });

  }
  getCargos(){
  	return this.cargosService.getCargos()
  		.subscribe(cargos => {
  			console.log(cargos, "lista de cargos");
  			this.cargos.push({value: "0", 
  					              viewValue: "Todos"})
  			cargos.forEach((item, index)=>{
  				this.cargos.push({value: cargos[index].Id_tipo_cargo, 
  					              viewValue: cargos[index].Nombre_cargo})
  			})
  			console.log(this.cargos);
  		})
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
  applyFilter2(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    console.log(filterValue, "Esto es lo que busco2");
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.events.push(`${type}: ${event.value}`);
      console.log(`${type}: ${event.value}`);
      this.minDate2 = `${type}: ${event.value}`;
      this.minDate2 =  moment(this.minDate2).format('MM/DD/YYYY');
      this.MinimaFecha = new Date(this.minDate2);
      this.Sableye = false;
  }
  getControlCambio(){
  	this.id = +this.route.snapshot.paramMap.get("id");
  	return this.controlCambioService.getControlCambio(this.id)
  		.subscribe(control => {
  			this.controlCambio = control;
  			console.log(this.controlCambio);
  		})
  		/*.subscribe(control=> {
  			this.controlCambio = control;
  			console.log(this.controlCambio, "este es el control");
  		})*/
  }
  getPrioridades(){
  	return this.prioridadesService.getPrioridades()
  		.subscribe(prioridades =>{
  			console.log(prioridades);
  		})
  }
  getServicios(){
  	return this.serviciosService.getServicios()
  		.subscribe(servicios=>{
  			console.log(servicios);
  		})
  }
  getClientes(){
  	return this.clientesService.getClientesbyState(true)
        .subscribe(
            clientes => {
              var ArrayClientes: Array<any> = []; 
              console.log(clientes, "Estos son los clientes!!");
              clientes.forEach((item, index) => {
                ArrayClientes.push(item);
                ArrayClientes[index]["check"] = false;
                ArrayClientes[index]["Empresa"] = clientes[index].empresas.Nombre_empresa;                
              });
              this.clientes = ArrayClientes;
              this.dataSource2 = new MatTableDataSource<any>(this.clientes); 
              this.dataSource2.paginator = this.SucursalPaginator;           
            }, err => {
              console.log(err);
            }
      );
  }
  getPersonal(){
    return this.usuariosService.getUsuariobyState(true)
        .subscribe(
            personal => {
              var ArrayPersonal: Array<any> = []; 
              console.log(personal, "Estos son los usuarios!!");
              personal.forEach((item, index) => {
                ArrayPersonal.push(item);
                ArrayPersonal[index]["check"] = false; 
              });

              this.usuarios = ArrayPersonal;
              this.usuarios.forEach((item, index)=> {
              	this.usuarios[index]["Cargo"] = this.usuarios[index].cargos.Nombre_cargo;
              })
              this.dataSource = new MatTableDataSource<any>(this.usuarios); 
              this.dataSource.paginator = this.paginator;
            }, err => {
              console.log(err);
            }
      );
  }
  decodeToken(){
    this.usuario = this.authService.decodeToken();
    console.log(this.usuario, "Desde aqui");
  }
  move(index: number) {
    //console.log("Se tiene un equipo para el cc");
    this.stepper.selectedIndex = index;
  }
  moveOptionalEquipo(index: number) {
 
  this.usuarios.forEach((item, index) => {
    if (this.usuarios[index].check == true) {
      this.Team.push(this.usuarios[index].Id_Usuario)
    }
    if(this.usuarios[index].check == false){
      //this.Team.pop(this.usuarios[index].Id_Usuario)
      this.Team.splice(index, 1);
    }
  })
  console.log(this.Team, "Este es el team");
  if (this.Team.length < 1) {
    console.log("Indique el equipo de trabajo");
  }else{
    console.log("Se tiene un equipo para el cc");
    this.stepper.selectedIndex = index;
  }
   
  }
  moveOptionalClientes(index: number) {
  
  this.clientes.forEach((item, index) => {
    if (this.clientes[index].check == true) {
      this.Cliente.push(this.clientes[index].Id_sucursal)
    } 
  })
  console.log(this.Cliente, "Este es el cliente");
  if (this.Cliente.length < 1) {
    console.log("Indique el cliente");
  }else{
    console.log("Se tiene un cliente para el cc");
    this.stepper.selectedIndex = index;
  }
  }

  EditarPlanificacion(){
  	console.log(this.firstFormGroup, "Primero" );
  	console.log(this.secondFormGroup, "Segundo" );
  	console.log(this.TherdFormGroup, "Tercero" );
  }

}
