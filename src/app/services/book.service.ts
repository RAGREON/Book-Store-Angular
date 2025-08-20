import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Observable, shareReplay } from "rxjs";

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

interface CachedBook {
  observable: Observable<Book>;
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class BookService {
  private apiUrl = "http://localhost:5216/api/Book";

  private cache = new Map<number, CachedBook>();
  private cacheDuration = 10 * 60 * 1000;



  constructor (private http: HttpClient) {}
  
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/all`);
  }
  
  getBook(id: number): Observable<Book> {
    const now = Date.now();
    const cached = this.cache.get(id);

    if (cached && now - cached.timestamp < this.cacheDuration) {
      return cached.observable;
    }

    const request$ = this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(
      shareReplay(1)
    );

    this.cache.set(id, { observable: request$, timestamp: now });

    return request$;
  }
}