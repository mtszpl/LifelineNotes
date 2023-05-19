import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/backendDataClasses/note';

@Component({
  selector: 'app-note-icon',
  templateUrl: './note-icon.component.html',
  styleUrls: ['./note-icon.component.scss']
})
export class NoteIconComponent implements OnInit {

  @Input() note!: Note
  @Input() access: string = "NONE"

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  noteSelected(event: Event): void {
    console.log('click')
    this.router.navigate([`/note/${this.note.id}`]);
  }

}
