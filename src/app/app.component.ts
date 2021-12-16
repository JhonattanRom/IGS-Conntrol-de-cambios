import { Component } from '@angular/core';
import {DataService} from './Service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FaztAngular';
  posts = [];
constructor (private dataService: DataService){
this.dataService.getData().subscribe(data => {
	this.posts = data;
}); 


}


}
