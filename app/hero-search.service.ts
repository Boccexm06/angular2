import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Hero }           from './hero';

@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {}

  private heroesUrl = 'https://vps321788.ovh.net';  // URL to web api

  search(term: string): Observable<Hero[]> {
    return this.http
               .get(`${this.heroesUrl}/api/v1/heroes/?title=${term}`)
               .map((r: Response) => r.json() as Hero[]);
  }
}