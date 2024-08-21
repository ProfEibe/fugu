import {inject, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Pipe({
  name: 'blob2img',
  standalone: true
})
export class Blob2imgPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: Blob): SafeUrl | null {
    if (value instanceof Blob) {
      const unsafeImageUrl = URL.createObjectURL(value);
      return unsafeImageUrl;
      //return this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
    }
    return null;
  }
}
