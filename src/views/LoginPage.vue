<script setup>
import { ref, computed } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const errorMessage = ref("");
const loading = ref(false);
const dataFilled = computed(() => {
  return !email.value || !password.value;
});
const loginUser = () => {
  loading.value = true;
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully Login", data);
      loading.value = false;
      router.push({ name: "FeedbackPage" });
    })
    .catch((error) => {
      loading.value = false;
      console.log("Error Logging in");
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage.value = "Invalid Email";
          break;
        case "auth/user-not-found":
          errorMessage.value = "User not found";
          break;
        case "auth/wrong-password":
          errorMessage.value = "Wrong Password";
          break;
        default:
          errorMessage.value = "Email or Password is incorrect";
          break;
      }
    });
};
</script>
<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Log in to your account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Email address</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            v-model="email"
            type="email"
            autocomplete="email"
            required=""
            class="block w-full px-2 rounded-md border outline-none py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center mt-2 justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="block w-full px-2 rounded-md border py-1.5 outline-none text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div class="text-sm text-red-500">{{ errorMessage }}</div>
      <div class="mt-4">
        <button
          :disabled="dataFilled"
          @click="loginUser"
          class="flex w-full gap-8 justify-center rounded-md bg-[#FF5858] px-3 py-1.5 transition-all hover:scale-105 hover:bg-opacity-70 focus:scale-105 active:scale-95 active:bg-opacity-80 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Log in
          <svg
            v-if="loading"
            class="animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22C17.421 22 22 17.421 22 12H20C20 16.337 16.337 20 12 20C7.663 20 4 16.337 4 12C4 7.664 7.663 4 12 4V2C6.579 2 2 6.58 2 12C2 17.421 6.579 22 12 22Z"
              fill="#ffffff"
            />
          </svg>
        </button>
      </div>

      <p class="mt-2 text-center text-sm text-gray-500">
        Don't have an account?
        {{ " " }}
        <RouterLink
          :to="{ name: 'RegisterPage' }"
          class="font-semibold leading-6 text-gray-600 hover:text-gray-500"
        >
          Register Account
        </RouterLink>
      </p>
    </div>
  </div>
</template>
