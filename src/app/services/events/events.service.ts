import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
/**
 * Globální eventy
 *
 * Třída umožňující globální eventy mezi celou aplikací
 * - pro vyslání eventu je metoda broadcast('event-name', args)
 * - pro přidání posluchače je metoda on('event-name', callbackFx())
 * - pro odebrání posluchače je metoda off('event-name', callbackFx())
 */
  private _listeners: any;
  private _eventsSubject = new Subject();
  private _events: any;

  constructor() {
      this._listeners = {};
      this._eventsSubject = new Subject();

      this._events = this._eventsSubject.asObservable();

      this._events.subscribe(
          ({name, args}) => {
              if (this._listeners[name]) {
                  for (const listener of this._listeners[name]) {
                      listener(...args);
                  }
              }
          });
  }

  /**
   * Umožňuje přidat posluchače a získávat data
   */
  on(name, listener) {
      if (!this._listeners[name]) {
          this._listeners[name] = [];
      }

      this._listeners[name].push(listener);
  }

  /**
   * Odebere posluchače ze seznamu posluchačů
   */
  off(name, listener) {
      this._listeners[name] = this._listeners[name].filter(x => x !== listener);
  }

  /**
   * Vyšle zprávu všem posluchačům připojených na name
   */
  broadcast(name, ...args) {
      this._eventsSubject.next({
          name,
          args
      });
  }
}
