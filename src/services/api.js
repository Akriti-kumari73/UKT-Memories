import { ALL_PHOTOS } from '../data/allPhotos';

const API_BASE = '/api';

export const getHealth = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    console.warn('API error (getHealth):', err);
    return { status: 'offline' };
  }
};

export const getStats = async () => {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Stats fetch failed');
    return await res.json();
  } catch (err) {
    console.warn('API error (getStats):', err);
    return { views: 128, totalHearts: 342, totalPhotos: 15, totalWishes: 3, totalMemories: 4 };
  }
};

export const getMemories = async () => {
  try {
    const res = await fetch(`${API_BASE}/memories`);
    if (!res.ok) throw new Error('Memories fetch failed');
    return await res.json();
  } catch (err) {
    console.warn('API error (getMemories):', err);
    return [];
  }
};

export const likeMemory = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/memories/${id}/like`, { method: 'POST' });
    return await res.json();
  } catch (err) {
    console.warn('API error (likeMemory):', err);
    return { success: false };
  }
};

export const getPhotos = async (category = 'all') => {
  try {
    const res = await fetch(`${API_BASE}/photos${category !== 'all' ? `?category=${category}` : ''}`);
    if (!res.ok) throw new Error('Photos fetch failed');
    const data = await res.json();
    return data && data.length > 0 ? data : ALL_PHOTOS;
  } catch (err) {
    console.warn('API error (getPhotos), using fallback:', err);
    if (category !== 'all') {
      return ALL_PHOTOS.filter((p) => p.category?.toLowerCase() === category.toLowerCase());
    }
    return ALL_PHOTOS;
  }
};

export const likePhoto = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/photos/${id}/like`, { method: 'POST' });
    return await res.json();
  } catch (err) {
    console.warn('API error (likePhoto):', err);
    return { success: false };
  }
};

export const getWishes = async () => {
  try {
    const res = await fetch(`${API_BASE}/wishes`);
    if (!res.ok) throw new Error('Wishes fetch failed');
    return await res.json();
  } catch (err) {
    console.warn('API error (getWishes):', err);
    return [];
  }
};

export const submitWish = async ({ name, message, emoji }) => {
  try {
    const res = await fetch(`${API_BASE}/wishes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, message, emoji })
    });
    if (!res.ok) throw new Error('Wish submission failed');
    return await res.json();
  } catch (err) {
    console.warn('API error (submitWish):', err);
    return null;
  }
};

export const heartWish = async (id) => {
  try {
    const res = await fetch(`${API_BASE}/wishes/${id}/heart`, { method: 'POST' });
    return await res.json();
  } catch (err) {
    console.warn('API error (heartWish):', err);
    return { success: false };
  }
};

export const getLetters = async () => {
  try {
    const res = await fetch(`${API_BASE}/letters`);
    if (!res.ok) throw new Error('Letters fetch failed');
    return await res.json();
  } catch (err) {
    console.warn('API error (getLetters):', err);
    return [];
  }
};
