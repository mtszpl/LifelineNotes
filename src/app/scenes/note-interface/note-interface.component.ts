import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription, fromEvent, pairwise, skipUntil, switchMap, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'app-note-interface',
  templateUrl: './note-interface.component.html',
  styleUrls: ['./note-interface.component.scss']
})
export class NoteInterfaceComponent implements OnInit, OnDestroy {

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>
  drawSub!: Subscription
  drawEndSub!: Subscription
  private ctx: CanvasRenderingContext2D | null | undefined
  canvasSizeXFactor: number = 0.95
  canvasSizeYFactor: number = 0.75
  
  constructor(
  ) { }
  
  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext("2d")
    this.canvas.nativeElement.width = window.innerWidth * this.canvasSizeXFactor;
    this.canvas.nativeElement.height = window.innerHeight * this.canvasSizeYFactor;
    
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
      let x = e.clientX - this.canvas.nativeElement.offsetLeft
      let y = e.clientY - this.canvas.nativeElement.offsetTop
      console.log(e, x, y)
      this.ctx?.lineTo(x, y)
      this.ctx?.stroke()
      this.ctx?.beginPath()
      this.ctx?.moveTo(x, y)
    })
    this.drawEndSub = fromEvent(this.canvas.nativeElement, 'mouseup')
    .subscribe(e => this.ctx?.beginPath())
  }
  
  ngOnDestroy(): void {
    this.drawSub.unsubscribe()
    this.drawEndSub.unsubscribe();
  }
  // drawOnCanvas(): void {
  //   try {
  //     this.sub.unsubscribe()
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  //   this.sub = fromEvent(this.canvas.nativeElement, 'mousedown')
  //   .pipe(
  //     switchMap(e => {
  //       return fromEvent(this.canvas.nativeElement, 'mousemove')
  //       .pipe( 
  //         takeUntil(fromEvent(this.canvas.nativeElement, 'mouseup')),
  //         takeUntil(fromEvent(this.canvas.nativeElement, 'mouseleave'))
  //         )
  //     }))
  //   .subscribe( (e: any) => 
  //   {
  //     let x = e.clientX - this.canvas.nativeElement.offsetLeft
  //     let y = e.clientY - this.canvas.nativeElement.offsetTop
  //     console.log(e, x, y)
  //     this.ctx?.lineTo(x, y)
  //     this.ctx?.stroke()
  //     this.ctx?.beginPath()
  //     this.ctx?.moveTo(x, y)
  //   })
  //   this.sub = fromEvent(this.canvas.nativeElement, 'mouseup')
  //   .subscribe(e => this.ctx?.beginPath())
  // }
}
