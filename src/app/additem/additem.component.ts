import { Component , OnInit , EventEmitter , Output } from '@angular/core';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit {

  public item : string | undefined;

  public stockNames : any [] = [
    {code: "MSFT", name: "Microsoft Corporation	"} ,
    {code: "AAPL", name: "Apple Inc"} ,
    {code: "AMZN", name: "Amazon.com Inc"} ,
    {code: "GOOGL", name: "GOOGLE"} ,
    {code: "BABA", name: "Alibaba Group Holding Ltd"} ,
    {code: "JPM", name: "JP Morgan"} ,
    {code: "BAC", name: "Bank Of America"} ,
    {code: "KO", name: "Coca-Cola Company"} ,
    {code: "TSLA", name: "Tesla Inc"} ,
    {code: "BAC", name: "Bank Of America"}
  ]
  
  @Output() itemName  = new EventEmitter();

  constructor() { }

  additem(param: any):void {
    if(param !== "") {
      this.itemName.emit(param);
    }
  }

  ngOnInit(){}

}
