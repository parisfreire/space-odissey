import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { UtilitiesService } from '../app.component';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styles: [``],
})
export class MenuComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject<void>();

  @ViewChild('profileDropdown') profileDropdown!: ElementRef;
  @ViewChild('mobileMenuButton') mobileMenuButton: ElementRef | undefined;
  @ViewChild('mobileMenu') mobileMenu: ElementRef | undefined;

  private _isMenuOpen: boolean = false;
  get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }

  set isMenuOpen(value: boolean) {
    this._isMenuOpen = value;
  }

  constructor(private utilitiesService: UtilitiesService) {}

  ngOnInit() {
    this.utilitiesService.documentClickedTarget$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((target) => this.documentClickListener(target));
  }

  // Listening to clicks outside the menu, so we close it
  documentClickListener(target: any): void {
    const profileDropdownElem = this.profileDropdown.nativeElement;
    const mobileMenuElem = this.mobileMenu?.nativeElement;
    const mobileMenuButtonElem = this.mobileMenuButton?.nativeElement;

    if (!profileDropdownElem.contains(target) &&
      (mobileMenuButtonElem && mobileMenuElem) &&
      !mobileMenuButtonElem.contains(target) &&
      !mobileMenuElem.contains(target)
    ) {
      this.isMenuOpen = false;
    }
  }

  toggleProfileMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
