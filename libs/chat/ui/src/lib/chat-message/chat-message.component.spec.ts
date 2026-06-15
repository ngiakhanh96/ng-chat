import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CopyOutline,
  ReloadOutline,
  RobotOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { ChatMessage } from '@ng-chat/chat-data-access';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { ChatMessageComponent } from './chat-message.component';

describe('ChatMessageComponent', () => {
  let fixture: ComponentFixture<ChatMessageComponent>;

  const message: ChatMessage = {
    id: 'message-1',
    conversationId: 'conversation-1',
    role: 'assistant',
    content: 'Hello from the assistant.',
    createdAt: '10:00',
    status: 'complete',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessageComponent],
      providers: [
        provideNzIcons([CopyOutline, ReloadOutline, RobotOutline, UserOutline]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessageComponent);
    fixture.componentRef.setInput('message', message);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders assistant messages with response actions', () => {
    expect(fixture.nativeElement.textContent).toContain(
      'Hello from the assistant.',
    );
    expect(
      fixture.nativeElement.querySelector('.message__actions'),
    ).toBeTruthy();
  });
});
