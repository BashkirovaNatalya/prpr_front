import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Publication } from './publication';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

    public getPublications(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiServerUrl}/publication/all`);    
   }

   public addPublication(publication: Publication): Observable<Publication> {
    return this.http.post<Publication>(`${this.apiServerUrl}/publication/add`, publication);    
   }

   public updatePublication(publication: Publication): Observable<Publication> {
    return this.http.put<Publication>(`${this.apiServerUrl}/publication/update`, publication);    
   }

   public deletePublication(publicationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/publication/delete/${publicationId}`);    
   }

   public getPosted(): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.apiServerUrl}/publication/all_posted`);    
   }
}
