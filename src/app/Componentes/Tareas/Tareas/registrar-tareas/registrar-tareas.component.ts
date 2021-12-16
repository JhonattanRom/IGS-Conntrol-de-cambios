import { Component, OnInit }          from '@angular/core';
import { ActivatedRoute, Params }     from '@angular/router';
import { Location }                   from '@angular/common';
import { Router }                     from '@angular/router';
import {FormControl, Validators}      from '@angular/forms';

//Clases
import { Cargo }                      from '../../../../Class/cargo';
import { Usuario }                    from "../../../../Class/usuario";
import { Tarea }                      from "../../../../Class/tareas";
//Servicios
import { AuthService }                from "../../../../Service/auth.service";
import { CargosService }              from '../../../../Service/cargos.service';
import { TareasService }              from "../../../../Service/tareas.service";
import { UsuariosService }            from "../../../../Service/usuarios.service";
//Otros
import { ToastrService }              from 'ngx-toastr';
import Swal                           from "sweetalert2";

@Component({
  selector: 'app-registrar-tareas',
  templateUrl: './registrar-tareas.component.html',
  styleUrls: ['./registrar-tareas.component.css']
})
export class RegistrarTareasComponent implements OnInit {
  tarea = new Tarea();
  encargados;
  selectedEncargado: number;
  id;
  idControl;
  ID_Encargado = new FormControl('', [Validators.required]);

  constructor(private route: ActivatedRoute,
              private location: Location,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router,
              private tareasService : TareasService,
              private usuariosService:UsuariosService) {}

  ngOnInit() {
  	this.id = +this.route.snapshot.paramMap.get("id");
  	this.getEncargados();
  }
  getEncargados(){
        this.usuariosService.getUsuariobyState(true)
        	.subscribe(encargados =>{
        		this.encargados = encargados;
        		console.log(this.encargados, "lista de encargados");

        	})
 	}
 	RegistrarTarea(){
 		const data = {
			"Nombre_Tarea": this.tarea.Nombre_Tarea ,
			"Descripcion_Tarea":this.tarea.Descripcion_Tarea ,
			"ID_Encargado": this.tarea.ID_Encargado,
			"Id_Control_Cambio": this.id
 		};
 		console.log(data);
 		return this.tareasService.registrarTarea(data)
 			.subscribe(tarea => {
 				console.log(tarea, "envio tarea");
 			}, err => {
 				console.log(err);
 			})
 	}
 	

}
