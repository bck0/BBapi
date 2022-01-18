import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BbService } from '../services/api/bb.service';
import { Post } from '../models/post.models';
import { LoadingController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // posts:Observable<Post[]>;
  posts:Post[];
  
  
  constructor(private bbService: BbService, private loadingCtrl: LoadingController) {
  this.loading();
  }

  async loading(){
    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();

    this.bbService.getCharacters().subscribe({
      next: data => {
        this.posts = data;
     },
     error: data => {
      console.log('err')
     },
     complete: () => {
        console.log('complete')
        loading.dismiss();
     }
    });

  }

}
