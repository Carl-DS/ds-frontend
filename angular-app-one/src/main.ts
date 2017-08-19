import { enableProdMode } from '@angular/core'; // 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'; // 引用系统类库

import { AppModule } from './app/app.module'; // 引用app.module.ts 文件的AppModule
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule); // 启动程序加载模块
