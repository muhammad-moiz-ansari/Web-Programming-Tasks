import { NgModule } from '@angular/core';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Parent } from './parent/parent';
import { Child } from './child/child';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Parent, Child],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-mini-task');
}

@NgModule({
  imports: [RouterOutlet, Parent, Child]
})
export class AppModule {}