import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroStatsComponent } from './hero-stats.component';

describe('HeroStatsComponent', () => {
  let component: HeroStatsComponent;
  let fixture: ComponentFixture<HeroStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [HeroStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroStatsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("characters", ["Bruce Wayne"]);
    fixture.componentRef.setInput("originators", ["Bob Kane"]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
