import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanText',
})
export class CleanTextPipe implements PipeTransform {
  transform(text: string): unknown {
    const permitido = /[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s]/;

    let resultado = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (!permitido.test(char)) {
        if (resultado[resultado.length - 1] !== ' ') {
          resultado += ' ';
        }
        continue;
      }

      resultado += char;
    }

    return resultado.trim();
  }
}
