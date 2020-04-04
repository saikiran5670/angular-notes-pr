import { Component, OnInit, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent implements OnInit {
searchText;
//   heroes = [
//     { id: 11, name: 'Mr. Nice', country: 'India' },
//     { id: 12, name: 'Narco' , country: 'USA'},
//     { id: 13, name: 'Bombasto' , country: 'UK'},
//     { id: 14, name: 'Celeritas' , country: 'Canada' },
//     { id: 15, name: 'Magneta' , country: 'Russia'},
//     { id: 16, name: 'RubberMan' , country: 'China'},
//     { id: 17, name: 'Dynama' , country: 'Germany'},
//     { id: 18, name: 'Dr IQ' , country: 'Hong Kong'},
//     { id: 19, name: 'Magma' , country: 'South Africa'},
//     { id: 20, name: 'Tornado' , country: 'Sri Lanka'}
//   ];
//   constructor() { }

//   ngOnInit() {
//   }

// }
  dateVal  =new Date();

notes = [];
  recognition:any;
  constructor(private el:ElementRef) {
    this.notes = JSON.parse(localStorage.getItem('notes')) || [{ id: 0,content:'' }];

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

    notes.forEach((note, index)=>{
         console.log(note.querySelector('.content').innerHTML)
         this.notes[note.id].content = note.querySelector('.content').innerHTML;
    });

    localStorage.setItem('notes', JSON.stringify(this.notes));

  }

  addNote () {
    this.notes.push({ id: this.dateVal,content:'' });
    // sort the array
    this.notes= this.notes.sort((a,b)=>{ return b.id-a.id});
    localStorage.setItem('notes', JSON.stringify(this.notes));
  };
  
  saveNote(event){
    const id = event.srcElement.parentElement.parentElement.getAttribute('id');
    const content = event.target.innerText;
    event.target.innerText = content;
    const json = {
      'id':id,  
      'content':content
    }
    this.updateNote(json);
    localStorage.setItem('notes', JSON.stringify(this.notes));
    console.log("********* updating note *********")
  }
  
  updateNote(newValue){
    this.notes.forEach((note, index)=>{
      if(note.id== newValue.id) {
        this.notes[index].content = newValue.content;
      }
    });
  }
  
  deleteNote(event){
     const id = event.srcElement.parentElement.parentElement.parentElement.getAttribute('id');
     this.notes.forEach((note, index)=>{
      if(note.id== id) {
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