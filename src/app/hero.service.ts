import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return Observable.create(function (observer) {
      observer.next(HEROES)
    });
  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return Observable.create(function (observer) {
      observer.next(HEROES.find(hero => hero.id === id));
    });
  }
}

