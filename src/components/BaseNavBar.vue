<script setup>
import { signOut, getAuth } from "firebase/auth";
import { useRouter } from "vue-router";

let auth = getAuth();
const router = useRouter();
const isLoggedIn = defineModel("isLoggedIn", { type: Boolean });
const logOut = () => {
  console.log("Logging Out");
  signOut(auth)
    .then(() => {
      console.log("Logout Success");
      router.push({ name: "LoginPage" });
    })
    .catch((error) => {
      console.log("Logout Error", error);
    });
};
</script>
<template>
  <div class="py-4 px-4 border border-b shadow-lg">
    <section class="flex items-center justify-between">
      <div
        @click="router.push({ name: 'FeedbackPage' })"
        class="px-4 py-3 cursor-pointer flex items-center gap-3"
      >
        <img src="/feed-back.svg" class="w-40" alt="Logo" />
      </div>
      <p v-if="isLoggedIn" class="flex sm:flex-row flex-col items-center gap-4">
        <span
          v-if="router.currentRoute.value.name !== 'AddFeedback'"
          @click="router.push({ name: 'AddFeedback' })"
          class="text-sm whitespace-nowrap cursor-pointer rounded p-2 bg-[#FF5858] text-white flex items-center gap-2 px-4 py-2 transition-all hover:scale-105 hover:bg-opacity-70 focus:scale-105 active:scale-95 active:bg-opacity-80 disabled:pointer-events-none disabled:opacity-40"
          >Add Feedback</span
        >
        <span
          @click="logOut"
          class="text-sm cursor-pointer rounded p-2 bg-[#FF5858] text-white flex items-center gap-2 px-4 py-2 transition-all hover:scale-105 hover:bg-opacity-70 focus:scale-105 active:scale-95 active:bg-opacity-80 disabled:pointer-events-none disabled:opacity-40"
        >
          Logout
        </span>
      </p>
      <span
        v-else
        class="text-sm cursor-pointer rounded p-2 bg-[#FF5858] text-white flex items-center gap-2 px-4 py-2 transition-all hover:scale-105 hover:bg-opacity-70 focus:scale-105 active:scale-95 active:bg-opacity-80 disabled:pointer-events-none disabled:opacity-40"
        >Login</span
      >
    </section>
  </div>
</template>
