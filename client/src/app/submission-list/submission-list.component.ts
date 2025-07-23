import { Component, OnInit, WritableSignal } from '@angular/core';
import { Submission } from '../submission'
import { SubmissionService } from '../submission.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-submission-list',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule],
  styles: [
    `
      button:first-of-type {
        margin-right: 1rem;'
      }
    `
  ],
  template: `
    <p>
      submission-list works!
    </p>
  `
})
export class SubmissionListComponent {

}
