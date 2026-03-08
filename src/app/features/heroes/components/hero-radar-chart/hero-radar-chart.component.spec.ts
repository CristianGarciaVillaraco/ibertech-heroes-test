import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroRadarChartComponent } from './hero-radar-chart.component';
import { DEFAULT_POWER_STATS, IPowerStats } from '../../../../core/models/interfaces/hero.interface';

const MAX_STATS: IPowerStats = { strength: 100, speed: 100, intelligence: 100, durability: 100, combat: 100, power: 100 };
const MIN_STATS: IPowerStats = { strength: 0, speed: 0, intelligence: 0, durability: 0, combat: 0, power: 0 };

describe('HeroRadarChartComponent', () => {
  let fixture: ComponentFixture<HeroRadarChartComponent>;
  let component: HeroRadarChartComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroRadarChartComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroRadarChartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('stats', DEFAULT_POWER_STATS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('gridPolygon()', () => {
    it('should return a string with 6 space-separated points', () => {
      const points = component.gridPolygon(100).trim().split(' ');
      expect(points.length).toBe(6);
    });

    it('each point should be in "x,y" format', () => {
      component.gridPolygon(50).trim().split(' ').forEach(pt => {
        const parts = pt.split(',');
        expect(parts.length).toBe(2);
        expect(isNaN(Number(parts[0]))).toBeFalse();
        expect(isNaN(Number(parts[1]))).toBeFalse();
      });
    });

    it('100% ring should be larger than 50% ring', () => {
      const ring100 = component.gridPolygon(100).trim().split(' ')[0];
      const ring50 = component.gridPolygon(50).trim().split(' ')[0];
      const x100 = Number(ring100.split(',')[0]);
      const x50 = Number(ring50.split(',')[0]);
      expect(Math.abs(x100)).toBeGreaterThan(Math.abs(x50 - component.cx) ? Math.abs(x50 - component.cx) : 0);
    });
  });

  describe('statPolygon()', () => {
    it('should return a string with 6 space-separated points', () => {
      const points = component.statPolygon().trim().split(' ');
      expect(points.length).toBe(6);
    });

    it('should produce different polygon for different stats', () => {
      fixture.componentRef.setInput('stats', MAX_STATS);
      fixture.detectChanges();
      const maxPolygon = component.statPolygon();

      fixture.componentRef.setInput('stats', MIN_STATS);
      fixture.detectChanges();
      const minPolygon = component.statPolygon();

      expect(maxPolygon).not.toBe(minPolygon);
    });

    it('should be reactive to stats input changes', () => {
      const before = component.statPolygon();
      fixture.componentRef.setInput('stats', { ...DEFAULT_POWER_STATS, strength: 100 });
      fixture.detectChanges();
      expect(component.statPolygon()).not.toBe(before);
    });
  });

  describe('axisEnd()', () => {
    it('should return an object with x and y numbers', () => {
      const pt = component.axisEnd(0);
      expect(typeof pt.x).toBe('number');
      expect(typeof pt.y).toBe('number');
    });

    it('top axis (0°) should have x close to cx and y less than cy', () => {
      const pt = component.axisEnd(0);
      expect(Math.abs(pt.x - component.cx)).toBeLessThan(1);
      expect(pt.y).toBeLessThan(component.cy);
    });
  });

  describe('labelPos()', () => {
    it('should return position further from center than axisEnd', () => {
      const axis = component.axisEnd(0);
      const label = component.labelPos(0);
      const axisDist = Math.abs(axis.y - component.cy);
      const labelDist = Math.abs(label.y - component.cy);
      expect(labelDist).toBeGreaterThan(axisDist);
    });
  });
});
