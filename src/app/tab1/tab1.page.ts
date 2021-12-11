import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BbService } from '../services/api/bb.service';
import { Post } from '../models/post.models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  posts:Observable<Post[]>;
  
  
  constructor(private bbService: BbService) {
   //this.posts = this.bbService.getCharacter();
    // console.log(this.bbService.getCharacters().subscribe(data => {
    //    this.posts = data;
    //     console.log(this.posts[0].name)
    //  }));
    //this.bbService.getCharacters().subscribe(data => {this.posts = data;});
    this.posts = this.bbService.getCharacters();
  }

}
