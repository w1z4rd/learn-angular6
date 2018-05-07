import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mock } from 'ts-mockito';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesComponent ],
      providers: [ { provider: HeroService, useFactory: () => mock(HeroService) } ]
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
});
