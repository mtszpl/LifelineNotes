import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteIconComponent } from './note-icon/note-icon.component';
import { NoteSectionComponent } from './note-section/note-section.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MaterialModule } from '../modules/materials.module';



@NgModule({
  declarations: [
    NoteIconComponent,
    NoteSectionComponent
  ],
  imports: [
    DragDropModule,
    MaterialModule,
    CommonModule
  ],
  exports: [
    NoteIconComponent,
    NoteSectionComponent
  ]
})
export class ComponentsModule { }
