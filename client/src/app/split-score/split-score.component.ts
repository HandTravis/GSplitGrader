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
    <button
          mat-raised-button
          color="primary"
          (click)="navToHome()"
        >
            Submit Another Attempt
        </button>
  `,
  styles: ``
})
export class SplitScoreComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  navToHome() {
    this.router.navigate(['/'])
  }

}
