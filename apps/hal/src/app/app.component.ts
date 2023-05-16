import { RouterModule } from '@angular/router';
import { Component, HostListener, Injectable } from '@angular/core';
import { NgIf } from '@angular/common';
import { Subject } from 'rxjs';
import { MenuComponent } from './menu/menu.component';
import { PromptsFormContainer } from './prompts/form/form.container';

@Component({
  standalone: true,
  imports: [RouterModule, NgIf, MenuComponent, PromptsFormContainer],
  selector: 'space-odyssey-root',
  templateUrl: './app.component.html',
  styles: [``],
})
export class AppComponent {
  constructor(private utilitiesService: UtilitiesService) {}
  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    this.utilitiesService.documentClickedTarget$.next(event.target);
  }
}

@Injectable({ providedIn: 'root' })
export class UtilitiesService {
  documentClickedTarget$: Subject<HTMLElement> = new Subject<HTMLElement>();
}
