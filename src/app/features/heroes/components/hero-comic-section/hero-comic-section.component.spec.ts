import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComicSectionComponent } from './hero-comic-section.component';

describe('HeroComicSectionComponent', () => {
  let component: HeroComicSectionComponent;
  let fixture: ComponentFixture<HeroComicSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [HeroComicSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroComicSectionComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("firstAppearance", "Detective Comics #27");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
