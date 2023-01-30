import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CoreRoutingModule } from './core-routing.module';
import { UserProjectsComponent } from './components/user-projects/user-projects.component';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CoreService } from './services/core.service';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    UserInfoComponent,
    UserProjectsComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    TableModule,
    FormsModule,
    TranslateModule
  ],
  providers:[CoreService]
})
export class CoreModule { }
