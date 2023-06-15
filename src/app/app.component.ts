import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from './apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Interview_Tasks';
 
  formdata: any;
  result: any;
  id: any;
  displayStyle = "none";
  constructor(private api: ApiserviceService ,private Router:Router) {

  }
  ngOnInit(): void {
    this.load();
  }
  
  load() {
    this.id = 0;
    this.displayStyle = "none";
    this.api.get("name").subscribe((result: any) => {
      this.result = result;
    });
  }

  openPopup() {
    this.displayStyle = "block";
    this.id = 0;
    this.formdata = new FormGroup({
      name: new FormControl("", Validators.compose([Validators.required]))
    });
  }


  closePopup() {
    this.displayStyle = "none";
  }

 

  edit(id: number) {
    this.id = id;

    this.api.get("name/" + id).subscribe((result: any) => {
      this.formdata = new FormGroup({
        name: new FormControl(result.name, Validators.compose([Validators.required]))
      });
      this.displayStyle = "block";

    })
  }


  delete(id: number) {
    if (confirm("Sure to Delete?")) {
      this.api.delete("name/" + id).subscribe((result: any) => {
        this.load();
      });

    }
  }

  save(data:any) {
    if (this.id == 0) {
      this.api.post("name", data).subscribe((result: any) => {
        this.load();
      })
    }
    else {
      this.api.put("name/" + this.id, data).subscribe((result: any) => {
        this.load();
      })
    }
  }

}

