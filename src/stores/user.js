import { defineStore } from 'pinia';
import { supabase } from '../services/supabase';
import { storage } from '../services/storage';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    isOffline: !navigator.onLine
  }),

  actions: {
    async init() {
      // Set initial offline state listeners
      window.addEventListener('online', () => { this.isOffline = false; });
      window.addEventListener('offline', () => { this.isOffline = true; });

      // Load cached user from storage
      const cachedUser = await storage.getItem('user');
      if (cachedUser) {
        this.user = cachedUser;
      }

      // Check current session
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          this.user = session.user;
          await storage.setItem('user', session.user);
        }
      } catch (e) {
        console.error('Error fetching session:', e);
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session) {
          this.user = session.user;
          await storage.setItem('user', session.user);
        } else {
          this.user = null;
          await storage.removeItem('user');
        }
      });
    },

    async signIn(email, password) {
      if (this.isOffline) {
        this.error = 'Cannot sign in while offline';
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        this.user = data.user;
        await storage.setItem('user', data.user);
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },

    async signOut() {
      if (this.isOffline) {
        this.error = 'Cannot sign out while offline';
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.user = null;
        await storage.removeItem('user');
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    }
  }
});
