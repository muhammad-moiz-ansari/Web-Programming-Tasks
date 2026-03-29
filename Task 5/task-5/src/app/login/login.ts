import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Required for ngModel

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: '../app.css'
})
export class Login {
  formData = {
    username: '',
    password: '',
  };

  onSubmit() {
    console.log("Successfully logged in!");
    console.log(this.formData);
    alert(`Welcome ${this.formData.username}, you have been logged in!`);
    
    // Clearing form
    this.formData = { username: '', password: '' };
  }
}