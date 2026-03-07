import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBiographyComponent } from './hero-biography.component';

describe('HeroBiographyComponent', () => {
  let component: HeroBiographyComponent;
  let fixture: ComponentFixture<HeroBiographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroBiographyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
