import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CategoryDto } from '../../models/category';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ProductDto,
  PaginatedListDto,
  ProductSimpleDto,
} from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly CATALOG_API_URL = environment.serviceUrls['catalog-api'];

  constructor(
    private _httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  get isSSR(): boolean {
    return this.platformId == 'server' ? true : false;
  }

  getCategories(): Observable<CategoryDto[] | undefined> {
    if (this.isSSR) {
      return of([]);
    }
    return this._httpClient.get<CategoryDto[]>(
      `${this.CATALOG_API_URL}/catalog/v1/categories`
    );
  }

  getProductsByCategory(
    categoryId: string
  ): Observable<PaginatedListDto<ProductSimpleDto>> {
    if (this.isSSR) {
      return of({} as PaginatedListDto<ProductSimpleDto>);
    }
    return this._httpClient.post<PaginatedListDto<ProductSimpleDto>>(
      `${this.CATALOG_API_URL}/catalog/v1/storefront/products/search`,
      { categoryId }
    );
  }

  getProductById(productId: string): Observable<ProductDto> {
    if (this.isSSR) {
      return of({} as ProductDto);
    }
    return this._httpClient.get<ProductDto>(
      `${this.CATALOG_API_URL}/catalog/v1/storefront/products/${productId}`
    );
  }
}
