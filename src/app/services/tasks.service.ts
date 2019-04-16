import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Family } from '../models/family';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }

  // get all family members
  public getHomeMembers():Observable<Family[]>{
    return this.http.get<Family[]>("http://localhost:3000/api/familyMembers");
}

  // get all tasks
  public getToDoList():Observable<Task[]>{
    return this.http.get<Task[]>("http://localhost:3000/api/tasks");
}

// add task
public addToDoList(task):Observable<Task>{
  return this.http.post<Task>("http://localhost:3000/api/tasks" , task);
}

// DELETE task BY ID
public deleteTask(_id):Observable<Task>{
  return this.http.delete<Task>("http://localhost:3000/api/tasks/" + _id);
}

}
