import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStar as fullStar,
  faStarHalfStroke as halfStar,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { Book, BookService } from '../../services/book.service';
import { ReviewDto, ReviewService } from '../../services/review.service';
import { Observable, startWith, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './single.html',
  styleUrls: ['./single.scss'],
})
export class Single {
  fullStar = fullStar;
  emptyStar = emptyStar;
  halfStar = halfStar;
  maxRating = 5;
  
  book$!: Observable<Book>;
  reviews$!: Observable<ReviewDto[]>;
  averageRating$!: Observable<number>;
  starsArray = Array.from({ length: this.maxRating });

  constructor (private route: ActivatedRoute, private bookService: BookService, private reviewService: ReviewService) {
    try {
      this.book$ = this.route.params.pipe(
        switchMap(params => this.bookService.getBook(+params['id']))
      );

      this.reviews$ = this.route.params.pipe(
        switchMap(params => this.reviewService.getReviews(+params['id'])),
        startWith([])
      );

      this.averageRating$ = this.route.params.pipe(
        switchMap(params => this.reviewService.getAverageBookRating(+params['id'])),
        startWith(0)
      );
    } catch (error) {
      console.log('error fetching data: ', error);
    }
  }

  floor(value: number) {
    return Math.floor(value);
  }

  getStars(rating: number) {
    return Array.from({ length: this.maxRating }, (_, i) => {
      const index = i + 1;
      if (index <= Math.floor(rating)) {
        return this.fullStar;
      }
      else if (index >= Math.floor(rating)) {
        return this.halfStar;
      }
      else {
        return this.emptyStar;
      }
    })
  }
}