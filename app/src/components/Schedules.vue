<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <h1 class="text-3xl font-bold text-gray-800">Schedule</h1>

    <!-- Display the current schedules -->
    <div class="overflow-x-auto shadow rounded-lg">
      <table class="w-full table-auto border-collapse">
        <thead class="bg-gray-100 text-gray-700">
          <tr>
            <th class="px-4 py-2 text-left">Title</th>
            <th class="px-4 py-2 text-left">Start Time</th>
            <th class="px-4 py-2 text-left">End Time</th>
            <th class="px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="schedule in schedules" :key="schedule.id" class="border-t hover:bg-gray-50">
            <td class="px-4 py-2">{{ schedule.title }}</td>
            <td class="px-4 py-2">{{ new Date(schedule.start_time).toLocaleString() }}</td>
            <td class="px-4 py-2">{{ new Date(schedule.end_time).toLocaleString() }}</td>
            <td class="px-4 py-2">{{ schedule.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form to add a new schedule -->
    <div v-if="isFormVisible" class="bg-white p-6 rounded-lg shadow border space-y-4">
      <h2 class="text-xl font-semibold text-gray-700">Add Schedule</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="title" class="block text-gray-600 font-medium">Title:</label>
          <input
            v-model="newSchedule.title"
            id="title"
            type="text"
            required
            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label for="start_time" class="block text-gray-600 font-medium">Start Time:</label>
          <input
            v-model="newSchedule.start_time"
            id="start_time"
            type="datetime-local"
            required
            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label for="end_time" class="block text-gray-600 font-medium">End Time:</label>
          <input
            v-model="newSchedule.end_time"
            id="end_time"
            type="datetime-local"
            required
            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label for="description" class="block text-gray-600 font-medium">Description:</label>
          <textarea
            v-model="newSchedule.description"
            id="description"
            class="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
        </div>

        <div class="flex gap-3">
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save Schedule
          </button>
          <button
            @click="cancelForm"
            type="button"
            class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <button
      @click="showForm"
      class="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
    >
      Add New Schedule
    </button>
  </div>
</template>

<script>
import supabase from './supabase.js'

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
      const { data, error } = await supabase.from('schedules').select()
      if (error) {
        console.error('Error loading schedules:', error)
      } else {
        this.schedules = data
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
      const { data, error } = await supabase.from('schedules').insert([this.newSchedule])
      if (error) {
        console.error('Error saving schedule:', error)
      } else {
        this.schedules.push(data[0])
        this.cancelForm()
      }
    },
  },
}
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>
