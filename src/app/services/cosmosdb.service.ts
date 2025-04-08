import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from '../models/filter';
import { NearbyLocations } from '../models/nearbyLocations';

const baseUrl = "https://localizaloc.azurewebsites.net/api"
const baseUrl1 = "https://localizalocapiai.azurewebsites.net/api"

const headers = { 'Access-Control-Allow-Origin': '*'};
@Injectable({
  providedIn: 'root'
})

export class CosmosdbService {
  
  constructor(private http: HttpClient) { }

  getHomeSuggested(){
    return this.http.post<any>(baseUrl+ "/homeSuggested", {headers:headers})
  }

  getTableSelected(filter: Filter){
    return this.http.post<any>(baseUrl+ "/getalllocals", filter, {headers:headers})
  }
  getSuggestedLocation(loc: string){
    let params = new HttpParams()
      .set('loc', loc.toString());
    return this.http.get<any>(baseUrl+ "/locations", {headers:headers, params:params})
  }
  getNearbyLocals(nearbyloc: NearbyLocations){
    return this.http.post<any>(baseUrl+ "/getNearbyLocals", nearbyloc, {headers:headers})
  }
  getLocalById(id: string){
    let params = new HttpParams()
    .set('id', id.toString());
    return this.http.get<any>(baseUrl+ "/getLocalById/",  {headers:headers, params: params})
  }
  getAllLocals(page: any, size: number, order: string|null){
    let params = new HttpParams()
      .set('size', size.toString());

    if (page) {
      params = params.set('page', page);
    }
    if (order) {
      params = params.set('order', order);
    }
    return this.http.get<any>(baseUrl+ `/getalllocals`, {headers:headers, params:params})
  }
  getBarrios(loc: string){
    let params = new HttpParams()
      .set('loc', loc.toString());
    return this.http.get<any>(baseUrl+ "/getBarrios", {headers:headers, params:params})
  }

  getPromptResults(prompt: string){
    let params = new HttpParams()
      .set('prompt', prompt.toString());
    return this.http.get<any>(baseUrl1+ "/promptResolver", {headers:headers, params:params})
  }

}
