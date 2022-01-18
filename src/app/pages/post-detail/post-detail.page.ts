import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.models'
import { BbService } from 'src/app/services/api/bb.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { LoadingController, Platform} from '@ionic/angular';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {

  post$: Observable<Post>;
  postone: Post;
  cat: string[];
  constructor(private bbService: BbService, private route: ActivatedRoute, private loadingCtrl: LoadingController) {
   const id = this.route.snapshot.paramMap.get("id"); 
   this.post$ = this.bbService.getCharacter(id);
   this.cat = [];
   this.getCategory(this.post$);
   }


  async getCategory(post$: Observable<Post>){
       const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();

     this.post$.subscribe({
      next: data => {
       this.postone = data
       this.cat = this.postone[0].category.split(",");
       console.log(this.cat);
      },
       error: data=>{
         console.log("err")
       },
       complete: () => {
              console.log('complete')
              loading.dismiss();
           }
      });
   }
  ngOnInit() {
  }

}
