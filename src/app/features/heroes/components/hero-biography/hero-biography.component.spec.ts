import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBiographyComponent } from './hero-biography.component';

describe('HeroBiographyComponent', () => {
  let component: HeroBiographyComponent;
  let fixture: ComponentFixture<HeroBiographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [HeroBiographyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroBiographyComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("description", "Dark Knight of Gotham");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
