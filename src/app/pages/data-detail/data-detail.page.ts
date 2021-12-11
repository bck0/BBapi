import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardData } from 'src/app/models/data.models'
import { DataService } from 'src/app/services/dataStor/data.service'

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.page.html',
  styleUrls: ['./data-detail.page.scss'],
})
export class DataDetailPage implements OnInit {
  data: CardData = {
    name: null,
    nickname: null,
    birthday: null,
    info: ''
  };
  constructor(private dataService: DataService, private route: ActivatedRoute) { 
    const id = this.route.snapshot.paramMap.get("i");
    this.dataService.getItem(id).then( res => this.data = res);
  }



  ngOnInit() {
  }

}
