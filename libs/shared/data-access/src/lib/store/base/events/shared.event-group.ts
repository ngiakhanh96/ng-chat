import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { IAccessTokenInfoState } from '../reducers/shared.reducer';
import {
  CancelRequestEvent,
  SendingRequestEvent,
  UpdateResponseEvent,
} from './shared.event';

export const sharedEventGroup = eventGroup({
  source: 'Shared',
  events: {
    updateResponse: type<UpdateResponseEvent>(),
    sendingRequest: type<SendingRequestEvent>(),
    cancelRequest: type<CancelRequestEvent>(),
    updateAccessToken: type<{ accessToken: string | null }>(),
    updateAccessTokenSuccess: type<{ accessToken: string }>(),
    getAccessTokenInfo: type<{ accessToken: string }>(),
    getAccessTokenInfoSuccess: type<{
      accessToken: string;
      accessTokenInfo: IAccessTokenInfoState;
    }>(),
    signOut: type<void>(),
    refreshAccessToken: type<void>(),
    empty: type<void>(),
  },
});
