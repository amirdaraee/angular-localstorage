import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LocalStorage } from './local-storage.model';
import { LocalStorageService } from './local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  localStorageItems: LocalStorage[] = [];
  localStorageSub!: Subscription;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageSub = this.localStorageService.getItems().subscribe(
      items => {
        this.localStorageItems = items;
      }
    );
    this._initForm();
  }


  ngOnDestroy(): void {
    this.localStorageSub.unsubscribe();
  }

  private _initForm(){
    this.form = new FormGroup({
      key: new FormControl('',Validators.required),
      value: new FormControl('',Validators.required)
    });
  }

  setItem() {
    const key = this.form.controls['key']?.value;
    const value = this.form.controls['value']?.value;
    this.localStorageService.setItem(key, value);
  }

  getItem(){
    const key = this.form.get('key')?.value;
    this.localStorageService.getItem(key);
  }

  removeItem(key: string){
    this.localStorageService.removeItem(key);
  }

  clear(){
    this.localStorageService.clear();
  }
}
