<template>
  <div ref="calendarCard" class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-4">
    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">Upcoming US Holidays</h2>

    <div v-if="loading" class="text-blue-500">Loading holidays...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <ul v-else ref="eventList" class="space-y-2">
      <li
        v-for="event in holidays"
        :key="event.date"
        class="p-3 rounded bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 transition-transform duration-300 hover:scale-[1.02] hover:-translate-y-1"
      >
        <strong>{{ event.localName }}</strong> – {{ event.date }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import gsap from 'gsap'

const calendarCard = ref(null)
const eventList = ref(null)
const holidays = ref([])
const loading = ref(true)
const error = ref(null)

const year = new Date().getFullYear()

onMounted(async () => {
  try {
    const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`)

    if (!response.ok) throw new Error('Failed to fetch holiday data.')

    const data = await response.json()

    holidays.value = data.filter((holiday) => new Date(holiday.date) >= new Date())

    await nextTick()

    if (calendarCard.value) {
      gsap.from(calendarCard.value, {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    await nextTick()

    if (eventList.value?.children?.length) {
      gsap.from(eventList.value.children, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
      })
    }

    loading.value = false
  } catch (err) {
    error.value = err.message
    loading.value = false
  }
})
</script>
