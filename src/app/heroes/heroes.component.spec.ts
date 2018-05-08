import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { anything, instance, mock, verify, when } from 'ts-mockito';
import { of } from 'rxjs/observable/of';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { HEROES } from '../testing/stubs/heroes.const';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  const heroService: HeroService = mock(HeroService);
  const name = 'Hero';
  const hero: Hero = { id: 99, name: 'Hero' } as Hero;

  beforeEach(async(() => {
    when(heroService.getHeroes()).thenReturn(of(HEROES));
    when(heroService.addHero(anything())).thenReturn(of(hero));
    when(heroService.deleteHero(anything())).thenReturn(of(hero));
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ HeroesComponent ],
      providers: [ { provide: HeroService, useValue: instance(heroService) } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getHeroes on ngOnInit', () => {
    component.ngOnInit();

    expect(component.heroes).toBeTruthy();
  });

  it('should load heroes on getHeroes()', () => {
    component.getHeroes();

    expect(component.heroes).toEqual(HEROES);
  });

  it('should add hero by name', () => {
    component.add(name);

    verify(heroService.addHero({ name } as Hero));
    expect(component.heroes.includes(hero)).toBeTruthy();
  });

  it('should delete hero', () => {
    component.heroes.push(hero);

    component.delete(hero);

    expect(component.heroes.includes(hero)).toBeFalsy();
    verify(heroService.deleteHero(hero));
  });
});
