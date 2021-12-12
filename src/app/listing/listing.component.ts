import { Component, OnInit  , Input , OnChanges } from '@angular/core';
import { Stockmodel } from "../stockmodel";
import { GraphserviceService } from "../graphservice.service";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})

export class ListingComponent implements OnInit  , OnChanges {

  @Input() itemName : any;

  @Input() id : number | undefined ;

  public cbValue: boolean | undefined;

  public itemIndex: any;

  public items : Stockmodel [] = [{
    name : "AAPL" ,
    date : '' ,
    xAxis : null ,
    yAxis :  null,
    ischecked : null ,
    volume : null ,
    last_trade_time : null ,
  }];

  public data: any ;
  public subs: any ;
  public sbs2: any;

  public stockModel  = {
  } ;

  constructor( private service : GraphserviceService ) { }

  ngOnInit() {

  }
  callService(index: any , checked: any , name: string){
    this.sbs2 = this.service.getGraph(name).subscribe((res : any): void  => {
      console.log(res)
      let volume = res.data[0].volume;
      let x = res.data[0].high;
      let y = res.data[0].low;
      let last_trade_time = '2018-01-31T00:00:00+0000';
      this.items[this.itemIndex].volume = volume;
      this.items[index].yAxis = y;
      this.items[this.itemIndex].xAxis = x;
      this.items[this.itemIndex].last_trade_time = last_trade_time;
      this.createchart(index)
      }
    );
  }
  getgraph(index: number | undefined , checked: any , name: any){
    console.log(checked)
    this.itemIndex = index;
    let date = new Date();
    if(checked){
      this.callService(index , checked , name);
      this.items[this.itemIndex].date = `${date.getHours().toString()} : ${date.getMinutes().toString()} : ${date.getSeconds().toString()}`;
      this.subs = setInterval(()=>{
        this.callService(index , checked , name)
      } , 7000);
    }
    else{
      clearInterval(this.subs);

    }
  }

  createchart(id: any){
    let chart = am4core.create(id.toString() , am4charts.XYChart);
    let value = this.items[id]?.yAxis;
    let data = [{date:this.items[id].last_trade_time , value: value}];
    for(let i = 0; i < 300; i++){
      let date = new Date();
      date.setHours(0,0,0,0);
      date.setDate(i);
      value = Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 20);
      data.push({date:date, value: value });
    }

    chart.data = data;

    // Create axes
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.dateX = "date";
    series.tooltipText = "{value}";
    if(series.tooltip) {
      series.tooltip.pointerOrientation = "vertical";
    }
    

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = dateAxis;
    chart.cursor.yAxis = valueAxis;

    //chart.scrollbarY = new am4core.Scrollbar();
    //chart.scrollbarX = new am4core.Scrollbar();
  }

  ngOnChanges() {
    if(this.itemName !== undefined){
      let model = Object.create(this.stockModel)
      model.name = this.itemName;
      this.items.push(model)
    }
  }



}
