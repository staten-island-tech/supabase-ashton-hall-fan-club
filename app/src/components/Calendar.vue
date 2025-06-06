<!-- src/components/Calendar.vue -->
<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import { ref, onMounted } from 'vue'
import { supabase } from './supabase' // adjust path if needed

const events = ref([])

const loadSchedules = async () => {
  const { data, error } = await supabase.from('schedules').select()
  if (error) {
    console.error('Failed to load schedules:', error)
    return
  }

  // Format for FullCalendar
  events.value = data.map((schedule) => ({
    id: schedule.id,
    title: schedule.title,
    start: schedule.start_time,
    end: schedule.end_time,
  }))
}

onMounted(loadSchedules)

const calendarOptions = {
  plugins: [dayGridPlugin],
  initialView: 'dayGridMonth',
  events,
}
</script>
