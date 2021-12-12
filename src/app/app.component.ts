import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public item : any;

  additem(param: any):void {
     this.item = param
     console.log(param)
  }
}
