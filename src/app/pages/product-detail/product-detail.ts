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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    // For now mocking the data based on id
    if (this.productId === 'alienware-m16') {
      this.product = {
        name: 'Alienware M16',
        subtitle: 'High-performance gaming laptop with 13th Gen Intel Core and NVIDIA GeForce RTX 40 Series.',
        price: '1499.00',
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=1000&auto=format&fit=crop',
        specs: [
          { label: 'Processor', value: 'Intel Core i9-13900HX' },
          { label: 'Graphics', value: 'NVIDIA GeForce RTX 4080 12GB GDDR6' },
          { label: 'Memory', value: '32GB DDR5 4800MHz' },
          { label: 'Storage', value: '1TB M.2 PCIe NVMe SSD' }
        ],
        description: 'Take your gaming to the next level with the Alienware M16. Experience unparalleled performance with high-end internals and a stunning display designed for competitive gaming and immersive experiences.'
      };
    } else {
       // Generic fallback mock
       this.product = {
         name: this.productId?.replace(/-/g, ' ').toUpperCase() || 'Product',
         subtitle: 'Premium tech gadget designed for professionals and enthusiasts.',
         price: '599.00',
         image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&q=80&w=1000',
         specs: [
           { label: 'Type', value: 'Electronics / Tech' },
           { label: 'Status', value: 'In Stock' }
         ],
         description: 'A cutting-edge solution for your everyday tech needs. Built with durability and style in mind.'
       };
    }
  }
}
