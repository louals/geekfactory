import api from '../api';
import { Bid, BiddingProduct, BidHistoryItem } from '@/types/api';

export const biddingService = {
    // Admin Endpoints
    enableBidding: async (productId: string, data: { startAt: string; endAt: string; startPrice: number }) => {
        const response = await api.post(`/products/${productId}/enable-bidding`, data);
        return response.data;
    },

    closeBidding: async (productId: string) => {
        const response = await api.post(`/products/${productId}/close-bidding`);
        return response.data;
    },

    getProductBids: async (productId: string) => {
        const response = await api.get<Bid[]>(`/products/${productId}/bids`);
        return response.data;
    },

    /** Fetch ALL bidding products (active + ended) for the admin panel */
    getAllAuctions: async () => {
        // Uses the same endpoint as the public one; filter on client if needed
        const response = await api.get<BiddingProduct[]>('/products/bidding/products?all=true');
        return response.data;
    },

    /** Declare a winner for an auction (admin only) */
    declareWinner: async (productId: string, userId: string) => {
        const response = await api.post(`/products/${productId}/close-bidding`, { winnerId: userId });
        return response.data;
    },

    // Client/Public Endpoints
    getActiveAuctions: async () => {
        const response = await api.get<BiddingProduct[]>('/products/bidding/products');
        return response.data;
    },

    getBiddingDetails: async (productId: string) => {
        const response = await api.get<BiddingProduct>(`/products/bidding/products/${productId}`);
        return response.data;
    },

    placeBid: async (productId: string, amount: number) => {
        const response = await api.post(`/products/bidding/${productId}/offer`, { amount });
        return response.data;
    },

    getMyBidHistory: async () => {
        const response = await api.get<BidHistoryItem[]>('/products/bidding/my-history');
        return response.data;
    },
};
