import { Injectable }    from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private heroesUrl = 'https://vps321788.ovh.net';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl+"/api/v1/heroes")
               .toPromise()
               .then(response => response.json() as Hero[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
  console.error('An error occurred', error); // for demo purposes only
  return Promise.reject(error.message || error);
  }

  private headers = new Headers({ 'Authorization': 'Basic ' + btoa("admin" + ":" + "lauri123"), 'Content-Type': 'application/hal+json', 'X-CSRF-Token' : '<6GF2YcbX5bVAesgFl0E2Lp3Fi9VhsKksWACz4VOGHw8>'});

  create(title: string): Promise<Hero> {
  return this.http
    .post(`${this.heroesUrl}/entity/node?_format=hal_json`, JSON.stringify({"_links":{"type":{"href":"https://vps321788.ovh.net/rest/type/node/heroes"}},"title":[{"value":title}],"type":[{"target_id":"heroes"}]}), {headers: this.headers})
    .toPromise()
    .then(res => res.json().data)
    .catch(this.handleError);
  }

  delete(nid: number): Promise<void> {
  let url = `${this.heroesUrl}/node/${nid}?_format=hal_json`;
  return this.http
    .delete(url, {headers: this.headers})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/node/${hero.nid}?_format=hal_json`;
    return this.http
      .patch(`${this.heroesUrl}/node/${hero.nid}?_format=hal_json`, JSON.stringify({"_links":{"type":{"href":"https://vps321788.ovh.net/rest/type/node/heroes"}},"title":[{"value":hero.title}],"type":[{"target_id":"heroes"}]}), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  getHero(nid: number): Promise<Hero> {
    return this.getHeroes()
             .then(heroes => heroes.find(hero => hero.nid == nid));
  }
}


