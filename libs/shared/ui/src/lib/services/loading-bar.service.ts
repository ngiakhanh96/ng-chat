import { computed, Service, signal } from '@angular/core';

// TODO bring this to store
@Service()
export class LoadingBarService {
  private _loadingPercentage = signal(100);
  loadingPercentage = computed(() => this._loadingPercentage());

  load(percentage: number) {
    this._loadingPercentage.set(percentage);
  }
}
