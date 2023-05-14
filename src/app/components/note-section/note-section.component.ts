import { Component, Input, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Note } from 'src/app/backendDataClasses/note';

@Component({
  selector: 'app-note-section',
  templateUrl: './note-section.component.html',
  styleUrls: ['./note-section.component.scss']
})
export class NoteSectionComponent implements OnInit {

  constructor( ) { }
  
  @Input() notes: Note[] = []
  
  ngOnInit(): void {
  }
  
  drop(event: any) {
    console.log('event.previousIndex', event.previousIndex)
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
  }

}
