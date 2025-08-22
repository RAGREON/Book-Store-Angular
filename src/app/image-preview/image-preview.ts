import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { BookFormComponent } from "./bookFormComponent";

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [CommonModule, BookFormComponent],
  templateUrl: './image-preview.html',
  styleUrls: ['./image-preview.scss'],
})
export class ImagePreview { }