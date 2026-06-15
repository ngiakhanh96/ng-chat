import { Component, input, output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import {
  CloseOutline,
  CopyOutline,
  MenuOutline,
  MessageOutline,
  MoreOutline,
  PaperClipOutline,
  PlusOutline,
  ReloadOutline,
  RobotOutline,
  SearchOutline,
  SendOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import {
  ChatConversationSummary,
  ChatMessage,
  ChatSidebarSection,
} from '@ng-chat/chat-data-access';
import { ChatLayoutComponent } from '@ng-chat/chat-ui';
import { SharedStore } from '@ng-chat/shared-data-access';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { ChatPageComponent } from './chat-page.component';

@Component({
  selector: 'chat-chat-layout',
  template: '',
})
class ChatLayoutStubComponent {
  sidebarSections = input<ChatSidebarSection[]>([]);
  selectedConversationId = input<string | null>(null);
  activeConversation = input<ChatConversationSummary | undefined>();
  messages = input<ChatMessage[]>([]);
  mobileSidebarOpen = input(false);
  newConversation = output<void>();
  conversationSelected = output<string>();
  mobileSidebarOpened = output<void>();
  mobileSidebarClosed = output<void>();
  messageSubmitted = output<string>();
}

describe('ChatPageComponent', () => {
  let component: ChatPageComponent;
  let fixture: ComponentFixture<ChatPageComponent>;

  beforeEach(async () => {
    TestBed.overrideComponent(ChatPageComponent, {
      remove: { imports: [ChatLayoutComponent] },
      add: { imports: [ChatLayoutStubComponent] },
    });

    await TestBed.configureTestingModule({
      imports: [ChatPageComponent],
      providers: [
        SharedStore,
        provideRouter([]),
        provideNzIcons([
          CloseOutline,
          CopyOutline,
          MenuOutline,
          MessageOutline,
          MoreOutline,
          PaperClipOutline,
          PlusOutline,
          ReloadOutline,
          RobotOutline,
          SearchOutline,
          SendOutline,
          UserOutline,
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('selects conversations', () => {
    component.onConversationSelected('conversation-testing');

    expect(component.selectedConversationId()).toBe('conversation-testing');
    expect(component.activeConversation()?.title).toBe('Testing checklist');
  });

  it('appends user and mock assistant messages', () => {
    const initialCount = component.activeMessages().length;

    component.onMessageSubmitted('Build the first chat screen');

    expect(component.activeMessages().length).toBe(initialCount + 2);
    expect(component.activeMessages().at(-2)?.content).toBe(
      'Build the first chat screen',
    );
  });
});
