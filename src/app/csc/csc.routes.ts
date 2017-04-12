import { Routes, RouterModule } from '@angular/router';
import { CscComponent } from './csc.component';

export const CscRoutes: Routes = [
  { path: 'csc/:id',  component: CscComponent },
];