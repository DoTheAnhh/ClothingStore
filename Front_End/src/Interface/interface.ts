export interface ImageResponse {
  imageUrl: string;
}

export interface ProductResponse {
  id: number;
  productCode: string;
  productName: string;
  productDescription: string;
  brandName: string;
  typeName: string;
  createDate: string;
  updateDate: string;
  imageUrls: string[]
  colors: string[]
  sizes: string[]
  firstProductPrice: number
}

export interface ProductRequest {
  productCode?: string;
  productName?: string;
  productDescription?: string;
  brandId?: string;
  typeId?: string;
}

export interface ProductDetailResponse {
  id: number;
  imageUrl: string;
  quantity: number;
  status: string;
  colorName: string;
  sizeName: string;
  productName: string;
  createDate: string;
  updateDate: string;
  productPrice: number;
  qrcode: string;
}

export interface ProductDetailRequest {
  id?: number;
  quantity?: number;
  status?: string;
  colorId?: string;
  sizeId?: string;
  productId?: string;
  productPrice?: number;
  qrcode?: string;
  imageUrl?: string;
}

export interface SizeResponse {
  id: number;
  sizeName: string;
  createDate: string;
  updateDate: string;
}

export interface SizeRequest {
  sizeName?: string;
}

export interface ColorResponse {
  id: number;
  colorName: string;
  createDate: string;
  updateDate: string;
}

export interface ColorRequest {
  colorName?: string;
}

export interface TypeResponse {
  id: number;
  typeName: string;
  createDate: string;
  updateDate: string;
}

export interface TypeRequest {
  typeName?: string;
  error?: string;
}

export interface BrandResponse {
  id: number;
  brandName: string;
  createDate: string;
  updateDate: string;
}

export interface BrandRequest {
  brandName?: string;
}

export interface CustomerResponse {
  id: number;
  name: any;
  age: number;
  birthday: any;
  gender: boolean;
  location: any;
  email: string;
  password: string;
  role: string;
  createDate: string;
  updateDate: string;
}

export interface CustomerRequest {
  name?: string;
  age?: number;
  birthday?: string;
  gender?: boolean;
  location?: string;
  email?: string;
  password?: string;
  role?: string;
  createDate?: string;
  updateDate?: string;
}
