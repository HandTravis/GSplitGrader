import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Submission } from './submission';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiUrl = 'http://localhost:5200';
  submissions$ = signal<Submission[]>([]);
  submission$ = signal<Submission>({} as Submission);
  
  constructor(private httpClient: HttpClient) {} 

  private refreshSubmissions() {
    this.httpClient.get<Submission[]>(`${this.apiUrl}/submission`)
      .subscribe(submissions => {
        this.submissions$.set(submissions);
      });
  }
  
  getSubmissions() {
    this.refreshSubmissions();
    return this.submissions$;
  }

  getSubmission(id: string) {
    this.httpClient.get<Submission>(`${this.apiUrl}/submission/${id}`)
      .subscribe(submission => {
        this.submission$.set(submission);
      });
    return this.submission$;
  }

  createSubmission(submission: Submission) {
    return this.httpClient.post<Submission>(`${this.apiUrl}/submission`, submission);
  }

  updateSubmission(id: string, submission: Submission) {
    return this.httpClient.put<Submission>(`${this.apiUrl}/submission/${id}`, submission);
  }

  deleteSubmission(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/submission/${id}`, {
      responseType: 'text'
    });
  }

  uploadImage(image: string) {
    const payload = { image };
    return this.httpClient.post<{
      name: string;
      message: string;
      submissionId: string;
      inference: any;
      createdAt: Date;
    }>(`${this.apiUrl}/submission/upload`, payload);
  }
}
