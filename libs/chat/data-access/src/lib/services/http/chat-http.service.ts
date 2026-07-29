import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AppSettingsService } from '@ng-chat/shared-data-access';
import { Observable } from 'rxjs';
import { IChatModel } from '../../models/chat.model';
import { IChatHttpRequest } from '../../models/http-requests/chat-http-request.model';
import { IChatHttpResponse } from '../../models/http-responses/chat-http-response.model';
import { IConversationHistoryMessageResponse } from '../../models/http-responses/conversation-history-message-response.model';
import { IConversationSummaryResponse } from '../../models/http-responses/conversation-summary-response.model';
import { AgUiHttpAgentService } from '../ag-ui-http-agent.service';

@Injectable({ providedIn: 'root' })
export class ChatHttpClientService {
  private readonly interactiveStoryConfig =
    inject(AppSettingsService).appConfig()!.interactiveStory!;
  private readonly agUiHttpAgent = inject(AgUiHttpAgentService);
  private readonly httpClient = inject(HttpClient);

  chat(request: IChatHttpRequest): Observable<IChatHttpResponse> {
    return this.agUiHttpAgent.streamTurn(
      request,
      `${this.interactiveStoryConfig.apiBaseUrl}/agent/ag-ui`,
    );
  }

  getModels(): Observable<IChatModel[]> {
    return this.httpClient.get<IChatModel[]>(
      `${this.interactiveStoryConfig.apiBaseUrl}/agent/models`,
    );
  }

  getConversations(): Observable<IConversationSummaryResponse[]> {
    return this.httpClient.get<IConversationSummaryResponse[]>(
      `${this.interactiveStoryConfig.apiBaseUrl}/agent/sessions`,
    );
  }

  getConversationHistory(
    conversationId: string,
  ): Observable<IConversationHistoryMessageResponse[]> {
    return this.httpClient.get<IConversationHistoryMessageResponse[]>(
      `${this.interactiveStoryConfig.apiBaseUrl}/agent/session/${conversationId}`,
    );
  }
}
