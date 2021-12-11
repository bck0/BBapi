import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { BehaviorSubject, from, of} from 'rxjs';
import {filter, switchMap} from "rxjs/operators";

const STORAGE_KEY = 'mylist';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private storageReady = new BehaviorSubject(false);
  constructor(private storage:Storage) { 
    this.init();
  }

  async init(){
    await this.storage.defineDriver(cordovaSQLiteDriver);
    await this.storage.create();
    this.storageReady.next(true);
  }

  getData(){
    return this.storageReady.pipe(
      filter(ready => ready),
      switchMap(_ =>{
        return from(this.storage.get(STORAGE_KEY)) || of([]);
      })
    )
  }

  async addData(item){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.push(item);
    return this.storage.set(STORAGE_KEY, storedData);
  }

  async removeItem(index){
    const storedData = await this.storage.get(STORAGE_KEY) || [];
    storedData.splice(index,1);
    return this.storage.set(STORAGE_KEY,storedData);
  }
}
