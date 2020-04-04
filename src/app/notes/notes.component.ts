import {
  Component,
  HostBinding,
  EventEmitter,
  Output,
  ElementRef,
  OnInit
} from "@angular/core";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"]
})
export class NotesComponent implements OnInit {
  dateVal  =new Date();

  recognition: any;

  @Output() dismiss = new EventEmitter();
  @Output() focusout = new EventEmitter();
  constructor(private el: ElementRef) {
    const { webkitSpeechRecognition }: IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = event => {
      this.el.nativeElement.querySelector(".content").innerText +=
        event.results[0][0].transcript;
      console.log(event.results[0][0].transcript);
      document.getElementById("toolbar").focus();
    };
  }

  onDismiss(event) {
    this.dismiss.emit(event);
  }

  onFocusOut(event) {
    this.focusout.emit(event);
  }

  record(event) {
    this.recognition.start();
  }
}

export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}
