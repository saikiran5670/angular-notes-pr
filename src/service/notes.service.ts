import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Note } from '/note';

@Injectable({
  providedIn: 'root',
})

export class NoteService {
  private notes: Note[];
  constructor() {
    this.notes = [{ title: 'Unknown', content: 'askljdfl;asjfaskjf;asjf;sadfjas' },

    ];
  }

  getNotes(): Observable<Note[]> {
    return Observable.of(this.notes);
  }
}