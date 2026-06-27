import { defineStore } from 'pinia';
import { supabase } from '../services/supabase';
import { storage } from '../services/storage';

export const useTeamStore = defineStore('team', {
  state: () => ({
    teams: [],
    loading: false,
    error: null,
    isOffline: !navigator.onLine,
    syncQueue: [] // For offline mutations
  }),

  actions: {
    async init() {
      // Set initial offline state listeners
      window.addEventListener('online', async () => { 
        this.isOffline = false; 
        await this.syncOfflineMutations();
        await this.fetchTeams();
      });
      window.addEventListener('offline', () => { 
        this.isOffline = true; 
      });

      // Load cached teams and queue
      const cachedTeams = await storage.getItem('teams');
      if (cachedTeams) this.teams = cachedTeams;

      const cachedQueue = await storage.getItem('teamSyncQueue');
      if (cachedQueue) this.syncQueue = cachedQueue;

      if (!this.isOffline) {
        await this.fetchTeams();
      }
    },

    async fetchTeams() {
      if (this.isOffline) return; // Keep cached version
      
      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .from('teams')
          .select('*');
        if (error) throw error;
        
        this.teams = data;
        await storage.setItem('teams', data);
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },

    async addTeam(team) {
      if (this.isOffline) {
        // Optimistic update
        const tempId = 'temp_' + Date.now();
        const newTeam = { ...team, id: tempId, pendingSync: true };
        this.teams.push(newTeam);
        await storage.setItem('teams', this.teams);

        // Queue mutation
        this.syncQueue.push({ type: 'ADD', payload: team, tempId });
        await storage.setItem('teamSyncQueue', this.syncQueue);
        return;
      }

      this.loading = true;
      this.error = null;
      try {
        const { data, error } = await supabase
          .from('teams')
          .insert(team)
          .select()
          .single();
        if (error) throw error;
        
        this.teams.push(data);
        await storage.setItem('teams', this.teams);
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },

    async syncOfflineMutations() {
      if (this.syncQueue.length === 0 || this.isOffline) return;

      this.loading = true;
      const processQueue = [...this.syncQueue];
      
      for (const task of processQueue) {
        try {
          if (task.type === 'ADD') {
            const { data, error } = await supabase
              .from('teams')
              .insert(task.payload)
              .select()
              .single();
            if (error) throw error;
            
            // Replace temp item in list with real data
            const index = this.teams.findIndex(t => t.id === task.tempId);
            if (index !== -1) {
              this.teams.splice(index, 1, data);
            }
          }
          // Remove from queue on success
          this.syncQueue = this.syncQueue.filter(t => t !== task);
        } catch (e) {
          console.error('Error syncing task:', task, e);
          // Keep failing tasks in queue for next time
        }
      }
      
      await storage.setItem('teams', this.teams);
      await storage.setItem('teamSyncQueue', this.syncQueue);
      this.loading = false;
    }
  }
});
