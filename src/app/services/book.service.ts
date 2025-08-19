import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable } from "rxjs";

export interface GenreDto {
  id: number,
  name: string
};

export interface Book {
  id: number,
  name: string,
  releaseDate: string,
  description: string,
  genres: []
};

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = "http://localhost:5216/api/Book";

  constructor (private http: HttpClient) {}
  
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/all`);
  }
  
  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`)
  }
}