import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { } //socket instence which will be used to interact with web sockets.
  
  //emit() method is used to send data to the server in the name of 'message'
  public sendMessage(message:string){
    this.socket.emit('message',message); 
  }
  //listens the incomming messages from web sockets
  public listMessage(){
    //msg is received from the server in the name of 'received' and emits data as it is:
    return this.socket.fromEvent('received').pipe(map((data)=> data));
  }
}
