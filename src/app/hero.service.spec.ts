import { TestBed, inject } from '@angular/core/testing';
import { mock } from 'ts-mockito';

import { HttpClient } from '@angular/common/http';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
      HeroService,
      MessageService,
      { provide: HttpClient, useFactory: () => mock(HttpClient) }
      ]
    });
  });

  it('should be created', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));
});
