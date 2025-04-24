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

    <button
      v-if="!isFormVisible"
      ref="addBtn"
      @click="showForm"
      @mouseenter="hoverBtn"
      @mouseleave="leaveBtn"
    >
      Add New Schedule
    </button>
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

    // Animate header
    const title = this.$el.querySelector('h1')
    gsap.fromTo(title, { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 1 })

    // Animate all table rows on mount
    this.$nextTick(() => {
      const rows = this.$el.querySelectorAll('tbody tr')
      gsap.from(rows, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      })
    })
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
          gsap.fromTo(
            lastRow,
            { opacity: 0, y: 40, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
          )
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
      this.$nextTick(() => {
        const form = this.$el.querySelector('.form-wrapper')
        gsap.fromTo(
          form,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        )
      })
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
        const { error } = await supabase.from('schedules').insert([this.newSchedule])
        if (error) {
          console.error('Error saving schedule:', error)
        } else {
          this.cancelForm()
          const form = this.$el.querySelector('.form-wrapper')
          if (form) {
            gsap.to(form, { opacity: 0, y: -20, duration: 0.3 })
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
    hoverBtn() {
      gsap.to(this.$refs.addBtn, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out',
      })
    },
    leaveBtn() {
      gsap.to(this.$refs.addBtn, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.inOut',
      })
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
  background-color: var(--color-button-bg, #444);
  border: none;
  color: var(--color-button-text, #fff);
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #666;
}
</style>
