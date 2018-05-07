import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { mock, when, instance, anyNumber } from 'ts-mockito';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from '../hero.service';

import { HEROES } from '../testing/stubs/heroes.const';

fdescribe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async(() => {
    const heroService = mock(HeroService);
    when(heroService.getHero(anyNumber())).thenReturn(of(HEROES[1]));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ HeroDetailComponent ],
      providers: [ { provide: HeroService, useValue: instance(heroService)  } ]
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
  });

  it('should load the appropriate hero on getHero()', () => {
  });

  it('should go back', () => {
  });

  it('should save the current hero', () => {
  });
});

