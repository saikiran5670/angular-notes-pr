import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {
searchText;

  dateVal  =new Date();

notes = [];
  recognition:any;
  constructor(private el:ElementRef) {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [{ title: 0,content:'' }];

    const {webkitSpeechRecognition} : IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.onresult = (event)=> {
      console.log(this.el.nativeElement.querySelectorAll(".content")[0]);
      this.el.nativeElement.querySelectorAll(".content")[0].innerText = event.results[0][0].transcript
      
    };
  }
  updateAllNotes() {
    console.log(document.querySelectorAll('app-note'));
    let notes = document.querySelectorAll('app-notes');

    notes.forEach((note, title)=>{
         console.log(note.querySelector('.content1').innerHTML)
         this.notes[note.title].content1 = note.querySelector('.content1').innerHTML;
    });

    localStorage.setItem('notes', JSON.stringify(this.notes));

  }

  addNote () {
    this.notes.push({ title:'',content:'' });
    // sort the array
    this.notes= this.notes.sort((a,b)=>{ return b.title-a.title});
    localStorage.setItem('notes', JSON.stringify(this.notes));
  };
  
  saveNote(event){
    const title =  event.target.innerText;
    event.target.innerText = content1;
    const content = event.target.innerText;
    event.target.innerText = content;
    const json = {
      'title':title,  
      'content':content
    }
    this.updateNote(json);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    console.log("********* updating note *********")
  }
  
  updateNote(newValue){
    this.notes.forEach((note, index)=>{
      if(note.title== newValue.title) {
        this.notes[index].content = newValue.content;
                this.notes[index].content1 = newValue.content1;

      }
    });
  }
  
  deleteNote(event){
     const title = event.srcElement.parentElement.parentElement.parentElement.getAttribute('title');
     this.notes.forEach((note, index)=>{
      if(note.title== title) {
        this.notes.splice(index,1);
        localStorage.setItem('notes', JSON.stringify(this.notes));
        console.log("********* deleting note *********")
        return;
      }
    });
  }

   record(event) {
    this.recognition.start();
    this.addNote();
  }


}


export interface IWindow extends Window {
  webkitSpeechRecognition: any;
}