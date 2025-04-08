<template>
  <div class="grid grid-cols-1 md:grid-cols-2">
    <div class="w-full h-screen col-span-1 hidden md:block">
      <img
        src="https://images.unsplash.com/photo-1574607524755-56493b242d28?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBlbmdlbG9sYSUyMHVhbmd8ZW58MHx8MHx8fDA%3D"
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
      <form class="w-full px-10" @submit.prevent="handleLogin">
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
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mb-6"
        >
          Login
        </button>
        <p class="text-md text-gray-800 text-center">
          Don't have an account
          <NuxtLink to="/register" class="text-primary">Register</NuxtLink>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
});

const router = useRouter();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const response = await fetch("http://localhost:4000/users");
    const users = await response.json();

    const user = users.find(
      (u) => u.email === email.value && u.password === password.value
    );

    if (user) {
      // Store user info in localStorage or state management
      localStorage.setItem("user", JSON.stringify(user));
      // Redirect to dashboard or home page
      router.push("/");
    } else {
      alert("Invalid email or password");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Error during login");
  }
};
</script>
