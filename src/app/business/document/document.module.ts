import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DocumentRoutingModule} from './document-routing.module';
import {DocumentComponent} from './document.component';
import {DocumentAddComponent} from './document-add/document-add.component';
import {DocumentEditComponent} from './document-edit/document-edit.component';
import {CrumbsModule} from '../../../public/crumbs/crumbs.module';
import {BailyTableModule} from '../../../public/baily-table/baily-table.module';
import {PaginationModule} from '../../../public/pagination/pagination.module';
import {ListModule} from '../../../public/list/list.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, NzUploadModule, NzSelectModule, zh_CN} from 'ng-zorro-antd';
import {DatetimeModule} from '../../pipe/datetime.module';
import {HttpsUtils} from '../../utils/HttpsUtils.service';

@NgModule({
  declarations: [DocumentComponent, DocumentAddComponent, DocumentEditComponent],
  imports: [
    CommonModule,
    CrumbsModule,
    BailyTableModule,
    PaginationModule,
    ListModule,
    NzUploadModule,
    FormsModule,
    NzSelectModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    DatetimeModule.forRoot(),
    DocumentRoutingModule
  ],
  bootstrap: [DocumentComponent],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, HttpsUtils]
})
export class DocumentModule {
}
