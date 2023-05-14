import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/backendDataClasses/note';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-view',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.scss']
})
export class NoteViewComponent implements OnInit {

  authoredNotes: Note[] = []
  editorNotes: Note[] = []
  viewableNotes: Note[] = []

  constructor(
    private noteService: NotesService
  ) { }

  ngOnInit(): void {
    this.noteService.getPermissions()
    .subscribe(data => {
      console.log('data', data)
      data.forEach(permission => {
        permission.accessPermission === "AUTHOR" ? this.authoredNotes.push(permission.note) :
          permission.accessPermission === "EDITOR" ? this.editorNotes.push(permission.note) :
          this.viewableNotes.push(permission.note)
      })
    })
  }

}
