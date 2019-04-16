import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from '../components/add-task/add-task.component';
import { HomeTasksComponent } from '../components/home-tasks/home-tasks.component';

const routes: Routes = [
  {path:"app-add-task" , component:AddTaskComponent},
  {path:"app-home-tasks" , component:HomeTasksComponent},
  { path: "", pathMatch: "full", redirectTo: "app-home-tasks" } ,// pathMatch
  { path: "**", component: HomeTasksComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
