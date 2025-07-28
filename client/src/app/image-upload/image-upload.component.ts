import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute } from '@angular/router';
import { SubmissionService } from '../submission.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-image-upload',
  imports: [MatCardModule, MatButtonModule],
  template: `
    <mat-card>
      <mat-card-content>
        <input
          type="file"
          accept="image/*"
          (change)="onImageSelected($event)"
          hidden
          #fileInput
        />
      <button mat-raised-button color="primary" (click)="fileInput.click()">
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
    private router: Router,
    private submissionService: SubmissionService
  ) {}

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
  
    const file = input.files[0];
    const reader = new FileReader();
  
    reader.onload = () => {
      const base64Data = (reader.result as string).replace(/^data:image\/\w+;base64,/, '');
      this.submissionService.uploadImage(base64Data).subscribe({
        next: (res) => {
          console.log('Inference:', res.inference);
          this.router.navigate(['/score'], { state: { inference: res.inference } });
        },
        error: (err) => {
          console.error('Upload failed:', err);
        }
      });
    };
  
    reader.readAsDataURL(file);  // this triggers `reader.onload`
  }
  
}
