import { Injectable, inject } from '@angular/core';
import { AppSettingsService } from '@ng-chat/shared-data-access';
import { Observable } from 'rxjs';
import { IChatHttpRequest } from '../../models/http-requests/chat-http-request.model';
import { IChatHttpResponse } from '../../models/http-responses/chat-http-response.model';
import { AgUiHttpAgentService } from '../ag-ui-http-agent.service';

@Injectable({ providedIn: 'root' })
export class ChatHttpClientService {
  private readonly interactiveStoryConfig =
    inject(AppSettingsService).appConfig()!.interactiveStory!;
  private readonly agUiHttpAgent = inject(AgUiHttpAgentService);

  chat(request: IChatHttpRequest): Observable<IChatHttpResponse> {
    return this.agUiHttpAgent.streamTurn(
      request,
      this.interactiveStoryConfig.apiBaseUrl + '/api/agent/ag-ui',
    );
  }
}
