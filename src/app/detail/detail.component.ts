import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { marked } from 'marked';
import hljs  from 'highlight.js';

import { LoadingService } from 'app/services/loading.service';
import { BaseService } from 'app/services/base.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @ViewChild('content') content!: ElementRef;

  fileName = '';

  constructor(
    private router: ActivatedRoute,
    private baseService: BaseService,
    private loadingService: LoadingService,
  ) {
    this.router.queryParams.subscribe(query => {
      this.fileName = query['fileName']
      this.loadingService.start()
      this.findAssetFileByName()
    })
  }

  ngOnInit() {}

  findAssetFileByName() {
    if (!this.fileName) {
      return
    }
    this.baseService.getMarkDownFile(this.fileName).subscribe((data) => {
      Promise.resolve().then(() => {
        this.content.nativeElement.innerHTML = marked.parse(data, {
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight: (code, lang, callback) => {
            return hljs.highlightAuto(code).value;
          }
        });
        this.loadingService.stop()
      })
    })
  }
}
