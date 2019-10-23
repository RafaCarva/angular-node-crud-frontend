import { DepartmentService } from './../department.service';
import { Department } from './../department';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  depName = '';
  departments: Department[] = [
    {name: 'dep1', _id: 'jhjnjn'},
    {name: 'dep1', _id: 'jhjnjn'},
    {name: 'dep1', _id: 'jhjnjn'},
    {name: 'dep1', _id: 'jhjnjn'}
  ];

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.departmentService.get()
      .subscribe((deps) => this.departments = deps);
  }

  save() {
    this.departmentService.add({name: this.depName})
      .subscribe(
        (dep) => {console.log(dep);
                  this.cleaarFields(); },
        (err) => {console.log(err); }
      );
  }

  cleaarFields() {
    this.depName = '';
  }

  cancel() {

  }

  edit(dep: Department) {

  }

  delete(dep: Department) {

  }

}
