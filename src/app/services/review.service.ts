import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ReviewDto {
  id: number,
  rating: number,
  description?: string,
  bookId: number,
  createdAt: string,
  editedAt?: string
};

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = "http://localhost:5216/api/Review";

  constructor (private http: HttpClient) {}

  getReviews(id: number): Observable<ReviewDto[]> {
    return this.http.get<ReviewDto[]>(`${this.apiUrl}/Book/${id}`);
  }

  getAverageBookRating(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/Book/${id}/avg`);
  }
}
