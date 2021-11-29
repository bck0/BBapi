import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  listData = [];

  constructor(private dataService: DataService) {
    this.loadData();
  }

  async loadData(){
    //this.listData = await this.dataService.getData();
    this.dataService.getData().subscribe(res => {
    this.listData = res;
    });
  }

  async addData(){
    await this.dataService.addData(`Simon ${Math.floor(Math.random() * 100)}`);
    this.loadData();
  }

  async removeItem(index){
    this.dataService.removeItem(index);
    this.listData.splice(index,1);
  }

}
