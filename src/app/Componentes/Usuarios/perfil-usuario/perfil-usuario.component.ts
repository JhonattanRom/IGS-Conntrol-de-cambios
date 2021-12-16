import { Component, OnInit }                 from '@angular/core';

import { AuthService }                       from "../../../Service/auth.service";
import { UsuariosService }                   from "../../../Service/usuarios.service";
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
usuario;
perfilData  = [];
  constructor(private authService : AuthService,
              private usuariosService: UsuariosService ) { }

  ngOnInit() {
  	this.decodeToken();
  	this.getDataUserPerfil();
  }
  getDataUserPerfil(){
  	return this.usuariosService.DatosPerfil(this.usuario)
  		.subscribe(DataUser => {
  			this.perfilData = DataUser;
  			console.log(DataUser, "Esta es la data del usuario");
  		})
  }
//Funcion para hacer el decode al Token del localStorage.
    decodeToken(){
    this.usuario = this.authService.decodeToken();
    console.log(this.usuario, "Desde aqui");
    console.log(this.usuario.Id_Usuario, "Id");
    }
}
