import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
users = ["Jhon","Doe","Fedelobo", "Romero"];
nombre: string = "Jhonattan";
edad: string = "25";
/*
nombre: string; 
apellido: string; 
direccion: {
	pais: string, 
	estado: string,
	pueblo:string,
};
juegos: Array<String>;
activated = true;


  constructor() { 
  this.nombre = 'Jhonattan';
  this.apellido = "Romero";
  this.direccion = {
  	pais: "Venezuela",
  	estado: "Nueva Esparta",
  	pueblo: "Juangriego",
  };
  this.juegos = ['Diablo 3 ', "WoW", "Lol"];
}
*/

SayHello(user:string){
	alert("Hola " + user);
}
Delete(user){
for (var i = 0 ; i < this.users.length; i++) {
	if (user == this.users[i]) {
		this.users.splice(i,1);
	}
}

}
AddUser(newUser){
//console.log(newUser);
this.users.push(newUser.value);
newUser.value= "";
newUser.focus();
	return false;
}

  ngOnInit() {
  }

}
