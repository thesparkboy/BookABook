import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InpTextService {

  @Output() searchText: EventEmitter<string> = new EventEmitter();

  constructor() { }

  text: string = '';
  sendText(txt) {
    this.text = txt;
    this.setText();
  }

  setText() {
    this.searchText.emit(this.text);
  }

}
