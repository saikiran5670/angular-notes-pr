import { Component,HostBinding, EventEmitter, Output, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
   recognition:any;

  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();
  constructor(private el:ElementRef) {
    this.recognition.onresult = (event)=> {
      this.el.nativeElement.querySelector(".content").innerText += event.results[0][0].transcript
      console.log(event.results[0][0].transcript) 
      document.getElementById('toolbar').focus();
    };
  }
   onDismiss(event){
    this.dismiss.emit(event);
  }

}