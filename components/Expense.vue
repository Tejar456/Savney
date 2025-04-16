<template>
  <div>
    <h1 class="text-center text-3xl font-semibold my-4 text-primary">
      Expense
    </h1>
    <form @submit.prevent="submitExpense" class="w-full px-10">
      <div class="mb-6">
        <label
          for="amount"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Amount</label
        >
        <input
          v-model="expense.amount"
          type="number"
          id="amount"
          min="1"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
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
          v-model="expense.description"
          type="text"
          id="description"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
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
          v-model="expense.category"
          id="categories"
          required
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        >
          <option value="" disabled selected>Select Categories</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="fashion">Fashion</option>
          <option value="invest">Invest</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6"
      >
        {{ isSubmitting ? "Adding..." : "Add" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { usePush } from "notivue";
const { getToken } = useAuth();

const push = usePush();
const router = useRouter();
const isSubmitting = ref(false);

const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const expense = ref({
  amount: "",
  description: "",
  category: "",
  date: formatDate(new Date()),
  type: "expense",
});

const resetForm = () => {
  expense.value = {
    amount: "",
    description: "",
    category: "",
    date: formatDate(new Date()),
    type: "expense",
  };
};

const submitExpense = async () => {
  try {
    isSubmitting.value = true;
    const token = getToken();

    if (!token) {
      push.warn("Please login first");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
      return;
    }

    const expenseData = {
      ...expense.value,
      date: formatDate(new Date(expense.value.date)),
    };
    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/transactions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(expenseData),
    });

    const data = await response.json();

    if (response.ok) {
      resetForm();
      push.success("Expense added successfully!");
      setTimeout(() => {
        router.push("/transaction");
      }, 1500);
    } else {
      push.error("Failed to add expense!");
      throw new Error(data.message || "Failed to add expense");
    }
  } catch (error) {
    console.error("Error:", error);

    if (
      error.message.includes("Unauthorized") ||
      error.response?.status === 401
    ) {
      push.warn("Session expired. Please login again");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } else {
      push.error("Failed to add expense!");
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>
