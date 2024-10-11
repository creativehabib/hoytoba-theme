// lib/getApiUrl.ts

import { API_URL } from "@/config/constant";

export const getApiUrl = (offset: number, limit: number): string => {
    return `${API_URL}/get_posts?_start=${offset}&_limit=${limit}`;
}