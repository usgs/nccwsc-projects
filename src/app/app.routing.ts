import { Routes, RouterModule } from '@angular/router';
import { CscsRoutes } from './cscs/cscs.routes';
import { TopicsRoutes } from './topics/topics.routes';
import { ProjectRoutes } from './project/project.routes';
import { ProjectsRoutes } from './projects/projects.routes';
import { SearchRoutes } from './search/search.routes';

const appRoutes: Routes = [
  ...CscsRoutes,
  ...TopicsRoutes,
  ...ProjectRoutes,
  ...ProjectsRoutes,
  ...SearchRoutes
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
