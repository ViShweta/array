import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, EmailValidator, FormArray, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router, RouterState } from '@angular/router';
import { LocalService } from '../localstorage.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  editForm: FormGroup;
  formSubmitted: boolean = false;
  FormArray: any;
  holder: any;
  id: any;
  custlist: any = []
  custData: any = [];
  userdata: any;

  constructor(
    private actRoute: ActivatedRoute,
    private localstroge: LocalService,
    private router: Router,
    private fb: FormBuilder,
  ) {

    this.userdata = this.router.getCurrentNavigation()?.extras?.state;
    console.log(this.userdata);

    this.editForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      mobile: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      interset: this.fb.array([
        this.fb.group({
          title: new FormControl(""),
        }),
      ]),
    });



  }
  ngOnInit() {


    this.editForm.controls['name'].setValue(this.userdata.name);
    this.editForm.controls['email'].setValue(this.userdata.email);
    this.editForm.controls['mobile'].setValue(this.userdata.mobile);
    
    const hobbiesArray  = this.editForm.controls['interset'] as FormArray;
    console.log(hobbiesArray);
    hobbiesArray.clear();
    this.userdata.interset.forEach((i: any) => {
      console.log(i);
      hobbiesArray.push(
        new FormGroup({
          title: new FormControl(i.title)
        })
      );
    });
  }

  get interset(): FormArray {
    return this.editForm.get('interset') as FormArray;
  }

  removeinterset(index: number) {
    this.interset.removeAt(index);
  }

  addinterset() {
    this.interset.push(
      new FormGroup({
        title: new FormControl(""),
      })
    );
  }

  OnEdit(value: any) {
    if (value != null || value != undefined) {
      if ((this.custlist != null || this.custlist != undefined || this.custlist != '')) {
        this.custlist[this.id] = value;
        this.localstroge.saveData('interset', JSON.stringify(this.custlist));
        console.log("string", this.custlist)
      }
    }
  }

}
