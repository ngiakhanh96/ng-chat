import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'chat-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class App {
  protected title = 'ng-chat';
}
