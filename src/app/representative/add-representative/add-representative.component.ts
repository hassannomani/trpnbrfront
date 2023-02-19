import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-representative',
  templateUrl: './add-representative.component.html',
  styleUrls: ['./add-representative.component.css']
})
export class AddRepresentativeComponent implements OnInit{
  addRepresentative = new FormGroup({
    'name' : new FormControl('',[Validators.required]),
    'username' : new FormControl('',[Validators.required]),
    'nid' : new FormControl('',[Validators.required]),
    'mobileNo' : new FormControl('',[Validators.required]),
    'agentId' : new FormControl('',[Validators.required]),
    'bankAccountName': new FormControl('',[Validators.required]),
    'bankAccountNo': new FormControl('',[Validators.required]),
    'bankName': new FormControl('',[Validators.required]),
    'bankBranch': new FormControl('',[Validators.required]),
    'routingNo': new FormControl('',[Validators.required]),
    'dob': new FormControl('',[Validators.required]),
    'bdivision': new FormControl('',[Validators.required]),
    'bdistrict': new FormControl('',[Validators.required]),
    'bthana': new FormControl('',[Validators.required]),
    'baddress': new FormControl('',[Validators.required]),
    'prdivision': new FormControl('',[Validators.required]),
    'prdistrict': new FormControl('',[Validators.required]),
    'prthana': new FormControl('',[Validators.required]),
    'praddress': new FormControl('',[Validators.required]),
    'pmdivision': new FormControl('',[Validators.required]),
    'pmdistrict': new FormControl('',[Validators.required]),
    'pmthana': new FormControl('',[Validators.required]),
    'pmaddress': new FormControl('',[Validators.required]),

  })
  failed: boolean = false
  errorMsg: string = ""
  success: boolean = false
  successMsg: string = ""
  goSuccess: boolean = false
  buttonLabel: string= "Submit"
  buttonColor: string = "primary"
  buttonType: string = "submit"

  buttonLabel1: string= "Calculate"
  buttonColor1: string = "success"
  buttonType1: string = "button"
  ngOnInit(): void {}
  representativeSubmit(){

  }

}
