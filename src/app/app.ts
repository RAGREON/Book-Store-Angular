import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Navbar } from "./navbar/navbar";
import { BrowserModule } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, Navbar],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {}