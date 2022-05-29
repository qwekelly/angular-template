import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  fileName = '';

  constructor(
    private router: ActivatedRoute,
  ) {
    this.router.queryParams.subscribe(query => {
      this.fileName = query['fileName']
      this.findAssetFileByName()
    })
  }

  ngOnInit() {}


  findAssetFileByName() {
    if (!this.fileName) {
      return
    }
    console.log(this.fileName)
  }
}
