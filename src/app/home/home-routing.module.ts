import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appPath } from '../app-path.const';

import { ProjectDashboardComponent } from '../project-dashboard/project-dashboard.component';
import { FirstJudgementComponent } from '../first-judgement/first-judgement.component';
import { SecondJudgementComponent } from '../second-judgement/second-judgement.component';
import { AnalysisComponent } from '../analysis/analysis.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: appPath.manage.projectDashboard,
        pathMatch: 'full',
      },
      {
        path: appPath.manage.projectDashboard,
        component: ProjectDashboardComponent
      },
      {
        path: appPath.manage.firstJudgement,
        component: FirstJudgementComponent
      },
      {
        path: appPath.manage.secondJudgement,
        component: SecondJudgementComponent
      },
      {
        path: appPath.manage.analysis,
        component: AnalysisComponent
      },
      {
        path: '**',
        redirectTo: appPath.manage.projectDashboard,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }