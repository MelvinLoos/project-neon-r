import { get, set, del } from 'idb-keyval';

export const storage = {
  async getItem(key) {
    try {
      const val = await get(key);
      return val === undefined ? null : val;
    } catch (e) {
      console.error('Error getting item from IndexedDB:', e);
      return null;
    }
  },
  async setItem(key, value) {
    try {
      await set(key, value);
    } catch (e) {
      console.error('Error setting item in IndexedDB:', e);
    }
  },
  async removeItem(key) {
    try {
      await del(key);
    } catch (e) {
      console.error('Error removing item from IndexedDB:', e);
    }
  }
};
