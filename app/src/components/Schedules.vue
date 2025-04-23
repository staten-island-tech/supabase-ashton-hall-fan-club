<template>
  <div class="container">
    <h1>Schedule</h1>

    <!-- Display the current schedules -->
    <table class="schedule-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="schedule in schedules" :key="schedule.id">
          <td>{{ schedule.title }}</td>
          <td>{{ new Date(schedule.start_time).toLocaleString() }}</td>
          <td>{{ new Date(schedule.end_time).toLocaleString() }}</td>
          <td>{{ schedule.description }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Form to add a new schedule -->
    <div v-if="isFormVisible" class="form-wrapper">
      <h2>Add Schedule</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="title">Title:</label>
          <input v-model="newSchedule.title" id="title" type="text" required />
        </div>

        <div class="form-group">
          <label for="start_time">Start Time:</label>
          <input v-model="newSchedule.start_time" id="start_time" type="datetime-local" required />
        </div>

        <div class="form-group">
          <label for="end_time">End Time:</label>
          <input v-model="newSchedule.end_time" id="end_time" type="datetime-local" required />
        </div>

        <div class="form-group">
          <label for="description">Description:</label>
          <textarea v-model="newSchedule.description" id="description"></textarea>
        </div>

        <div class="form-buttons">
          <button type="submit">Save Schedule</button>
          <button type="button" @click="cancelForm">Cancel</button>
        </div>
      </form>
    </div>

    <button v-if="!isFormVisible" @click="showForm">Add New Schedule</button>
  </div>
</template>

<script>
import supabase from './supabase.js'
import { gsap } from 'gsap'

export default {
  data() {
    return {
      schedules: [],
      isFormVisible: false,
      newSchedule: {
        title: '',
        start_time: '',
        end_time: '',
        description: '',
      },
      subscription: null,
    }
  },
  async mounted() {
    await this.loadSchedules()
    this.subscribeToChanges()
    const el = this.$el.querySelector('h1') // or any visible element
    gsap.fromTo(el, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 })
  },
  beforeUnmount() {
    if (this.subscription) {
      supabase.removeChannel(this.subscription)
    }
  },
  watch: {
    schedules() {
      this.$nextTick(() => {
        const rows = this.$el.querySelectorAll('tbody tr')
        const lastRow = rows[rows.length - 1]
        if (lastRow) {
          gsap.fromTo(lastRow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })
        }
      })
    },
  },
  methods: {
    async loadSchedules() {
      const { data, error } = await supabase.from('schedules').select()
      if (!error) {
        this.schedules = data
      } else {
        console.error('Error loading schedules:', error)
      }
    },
    showForm() {
      this.isFormVisible = true
    },
    cancelForm() {
      this.isFormVisible = false
      this.newSchedule = {
        title: '',
        start_time: '',
        end_time: '',
        description: '',
      }
    },
    async submitForm() {
      if (this.isEditing) {
        // If editing, update the existing schedule
        const { error } = await supabase
          .from('schedules')
          .update(this.newSchedule)
          .eq('id', this.newSchedule.id)

        if (error) {
          console.error('Error updating schedule:', error)
        } else {
          this.cancelForm()
        }
      } else {
        // If adding new schedule
        const { error } = await supabase.from('schedules').insert([this.newSchedule])
        if (error) {
          console.error('Error saving schedule:', error)
        } else {
          // No need to push to `schedules`, real-time handles it
          this.cancelForm()

          // Optional: animate form close
          if (this.$el.querySelector('.form-wrapper')) {
            gsap.to('.form-wrapper', { opacity: 0, y: -20, duration: 0.3 })
          }
        }
      }
    },
    subscribeToChanges() {
      this.subscription = supabase
        .channel('schedules-realtime')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'schedules' },
          (payload) => {
            this.schedules.push(payload.new)
          },
        )
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'schedules' },
          (payload) => {
            const index = this.schedules.findIndex((s) => s.id === payload.new.id)
            if (index !== -1) {
              this.schedules[index] = payload.new
            }
          },
        )
        .on(
          'postgres_changes',
          { event: 'DELETE', schema: 'public', table: 'schedules' },
          (payload) => {
            this.schedules = this.schedules.filter((s) => s.id !== payload.old.id)
          },
        )
        .subscribe()
    },
  },
}
</script>

<style scoped>
.container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  color: var(--color-text);
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.schedule-table th,
.schedule-table td {
  border: 1px solid #666;
  padding: 8px;
  text-align: left;
}

.form-wrapper {
  margin-bottom: 20px;
  background: #222;
  padding: 15px;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 4px;
}

.form-group input,
.form-group textarea {
  padding: 6px;
  background: #333;
  border: 1px solid #555;
  color: var(--color-text);
  border-radius: 4px;
}

.form-buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

button {
  padding: 8px 12px;
  background-color: var(--color-button-bg);
  border: none;
  color: var(--color-button-text);
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #666;
}
</style>
