import { Injectable, signal, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Submission } from './submission';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  private apiUrl = 'http://localhost:5200';
  //submissions$ = signal<Submission[]>([]);
  submission$ = signal<Submission>({} as Submission);
  
  constructor(private httpClient: HttpClient) {} 

  // Uncomment if you want to fetch all submissions for competition
  // note that this will need an accompanying API endpoint implementation

  // private refreshSubmissions() {
  //   this.httpClient.get<Submission[]>('${this.url}/submissions')
  //   .subscribe(submissions => {
  //     this.submissions$.set(submissions);
  //   });
  // }
  //
  // getSubmissions() {
  //   this.refreshSubmissions();
  //   return this.submissions$
  // }

  getSubmission(id: string) {
    this.httpClient.get<Submission>(`${this.apiUrl}/submissions/${id}`)
      .subscribe(submission => {
        this.submission$.set(submission);
      });
    return this.submission$;
  }

  createSubmission(submission: Submission) {
    return this.httpClient.post<Submission>(`${this.apiUrl}/submissions`, submission);
  }

  updateSubmission(id: string, submission: Submission) {
    return this.httpClient.put<Submission>(`${this.apiUrl}/submissions/${id}`, submission);
  }

  deleteSubmission(id: string) {
    return this.httpClient.delete(`${this.apiUrl}/submissions/${id}`, {
      responseType: 'text'
    });
  }
}
