import { Component, ElementRef, Input, Renderer2, ResolvedReflectiveFactory, ViewChild } from '@angular/core';
import User from '../interfaces/user.interface';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
  @Input() user!: User;
  isShown: boolean = false;
  @ViewChild("showButton") showButtonElement!: ElementRef<HTMLSpanElement>;
  @ViewChild("cardHeader") headerElement!: ElementRef<HTMLDivElement>;
  @ViewChild("userInfo") userInfoElement!: ElementRef<HTMLDivElement>;
  showButton!: HTMLSpanElement;
  header!: HTMLDivElement;
  userInfo!: HTMLDivElement;

  constructor (
    private render: Renderer2
  ) {}

  ngAfterViewInit () {
    this.showButton = this.showButtonElement.nativeElement;
    this.header = this.headerElement.nativeElement;
    this.userInfo = this.userInfoElement.nativeElement;
    
    this.render.listen(this.header, "click", (e) => {
      
      if (e.target instanceof HTMLButtonElement) return;
      this.toggleInfo();
    });
  }

  async showUserInfo() {
    this.spinShowButton();
    this.isShown = true;
    await new Promise(resolve => {
      setInterval(() => resolve(true), 150);
    });
    this.render.removeClass(this.userInfo, "overflow-y-hidden");
    this.render.addClass(this.userInfo, "overflow-y-auto");
  }

  hideUserInfo () {
    this.spinShowButton();
    this.render.removeClass(this.userInfo, "overflow-y-auto");
    this.render.addClass(this.userInfo, "overflow-y-hidden");
    this.isShown = false;
  }

  async toggleInfo () {
    if (this.isShown) this.hideUserInfo();
    else await this.showUserInfo();
  }

  spinShowButton () {
    this.render.setStyle(this.showButton, "transform", this.isShown ? "" : "rotate(180deg)");
  }
}
