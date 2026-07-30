import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IAppSettings } from '../models/app-settings';

@Service()
export class AppSettingsService {
  public appConfig = signal<IAppSettings | undefined>(undefined);
  private httpClient = inject(HttpClient);

  getAppConfig() {
    return this.appConfig()
      ? Promise.resolve(this.appConfig())
      : firstValueFrom(
          this.httpClient.get<IAppSettings>('/assets/app-settings.json'),
        ).then((data: IAppSettings | undefined) => {
          this.appConfig.set(data);
          return this.appConfig();
        });
  }
}
