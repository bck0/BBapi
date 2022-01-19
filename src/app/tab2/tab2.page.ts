import { Component } from '@angular/core';
import { DataService } from '../services/dataStor/data.service';
import { CardData } from '../models/data.models'
import { EventsService } from '../services/events/events.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  listData: CardData[];
  Data: CardData = {
    name: null,
    nickname: null,
    birthday: null,
    info: ''
  };
  name: string;
  info: string;
  constructor(private dataService: DataService, private eventsService: EventsService) {
    this.loadData();
  }

  ngOnInit(){
    this.eventsService.on("loader", ()=>{
      this.loadData();
      console.log("reaguje");
      //document.location.href = "/tabs/tab2";
    });
  }

  async loadData(){
    //this.listData = await this.dataService.getData();
    this.dataService.getData().subscribe(res => {
    this.listData = res;
    console.log("loading done");
    });
  }

  async addData(){
    await this.dataService.addData(this.Data);
    this.loadData();
  }

  async removeItem(index){
    this.dataService.removeItem(index);
    this.listData.splice(index,1);
  }

}
