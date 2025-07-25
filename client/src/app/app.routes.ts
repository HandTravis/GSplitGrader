import { Routes } from '@angular/router';
import { SubmissionListComponent } from './submission-list/submission-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SubmissionHistoryComponent } from './submission-history/submission-history.component';
import { SplitScoreComponent } from './split-score/split-score.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent, title: 'Home Page'},
    { path: 'score', component: SplitScoreComponent, title: 'Score Results'}
    // { path: 'history', component: SubmissionHistoryComponent}
];
