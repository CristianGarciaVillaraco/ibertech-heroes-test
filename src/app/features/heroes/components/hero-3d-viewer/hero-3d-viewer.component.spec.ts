import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hero3dViewerComponent } from './hero-3d-viewer.component';

describe('Hero3dViewerComponent', () => {
  let component: Hero3dViewerComponent;
  let fixture: ComponentFixture<Hero3dViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [Hero3dViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Hero3dViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
