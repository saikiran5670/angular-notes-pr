import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import{Note} from './services/note';

import { NoteService } from './services/note.service';
import { from } from 'rxjs';


@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrls: ['./note-data.component.css']
})
export class NoteDataComponent implements OnInit, OnDestroy {

  notes: Note[];
  private notesSubscription: Subscription;
 
  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.notesSubscription = this.noteService.getNotes().subscribe(data=> {
      this.notes = data;
    });
  }

  ngOnDestroy(): void{
    if(this.notesSubscription){
      this.notesSubscription.unsubscribe();
    }
  }

}