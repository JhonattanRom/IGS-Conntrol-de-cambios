import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Posts } from '../Interface/posts';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http: HttpClient) {
console.log("is working");
  }

  getData(){
  	return this.http.get<Posts[]>('https://jsonplaceholder.typicode.com/posts');
  }
}
