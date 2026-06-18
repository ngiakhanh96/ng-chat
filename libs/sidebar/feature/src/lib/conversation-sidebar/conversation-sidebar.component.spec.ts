import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MessageOutline,
  MoreOutline,
  PlusOutline,
  SearchOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import { ChatSidebarSection } from '@ng-chat/chat-data-access';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { ConversationSidebarComponent } from './conversation-sidebar.component';

describe('ConversationSidebarComponent', () => {
  let component: ConversationSidebarComponent;
  let fixture: ComponentFixture<ConversationSidebarComponent>;

  const sections: ChatSidebarSection[] = [
    {
      id: 'recent',
      title: 'Recent',
      conversations: [
        {
          id: 'conversation-1',
          title: 'Architecture',
          preview: 'Adapters and canonical state',
          updatedAt: 'Now',
        },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationSidebarComponent],
      providers: [
        provideNzIcons([
          MessageOutline,
          MoreOutline,
          PlusOutline,
          SearchOutline,
          UserOutline,
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConversationSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('sections', sections);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('renders sidebar sections and conversations', () => {
    expect(fixture.nativeElement.textContent).toContain('Recent');
    expect(fixture.nativeElement.textContent).toContain('Architecture');
  });

  it('emits selected conversation ids', () => {
    const selected = vi.fn();
    component.conversationSelected.subscribe(selected);

    fixture.nativeElement
      .querySelector('.sidebar__item')
      .dispatchEvent(new MouseEvent('click'));

    expect(selected).toHaveBeenCalledWith('conversation-1');
  });
});
