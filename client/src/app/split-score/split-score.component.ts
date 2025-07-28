import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubmissionService } from '../submission.service';
import { Submission } from '../submission';
import { MatCardModule } from '@angular/material/card';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-split-score',
  imports: [MatCardModule],
  template: `
    <p>Split Score component works</p>
    <mat-card>
      <mat-card-header>
        <mat-card-title>G Split Score:</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Model Inference Result</p>
        <pre>{{ inferenceResult }}</pre>
        <button
          mat-raised-button
          color="primary"
          (click)="navToHome()"
        >
            Go To Home
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``
})
export class SplitScoreComponent {
  inferenceResult: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  navToHome() {
    this.router.navigate(['/'])
  }

  ngOnInit() {
    const nav = window.history.state;
    this.inferenceResult = nav?.inference || {};
  }

}
