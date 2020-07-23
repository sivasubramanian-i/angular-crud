import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "./../../service/api.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  Employee: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private apiService: ApiService) {
    this.readEmployee();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5
    };
    this.apiService.getEmployees().subscribe(response => {
      this.Employee = response && response["data"] ? response["data"] : [];
      this.dtTrigger.next();
    });
  }

  readEmployee() {
    this.apiService.getEmployees().subscribe(response => {
      this.Employee = response && response["data"] ? response["data"] : [];
    });
  }

  removeEmployee(employee, index) {
    if (window.confirm("Are you sure?")) {
      this.apiService.deleteEmployee(employee._id).subscribe(data => {
        this.Employee.splice(index, 1);
      });
    }
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
