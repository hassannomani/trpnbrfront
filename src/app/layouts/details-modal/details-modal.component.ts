import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.component.html',
  styleUrls: ['./details-modal.component.css']
})
export class DetailsModalComponent {
  title: string="";
  first_name : string ="";
  last_name : string ="";
  ag_first_name: string ="";
  ag_last_name: string ="";
  prev_first_name: string ="";
  prev_last_name: string ="";
  reason: string = "";
  created_at: string = ""
  
  constructor(public dialogRef: MatDialogRef<DetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetailsModalComponent) {
    this.title = data.title;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.ag_first_name = data.ag_first_name;
    this.ag_last_name = data.ag_last_name;
    this.prev_first_name = data.prev_first_name;
    this.prev_last_name = data.prev_last_name;
    this.reason = data.reason;
    this.created_at = data.created_at;
  }
}

export class DetailsModalModel {

  constructor(public title: string, public first_name: string,public last_name: string,public ag_first_name: string,public ag_last_name: string,public prev_first_name: string,public prev_last_name: string,public reason: string, public created_at: string) {
  }
}
