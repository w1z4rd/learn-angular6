import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  anyString,
  instance,
  mock,
  verify,
  when
} from 'ts-mockito';
import { of } from 'rxjs/observable/of';
import { HeroSearchComponent } from './hero-search.component';
import { HeroService } from '../hero.service';
import { HEROES } from '../testing/stubs/heroes.const';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroService: HeroService = mock(HeroService);

  beforeEach(async(() => {
    when(heroService.searchHeroes(anyString())).thenReturn(of(HEROES));
    TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        RouterTestingModule
      ],
      declarations: [ HeroSearchComponent ],
      providers: [ { provide: HeroService, useValue: instance(heroService) } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search by term', () => {
    component.search('term');

    verify(heroService.searchHeroes('term'));
  });

  it('should set heroes$ ngOnInit', () => {
    component.ngOnInit();

    expect(component.heroes$).toBeTruthy();
  });
});
