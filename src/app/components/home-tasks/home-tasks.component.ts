import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-home-tasks',
  templateUrl: './home-tasks.component.html',
  styleUrls: ['./home-tasks.component.css']
})
export class HomeTasksComponent implements OnInit {
  public tasks: Task[];
  public loading: boolean = true;
  constructor(private tasksService:TasksService) { }
  
  ngOnInit():void {
    const homeTasks = this.tasksService.getToDoList();
    homeTasks.subscribe(tasks => {
        this.tasks = tasks;
        if(this.tasks.length <= 0){
            this.loading = false;
         }
    });
  }

  deleteTask(_id): void {
    this.tasksService.deleteTask(_id).subscribe(()=>{
      this.ngOnInit();
    });
    
 }


}
