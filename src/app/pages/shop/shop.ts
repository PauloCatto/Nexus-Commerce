import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class Shop {
  products = [
    { name: 'Razer Wolverine V2 Pro', price: '44.00', image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&q=80&w=600' },
    { name: 'Razer DeathAdder V2', price: '60.00', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop' },
    { name: 'Razer BlackShark V2 X', price: '80.00', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600' },
    { name: 'Acer Aspire 5', price: '547.00', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop' },
    { name: 'iPhone 14 Pro', price: '999.00', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop' },
    { name: 'Acer Nitro 5', price: '899.00', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600' },
    { name: 'Alienware M16', price: '1499.00', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600&auto=format&fit=crop' },
  ];
}
