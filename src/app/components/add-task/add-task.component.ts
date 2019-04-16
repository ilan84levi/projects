import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Family } from 'src/app/models/family';
import { Task } from 'src/app/models/task';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

    public family: Family[];
    public task = new Task();
    public todayDate = new Date();

    constructor(private tasksService: TasksService, private router: Router) { }

    ngOnInit() {

        const familyMembers = this.tasksService.getHomeMembers();
        familyMembers.subscribe(family => {
            this.family = family;
          
            console.log(this.family);
        });
    }

    addAsignment(): void {
        this.tasksService.addToDoList(this.task).subscribe(() => {
              this.router.navigate(["/app-home-tasks"]);
            // alert(this.task.date + " " + this.task.familyMember + " " + this.task.task)
        }, response => alert("ERROR: " + response.error.message));
    }

    // send(): void {
    //     alert(this.task.task + " " + this.task.date)
    // }

}
