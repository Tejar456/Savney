<template>
    <div class="h-full w-full px-10 mt-10">
      <div class="mb-4">
        <ul
          class="flex justify-center gap-4 text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li role="presentation">
            <button
              class="inline-block px-6 py-2 rounded-lg text-white"
              :class="activeTab === 'profile' ? 'bg-primary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
              id="profile-tab"
              @click="activeTab = 'profile'"
              type="button"
              role="tab"
              aria-controls="profile"
              :aria-selected="activeTab === 'profile'"
            >
              Income
            </button>
          </li>
          <li role="presentation">
            <button
              class="inline-block px-6 py-2 rounded-lg text-white"
              :class="activeTab === 'dashboard' ? 'bg-primary' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
              id="dashboard-tab"
              @click="activeTab = 'dashboard'"
              type="button"
              role="tab"
              aria-controls="dashboard"
              :aria-selected="activeTab === 'dashboard'"
            >
              Expense
            </button>
          </li>
        </ul>
      </div>
      <div id="default-tab-content">
        <div
          v-show="activeTab === 'profile'"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <h1 class="text-center text-3xl font-semibold my-4 text-primary">
            Income
          </h1>
          <form class="w-full px-10">
            <div class="mb-6">
              <label
                for="amount"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount</label
              >
              <input
                type="number"
                id="amount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                placeholder="Rp."
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Description</label
              >
              <input
                type="text"
                id="description"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                placeholder="Food"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="categories"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Select A Category</label
              >
              <select
                id="categories"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              >
                <option selected>Select Categories</option>
                <option value="US">Food</option>
                <option value="CA">Transportation</option>
                <option value="FR">Invest</option>
                <option value="DE">Other</option>
              </select>
            </div>
            <button
              type="submit"
              class="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-6"
            >
              Add
            </button>
          </form>
        </div>
        <div
          v-show="activeTab === 'dashboard'"
          id="dashboard"
          role="tabpanel"
          aria-labelledby="dashboard-tab"
        >
          <h1 class="text-center text-3xl font-semibold my-4 text-primary">
            Expense
          </h1>
          <form class="w-full px-10">
            <div class="mb-6">
              <label
                for="amount"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Amount</label
              >
              <input
                type="number"
                id="amount"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                placeholder="Rp."
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Description</label
              >
              <input
                type="text"
                id="description"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                placeholder="Food"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="categories"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Select A Category</label
              >
              <select
                id="categories"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              >
                <option selected>Select Categories</option>
                <option value="US">Food</option>
                <option value="CA">Transportation</option>
                <option value="FR">Invest</option>
                <option value="DE">Other</option>
              </select>
            </div>
            <button
              type="submit"
              class="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center mb-6"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const activeTab = ref("profile"); // Default active tab
  </script>