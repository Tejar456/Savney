<template>
  <div class="grid grid-cols-1 md:grid-cols-2">
    <div class="w-full h-screen col-span-1 hidden md:block">
      <img
        src="/assets/img/auth.avif"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>
    <div
      class="h-screen flex items-center justify-center flex-col bg-gray-50 lg:px-20 col-span-1"
    >
      <div class="w-full px-10 flex justify-center items-center mb-10">
        <img src="/assets/img/savney.png" alt="savney logo" class="w-16 h-16" />
        <h1 class="text-5xl text-primary">Savney</h1>
      </div>
      <form class="w-full px-10" @submit.prevent="handleRegister">        
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email address</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            minlength="8"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Confirm Password</label
          >
          <input
            v-model="confirmPassword"
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6"
        >
          Register
        </button>
        <p class="text-md text-gray-800 text-center">
          Have an account
          <NuxtLink to="/login" class="text-primary">Login</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});

import { usePush } from "notivue";

const push = usePush();
const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleRegister = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      push.warning("Passwords don't match!");
      return;
    }

    const newUser = {      
      email: email.value,
      password: password.value,
    };

    const config = useRuntimeConfig();
    const apiBaseUrl = config.public.apiBaseUrl;

    const response = await fetch(`${apiBaseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json", 
      },
      body: JSON.stringify(newUser),
    });
    
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error("Server returned non-JSON response. Please check API endpoint.");
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    push.success("Registration successful! Please login.");
    router.push("/login");
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof SyntaxError) {
      alert("Server error: Please check if the API is running correctly");
    } else {
      push.error(error.message || "Error during registration");
    }
  }
};
</script>
 