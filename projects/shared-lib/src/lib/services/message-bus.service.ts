import { Injectable } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface BusEvent { type: string; payload: any; }

@Injectable({ providedIn: 'root' })
export class MessageBusService {
  private bus = new ReplaySubject<BusEvent>(1);

  publish(type: string, payload: any) {
    this.bus.next({ type, payload });
  }

  listen<T>(type: string): Observable<T> {
    return this.bus.asObservable().pipe(
      filter(event => event.type === type),
      map(event => event.payload as T)
    );
  }
}
