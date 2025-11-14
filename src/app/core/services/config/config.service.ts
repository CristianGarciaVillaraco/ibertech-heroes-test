import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: any = null;

  constructor(private http: HttpClient) {}

  async load(): Promise<void> {
    this.config = await firstValueFrom(this.http.get('/assets/config.json'));
  }

  get<T = any>(key: string): T {
    if (!this.config) {
      throw new Error('Config not loaded yet');
    }
    return this.config[key];
  }
}
