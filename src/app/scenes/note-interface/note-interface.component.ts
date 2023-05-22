import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, fromEvent, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-note-interface',
  templateUrl: './note-interface.component.html',
  styleUrls: ['./note-interface.component.scss']
})
export class NoteInterfaceComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>
  drawStartSub!: Subscription
  drawSub!: Subscription
  drawEndSub!: Subscription
  private ctx!: CanvasRenderingContext2D

  //canvas settings
  canvasSizeXFactor: number = 0.8
  canvasSizeYFactor: number = 0.75

  //drawing settings
  isDrawing: boolean = false
  startMouseX: number = 0
  startMouseY: number = 0
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
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { 
    this.drawingModes.forEach(mode => 
      this.matIconRegistry.addSvgIcon(mode, 
        this.domSanitizer.bypassSecurityTrustResourceUrl(`../../assets/svg/${mode}.svg`)
      )
    )
  }
  
  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext("2d")!
    this.canvas.nativeElement.width = window.innerWidth * this.canvasSizeXFactor;
    this.canvas.nativeElement.height = window.innerHeight * this.canvasSizeYFactor
    this.loadImage()
    this.loadDrawingMode()
    this.connectSubscriptions()
  }

  loadDrawingMode(): void {
    localStorage.getItem("drawingMode") === null ? 
      this.selectedDrawingMode = "offhand" : 
      this.selectedDrawingMode = localStorage.getItem("drawingMode")!
  }

  loadImage(): void {
    let img = new Image()
    let imgSrc = localStorage.getItem("image")
    if(imgSrc !== null)
    {
      img.src = imgSrc
      img.onload = () => {
      this.ctx.drawImage(img, 0, 0)
      }
    }
  }

  connectSubscriptions(): void {
    this.drawStartSub = fromEvent(this.canvas.nativeElement, 'mousedown')
    .subscribe((e: any) => {
      this.startMouseX = e.clientX - this.canvas.nativeElement.offsetLeft
      this.startMouseY = e.clientY - this.canvas.nativeElement.offsetTop
      this.isDrawing = true    
    })
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
      this.ctx.strokeStyle = this.selectedColor;
      this.ctx.lineWidth = this.brushSize
      this.drawingMode(e)
    })
    this.drawEndSub = fromEvent(this.canvas.nativeElement, 'mouseup')
    .subscribe(() => {
      this.ctx.stroke()
      this.ctx?.beginPath()
      this.isDrawing = false
      this.saveLocally();
    })
  }

  setDrawingMode(newDrawingMode: string): void {
    switch(newDrawingMode)
    {
      case "offhand":
        this.drawingMode = this.offhandDraw;
        break;
      case "rectangle":
        this.drawingMode = this.rectangleDraw;
        break;
      case "triangle":
        this.drawingMode = this.triangleDraw;
        break;
      default:
        break
          
    }
    this.selectedDrawingMode = newDrawingMode
    localStorage.setItem("drawingMode", newDrawingMode)
  }

  offhandDraw(e: any) {
    let x = e.clientX - this.canvas.nativeElement.offsetLeft
    let y = e.clientY - this.canvas.nativeElement.offsetTop   
    this.ctx.lineTo(x, y)
    this.ctx.stroke()
    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
  }

  rectangleDraw(e: any) {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)
    this.loadImage()
    this.ctx.beginPath();
    this.ctx.rect(
      this.startMouseX,
      this.startMouseY,
      e.clientX - this.canvas.nativeElement.offsetLeft - this.startMouseX,
      e.clientY - this.canvas.nativeElement.offsetTop - this.startMouseY)
    this.ctx.stroke();
  }

  triangleDraw(e: any, x: number, y: number) {
    //this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)
    //this.loadImage()
    this.ctx.beginPath();
    this.ctx.moveTo(75, 50);
    this.ctx.lineTo(100, 75);
    this.ctx.lineTo(100, 25);
  }

  saveLocally() {
    let image = this.canvas.nativeElement.toDataURL()
    localStorage.setItem("image", image)
  }
  
  saveNote() {
    let image = this.canvas.nativeElement.toDataURL()//.replace("image/png", "image/octet-stream");
    console.log(image)
    localStorage.setItem("image", image)
  }

  ngOnDestroy(): void {
    this.drawSub.unsubscribe()
    this.drawEndSub.unsubscribe();
    localStorage.removeItem("image")
    localStorage.removeItem("drawingMode")
  }
}
