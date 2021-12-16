import { Component, OnInit }          from '@angular/core';
import { ActivatedRoute, Params }     from '@angular/router';
import { Location }                   from '@angular/common';
import { Router }                     from '@angular/router';
//Tareas
import { Comentario }                 from "../../../../Class/comentario";
import { Usuario }                    from "../../../../Class/usuario";
import { Tarea }                      from "../../../../Class/tareas";
//Servicios
import { ComentariosService }         from "../../../../Service/comentarios.service";
import { AuthService }                from "../../../../Service/auth.service";
import { TareasService }              from "../../../../Service/tareas.service";

//Otros
import { ToastrService }              from 'ngx-toastr';
import Swal                           from "sweetalert2";

/*
estados: Tickets[] = [
        {value: '0', viewValue: 'Todos'},
        {value: 'true', viewValue: 'Habilitados'},
        {value: 'false', viewValue: 'Deshabilitados'}
      ];
*/

  

@Component({
  selector: 'app-listar-comentarios',
  templateUrl: './listar-comentarios.component.html',
  styleUrls: ['./listar-comentarios.component.css']
}) 
export class ListarComentariosComponent implements OnInit {
	Comentarios:  Comentario[] = [];
  usuario = new Usuario();
  tarea = [];
  id = 1;
	Comentarioss = [
		{ID_Comentario: 0,
		 Comentario: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt velit commodi necessitatibus.',
		 ID_Encargado: 1},
		 {ID_Comentario: 1,
		 Comentario: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt velit commodi necessitatibus.',
		 ID_Encargado: 1},
		 {ID_Comentario: 2,
		 Comentario: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt velit commodi necessitatibus.',
		 ID_Encargado: 3},
	]
  constructor(private comentariosService: ComentariosService,
              private route: ActivatedRoute,
              private location: Location,
              private toastr: ToastrService,
              private router: Router,
              private authService: AuthService,
              private tareasService: TareasService ) { }


  ngOnInit() {
      this.decodeToken();
      this.id = +this.route.snapshot.paramMap.get("id");
      console.log(this.id, "Esta s la id!!!!");
      this.getTarea();
      this.getComentarios();
  }
  test (data) {
  	console.log(data);
  }
  /*agegarComentario(comentario){
  	const ID_Comentario = 4;
    console.log(comentario.value, "Valor");
  	this.Comentarios.push({
  	  	     Comentario: ID_Comentario  ,
  			 Comentario: comentario.value,
  			 ID_Encargado: 1});
  	console.log(this.Comentarios, "Listado");
  }*/
  getTarea(){
    return this.tareasService.getTarea(this.id).subscribe(tarea =>{
      console.log(tarea, "esta es la tarea");
      this.tarea.push(tarea);
      console.log(this.tarea.length);
    }, error => {
      console.log(error);
    })
  }
  getComentarios(){
    return this.comentariosService.getComentarios(this.id)
        .subscribe(comentarios => {
          console.log(comentarios, "Estos son los comentarios!!! bby");
          this.Comentarios = comentarios;
          console.log(this.Comentarios, "Comentaritos!!");
    }, error => {
      console.log(error);
    })
  }
  AddComentarios(comentario){
    //return this.comentariosService.
    var data = {
      "Comentario" : comentario.value,
      "ID_Tarea" : this.id,
      "ID_Encargado" : this.usuario.Id_Usuario
    }
    return this.comentariosService.addComentarios(data).subscribe(data => {
      console.log(data);
      this.getComentarios()
    }, error => {
      console.log(error);
    })
  }
  //Funcion para hacer el decode al Token del localStorage.
    decodeToken(){
    this.usuario = this.authService.decodeToken();
    console.log(this.usuario, "Desde aqui");
    }
}
