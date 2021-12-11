import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.models';

@Injectable({
  providedIn: 'root'
})
export class BbService {

  apiBase = "https://www.breakingbadapi.com/api/characters/";
  constructor(private http: HttpClient) { }

  public getCharacters(){
    return this.http.get<Post[]>(this.apiBase);
  }
  public getCharacter(id){
    return this.http.get<Post>(this.apiBase + "" + id);
  }

}
