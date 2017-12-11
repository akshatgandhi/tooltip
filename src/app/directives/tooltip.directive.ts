import { Directive, Input, HostListener, ElementRef, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Renderer2 } from '@angular/core';
import { HomeComponent } from 'app/home/home.component';
import { TooltipComponent } from 'app/tooltip/tooltip.component';

@Directive({
  selector: '[tooltip]'
})
export class TooltipDirective {

  constructor(private _eref: ElementRef, private vcr: ViewContainerRef, private resolver: ComponentFactoryResolver, private renderer: Renderer2) { 
  }

  @Input('tooltip') content: string;

  private tooltip: ComponentRef<TooltipComponent>;

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    if (this._eref.nativeElement.contains($event.target)) {
      let factory = this.resolver.resolveComponentFactory(TooltipComponent);
      if (!this.tooltip) {
        // create component
        this.tooltip = this.vcr.createComponent(factory);

        // set content of the component
        this.tooltip.instance.content = this.content as string;
        this._eref.nativeElement.appendChild(this.tooltip.location.nativeElement);
      }
    } else {
      this.destroy();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let x = event.keyCode;
    if (x === 27) {
      this.destroy();
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (this.tooltip) {
      var elem = this.tooltip.location.nativeElement.getBoundingClientRect();
      if ((elem.top >= 70) && (elem.bottom <= window.innerHeight)) {
        this.renderer.removeClass(this._eref.nativeElement.querySelectorAll('.tltip')[0], 'bottom');
        this.renderer.addClass(this._eref.nativeElement.querySelectorAll('.tltip')[0], 'top');
      } else {
        this.renderer.removeClass(this._eref.nativeElement.querySelectorAll('.tltip')[0], 'top');
        this.renderer.addClass(this._eref.nativeElement.querySelectorAll('.tltip')[0], 'bottom');
      }
    }
  }

  destroy() {
    if (this.tooltip) {
      this.tooltip.destroy();
      this.tooltip = null;
    }
  }

}