import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  readFile() {
    // look: 
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    // https://web.dev/file-system-access/
    // https://marked.js.org/

    // const dd = await window?.showOpenFilePicker();
    this.router.navigateByUrl(`/detail?fileName=内联元素`)
  }
}
