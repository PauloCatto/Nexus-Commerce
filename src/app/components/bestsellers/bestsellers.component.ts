import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bestsellers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bestsellers.component.html',
  styleUrl: './bestsellers.component.scss'
})
export class BestsellersComponent {
  products = [
    { name: 'Razer Wolverine V2 Pro', desc: 'Get the unfair advantage in both hands with the Razer Wolverine V2 Pro, a high-performance wireless controller.', price: '44.00', image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&q=80&w=600' },
    { name: 'Razer DeathAdder V2', desc: 'See for yourself the rebirth of an icon with the Razer DeathAdder V2, an ergonomic mouse designed with deadly curves.', price: '60.00', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=600&auto=format&fit=crop' },
    { name: 'Razer BlackShark V2 X', desc: 'Take on the competition with a lightweight Esports headset that excels under pressure. Introducing the BlackShark.', price: '80.00', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600' },
    { name: 'Acer Aspire 5', desc: 'It is powered by a Core i3 processor and it comes with 8GB of RAM. The Acer Aspire 5 packs a 256GB SSD.', price: '547.00', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop' },
    { name: 'iPhone 14 Pro', desc: 'A magical new way to interact with iPhone. Groundbreaking safety features designed to save lives.', price: '999.00', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop' },
    { name: 'Acer Nitro 5', desc: 'Explore and enjoy a new level of gaming with the powerful Nitro 5. The solid, understated design...', price: '899.00', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=600' },
    { name: 'Alienware M16', desc: 'High-performance gaming laptop with 13th Gen Intel Core and NVIDIA GeForce RTX 40 Series.', price: '1499.00', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=600&auto=format&fit=crop' },
  ];
}
