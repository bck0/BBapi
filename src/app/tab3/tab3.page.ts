import { Component } from '@angular/core';
import { DataService } from '../services/dataStor/data.service';
import { CardData } from '../models/data.models'
import { EventsService } from '../services/events/events.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  Data: CardData = {
    name: null,
    nickname: null,
    birthday: null,
    info: ''
  };
  constructor(private dataService: DataService, private eventsService: EventsService) {

  }


  async addData(){
    if(this.Data.birthday != null){
      this.Data.birthday = this.Data.birthday.split('T')[0];
    }
    await this.dataService.addData(this.Data);
    await this.eventsService.broadcast("loader");
    await this.dataClear();
  }
  dataClear(){
    this.Data.name = null;
    this.Data.nickname = null;
    this.Data.birthday = null;
    this.Data.info = '';
  }


}
