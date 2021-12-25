import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { Publication } from './publication';
import { PublicationService } from './publication.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public publications!: Publication[];
  public posted!: Publication[];



  constructor(private publicationService : PublicationService, 
    private userService: UserService){}

  ngOnInit(): void {
      this.getPublications();
  }
  

  public getPublications(): void {
    this.publicationService.getPublications().subscribe(
      (response: Publication[]) => {
        this.publications = response;
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }      
    );

}
}
