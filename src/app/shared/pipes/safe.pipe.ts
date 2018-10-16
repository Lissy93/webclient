import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  public transform(value: any, type: string = ''): SafeHtml | SafeUrl {
    switch (type.toLowerCase()) {
      case 'html':
        return this.sanitizer.sanitize( SecurityContext.HTML, value);
      case 'url':
        return this.sanitizer.sanitize(SecurityContext.URL, value);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }

}



