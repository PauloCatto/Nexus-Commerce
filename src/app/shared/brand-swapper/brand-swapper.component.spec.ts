import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrandSwapperComponent } from './brand-swapper.component';
import { ThemeService } from '../../services/theme.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('BrandSwapperComponent', () => {
  let component: BrandSwapperComponent;
  let fixture: ComponentFixture<BrandSwapperComponent>;
  let themeServiceMock: any;

  beforeEach(async () => {
    themeServiceMock = {
      currentTheme$: of('midnight'),
      currentFont$: of("'Outfit', sans-serif"),
      currentRadius$: of('14px'),
      getPresets: vi.fn(() => [])
    };


    await TestBed.configureTestingModule({
      imports: [BrandSwapperComponent, BrowserAnimationsModule],
      providers: [
        { provide: ThemeService, useValue: themeServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BrandSwapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

