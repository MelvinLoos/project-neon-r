import { defineStore } from 'pinia';
import { supabase } from '../services/supabase';

export const usePuzzleStore = defineStore('puzzle', {
  state: () => ({
    nodes: [],
    globalThreatLevel: 100, // Starts high, goes down as nodes are solved
    loading: false,
    error: null,
    realtimeSubscription: null,
  }),

  getters: {
    getNodeById: (state) => (id) => {
      return state.nodes.find(node => node.id === id);
    },
    getNodesByTeam: (state) => (team) => {
      return state.nodes.filter(node => node.team === team);
    }
  },

  actions: {
    async fetchGameState() {
      this.loading = true;
      try {
        // Fetch all nodes
        const { data: nodesData, error: nodesError } = await supabase
          .from('nodes')
          .select('*');
        if (nodesError) throw nodesError;
        if (nodesData) {
          this.nodes = nodesData;
        }

        // Fetch global state (assuming single row with id = 1)
        const { data: globalData, error: globalError } = await supabase
          .from('global_state')
          .select('*')
          .eq('id', 1)
          .single();
        if (globalError) {
          console.warn('Could not fetch global_state (might not exist yet):', globalError.message);
        } else if (globalData) {
          this.globalThreatLevel = globalData.threat_level;
        }

      } catch (err) {
        this.error = err.message;
        console.error('Error fetching game state:', err);
      } finally {
        this.loading = false;
      }
    },

    initRealtime() {
      // Clean up previous subscription if exists
      if (this.realtimeSubscription) {
        supabase.removeChannel(this.realtimeSubscription);
      }

      this.realtimeSubscription = supabase.channel('public:game_state_changes')
        // Listen to changes on 'nodes' table
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'nodes' },
          (payload) => {
            console.log('Node change received!', payload);
            this.handleNodeChange(payload);
          }
        )
        // Listen to changes on 'global_state' table
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'global_state' },
          (payload) => {
            console.log('Global state change received!', payload);
            if (payload.new && payload.new.threat_level !== undefined) {
              this.globalThreatLevel = payload.new.threat_level;
            }
          }
        )
        .subscribe((status) => {
          console.log('Realtime subscription status:', status);
        });
    },

    handleNodeChange(payload) {
      if (payload.eventType === 'INSERT') {
        this.nodes.push(payload.new);
      } else if (payload.eventType === 'UPDATE') {
        const index = this.nodes.findIndex(n => n.id === payload.new.id);
        if (index !== -1) {
          this.nodes.splice(index, 1, payload.new);
        } else {
          this.nodes.push(payload.new); // If not found, just add it
        }
      } else if (payload.eventType === 'DELETE') {
        const index = this.nodes.findIndex(n => n.id === payload.old.id);
        if (index !== -1) {
          this.nodes.splice(index, 1);
        }
      }
    },

    async solveNode(nodeId) {
      this.loading = true;
      try {
        const node = this.getNodeById(nodeId);
        if (!node) throw new Error('Node not found');
        if (node.status === 'solved') return; // Already solved

        // 1. Mark current node as solved
        const { error: updateError } = await supabase
          .from('nodes')
          .update({ status: 'solved' })
          .eq('id', nodeId);
        if (updateError) throw updateError;

        // 2. Cross-Team Puzzle Logic: Unlock dependent nodes
        // Using an RPC call or directly in client for prototyping
        const { data: dependentNodes, error: depError } = await supabase
          .from('nodes')
          .select('*')
          .eq('required_node_id', nodeId)
          .eq('status', 'locked');
        
        if (depError) throw depError;

        if (dependentNodes && dependentNodes.length > 0) {
          for (const depNode of dependentNodes) {
             const { error: unlockError } = await supabase
               .from('nodes')
               .update({ status: 'unlocked' })
               .eq('id', depNode.id);
             if (unlockError) console.error('Error unlocking node', depNode.id, unlockError);
          }
        }

        // 3. Update global threat level
        // Decrease by 5% as an example, down to a minimum of 0
        const newThreatLevel = Math.max(0, this.globalThreatLevel - 5);
        
        // Let's assume global_state has id=1
        const { error: globalUpdateError } = await supabase
          .from('global_state')
          .update({ threat_level: newThreatLevel })
          .eq('id', 1);
        if (globalUpdateError) {
          console.warn('Could not update global threat level:', globalUpdateError.message);
        }

      } catch (err) {
        this.error = err.message;
        console.error('Error solving node:', err);
      } finally {
        this.loading = false;
      }
    },

    stopRealtime() {
      if (this.realtimeSubscription) {
        supabase.removeChannel(this.realtimeSubscription);
        this.realtimeSubscription = null;
      }
    }
  }
});
