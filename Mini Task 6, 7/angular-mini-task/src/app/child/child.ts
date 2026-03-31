import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-child',
  imports: [CommonModule, JsonPipe],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child {
  @Input() data: any;
  @Input() showButton: boolean = false;
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit('Hello from Child!');
  }
}