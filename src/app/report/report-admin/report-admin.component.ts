import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-admin',
  templateUrl: './report-admin.component.html',
  styleUrls: ['./report-admin.component.css']
})
export class ReportAdminComponent implements OnInit{
  buttonLabel: string= "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  dataSecondary: any =[]
  showThirdA: boolean = false
  showThirdR: boolean = false
  firstOption: string = ""
  reportSubmission = new FormGroup({
    'type' : new FormControl('',[Validators.required]),
    'subtype' : new FormControl('',[Validators.required]),
    'agusername' : new FormControl('',[Validators.required]),
    'repusername' : new FormControl('',[Validators.required])
  })
  ngOnInit(): void {
    
  }

  formSubmit(){

  }

  reportType(value:any){

    console.log(value)
    this.firstOption = value
    if(value==1)
      this.dataSecondary = [{"id":1,"value":"All Agents"},{"id":2, "value": "All Representative of an Agent"}]
    else if(value==2)
      this.dataSecondary = [{"id":1,"value":"All Representatives"}]
    else if (value==3)
      this.dataSecondary = [{"id":1,"value":"All"},{"id":2, "value": "Agent"},{"id":"3", "value":"Representative"}]

  }
  reportSubType(value: any){
    console.log(value)
    if((value=="2" && this.firstOption=="1")||(this.firstOption=="3"&&value=="2")){
      this.showThirdA = true
      this.showThirdR = false
    }
    else if(value=="3" && this.firstOption=="3"){
      this.showThirdR =  true
      this.showThirdA = false
    }else{
      this.showThirdA = false
      this.showThirdR = false
    }
  }
}
