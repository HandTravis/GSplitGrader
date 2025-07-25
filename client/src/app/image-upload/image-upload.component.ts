import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute } from '@angular/router';
import { SubmissionService } from '../submission.service';

@Component({
  selector: 'app-image-upload',
  imports: [MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>G Split Score:</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>insert scores and model inferences here</p>
        <button
          mat-raised-button
          color="primary"
          (click)="navToScore()"
        >
            Upload Image
        </button>
      </mat-card-content>
    </mat-card>
  `,
  styles: `
    mat-card {
      background-color: #f0f0ff; /* Or any desired color code */
    }
  `
})
export class ImageUploadComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  navToScore() {
    this.router.navigate(['/score'])
  }
}
