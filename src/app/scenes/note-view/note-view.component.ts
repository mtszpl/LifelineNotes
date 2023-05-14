import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent implements OnInit {

  notes: any[] = []

  constructor(
    private noteService: NotesService
  ) { }

  ngOnInit(): void {
    this.noteService.getPermissionsAndNotes()
    .subscribe(data => {
      console.log('data', data)
      this.notes = data
    })
  }

}
