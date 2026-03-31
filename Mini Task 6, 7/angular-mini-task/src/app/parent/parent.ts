import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Child } from '../child/child';

@Component({
  selector: 'app-parent',
  imports: [CommonModule, Child],
  templateUrl: './parent.html',
  styleUrl: './parent.css',
})
export class Parent {
  message: string = 'Hello from Parent!';
  student = {
    name: 'Moiz Ansari',
    rollNo: 523
  };

  receivedMessage: string = '';

  getMessage(message: string) {
    this.receivedMessage = message;
  }
}