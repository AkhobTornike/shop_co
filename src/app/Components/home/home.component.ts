import { Component, OnInit } from '@angular/core';
import { BannerComponent } from './banner/banner.component';
import { PartnersComponent } from "./partners/partners.component";
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../Interface/product';
import { DressStyleComponent } from "./dress-style/dress-style.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { Review } from '../../Interface/review';
import { ReviewsService } from '../../Services/reviews.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent, PartnersComponent, CommonModule, DressStyleComponent, ReviewsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public newArrivalsProducts: Product[] = [];
  public topSellingsProducts: Product[] = [];

  public reviews: Review[] = [];

  constructor(
    private productsService: ProductsService,
    private reviewsService: ReviewsService
  ) {}

  ngOnInit(): void {
    this.newArrivalsProducts = this.productsService.getProducts().slice(0, 4);
  }

  getAssessmentValue(product: Product): number {
    if (product.reviewsIDs.length === 0) {
      return 0;
    }

    let totalRating = 0 ;
    let count = 0;

    product.reviewsIDs.forEach(reviewId => {
      this.reviews = this.reviewsService.getReviewsByIds(reviewId);
      totalRating += Number(this.reviews[0].stars);
      count++;
    });

    const averageRating = count > 0 ? totalRating / count : 0;
    return parseFloat(averageRating.toFixed(1));
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }

}
