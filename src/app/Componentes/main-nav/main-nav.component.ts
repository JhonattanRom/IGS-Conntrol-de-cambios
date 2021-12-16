import { Component, OnInit }                     from '@angular/core';
import { BreakpointObserver, Breakpoints }       from '@angular/cdk/layout';
import { Router }                                from '@angular/router';
import {FlatTreeControl}                         from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

//RXJS
import { Observable }                            from 'rxjs';
import { map, shareReplay }                      from 'rxjs/operators';
//Clases
import {Usuario}                                 from "../../Class/usuario";
//Servicios
import { AuthService }                           from "../../Service/auth.service";


interface Items {
  name: string;
  link?: string;
  icon?:string;
  children?: Items[];
};
const Operador: Items[] = [{
   
    name: 'Controles de Cambio',
    children: [
          {name: 'Registrar Control de cambio', link:"/Home/SolicitarControlDeCambios", icon: "list"},
          {name: 'Listar Controles de cambio', link:"/Home/ListarControlDeCambios", icon: "list"}
    ]},{
      name: "Resumen", 
      children: [
      {name: "Resumen total", link:"/Home/Resumen", icon: "list"}
      ]
    }];
const Miembro: Items[] = [{
    name: 'Controles de Cambio',
    children: [
          {name: 'Registrar Control de cambio', link:"/Home/SolicitarControlDeCambios", icon: "list"},
          {name: 'Listar Controles de cambio', link:"/Home/ListarControlDeCambios", icon: "list"}
    ]},{
      name: "Resumen", 
      children: [
      {name: "Resumen total", link:"/Home/Resumen", icon: "list"}
      ]
    }];
const Administrador: Items[] = [{
    name: 'Usuarios',
    children: [
          {name: 'Registrar Usuario', link:"/Home/RegistrarUsuario", icon: "list"},
          {name: 'Listar Usuarios', link:"/Home/ListarUsuarios", icon: "list"}
    ]},{
    name: 'Servicios',
    children: [
          {name: 'Registrar Servicio', link:"/Home/RegistrarServicio", icon: "list"},
          {name: 'Listar Servicios', link:"/Home/ListarServicios", icon: "list"}
    ]},{
    name: 'Clientes',
    children: [
          {name: 'Registrar Cliente', link:"/Home/RegistrarEmpresa", icon: "list"},
          {name: 'Listar Clientes', link:"/Home/ListarEmpresas", icon: "list"}
    ]},{
    name: 'Cargos',
    children: [
          {name: 'Registrar Cargo', link:"/Home/RegistrarCargos", icon: "list"},
          {name: 'Listar Cargos', link:"/Home/ListarCargos", icon: "list"}
    ]},{
    name: 'Controles de Cambio',
    children: [
          {name: 'Registrar Control de cambio', link:"/Home/SolicitarControlDeCambios", icon: "list"},
          {name: 'Listar Controles de cambio', link:"/Home/ListarControlDeCambios", icon: "list"}
    ]},{
    name: 'Reportes',
    children: [
          {name: 'Generar Reportes', link:"/Home/Reportes", icon: "list"}
    ]},{
      name: "Resumen", 
      children: [
      {name: "Resumen total", link:"/Home/Resumen", icon: "list"}
      ]
    }];
const Director: Items[] = [
   {
    name: 'Controles de Cambio',
    children: [
          {name: 'Registrar Control de cambio', link:"/Home/SolicitarControlDeCambios", icon: "list"},
          {name: 'Listar Controles de cambio', link:"/Home/ListarControlDeCambios", icon: "list"}
    ]},{
    name: 'Reportes',
    children: [
          {name: 'Generar Reportes', link:"/Home/Reportes", icon: "list"}
    ]},{
      name: "Resumen", 
      children: [
      {name: "Resumen total", link:"/Home/Resumen", icon: "list"}
      ]
    }];




    

interface ExampleFlatNode  {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  TREE_DATA: Items[] = Miembro;
  
  usuario = new Usuario;

  private _transformer = (node: Items, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        link: node.link,
        level: level,
      };
    }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authService: AuthService,
              private router: Router) {
    this.decodeToken();
    this.dataSource.data = this.TREE_DATA;
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  LogOut(){
  	this.authService.logOut();
  	this.router.navigate(['/']);
  }
  decodeToken(){
    this.usuario = this.authService.decodeToken();
    console.log(this.usuario, "Desde aqui");
//Cambio de estructura del menu segun el Rol del usuario.
    if (this.usuario.Id_Rol_Usuario === 1) {

      this.TREE_DATA = Administrador;

    } if (this.usuario.Id_Rol_Usuario === 2) {
       
      this.TREE_DATA = Director;

    }if (this.usuario.Id_Rol_Usuario === 3) {
      
      this.TREE_DATA = Miembro;

    }if (this.usuario.Id_Rol_Usuario === 4) {
      
      this.TREE_DATA = Operador;
     
    }
  }
   ngOnInit(): void {
    this.TREE_DATA = [];
    this.decodeToken();

  }
}
