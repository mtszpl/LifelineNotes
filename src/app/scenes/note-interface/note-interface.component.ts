import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, fromEvent, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-note-interface',
  templateUrl: './note-interface.component.html',
  styleUrls: ['./note-interface.component.scss']
})
export class NoteInterfaceComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>
  drawSub!: Subscription
  drawEndSub!: Subscription
  private ctx!: CanvasRenderingContext2D

  public panelOpenState = false

  //canvas settings
  canvasSizeXFactor: number = 0.8
  canvasSizeYFactor: number = 0.75

  //drawing settings
  _selectedColor: string = "#000000"
  public get selectedColor(): string {
    return this._selectedColor
  }
  public set selectedColor(selectedColor: string) {
    this._selectedColor = selectedColor
  }

  _brushSize: number = 1
  public get brushSize(): number {
    return this._brushSize
  }
  public set brushSize(brushSize: number) {
    this._brushSize = brushSize
  }

  colors: string[] = [
    "#000000",
    "#ff6666",
    "#ff0000",
    "#990000",
    "#9999ff",
    "#3333ff",
    "#000099",
    "#ccffcc",
    "#00ff00",
    "#003300"
  ]

  selectedDrawingMode: string = "offhand"
  drawingMode: Function = this.offhandDraw
  drawingModes: string[] = [
    "offhand",
    "rectangle",
    "triangle"
  ]
  
  constructor(
  ) { }
  
  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext("2d")!
    this.canvas.nativeElement.width = window.innerWidth * this.canvasSizeXFactor;
    this.canvas.nativeElement.height = window.innerHeight * this.canvasSizeYFactor

    let img = new Image()
    let imgSrc = localStorage.getItem("image")
    if(imgSrc !== null)
    {
      img.src = imgSrc
      img.onload = () => {
      this.ctx.drawImage(img, 0, 0)
      }
    }
    
    this.drawSub = fromEvent(this.canvas.nativeElement, 'mousedown')
    .pipe(
      switchMap(() => {
        return fromEvent(this.canvas.nativeElement, 'mousemove')
        .pipe( 
          takeUntil(fromEvent(this.canvas.nativeElement, 'mouseup')),
          takeUntil(fromEvent(this.canvas.nativeElement, 'mouseleave'))
          )
      }))
    .subscribe( (e: any) => 
    {
      this.drawingMode(e)
      this.saveLocally()
    })
    this.drawEndSub = fromEvent(this.canvas.nativeElement, 'mouseup')
    .subscribe(() => this.ctx?.beginPath())
  }

  offhandDraw(e: any) {
    let x = e.clientX - this.canvas.nativeElement.offsetLeft
    let y = e.clientY - this.canvas.nativeElement.offsetTop
    this.ctx.strokeStyle = this.selectedColor;
    this.ctx.lineWidth = this.brushSize
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
  }

  saveLocally() {
    let image = this.canvas.nativeElement.toDataURL()
    localStorage.setItem("image", image)
  }
  
  saveNote() {
    console.log("saving")
    let image = this.canvas.nativeElement.toDataURL()//.replace("image/png", "image/octet-stream");
    console.log(image)
    localStorage.setItem("image", image)
  }

  ngOnDestroy(): void {
    this.drawSub.unsubscribe()
    this.drawEndSub.unsubscribe();
    localStorage.removeItem("image")
  }

  debug() {
    console.log(this.selectedDrawingMode)
  }
}
