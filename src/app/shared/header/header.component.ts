import { Component, inject, NgZone, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { SearchService } from '../../services/search.service';
import { SearchResult } from '../../models/search-result.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isSearchVisible: boolean = false;
  isMenuOpen: boolean = false;
  isProfileDropdownOpen: boolean = false;
  searchTerm: string = '';
  searchResults: SearchResult[] = [];
  isSearching: boolean = false;
  searchTimeout: any = null;

  public cartService = inject(CartService);
  public authService = inject(AuthService);
  private searchService = inject(SearchService);
  private router = inject(Router);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  constructor() { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown-wrapper')) {
      this.isProfileDropdownOpen = false;
    }
  }

  toggleProfileDropdown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  closeProfileDropdown(): void {
    this.isProfileDropdownOpen = false;
  }

  toggleSearch(): void {
    this.isSearchVisible = !this.isSearchVisible;
    if (this.isSearchVisible) {
      this.isMenuOpen = false;
    } else {
      this.clearSearch();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) this.isSearchVisible = false;
  }

  onSearchInput(): void {
    clearTimeout(this.searchTimeout);

    if (!this.searchTerm || this.searchTerm.trim().length < 2) {
      this.searchResults = [];
      this.isSearching = false;
      return;
    }

    this.isSearching = true;
    this.searchTimeout = setTimeout(async () => {
      const results = await this.searchService.search(this.searchTerm);
      this.ngZone.run(() => {
        this.searchResults = results;
        this.isSearching = false;
        this.cdr.detectChanges();
      });
    }, 400);
  }

  goToResult(result: SearchResult): void {
    const route = result.type === 'product'
      ? ['/product', result.slug]
      : ['/post', result.slug];
    this.router.navigate(route);
    this.closeSearch();
  }

  closeSearch(): void {
    this.isSearchVisible = false;
    this.clearSearch();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.searchResults = [];
    this.isSearching = false;
  }

  hasValidPhoto(user: any): boolean {
    return user?.photoURL && user.photoURL.startsWith('http');
  }
}
