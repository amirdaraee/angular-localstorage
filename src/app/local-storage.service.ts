import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LocalStorage } from './local-storage.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private _localStorage!: Storage;
  private _items = new BehaviorSubject<LocalStorage[]>([]);

  constructor() {
    this._localStorage = localStorage;
    this._items.next(this._getItems());
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
    this._items.next(this._getItems());
  }

  getItem(key: string) {
    return JSON.parse(this._localStorage.getItem(key) || 'null');
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    this._items.next(this._getItems());
  }

  clear() {
    localStorage.clear();
    this._items.next(this._getItems());
  }

  getItems() {
    return this._items.asObservable();
  }

  private _getItems(): LocalStorage[] {
    const items: LocalStorage[] = [];
    for (let i = 0; i < this._localStorage.length; i++) {
      const key = this._localStorage.key(i);
      if (key) {
        const value = this._localStorage.getItem(key);
        items.push(new LocalStorage(key, value));
      }
    }
    return items;
  }
}
