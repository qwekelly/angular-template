# @anguler/elements 使用 Angular 打造框架无关的 web 组件

> @angular/elements这个包提供可将 Angular 组件转化为原生 Web Components 的功能，它基于浏览器的 Custom Elements API 实现。Angular Elements 提供一种更简洁、对开发者更友善、更快乐地开发动态组件的方式 —— 在幕后它基于同样的机制（指创建动态组件），但隐藏了许多样板代码。


## 相关链接🔗

* Web Component： https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components
* `@anguler/elements` doc： https://angular.io/guide/elements
* `@anguler/elements` code： https://github.com/angular/angular/tree/main/packages/elements
* `ngx-build-plus`：https://www.npmjs.com/package/ngx-build-plus



### 一、使用 @anguler/elements 创建一个 Web Component

> ng add @angular/elements

创建一个传统的 Angular 组件（将被用作 web Component）

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'tui-avatar',
  template: `
    <div
      class="avatar"
      [style.width]="size + 'px'"
      [style.height]="size + 'px'"
      [style.line-height]="size + 'px'"
      [style.font-size]="(size / 2) + 'px'"
      [style.border-radius]="radius + 'px'"
      [style.background-color]="bgColor"
    >{{letter}}</div>
  `,
  styleUrls: ["./avatar.scss"],
})
export class AvatarComponent {

  @Input() name: string = '匿';

  @Input() id: string = '0';

  @Input() size: number = 50;

  @Input() radius: number = 6;

  colors = ['#FFC068', '#94D877', '#5CC2F8', '#77A4F9'];

  get letter() {
    return this.name.substring(0, 1);
  }

  get bgColor() {
    return this.colors[parseInt(this.id, 16) % this.colors.length];
  }

}
```

在 module 中，通过使用 Angular Element 的 createCustomElement 方法，利用注入的服务将 Angular Component 包装为 web component。 customElements.define 方法将组件注册在浏览器上。 上述方法均执行于 ngDoBootstrap 方法中，因为该流程应当被手动启动，而不是由 Angular 引导数组启动。

```typescript
import { Injector, NgModule, DoBootstrap, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import {
  AvatarComponent,
} from './components';

const Components = [
  {
    name: 'tui-avatar',
    component: AvatarComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AvatarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [ // 在打包给到跨框架使用时需要将 bootstrap 注释掉。
    AppComponent,
  ]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    Components.forEach(ele => {
      customElements.define(ele.name, createCustomElement(ele.component, { injector: this.injector }));
    });
  }
}

```

在项目中调用

```html
<tui-avatar [id]="userId"></tui-avatar>
```


### 二、在其他框架中使用

> ng add ngx-build-plus

该指令将会更新 angular.json 文件中的 build target 为 ngx-build-plus:build
然后 add polyfills

> ng g ngx-build-plus:wc-polyfill

该指令将会更新 angular.json 文件的 build scripts
```json
  "scripts": [
    {
      "bundleName": "polyfill-webcomp-es5",
      "input": "node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"
    },
    {
      "bundleName": "polyfill-webcomp",
      "input": "node_modules/@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce-pf.js"
    }
  ]
```

新增 package.json 的 scripts 指令：

```json
"build:ui": "ng build --configuration production --single-bundle true --keep-polyfills",
```

如此，于项目中执行 `npm run build:ui` 会得到打包出来的 disk 文件包，我们只需要将文件包中的 `main.js`、`polyfills.js`、`styles.css` 引入到我们的项目中即可使用自定义组件（确保 polyfills 的正常使用）。


### 三、Angular Elements 的限制

* `@angular/elements` 只提供 `createCustomElement()` 方法对angular组件进行原生组件转换。
* 某些复杂的 Angular 功能可能无法完全支持。这包括某些特定的元数据装饰器，如 ContentChildren、ViewChild、ViewChildren 等。这些装饰器和功能依赖于 Angular 的运行时环境，而在自定义元素中可能无法正常工作。
* 自定义 Decative 也无法在自定义元素中使用。
* 需要大量使用 `@Input`、`@Output`来传递数据，或者使用服务来进行通信。

### 四、使用中的问题
1、在第三方框架中使用时，注意 `main.js`、`polyfills.js` 的引入顺序，要先引入 `polyfills.js`，https://github.com/angular/angular/issues/50742#issuecomment-1640317948

2、打包给第三方框架使用时，要把 `app.module.ts` 中的 bootstrap 注释掉。
https://github.com/angular/angular/issues/50564#issuecomment-1576085134

3、Angular 组件默认使用 `ViewEncapsulation.Emulated` 封装策略，这会将组件样式限定在组件的影子 DOM（Shadow DOM）中。但是自定义元素不使用影子 DOM，因此样式封装将不起作用。为了使 `HostBinding` 生效，需要将 `ViewEncapsulation.None` 应用于组件，以允许样式直接应用于自定义元素。

```typescript
@Component({
  selector: 'tui-btn',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./btn.sass'],
  encapsulation: ViewEncapsulation.None,
})
```

4、对于 `Input` 定义的属性，如果属性中有大写字母，在经过`createCustomElement()` 之后，会转译成`-lowerCase`。所以如果在项目中以`setAttribute()`给属性赋值时，哪怕定义的属性有大写，都要手动替换成小写才能成功赋值。
>如：`tuiBtn` -> `tui-btn`
```typescript
/**
 * Convert a camelCased string to kebab-cased.
 */
export function camelToDashCase(input: string): string {
  return input.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);
}
```


## 拓展🔗

* https://www.angulararchitects.io/blog/angular-elements-part-i/
* https://juejin.cn/post/6844903638779822088#heading-1
* https://zhuanlan.zhihu.com/p/98621475
