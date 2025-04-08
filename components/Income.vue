<template>
  <div>
    <h1 class="text-center text-3xl font-semibold my-4 text-primary">Income</h1>
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
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
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
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
          placeholder="Food"
          required
        />
      </div>
      <div class="mb-6">
        <label
          for="categories"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select a Category</label
        >
        <select
          id="categories"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        >
          <option selected>Select Categoris</option>
          <option value="US">Salary</option>
          <option value="CA">Invest</option>
          <option value="DE">Other</option>
        </select>
      </div>
      <button
        type="submit"
        class="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6"
      >
        Add
      </button>
    </form>
  </div>
</template>
