import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProject } from 'app/models/user-project';
import { Observable } from 'rxjs';

@Injectable()
export class CoreService {
  private PROJECTS_URL = 'https://private-052d6-testapi4528.apiary-mock.com/info';

  constructor(private httpClient: HttpClient) {   
  }

  getUserProjects(): Observable<UserProject[]> {
    return this.httpClient.get<UserProject[]>(this.PROJECTS_URL)
  }
}