import { Injectable , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraphserviceService implements OnInit {

  constructor(private http: HttpClient){}

  ngOnInit(){}

  getGraph(name: string) {
    

    let url = `http://api.marketstack.com/v1/eod?access_key=9ae6262c95af2874c6aed381adea88c8&symbols=${name}`
    return this.http.get(url)
  }

}
