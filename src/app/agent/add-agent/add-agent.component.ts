import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent implements OnInit{
    addAgent = new FormGroup({
      'name' : new FormControl('',[Validators.required]),
      'username' : new FormControl('',[Validators.required]),
      'phone' : new FormControl('',[Validators.required]),
      'registrationType' : new FormControl('',[Validators.required]),
      'registrationNo' : new FormControl('',[Validators.required]),
      'registrationDate' : new FormControl('',[Validators.required]),
      'contactPerson' : new FormControl('',[Validators.required]),
      'contactNumber' : new FormControl('',[Validators.required]),
      'contactEmail': new FormControl( '',[Validators.required]),
      'bankAccountName': new FormControl('',[Validators.required]),
      'bankAccountNo': new FormControl('',[Validators.required]),
      'bankName': new FormControl('',[Validators.required]),
      'bankBranch': new FormControl('',[Validators.required]),
      'routingNo': new FormControl('',[Validators.required]),
      'fatherName': new FormControl(''),
      'motherName': new FormControl(''),
      'spouseName': new FormControl(''),
      'regAssNID': new FormControl(''),
      'dob': new FormControl(''),
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
    agentSubmit(){

    }
 
}
