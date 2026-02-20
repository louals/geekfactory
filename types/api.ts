export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'company' | 'admin';
    discountPercentage?: number;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
}

export interface Product {
    _id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string | Category;
    isActive: boolean;
    images?: string[];
    image?: string;
    biddingActive?: boolean;
    biddingEndAt?: string;
}


export interface CartItem {
    productId: Product | string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface Cart {
    _id: string;
    items: CartItem[];
    subtotal: number;
    discountPercentage?: number;
    total: number;
}

export interface Order {
    _id: string;
    user?: string | User;
    email?: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
    createdAt: string;
}

export interface Bid {
    _id: string;
    product: string | Product;
    user: string | User;
    amount: number;
    createdAt: string;
}

export interface BiddingProduct extends Product {
    biddingActive: boolean;
    biddingStartAt?: string;
    biddingEndAt?: string;
    biddingStartPrice?: number;
    currentHighestBid?: number;
    totalBids?: number;
    winner?: string | User;
    bids?: Bid[];
}

export interface BidHistoryItem {
    _id: string;
    product: Product;
    amount: number;
    createdAt: string;
    isHighestBid?: boolean;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}
