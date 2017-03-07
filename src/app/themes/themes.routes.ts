import { Routes, RouterModule } from '@angular/router';
import { ThemesComponent } from './themes.component';

export const ThemesRoutes: Routes = [
    { path: 'topics/:topic',  component: ThemesComponent },
];