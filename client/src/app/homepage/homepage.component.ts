import { Component } from '@angular/core';
import { SubmissionService } from '../submission.service';
import { Submission } from '../submission';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-homepage',
  imports: [MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>G Split Grader</mat-card-title>
      </mat-card-header>
    </mat-card>
  `,
  styles: ``
})
export class HomepageComponent {

}
