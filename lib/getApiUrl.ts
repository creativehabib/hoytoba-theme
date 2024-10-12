// lib/getApiUrl.ts

import { API_URL } from "@/config/constant";

export const getApiUrl = (page: number): string => {
    return `${API_URL}/get_posts?&post_type=post&page=${page}`;
}