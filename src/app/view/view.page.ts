import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalService } from '../localstorage.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  custs: any;
  results: any;
  url:any;
  constructor(
    private actRoute: ActivatedRoute,
    private localstroge: LocalService,
    private router: Router
  ) { 
    const data = this.router.getCurrentNavigation()?.extras.state;
    this.custs = data;
    console.log(this.router.getCurrentNavigation()?.extras.state);
  }


  routeclick(data: any) {
    console.log("datadatadata",data)
    this.router.navigate(['/detail'], {state: data});

  }

  ngOnInit() {
    //this.Viewall();
  }

  Viewall() {
    // this.custlist = JSON.parse(this.localstroge.getData('Details') as any);
    // this.results = [...this.custlist]
    // console.log("data", this.custlist)
    // this.router.navigate(['/detail']);
    
  }


  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (event:any) => { 
        this.url = event.target.result;
      }
    }
  }


}

