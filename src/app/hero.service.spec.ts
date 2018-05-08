import { TestBed, inject } from '@angular/core/testing';
import { anything, instance, mock, verify, when } from 'ts-mockito';

import { HttpClient, HttpEvent } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';
import { Hero } from './hero';
import { HEROES } from './testing/stubs/heroes.const';

describe('HeroService', () => {
  const heroesUrl = 'api/heroes';
  const httpClient: HttpClient = mock(HttpClient);
  const messageService: MessageService = mock(MessageService);
  const hero = { id: 11, name: 'Hero' } as Hero;

  beforeEach(() => {
    when(httpClient.get<Hero[]>(heroesUrl)).thenReturn(of(HEROES));
    when(httpClient.get<Hero>(heroesUrl + '/1')).thenReturn(of(HEROES[1]));
    when(httpClient.put<Hero>(heroesUrl, hero, anything())).thenReturn(of({} as HttpEvent<Hero>));
    when(httpClient.post<Hero>(heroesUrl, hero, anything())).thenReturn(of({} as HttpEvent<Hero>));
    when(httpClient.delete<Hero>(heroesUrl + '/11', anything())).thenReturn(of({} as HttpEvent<Hero>));

    TestBed.configureTestingModule({
      providers: [
        HeroService,
        { provide: HttpClient, useValue: instance(httpClient) },
        { provide: MessageService, useValue: instance(messageService) }
      ]
    });
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  it('should getHeroes', inject([HeroService], (service: HeroService) => {
    let actual: Hero[];
    service.getHeroes().subscribe(heroes => actual = heroes);
    expect(actual).toEqual(HEROES);
  }));

  it('should getHero by id', inject([HeroService], (service: HeroService) => {
    let actual: Hero;
    service.getHero(1).subscribe(h => actual = h);
    expect(actual).toEqual(HEROES[1]);
  }));

  it('should updateHero', inject([HeroService], (service: HeroService) => {
    service.updateHero(hero);

    verify(httpClient.put(heroesUrl, hero, {}));
  }));

  it('should addHero', inject([HeroService], (service: HeroService) => {
    service.addHero(hero);

    verify(httpClient.post<Hero>(heroesUrl, hero, {}));
  }));

  it('should deleteHero by id', inject([HeroService], (service: HeroService) => {
    service.deleteHero(11);

    verify(httpClient.delete<Hero>(heroesUrl + '/11', {}));
  }));

  it('should deleteHero by object', inject([HeroService], (service: HeroService) => {
    service.deleteHero(hero);

    verify(httpClient.delete<Hero>(heroesUrl + '/11', {}));
  }));
});
