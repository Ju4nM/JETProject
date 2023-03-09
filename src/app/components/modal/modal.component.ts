import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() title: string = "";
  @Input() maxWidth: string = "lg";
  @Input() isPrompt: boolean = false; 
  isVisible: boolean = false;
  @ViewChild("modalBackground") modalBg!: ElementRef<HTMLDivElement>;
  @ViewChild("modalBody") modalElement!: ElementRef<HTMLDivElement>;
  modal!: HTMLDivElement;

  constructor (
    private renderer: Renderer2
  ) {
  }

  ngAfterViewInit () {
    this.modal = this.modalElement.nativeElement;

    // this.renderer.addClass(this.modal, `max-w-${this.maxWidth}`);
    
    this.renderer.listen(this.modalBg.nativeElement, "click", e => {
      if (this.modalBg.nativeElement == e.target) this.hidden();
    });

    if (!this.isPrompt) {
      this.renderer.listen("window", "keyup", ({key}) => {
        if (key == "Escape" && this.isVisible) this.hidden();
      });
    }
  }

  show () {
    this.isVisible = true;
  }
  
  async hidden () {
    await new Promise((resolve) => {
      this.renderer.setStyle(this.modal, "transform", "translateY(-100vh)");
      setInterval(() => resolve(true), 500);
    });
    this.isVisible = false;
    this.renderer.setStyle(this.modal, "transform", "");
  }
  
  async toggle () {
    if (this.isVisible) {
      await this.hidden();
      return;
    }
    this.show();
  }
}
      
