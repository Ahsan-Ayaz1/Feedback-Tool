<script setup>
import { ref, computed } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();
const username = ref("");
const loading = ref(false);
const dataFilled = computed(() => {
  return !email.value || !password.value || !username.value;
});
let auth = getAuth();
const registerAccount = () => {
  loading.value = true;
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then(async (userCredential) => {
      loading.value = false;
      const user = userCredential.user;
      const displayName = username.value;

      return updateProfile(user, { displayName })
        .then(() => {
          console.log("Profile updated successfully");
          console.log({ user });
          signOut(auth);
          router.push({ name: "LoginPage" });
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          // Handle error
        });
    })
    .catch((error) => {
      loading.value = false;
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    });
};
</script>
<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Register New Account
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label
          for="username"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Name</label
        >
        <div class="mt-2">
          <input
            id="username"
            name="username"
            type="text"
            v-model="username"
            autocomplete="username"
            required=""
            class="block w-full px-2 rounded-md outline-none border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label
          for="email"
          class="block text-sm font-medium mt-2 leading-6 text-gray-900"
          >Email address</label
        >
        <div class="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            v-model="email"
            autocomplete="email"
            required=""
            class="block w-full px-2 rounded-md outline-none border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium mt-2 leading-6 text-gray-900"
            >Password</label
          >
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            v-model="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="block w-full px-2 rounded-md outline-none border py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="mt-4">
        <button
          @click="registerAccount"
          :disabled="dataFilled"
          class="flex w-full gap-8 disabled:pointer-events-none disabled:opacity-40 justify-center rounded-md bg-[#FF5858] px-3 py-1.5 transition-all hover:scale-105 hover:bg-opacity-70 focus:scale-105 active:scale-95 active:bg-opacity-80 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          Register
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
        Already have an account?
        {{ " " }}
        <RouterLink
          :to="{ name: 'LoginPage' }"
          class="font-semibold leading-6 text-gray-600 hover:text-gray-500"
        >
          Login
        </RouterLink>
      </p>
    </div>
  </div>
</template>
