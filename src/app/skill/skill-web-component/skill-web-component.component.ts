import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-skill-web-component',
  templateUrl: './skill-web-component.component.html',
  styleUrls: ['./skill-web-component.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class SkillWebComponentComponent implements OnInit {

  userInfo = {
    id: 0,
    name: '权威坦白说',
    position: '认真测试工程师',
    desc: '现在加上了，之前是按照部门设置权限的，后来发现你们这个部门名称变了，可能之前的权限就没了',
  }

  constructor() { }

  ngOnInit(): void {
  }

  onTest() {
    this.userInfo.id += 1;
    console.log(this.userInfo);
  }
}
