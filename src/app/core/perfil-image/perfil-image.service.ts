import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PerfilImageService {
    public perfilImage: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    setPerfilImage(value: string) {
        this.perfilImage.next(value);
    }
}