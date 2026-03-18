import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetail implements OnInit {
  productId: string | null = null;
  product: any = null;

  allProducts = [
    { 
      name: 'Razer Wolverine V2 Pro', 
      price: '44.00', 
      image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&q=80&w=1000', 
      category: 'Controller',
      subtitle: 'Wireless Pro Wireless Gaming Controller for PS5 and PC',
      description: 'The Razer Wolverine V2 Pro is a high-performance wireless controller officially licensed by PlayStation. Packed with Razer HyperSpeed Wireless and a load of next-gen features for top-tier competitive play.',
      specs: [
        { label: 'Wireless', value: 'Razer HyperSpeed 2.4GHz' },
        { label: 'Switches', value: 'Razer Mecha-Tactile Action Buttons' },
        { label: 'Compatibility', value: 'PS5, PC' }
      ]
    },
    { 
      name: 'Razer DeathAdder V2', 
      price: '60.00', 
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop', 
      category: 'Mouse',
      subtitle: 'Ergonomic wired gaming mouse with best-in-class ergonomics',
      description: 'The Razer DeathAdder V2 is an ergonomic mouse with deadly curves and killer lines for a weapon that handles like no other. With next-gen sensor and switches packed into a lighter form factor.',
      specs: [
        { label: 'Sensor', value: 'Razer Focus+ 20K DPI Optical' },
        { label: 'Switches', value: 'Razer Optical Mouse Switches' },
        { label: 'Weight', value: '82g' }
      ]
    },
    { 
      name: 'Razer BlackShark V2 X', 
      price: '80.00', 
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1000', 
      category: 'Headset',
      subtitle: 'The definitive entry-level esports gaming headset',
      description: 'The Razer BlackShark V2 X is a triple-threat of amazing audio, superior mic clarity and supreme sound isolation. With high-end drivers and a noise-canceling mic.',
      specs: [
        { label: 'Drivers', value: 'Razer TriForce 50mm' },
        { label: 'Mic', value: 'Razer HyperClear Cardioid' },
        { label: 'Weight', value: '240g' }
      ]
    },
    { 
      name: 'Acer Aspire 5', 
      price: '547.00', 
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop', 
      category: 'Notebooks',
      subtitle: 'Powerful and portable laptop for everyday tasks',
      description: 'The Acer Aspire 5 features high-performance internals for efficient multitasking and a thin, sleek design for easy portability. Perfect for work and study.',
      specs: [
        { label: 'Processor', value: 'Intel Core i5' },
        { label: 'Memory', value: '8GB DDR4' },
        { label: 'Display', value: '15.6" Full HD' }
      ]
    },
    { 
      name: 'iPhone 14 Pro', 
      price: '999.00', 
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop', 
      category: 'Smartphone',
      subtitle: 'Pro camera system, Pro performance',
      description: 'The iPhone 14 Pro brings a new way to interact with iPhone with Dynamic Island, a 48MP camera for mind-blowing detail, and the A16 Bionic chip.',
      specs: [
        { label: 'Display', value: '6.1" Super Retina XDR' },
        { label: 'Chip', value: 'A16 Bionic' },
        { label: 'Camera', value: 'Pro 48MP Main' }
      ]
    },
    { 
      name: 'Acer Nitro 5', 
      price: '899.00', 
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=1000', 
      category: 'Notebooks',
      subtitle: 'Take flight with high-speed performance',
      description: 'The Acer Nitro 5 is built for extreme gaming. High refresh rate screens and top-tier thermal cooling mean you can play your best without overheating.',
      specs: [
        { label: 'Processor', value: 'Intel Core i7-12700H' },
        { label: 'GPU', value: 'RTX 3060' },
        { label: 'Display', value: '144Hz Refresh Rate' }
      ]
    },
    { 
      name: 'Alienware M16', 
      price: '1499.00', 
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1000&auto=format&fit=crop', 
      category: 'Notebooks',
      subtitle: 'Your journey starts here',
      description: 'The Alienware M16 is a 16-inch gaming powerhouse that combines elite performance with a design that keeps you cool and ahead of the curve.',
      specs: [
        { label: 'Processor', value: 'Intel Core i9-13900HX' },
        { label: 'GPU', value: 'NVIDIA RTX 4080' },
        { label: 'Cooling', value: 'Alienware Cryo-Tech' }
      ]
    },
    { 
      name: 'Logitech G502 LIGHTSPEED', 
      price: '119.00', 
      image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?q=80&w=1000&auto=format&fit=crop', 
      category: 'Mouse',
      subtitle: 'The icon reimagined with wireless performance',
      description: 'The world\'s most popular gaming mouse, now with LIGHTSPEED wireless. Featuring the HERO 25K sensor and POWERPLAY compatibility.',
      specs: [
        { label: 'Wireless', value: 'LIGHTSPEED Wireless' },
        { label: 'Sensor', value: 'HERO 25K' },
        { label: 'Buttons', value: '11 Programmable' }
      ]
    },
    { 
      name: 'SteelSeries Apex Pro', 
      price: '199.00', 
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1000', 
      category: 'Keyboard',
      subtitle: 'The world\'s fastest mechanical keyboard',
      description: 'Experience the next leap in mechanical keyboards with OmniPoint 2.0 switches. 11x faster response and 2x more durability.',
      specs: [
        { label: 'Switches', value: 'OmniPoint 2.0 Adjustable' },
        { label: 'OLED', value: 'Smart Display' },
        { label: 'Frame', value: 'Aircraft Grade Aluminum' }
      ]
    },
    { 
      name: 'Sony WH-1000XM5', 
      price: '349.00', 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1000', 
      category: 'Headset',
      subtitle: 'Industry-leading noise cancellation',
      description: 'The WH-1000XM5 headphones rewrite the rules for distraction-free listening. From noise canceling to exceptional call quality.',
      specs: [
        { label: 'Noise Canceling', value: 'Industry Leading' },
        { label: 'Battery', value: 'Up to 30 Hours' },
        { label: 'Drivers', value: '30mm Carbon Fiber' }
      ]
    },
    { 
      name: 'iPad Pro 12.9', 
      price: '1099.00', 
      image: 'https://images.unsplash.com/photo-1544244015-0cd42c4ae7f0?q=80&w=1000&auto=format&fit=crop', 
      category: 'Smartphone',
      subtitle: 'The ultimate iPad experience. Now with M2.',
      description: 'Stunning performance, incredibly advanced displays, and superfast wireless connectivity. The 12.9-inch Liquid Retina XDR display is simply spectacular.',
      specs: [
        { label: 'Chip', value: 'Apple M2' },
        { label: 'Display', value: 'Liquid Retina XDR' },
        { label: 'Connectivity', value: '5G, Wi-Fi 6E' }
      ]
    },
    { 
      name: 'MacBook Air M2', 
      price: '1199.00', 
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop', 
      category: 'Notebooks',
      subtitle: 'Don\'t take it lightly',
      description: 'The supercharged MacBook Air features the next-generation M2 chip. Delivering exceptional speed and power efficiency in a strikingly thin enclosure.',
      specs: [
        { label: 'Chip', value: 'Apple M2' },
        { label: 'Battery', value: 'Up to 18 Hours' },
        { label: 'Weight', value: '2.7 lbs (1.24 kg)' }
      ]
    }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId) {
        this.findProduct(this.productId);
      }
    });
  }

  findProduct(slug: string) {
    this.product = this.allProducts.find(p => 
      p.name.toLowerCase().split(' ').join('-') === slug
    );
  }
}
