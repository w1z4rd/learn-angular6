import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { 
  anyNumber,
  anyString, 
  instance,
  mock,
  verify,
  when
} from 'ts-mockito';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

import { HEROES } from '../testing/stubs/heroes.const';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let location: Location = mock(Location);
  let heroService: HeroService = mock(HeroService);
  let observableHero: Observable<Hero> = of(HEROES[1]);
  let observableAny: Observable<any> = of({});

  beforeEach(async(() => {
    when(heroService.getHero(anyNumber())).thenReturn(observableHero);
    when(heroService.updateHero(HEROES[1])).thenReturn(observableAny);
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule
      ],
      declarations: [ HeroDetailComponent ],
      providers: [ 
        { provide: HeroService, useValue: instance(heroService) },
        { provide: Location, useValue: instance(location) }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load hero after ngOnInit', () => {
    component.ngOnInit();

    expect(component.hero).toBeTruthy();
  });

  it('should load the appropriate hero on getHero()', () => {
    component.getHero();

    expect(component.hero).toEqual(HEROES[1]);
  });

  it('should go back', () => {
    component.goBack();

    verify(location.back());
  });

  it('should save the current hero', () => {
    component.hero = HEROES[1];

    component.save();

    verify(heroService.updateHero(HEROES[1]));
    verify(location.back());
  });
});

