import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { marked } from 'marked';
import hljs  from 'highlight.js';

import { LoadingService } from 'app/services/loading.service';
import { BaseService } from 'app/services/base.service';

import { SaveByFilePicker } from 'utils/file-download';

// https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader
// https://web.dev/file-system-access/
// https://marked.js.org/

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @ViewChild('box') box!: ElementRef<HTMLElement>;
  @ViewChild('content') content!: ElementRef<HTMLElement>;

  activeName = '';

  fileNameList = [
    'display的多种写法',
    '为iphonex设计网站',
    '内联元素',
    '列表模型之counter计数器',
    '列表模型之marker标记',
    '在vue项目中实现图片打马赛克',
    '媒体查询',
    '说一说 background 属性',
    '说一说 overflow 属性',
    '说一说 position 属性',
    '高效优化策略之webpack插件压缩CSS体积',
    '高效优化策略之延迟加载非关键CSS',
    '高效优化策略之编写风格'
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private baseService: BaseService,
    private loadingService: LoadingService,
  ) {
    this.route.queryParams.subscribe(query => {
      this.activeName = query['fileName'] || this.fileNameList[0];
      this.loadingService.start()
      this.findAssetFileByName()

      if (!query['fileName']) {
        this.addQueryParamsToRouter()
      }
    })
  }

  ngOnInit() {}

  findAssetFileByName() {
    if (!this.activeName) {
      return
    }
    this.baseService.getMarkDownFile(this.activeName).subscribe((data) => {
      Promise.resolve().then(() => {
        this.content.nativeElement.innerHTML = marked.parse(data, {
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight: (code, lang, callback) => {
            return hljs.highlightAuto(code).value;
          }
        });
        this.box.nativeElement.scrollTo(0, 0)
        this.loadingService.stop()
      })
    })
  }

  addQueryParamsToRouter() {
    this.router.navigate(['detail'], {
      queryParams: {
        fileName: this.activeName
      }
    })
  }

  onDownload() {
    this.loadingService.start();
    this.baseService.getMarkDownFile(this.activeName).subscribe((content) => {
      const accept = {
        'text/plain': ['.md']
      }
      SaveByFilePicker(content, accept, this.activeName, (status) => {
        this.loadingService.stop();
      });
    })
  }
}
