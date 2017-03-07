import { Routes, RouterModule } from '@angular/router';
import { CscsRoutes } from './cscs/cscs.routes';
import { ThemesRoutes } from './themes/themes.routes';
import { ProjectRoutes } from './project/project.routes';
import { ProjectsRoutes } from './projects/projects.routes';
import { SearchRoutes } from './search/search.routes';

const appRoutes: Routes = [
  ...CscsRoutes,
  ...ThemesRoutes,
  ...ProjectRoutes,
  ...ProjectsRoutes,
  ...SearchRoutes
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
