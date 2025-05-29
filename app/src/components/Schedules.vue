<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">Schedule</h1>

    <!-- Display the current schedules -->
    <div class="overflow-x-auto shadow rounded-lg">
      <table class="w-full table-auto border-collapse">
        <thead class="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
          <tr>
            <th class="px-4 py-2 text-left">Title</th>
            <th class="px-4 py-2 text-left">Start Time</th>
            <th class="px-4 py-2 text-left">End Time</th>
            <th class="px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="schedule in schedules"
            :key="schedule.id"
            class="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="px-4 py-2 text-gray-800 dark:text-gray-100">{{ schedule.title }}</td>
            <td class="px-4 py-2 text-gray-800 dark:text-gray-100">
              {{ new Date(schedule.start_time).toLocaleString() }}
            </td>
            <td class="px-4 py-2 text-gray-800 dark:text-gray-100">
              {{ new Date(schedule.end_time).toLocaleString() }}
            </td>
            <td class="px-4 py-2 text-gray-800 dark:text-gray-100">{{ schedule.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Form to add a new schedule -->
    <div
      v-if="isFormVisible"
      class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700 space-y-4"
    >
      <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-200">Add Schedule</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div>
          <label for="title" class="block text-gray-600 dark:text-gray-300 font-medium"
            >Title:</label
          >
          <input
            v-model="newSchedule.title"
            id="title"
            type="text"
            required
            class="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label for="start_time" class="block text-gray-600 dark:text-gray-300 font-medium"
            >Start Time:</label
          >
          <input
            v-model="newSchedule.start_time"
            id="start_time"
            type="datetime-local"
            required
            class="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label for="end_time" class="block text-gray-600 dark:text-gray-300 font-medium"
            >End Time:</label
          >
          <input
            v-model="newSchedule.end_time"
            id="end_time"
            type="datetime-local"
            required
            class="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
          />
        </div>

        <div>
          <label for="description" class="block text-gray-600 dark:text-gray-300 font-medium"
            >Description:</label
          >
          <textarea
            v-model="newSchedule.description"
            id="description"
            class="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
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
            class="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
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

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from './supabase'

const schedules = ref([])
const isFormVisible = ref(false)
const isSaving = ref(false)

const newSchedule = ref({
  title: '',
  start_time: '',
  end_time: '',
  description: '',
})

// Load schedules for the current user
const loadSchedules = async () => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('User not authenticated:', userError)
    return
  }

  const { data, error } = await supabase
    .from('schedules')
    .select()
    .eq('user_id', user.id)
    .order('start_time', { ascending: true })

  if (error) {
    console.error('Error loading schedules:', error)
  } else {
    schedules.value = data
  }
}

// Show form
const showForm = () => {
  isFormVisible.value = true
}

// Cancel/reset form
const cancelForm = () => {
  isFormVisible.value = false
  newSchedule.value = {
    title: '',
    start_time: '',
    end_time: '',
    description: '',
  }
}

// Submit form
const submitForm = async () => {
  isSaving.value = true

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    console.error('User not authenticated:', userError)
    isSaving.value = false
    return
  }

  const scheduleToInsert = {
    ...newSchedule.value,
    user_id: user.id,
  }

  const { data, error } = await supabase.from('schedules').insert([scheduleToInsert]).select()

  if (error) {
    console.error('Error saving schedule:', error)
  } else {
    schedules.value.push(...data)
    cancelForm()
  }

  isSaving.value = false
}

onMounted(() => {
  loadSchedules()
})
</script>
