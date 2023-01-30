import { Component, OnInit, ViewChild } from '@angular/core';
import { UserProject } from 'app/models/user-project';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {
  userProjects: UserProject[];
  avg: number = 0;
  proMadeDadelineAmount: number;
  public searchKey: string;
  @ViewChild('dt') table: any;
  tempPro: UserProject[];

  constructor(private coreService: CoreService) { }

  ngOnInit(): void {
    this.getUserProjects()
  }

  getUserProjects() {
    this.coreService.getUserProjects().subscribe(response => {
      this.userProjects = response
      this.tempPro = response
      this.calcAVG(this.userProjects)
      this.calcPrecents(this.userProjects)
    })
  }
  filteredProjects: any[];
  onSearchChanged() {
    if (this.searchKey != "") {
      this.userProjects = this.tempPro;
      this.table.filterGlobal(this.searchKey, 'contains');
      this.userProjects = this.userProjects.filter(pro =>
        pro.id.includes(this.searchKey) ||
        pro.name.includes(this.searchKey) ||
        pro.score.toString().includes(this.searchKey) ||
        pro.bugsCount.toString().includes(this.searchKey) ||
        pro.durationInDays.toString().includes(this.searchKey) ||
        pro.madeDadeline.toString().includes(this.searchKey)
      )
    }
    else {
      this.userProjects = this.tempPro;
    }
    this.calcAVG(this.userProjects);
    this.calcPrecents(this.userProjects);
  }
  calcAVG(projects) {
    this.avg = projects.reduce((prev, next) => prev + next.score, 0) / projects.length;
  }

  calcPrecents(projects) {
    this.proMadeDadelineAmount = projects.filter(pro => pro.madeDadeline == true).length / projects.length
  }
}
