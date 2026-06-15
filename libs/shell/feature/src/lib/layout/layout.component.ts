import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { BaseWithSandBoxComponent } from '@ng-chat/shared-data-access';

@Component({
  selector: 'chat-layout',
  imports: [MatSidenavModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  host: {},
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent extends BaseWithSandBoxComponent {}
