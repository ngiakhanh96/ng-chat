import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaperClipOutline, SendOutline } from '@ant-design/icons-angular/icons';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { ChatComposerComponent } from './chat-composer.component';

describe('ChatComposerComponent', () => {
  let component: ChatComposerComponent;
  let fixture: ComponentFixture<ChatComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatComposerComponent],
      providers: [provideNzIcons([PaperClipOutline, SendOutline])],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComposerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('disables send for empty input', () => {
    component.draft.set('   ');
    fixture.detectChanges();

    expect(component.canSend()).toBe(false);
  });

  it('emits trimmed messages and clears the draft', () => {
    const submitted = vi.fn();
    component.submitted.subscribe(submitted);
    component.draft.set('  Hello chat  ');

    component.onSubmit();

    expect(submitted).toHaveBeenCalledWith('Hello chat');
    expect(component.draft()).toBe('');
  });

  it('renders the compact composer hub visual', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.composer__hub')).toBeTruthy();
  });
});
