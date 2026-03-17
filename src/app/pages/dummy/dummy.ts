import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dummy',
  imports: [CommonModule, RouterModule],
  templateUrl: './dummy.html',
  styleUrl: './dummy.css',
})
export class Dummy {}
