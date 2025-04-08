<template>
  <div class="p-5 md:p-10 h-full">
    <div class="w-full flex justify-center items-center gap-10">
      <button
        @click="activeTab = 'income'"
        :class="[
          'border border-primary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6',
          activeTab === 'income' 
            ? 'bg-primary text-white' 
            : 'bg-white text-primary hover:text-white hover:bg-primary'
        ]"
      >
        Income
      </button>
      <button
        @click="activeTab = 'expense'"
        :class="[
          'border border-primary font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6',
          activeTab === 'expense' 
            ? 'bg-primary text-white' 
            : 'bg-white text-primary hover:text-white hover:bg-primary'
        ]"
      >
        Expense
      </button>
    </div>
    <Income v-if="activeTab === 'income'" />
    <Expense v-if="activeTab === 'expense'" />
  </div>
</template>

<script setup>
const route = useRoute()
const activeTab = ref(route.query.source === 'expense' ? 'expense' : 'income')
</script>