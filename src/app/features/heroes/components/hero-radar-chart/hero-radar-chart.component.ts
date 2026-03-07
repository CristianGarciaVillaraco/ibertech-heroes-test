import { Component, computed, input } from '@angular/core';
import { DEFAULT_POWER_STATS, IPowerStats } from '../../../../core/models/interfaces/hero.interface';

interface RadarStat {
  label: string;
  key: keyof IPowerStats;
  angle: number;
}

const STATS: RadarStat[] = [
  { label: 'Inteligencia', key: 'intelligence', angle: 0 },
  { label: 'Poder',        key: 'power',        angle: 60 },
  { label: 'Velocidad',    key: 'speed',        angle: 120 },
  { label: 'Durabilidad',  key: 'durability',   angle: 180 },
  { label: 'Combate',      key: 'combat',       angle: 240 },
  { label: 'Fuerza',       key: 'strength',     angle: 300 },
];

const R = 110;
const CX = 180;
const CY = 165;

function toRad(deg: number): number {
  return ((deg - 90) * Math.PI) / 180;
}

function point(angle: number, r: number): string {
  const rad = toRad(angle);
  return `${CX + r * Math.cos(rad)},${CY + r * Math.sin(rad)}`;
}

function pointObj(angle: number, r: number): { x: number; y: number } {
  const rad = toRad(angle);
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function polygon(values: number[]): string {
  return values.map((v, i) => point(STATS[i].angle, (v / 100) * R)).join(' ');
}

@Component({
  selector: 'app-hero-radar-chart',
  templateUrl: './hero-radar-chart.component.html',
  styleUrl: './hero-radar-chart.component.css',
})
export class HeroRadarChartComponent {
  stats = input<IPowerStats>(DEFAULT_POWER_STATS);

  readonly axes = STATS;
  readonly rings = [25, 50, 75, 100];
  readonly cx = CX;
  readonly cy = CY;
  readonly r = R;

  gridPolygon(pct: number): string {
    return polygon(Array(6).fill(pct));
  }

  statPolygon = computed(() => {
    const s = this.stats();
    return polygon(STATS.map((ax) => s[ax.key]));
  });

  axisEnd(angle: number): { x: number; y: number } {
    return pointObj(angle, R);
  }

  labelPos(angle: number): { x: number; y: number } {
    return pointObj(angle, R + 24);
  }

  statValue(key: keyof IPowerStats): number {
    return this.stats()[key];
  }
}
