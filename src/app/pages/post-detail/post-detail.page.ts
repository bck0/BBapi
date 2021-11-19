import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.models'
import { BbService } from 'src/app/api/bb.service';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
})
export class PostDetailPage implements OnInit {

  post$: Observable<Post>;
  postone: Post;
  cat: string[];
  constructor(private bbService: BbService, private route: ActivatedRoute) {
   const id = this.route.snapshot.paramMap.get("id");
   this.post$ = this.bbService.getCharacter(id);
   this.getCategory(this.post$);
   }

   public getCategory(post$: Observable<Post>){
     this.post$.subscribe(data => {
       this.postone = data
       this.cat = this.postone[0].category.split(",");
       console.log(this.cat);
      });
   }
  ngOnInit() {
  }

}
