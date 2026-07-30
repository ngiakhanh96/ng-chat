import { inject, Service } from '@angular/core';
import { AppSettingsService } from './app-settings.service';

@Service()
export class TestUserHeaderService {
  private readonly appSettingsService = inject(AppSettingsService);

  getHeaders(): Record<string, string> {
    const interactiveStoryConfig =
      this.appSettingsService.appConfig()?.interactiveStory;

    if (!interactiveStoryConfig?.developmentTestUserId) {
      return {};
    }

    return {
      'X-InteractiveStory-Test-UserId':
        interactiveStoryConfig.developmentTestUserId,
    };
  }
}
