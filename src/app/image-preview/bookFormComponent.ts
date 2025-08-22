import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenreService } from '../services/genre.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, switchMap, tap } from 'rxjs';
import { GenreDto } from '../services/book.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './book-form.html',
  styleUrls: ['./image-preview.scss'],
})
export class BookFormComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);
  private genreService = inject(GenreService);

  previewUrl: string | null = null;

  bookForm = this.formBuilder.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    releaseDate: ['', Validators.required],
    genres: [[] as number[]],
  });

  availableGenres: GenreDto[] = [];

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(() => this.genreService.getGenres()),
        tap((genres) => {
          console.log(genres);
          this.availableGenres = genres;
        }),
        catchError((err) => {
          console.log('error fetching genres: ', err);
          return of([] as GenreDto[]);
        })
      )
      .subscribe();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }

    this.previewUrl = URL.createObjectURL(file);
  }

  onSubmit() {
    console.log('Hello Guys!!');
  }
}
