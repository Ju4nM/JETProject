import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { ModalComponent } from "./modal.component";

@Injectable({
	providedIn: "root",
})
export class ModalService {
	modals: Map<number, ModalComponent> = new Map<number, ModalComponent>();
	modalCounter: number = 0;
	modalStack: number[] = [];

	listener: any;

  renderer: Renderer2;

	constructor(
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

	addModal(newModal: ModalComponent) {
		this.modals.set(this.modalCounter, newModal);
		return this.modalCounter++;
	}

	showModal(modalId: number) {
    this.modalStack.push(modalId);
    this.checkListener();
  }

	hiddenModal(modalId: number) {
    // if (this.modalStack[this.modalStack.length - 1] == modalId) return;
    this.modalStack.pop();
    this.checkListener();
  }

  checkListener () {
    if (this.listener !== undefined) this.listener();

    let lastId: number = this.modalStack[this.modalStack.length - 1];
    if (lastId === undefined) return;

    let lastModal: ModalComponent | undefined = this.modals.get(lastId);
    if (!(lastModal instanceof ModalComponent)) return;

    this.addEventListener(lastModal);
  }

	addEventListener(modal: ModalComponent) {
    if (modal.promptMode) return;
		this.listener = this.renderer.listen("window", "keydown", ({ key }) => {
			if (key == "Escape" && modal.isVisible) modal.hidden();
		});
	}
}
