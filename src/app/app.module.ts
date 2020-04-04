import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { NotesComponent } from './notes/notes.component';
import { DeleteComponent } from './delete/delete.component';
import { ShowDataComponent } from './show-data/show-data.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule,Ng2SearchPipeModule ],
  declarations: [ AppComponent, CreateComponent, NotesComponent, DeleteComponent, ShowDataComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
