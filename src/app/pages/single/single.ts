import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faStar as fullStar,
  faStarHalfStroke as halfStar,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { Book, BookService } from '../../services/book.service';

@Component({
  selector: 'app-single',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './single.html',
  styleUrls: ['./single.scss'],
})
export class Single implements OnInit {
  fullStar = fullStar;
  emptyStar = emptyStar;
  halfStar = halfStar;

  rating = 3.2;
  maxRating = 5;

  book: Book | null = null;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookService.getBook(1).subscribe({
      next: (data) => {
        console.log(data);
        this.book = data;
      },
      error: (err) => console.error(err),
    });
  }

  floor(value: number) {
    return Math.floor(value);
  }

  get starsArray() {
    return Array.from({ length: this.maxRating });
  }
}