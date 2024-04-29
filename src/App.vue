<script setup>
import BaseNavBar from "./components/BaseNavBar.vue";
import BaseFooter from "./components/BaseFooter.vue";
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const isLoggedIn = ref(false);
let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <BaseNavBar v-model:isLoggedIn="isLoggedIn" />
    <router-view></router-view>
    <BaseFooter class="mt-auto" />
  </div>
</template>

<style scoped></style>
