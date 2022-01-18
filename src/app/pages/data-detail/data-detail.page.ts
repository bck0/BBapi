import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardData } from 'src/app/models/data.models'
import { DataService } from 'src/app/services/dataStor/data.service'
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.page.html',
  styleUrls: ['./data-detail.page.scss'],
})
export class DataDetailPage implements OnInit {
  editing: boolean  = false;
  data: CardData = {
    name: null,
    nickname: null,
    birthday: null,
    info: ''
  };

  newData : CardData = {
    name : null,
    nickname : null,
    birthday : null,
    info : ''
  }
  index : string;
  constructor(private dataService: DataService, private route: ActivatedRoute, private eventsService: EventsService) { 
    const id = this.route.snapshot.paramMap.get("i");
    this.index = id;
    this.dataService.getItem(id).then( res => this.data = res);
  }

  edit(){
    this.editing = true;
    this.newData.name = this.data.name;
    this.newData.nickname = this.data.nickname;
    this.newData.birthday = this.data.birthday;
    this.newData.info = this.data.info;
  }

  async update(){
    this.dataService.updateItem(this.newData,this.index);
    this.editing = false;
    if(this.newData.birthday !== null){
      this.newData.birthday = this.newData.birthday.split('T')[0];
    }
    this.data = this.newData;
    await this.eventsService.broadcast("loader");
    console.log(this.newData);
  }

  ngOnInit() {
  }

}
