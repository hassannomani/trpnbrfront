import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { forkJoin } from 'rxjs';
import { CommonService } from 'src/app/services/common-service/common.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { Router } from '@angular/router';
import {Title} from "@angular/platform-browser";
import { ConfirmDialogModel } from 'src/app/layouts/confirm-modal/confirm-modal.component';
import { DataSavedModalComponent } from 'src/app/layouts/data-saved-modal/data-saved-modal.component';
import {MatDialog} from '@angular/material/dialog';
import * as XLSX from 'xlsx';
/* load the codepage support library for extended support with older formats  */
@Component({
  selector: 'app-upload-certificaate',
  templateUrl: './upload-certificaate.component.html',
  styleUrls: ['./upload-certificaate.component.css']
})
export class UploadCertificaateComponent {
  
  file!: File;
  modalTitle: string = ""
  modalMessage: string= ""
  buttonLabel: string= "Upload"
  buttonColor: string = "primary"
  buttonType: string = "button"
  localStore: any = {}
  data : any[] = []

  constructor(
    private commonService: CommonService,
    private localStorage: LocalStorageService,
    private router: Router,
    private titleService:Title,
    public dialog: MatDialog,
  ){
    this.titleService.setTitle("upload Certificates");
  }
  ngOnInit(): void {
  }

  selectFile(event: any){
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const ab: ArrayBuffer = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(ab);

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws)
      // <AOA>(utils.sheet_to_json(ws, {header: 1}));
      console.log(this.data)
    };
    reader.readAsArrayBuffer(target.files[0]);
  }

  uploadFile(){

  }
}
