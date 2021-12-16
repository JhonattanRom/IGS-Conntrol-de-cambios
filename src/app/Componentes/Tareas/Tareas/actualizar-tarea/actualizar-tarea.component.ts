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
  selector: 'app-actualizar-tarea',
  templateUrl: './actualizar-tarea.component.html',
  styleUrls: ['./actualizar-tarea.component.css']
})
export class ActualizarTareaComponent implements OnInit {
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
  	this.tareasService.getTarea(this.id)
  		.subscribe(tarea => {this.tarea = tarea
			console.log(this.tarea, "lista de tareas");
      this.selectedEncargado= tarea.ID_Encargado;
      this.idControl = tarea.Id_Control_Cambio;
      console.log(this.idControl, "idControl");
      console.log(this.selectedEncargado);
  		});
  	this.getEncargados();
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
 	getEncargados(){
        this.usuariosService.getUsuariobyState(true)
        	.subscribe(encargados =>{
        		this.encargados = encargados;
        		console.log(this.encargados, "lista de encargados");

        	})
 	}
  updateTarea(){
    const data = {
      "Nombre_Tarea": this.tarea.Nombre_Tarea,
      "Descripcion_Tarea": this.tarea.Descripcion_Tarea,
      "ID_Encargado": this.tarea.ID_Encargado,
      "ID_Tarea": this.id
    };
 console.log(this.idControl, "Este es el contorl");
    this.tareasService.updateTarea(data).subscribe(data => {
      console.log(data, "esta es la data");
      console.log(this.id, "Esta es la id!!");
      console.log(this.idControl, "Este es el contorl");
      this.router.navigate(['/Home/ListarTareas/ControlCambio/'+ this.idControl]);
      this.showSuccess("Tarea actualizada");
    }, err=> {
      this.showError("Error en la actualizacion");
      console.log(err);
    })
  }
  ClickAlert(){
    Swal.fire({
  title: 'Actualizar tarea',
  text: "No podra revertir los cambios realizados!",
  icon: 'question',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Alterar'
  }).then((result) => {
  if (result.value) {
    return this.updateTarea();
   }
   })
  }
}

