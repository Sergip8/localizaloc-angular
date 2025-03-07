import { Directive, Input, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[appDefaultImage]',
  standalone: true
})
export class DefaultImageDirective {

  @Input() appDefaultImage: string; // Esta es la URL de la imagen por defecto

  constructor(private el: ElementRef) {}

  @HostListener('error')
  onError() {
    // Si la imagen no se puede cargar, se establece la imagen por defecto
    this.el.nativeElement.src = this.appDefaultImage || '../../../assets/img/default_image.jpg'
  }
}