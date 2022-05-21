import { Injectable } from '@angular/core';
import { Client } from 'redis-om';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RedisService {
  client = new Client();

  constructor() { }

  async connect() {
    if (!this.client.isOpen()) {
      await this.client.open(environment.REDIS_URL);
    }
  }
}
