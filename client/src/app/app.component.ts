import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: `
    .title {
      align-items: center;
      justify-content: center;
    }
  `,
})
export class AppComponent {
  title = 'The G Split Grader';
}
