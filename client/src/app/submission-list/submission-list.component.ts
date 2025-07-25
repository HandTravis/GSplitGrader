import { Component, OnInit, WritableSignal } from '@angular/core';
import { Submission } from '../submission'
import { SubmissionService } from '../submission.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-submission-list',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, ImageUploadComponent],
  styles: [
    `
      button:first-of-type {
        margin-right: 1rem;
      }
    `
  ],
  template: `
    <p>placeholder image goes here</p>
    <app-image-upload></app-image-upload>
  `
})
export class SubmissionListComponent {

}
