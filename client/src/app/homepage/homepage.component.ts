import { Component } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { Submission } from '../submission';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { SubmissionListComponent } from '../submission-list/submission-list.component';
import { SubmissionHistoryComponent } from '../submission-history/submission-history.component';

@Component({
  selector: 'app-homepage',
  imports: [MatCardModule, SubmissionListComponent, SubmissionHistoryComponent],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Submit Your G Split Attempt and View Attempt History</mat-card-title>
      </mat-card-header>
    </mat-card>
    <div class="card-grid-container">
      <mat-card class="column">
        <h1>Submission col</h1>
        <app-submission-list></app-submission-list>
      </mat-card>
      <mat-card class="column">
        <h1>History col</h1>
        <app-submission-history></app-submission-history>
      </mat-card>
    </div>
  `,
  styles: `
    mat-card {
      background-color: #f0f0f0; // Or any desired color code
    }

    .card-grid-container {
        display: flex;
        flex-direction: row;
        grid-template-columns: 1fr 1fr;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Example: 250px min width */
        gap: 24px; /* Spacing between cards */
        padding: 10px;
        align-items: flex-start:
        flex-wrap: wrap;
    }

    .column {
      display: flex;
      flex-direction: column;
      gap: 16px;
      flex: 1 1 300px;
      min-width: 300px;
      max-width: 500px;
    }

    * {
        justify-content: center; /* Centers horizontally */
        align-items: center;    /* Centers vertically */
        flex-direction: column;
    }
  `
})
export class HomepageComponent {

}
