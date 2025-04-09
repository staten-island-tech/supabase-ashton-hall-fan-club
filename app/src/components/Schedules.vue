<template>
  <div>
    <h1>Schedule</h1>
    <!-- Display the current schedules -->
    <table>
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
    <div v-if="isFormVisible">
      <h2>Add Schedule</h2>
      <form @submit.prevent="submitForm">
        <label for="title">Title:</label>
        <input v-model="newSchedule.title" id="title" type="text" required />

        <label for="start_time">Start Time:</label>
        <input v-model="newSchedule.start_time" id="start_time" type="datetime-local" required />

        <label for="end_time">End Time:</label>
        <input v-model="newSchedule.end_time" id="end_time" type="datetime-local" required />

        <label for="description">Description:</label>
        <textarea v-model="newSchedule.description" id="description"></textarea>

        <button type="submit">Save Schedule</button>
        <button @click="cancelForm" type="button">Cancel</button>
      </form>
    </div>

    <button @click="showForm">Add New Schedule</button>
  </div>
</template>

<script>
import supabase from 'supabase'

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
    }
  },
  mounted() {
    this.loadSchedules()
  },
  methods: {
    async loadSchedules() {
      // Fetch all schedules from the Supabase table
      const { data, error } = await supabase.from('schedules').select()
      if (error) {
        console.error('Error loading schedules:', error)
      } else {
        this.schedules = data
      }
    },
    showForm() {
      // Display the form to add a new schedule
      this.isFormVisible = true
    },
    cancelForm() {
      // Hide the form and reset the new schedule data
      this.isFormVisible = false
      this.newSchedule = {
        title: '',
        start_time: '',
        end_time: '',
        description: '',
      }
    },
    async submitForm() {
      // Submit the form and insert the new schedule into the table
      const { data, error } = await supabase.from('schedules').insert([this.newSchedule])

      if (error) {
        console.error('Error saving schedule:', error)
      } else {
        // Add the new schedule to the local list and reset the form
        this.schedules.push(data[0])
        this.cancelForm()
      }
    },
  },
}
</script>
