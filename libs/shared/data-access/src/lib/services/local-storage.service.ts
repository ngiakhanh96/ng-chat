import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { MemoryStorage } from './memory-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage implements Storage {
  private readonly storage: Storage;
  private platformId = inject(PLATFORM_ID);

  constructor() {
    this.storage = this.getStorage();
  }

  private getStorage(): Storage {
    if (!isPlatformBrowser(this.platformId)) {
      return new MemoryStorage();
    }

    try {
      return window.localStorage;
    } catch {
      return new MemoryStorage();
    }
  }

  get length(): number {
    return this.storage.length;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
  }
}
