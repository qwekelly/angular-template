import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  readFile() {
    // look: 
    // https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
    // https://web.dev/file-system-access/
    // https://marked.js.org/

  }
}
