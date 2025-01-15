import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'] // corrected from `styleUrl` to `styleUrls`
})
export class ChatComponent implements OnInit {

  public message: string = '';
  public messages: any = []; // Store messages as objects with `text` and `isSender`

  ngOnInit(): void {
    this.listMessage();
  }

  constructor(private chatService: ChatService) { }

  // Send a message and mark it as sent
  public sendMessage() {
    this.chatService.sendMessage(this.message);
    this.messages.push({ text: this.message, isSender: true }); // Add `isSender: true`
    this.message = ''; // Reset the input field
  }

  // Listen to messages from the server and mark them as received
  public listMessage() {
    this.chatService.listMessage().subscribe((data: any) => {
      this.messages.push({ text: data.data, isSender: false }); // Add `isSender: false`
      console.log(data);
    });
  }

  // Handle file upload
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      console.log('Selected file:', file);
      // Add your file upload logic here
    }
  }
}
