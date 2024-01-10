import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Title} from "@angular/platform-browser";
import { forkJoin } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { FormControl, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarModule, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import { RepresentativeService } from 'src/app/services/representative-service/representative.service';
import { TransferService } from 'src/app/services/transfer-service/transfer.service';
import { AgentService } from 'src/app/services/agent-service/agent.service';
@Component({
  selector: 'app-trp',
  templateUrl: './trp.component.html',
  styleUrls: ['./trp.component.css']
})
export class TrpComponent implements OnInit{

  buttonLabel: string = "Submit"
  buttonColor: string = "primary"
  buttonType: string = "button"
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  message : string = ""
  localStoreObj : any = {}
  username : string = ""
  agents: any = []
  agentPrev: any = ""
  trpData: any = {}
  tranferForm = new FormGroup({
    'requestedBy' : new FormControl({value:'',disabled:true},[Validators.required],),
    'requestedType' : new FormControl({value:'',disabled:true},[Validators.required]),
    'requestFor' : new FormControl('',[Validators.required]),
    'previouslyAssigned' : new FormControl({value:'',disabled:true},[Validators.required]),
    'previouslyAssignedName' : new FormControl({value:'',disabled:true},[Validators.required]),
    'requestForType' : new FormControl('',[Validators.required]),  //agent
    'reason' : new FormControl('',[Validators.required]), //trp
    'filePath' : new FormControl(''), //trp,
    'status': new FormControl('')
  })

  constructor(
    private router: Router,
    private titleService:Title,
    private route: ActivatedRoute,
    private localStore: LocalStorageService,
    private representativeServ: RepresentativeService,
    private agentServ: AgentService,
    private _snackBar: MatSnackBar
  ){
    this.titleService.setTitle("Transfer Request");
  }

  ngOnInit(): void {
    let temp = this.localStore.getStorageItems()
    this.username = temp.username!=null?JSON.parse(temp.username):""
    let role = temp.role!=null?JSON.parse(temp.role):""

    forkJoin([this.agentServ.getAll(),this.representativeServ.getTheAgentDetails(this.username)])
      .subscribe({
        next: (data) => {
          this.trpData = data[1]
          this.agentPrev = data[1].tin
          this.agents = data[0]
          this.tranferForm.get('requestedBy')?.setValue(this.username)
          this.tranferForm.get('requestedType')?.setValue("ROLE_REPRESENTATIVE")
          this.tranferForm.get('requestForType')?.setValue("ROLE_AGENT")
          this.tranferForm.get('previouslyAssigned')?.setValue(this.agentPrev)
          this.tranferForm.get('previouslyAssignedName')?.setValue(this.trpData.name)
        },
        error: (e) => {
          console.log("Error retrieving")
        }
      });

    
  }

  requestSubmit(){
    this.tranferForm.get('requestedBy')?.setValue(this.username)
    this.tranferForm.get('requestedType')?.setValue("ROLE_REPRESENTATIVE")
    this.tranferForm.get('requestForType')?.setValue("ROLE_AGENT")
    this.tranferForm.get('previouslyAssigned')?.setValue(this.agentPrev)
    this.tranferForm.get('previouslyAssignedName')?.setValue(this.trpData.name)
    this.tranferForm.get('status')?.setValue("0")
    this.tranferForm.get('previouslyAssignedName')?.setValue(this.trpData.name)

    console.log(this.tranferForm.value)
  }

}
