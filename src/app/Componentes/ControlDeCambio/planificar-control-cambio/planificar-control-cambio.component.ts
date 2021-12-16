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






@Component({
  selector: 'app-planificar-control-cambio',
  templateUrl: './planificar-control-cambio.component.html',
  styleUrls: ['./planificar-control-cambio.component.css']
})
export class PlanificarControlCambioComponent implements OnInit {

  usuario = new Usuario;
  FechaActual = moment().format('MM/DD/YYYY');
  minDate = new Date(this.FechaActual);
  maxDate = new Date(2100, 0, 1);
  minDate2;
  MinimaFecha;
  Sableye: boolean = true;
  controlCambio = new ControlDeCambio;
  usuarios: Array<any> = [];
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  TherdFormGroup: FormGroup;
  Id_responsable = new FormControl('', [Validators.required]);
  Fecha_Inicio = new FormControl('', [Validators.required]);
  Cliente : Array<any> = [];
  Team : Array<any> = [];
  clientes;
  PlanDeAccion;
  buscador = "";
  buscarod2 = "";
  events: string[] = [];
  roomsFilter: any = {};
  checked = false;
  displayedColumns: string[] = ['Nombre', 'Apellido', 'Correo', 'Cargo', "Seleccionar"];
  dataSource;
  displayedColumns2: string[] = ['Nombre', 'Sucursal', 'Telefono', "Seleccionar"];
  dataSource2;
  msgError;
 
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  @ViewChild('stepper', {static: false}) stepper: MatStepper;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild('SucursalPaginator', { read: MatPaginator, static: true  }) 
   SucursalPaginator: MatPaginator;

  constructor(private _formBuilder: FormBuilder,
              private usuariosService: UsuariosService,
              private clientesService: ClientesService,
              private controlCambioService: ControlCambioService,
              private authService : AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Panificacion Realizada!', 'Planificacion', {
      progressBar: true
    });
  }
  showError(msgError: string) {
    this.toastr.error(msgError ,'Error en la Planificacion',{
      progressBar: true
    });

  }

  ngOnInit() {
    this.decodeToken();
    this.getClientes();
    this.getPersonal();

  	this.firstFormGroup = this._formBuilder.group({
      Id_Responsable: ['', Validators.required],
      fechaInicioCtrl: ["" , Validators.required],
      fechaFinalCtrl: ["", [Validators.required]]
    });
    this.secondFormGroup = this._formBuilder.group({
     secondCtrl: ['', Validators.required],
     buscador: [""]
    });
    this.TherdFormGroup = this._formBuilder.group({
      Clientes: ['', Validators.required],
      buscador2: [""]
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue, "Esto es lo que busco");
  }
  applyFilter2(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    console.log(filterValue, "Esto es lo que busco2");
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
  ReunirEquipo(){
    var Team : Array<any> = [];
    this.usuarios.forEach((item, index) => {
      if (this.usuarios[index].check == true) {
        Team.push(this.usuarios[index].Id_Usuario)
      }
      console.log(Team, "Este es el team");
       
    })
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.events.push(`${type}: ${event.value}`);
      console.log(`${type}: ${event.value}`);
      this.minDate2 = `${type}: ${event.value}`;
      this.minDate2 =  moment(this.minDate2).format('MM/DD/YYYY');
      this.MinimaFecha = new Date(this.minDate2);
      this.Sableye = false;
  }

  goForward(stepper: MatStepper){
    console.log("hola");
    stepper.next();
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


  move(index: number) {
    //console.log("Se tiene un equipo para el cc");
    this.stepper.selectedIndex = index;
  }

private Test(){
  console.log(this.firstFormGroup , "datos generales");
}

  private PlanificarCC(){

 console.log(this.Team.length, "longitud de Team");
 console.log(this.Cliente.length, "longitud de Cliente");

    if (this.Team.length == 0) {
      //alert("Equipo vacio!!! muestra un alerta linda");
      this.msgError = "No posee un cliente seleccionado"
      this.showError(this.msgError);
    }
     if (this.Cliente.length == 0) {
      //alert("Cliente vacio!!! muestra un alerta linda");
      this.msgError = "No posee un equipo seleccionado";
      this.showError(this.msgError);
    } 
    if (this.Team.length > 0 && this.Cliente.length > 0){
      
        const id = +this.route.snapshot.paramMap.get("id");
    console.log(id);
    console.log(this.controlCambio);
    //Estos es el equipo para el control de cambios
    console.log(this.Team, "Estos sn los datos del equipo enviados desde el btn de panificacion");
    //Estos son los clientes para el control de cambios
    console.log(this.Cliente, "Estos sn los datos de los clientes enviados desde el btn de panificacion");
    
    this.PlanDeAccion = {
      Id_administrador: this.usuario.Id_Usuario,
      Fecha_Inicio: this.firstFormGroup.value.fechaInicioCtrl,
      Fecha_Final: this.firstFormGroup.value.fechaFinalCtrl,
      Id_responsable:this.firstFormGroup.value.Id_Responsable,
      Equipo: this.Team,
      Clientes: this.Cliente
    };

    console.log(this.PlanDeAccion, "Este es el plan de accion");
    this.controlCambio.Id_administrador = this.usuario.Id_Usuario;
    this.controlCambio.Id_responsable = this.firstFormGroup.value.Id_Responsable;
    this.controlCambio.Fecha_Inicio = this.firstFormGroup.value.fechaInicioCtrl;
    this.controlCambio.Fecha_Final = this.firstFormGroup.value.fechaFinalCtrl;

    //Aqui deberia realizar el update
    return this.controlCambioService.planificarControlCambio(id,this.PlanDeAccion)
         .subscribe( async res => {
           
           this.showSuccess();
           this.router.navigate(['/Home/ListarControlDeCambios']); 
        }, err => {
          console.log(err);
        });
    }
    
  }

  //Funcion para hacer el decode al Token del localStorage.
    decodeToken(){
    this.usuario = this.authService.decodeToken();
    console.log(this.usuario, "Desde aqui");
    }
  }


/*
Apellido_Usuario: "Romero"
Cedula_Usuario: "22.998.686"
Correo_Usuario: "Kollon01@gmail.com"
Estado_Usuario: true
Id_Cargo_Usuario: 1
Id_Rol_Usuario: 1
Id_Usuario: 1
Nombre_Usuario: "Jhonattan"
Password_Usuario: "MiContraseña"
cargos: {Id_tipo_cargo: 1, Nombre_cargo: "Desarrollador", Descripcion_cargo: "Se encarga de programar paginas webs para clientes", Estado_cargo: false, createdAt: "2020-01-24T13:25:38.633Z", …}
createdAt: "2020-01-24T13:25:38.637Z"
roles: {Id_Rol: 1, Nombre_Rol: "Administrador", Descripcion_Rol: "Todos los permisos del sistema garantizados", createdAt: "2020-01-24T13:25:38.581Z", updatedAt: "2020-01-24T13:25:38.581Z"}
updatedAt: "2020-01-24T13:25:38.637Z"
*/