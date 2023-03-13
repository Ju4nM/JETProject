import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  // Posibles widths
  // max-w-0
  // max-w-none
  // max-w-xs
  // max-w-sm
  // max-w-md
  // max-w-lg
  // max-w-xl
  // max-w-2xl
  // max-w-4xl
  // max-w-5xl
  // max-w-6xl
  // max-w-7xl
  // max-w-full
  // max-w-min
  // max-w-max
  // max-w-fit
  // max-w-prose
  // max-w-screen-sm
  // max-w-screen-md
  // max-w-screen-lg
  // max-w-screen-xl
  // max-w-screen-2xl

  @Input() title: string = "";
  @Input() maxWidth: string = "lg";
  @Input() promptMode: boolean = false; 
  isVisible: boolean = false;
  @ViewChild("modalBackground") modalBg!: ElementRef<HTMLDivElement>;
  @ViewChild("modalBody") modalElement!: ElementRef<HTMLDivElement>;
  modal!: HTMLDivElement;

  // For the prompt mode
  message: string = "";
  inputType: string = "text";
  inputValue: string = "";
  placeHolder: string = "";

  @ViewChild("cancelPrompt") cancelButton!: ElementRef<HTMLButtonElement>;
  @ViewChild("confirmPrompt") confirmButton!: ElementRef<HTMLButtonElement>;

  constructor (
    private renderer: Renderer2
  ) {
  }

  ngAfterViewInit () {
    this.modal = this.modalElement.nativeElement;
    this.initListeners();
    this.renderer.addClass(this.modal, `max-w-${this.maxWidth}`);
  }

  private initListeners() {
    if (this.promptMode) {
      return;
    }

    this.renderer.listen("window", "keyup", ({key}) => {
      if (key == "Escape" && this.isVisible) this.hidden();
    });

    this.renderer.listen(this.modalBg.nativeElement, "click", e => {
      if (this.modalBg.nativeElement == e.target) this.hidden();
    });
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
  
  /**
   * This function will display a modal with input to get an any data through the textfield
   * @param {string} message - Message that will be shown in the modal
   * @param {string} placeHolder - Input's placeholder 
   * @param inputType - The input type that will have the textfield
   */
  async prompt (message: string, placeHolder: string, inputType?: string) {
    this.show();

    this.message = message;
    this.placeHolder = placeHolder;
    this.inputType = inputType ?? "";

    let result: boolean = await new Promise(resolve => {
      let confirmListener = this.renderer.listen(this.confirmButton.nativeElement, "click", () => {
        confirmListener();
        resolve(true);
      });
      let cancelListener = this.renderer.listen(this.cancelButton.nativeElement, "click", () => {
        cancelListener();
        resolve(false);
      });
    })
    
    this.hidden();
    let currentValue = result ? this.inputValue : null;
    this.resetPrompt();
    
    return {
      status: result,
      value: currentValue
    }
  }

  private resetPrompt(): void {
    this.message = "";
    this.inputType = "";
    this.inputValue = "";
  }
}