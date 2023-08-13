import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { LoadingService } from 'app/services/loading.service';

@Component({
  selector: 'app-skill-intersection',
  templateUrl: './skill-intersection.component.html',
  styleUrls: ['./skill-intersection.component.scss'],
})
export class SkillIntersectionComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('footer') footer: ElementRef;

  item = {
    name: '用户',
    desc: '纸片允许用户查看信息、进行选择、过滤内容和输入数据。',
  };

  tables = [];

  page = {
    page: 0,
    size: 10,
  };

  observer: IntersectionObserver;

  get finish() { // 加载完成
    return this.page.page === 5;
  }

  constructor(
    private loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.page.page++;
    this.tables = this.tables.concat((new Array(this.page.size)).fill(this.item));
  }

  ngAfterViewInit(): void {
    this.createObserver();
  }

  ngOnDestroy(): void {
    this.observer && this.observer.disconnect();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !this.finish) {
        this.loadTables();
      }
    }, {
      root: null,
    });
    this.observer.observe(this.footer.nativeElement);
  }

  loadTables() {
    this.loadingService.start();
    setTimeout(() => {
      this.page.page++;
      this.tables = this.tables.concat((new Array(this.page.size)).fill(this.item));
      this.loadingService.stop();
    }, 1000);
  }
}
