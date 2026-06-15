import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseWithSandBoxComponent } from '@ng-chat/shared-data-access';

@Component({
  selector: 'chat-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  host: {},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent extends BaseWithSandBoxComponent {}
