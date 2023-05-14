import { Component, Input, OnInit } from '@angular/core';
import { Note } from 'src/app/backendDataClasses/note';

@Component({
  selector: 'app-note-icon',
  templateUrl: './note-icon.component.html',
  styleUrls: ['./note-icon.component.scss']
})
export class NoteIconComponent implements OnInit {

  @Input() note!: Note

  constructor() { }

  ngOnInit(): void {
  }

}
