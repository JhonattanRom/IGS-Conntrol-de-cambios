import { Component, OnInit } from '@angular/core';
import {DataService} from '../../Service/data.service';
//import {DataService} from "../Service/data.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
 
 posts = [];

  constructor(private dataService: DataService) {
	this.dataService.getData().subscribe(data => {
	this.posts = data;
	}); 
}

  ngOnInit() {
  }

}
