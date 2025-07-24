import { Routes } from '@angular/router';
import { SubmissionListComponent } from './submission-list/submission-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SubmissionHistoryComponent } from './submission-history/submission-history.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent, title: 'Home Page'},
    // { path: 'history', component: SubmissionHistoryComponent}
];
