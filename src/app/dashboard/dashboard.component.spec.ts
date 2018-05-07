import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mock, when, instance } from 'ts-mockito';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';

import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

import { HEROES } from '../testing/stubs/heroes.const';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    const heroService = mock(HeroService);
    when(heroService.getHeroes()).thenReturn(of(HEROES));

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        DashboardComponent,
        HeroSearchComponent
      ],
      providers: [ { provide: HeroService, useValue: instance(heroService) } ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load heroes after ngOnInit', () => {
    component.ngOnInit();
    expect(component.heroes).toBeTruthy();
  });

  it('should slice loaded heroes from 1 to 5', () => {
    component.getHeroes();
    expect(component.heroes).toEqual(HEROES.slice(1, 5));
  });
});

