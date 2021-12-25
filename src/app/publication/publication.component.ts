import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Publication } from '../publication';
import { PublicationService } from '../publication.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  public publications!: Publication[];
  public posted!: Publication[];
  public editPublication !: Publication | null;
  public deletePublication!: Publication | null ;


  constructor(private publicationService : PublicationService) {}

  ngOnInit(): void {
      this.getPublications();
  }
  

  public getPublications(): void {
    this.publicationService.getPublications().subscribe(
      (response: Publication[]) => {
        this.publications = response;
        console.log(this.publications);
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }      
    );
    this.publicationService.getPosted().subscribe(
      (response: Publication[]) => {
        this.posted = response;
        console.log(this.posted);
      },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }      
    );
  }

  public onAddPublication(addForm:NgForm): void {
    document.getElementById('add-publication-form')?.click();
    addForm.value.url = "https://images.unsplash.com/photo-1525373612132-b3e820b87cea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80";
    this.publicationService.addPublication(addForm.value).subscribe(
      (response: Publication) => {
        console.log(response);
        this.getPublications();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      },

    )
  }

  public onUpdatePublication(publication:Publication): void {
    this.publicationService.updatePublication(publication).subscribe(
      (response: Publication) => {
        console.log(response);
        this.getPublications();
      }
    )
  }

    
  public onDeletePublication(publicationId: number): void {
    this.publicationService.deletePublication(publicationId).subscribe(
      (response: void) =>{
        console.log(response);
        this.getPublications();
      },
      (error: HttpErrorResponse) =>{
        alert(error.message);
      },

    );

  }

  public onOpenModal(publication: Publication | null, mode: string): void {

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    else if (mode === 'edit') {
      this.editPublication = publication;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    else  {
      this.deletePublication= publication;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
  
    container?.appendChild(button);
    button.click();
  }
}
