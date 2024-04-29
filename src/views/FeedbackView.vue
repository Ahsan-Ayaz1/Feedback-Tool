<script setup>
import { onMounted, ref, computed } from "vue";
import db from "../FirebaseConfig";
import { collection, getDocs, orderBy } from "firebase/firestore";

const feedbacks = ref(null);
const getFeedbacks = async () => {
  const querySnapshot = await getDocs(
    collection(db, "Feedbacks"),
    orderBy("created_at", "asc")
  );
  feedbacks.value = [];
  querySnapshot.forEach((doc) => {
    feedbacks.value.push(doc.data());
  });
};
const showList = computed(() => {
  return feedbacks.value.slice(
    (firspage.value - 1) * perpage.value,
    firspage.value * perpage.value
  );
});
const firspage = ref(1);
const perpage = ref(5);
const isFirspage = computed(() => {
  return firspage.value === 1;
});
const isLastPage = computed(() => {
  return feedbacks.value.length <= firspage.value * perpage.value;
});
onMounted(() => {
  getFeedbacks();
});
</script>

<template>
  <section
    class="flex items-center h-screen flex-1 justify-center px-6 lg:px-8 flex-col sm:px-0 py-10 gap-2 sm:justify-center sm:items-center"
  >
    <section class="flex items-center gap-6" v-if="feedbacks === null">
      Loading...
      <svg
        class="animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M12 22C17.421 22 22 17.421 22 12H20C20 16.337 16.337 20 12 20C7.663 20 4 16.337 4 12C4 7.664 7.663 4 12 4V2C6.579 2 2 6.58 2 12C2 17.421 6.579 22 12 22Z"
          fill="#333333"
        />
      </svg>
    </section>
    <section
      v-else-if="feedbacks.length > 0"
      v-for="(item, index) in showList"
      :key="index"
      class="sm:w-1/3 w-full flex p-4 rounded items-center justify-between bg-gray-100"
    >
      <section class="flex gap-1 flex-col">
        <p class="text-sm font-bold">{{ item.title }}</p>
        <p class="text-sm">{{ item.category }}</p>
        <p v-if="item.user_name" class="text-xs italic">
          <strong class="font-medium">Posted By : </strong>
          <span class="capitalize">{{ item.user_name }}</span>
        </p>
      </section>
    </section>

    <section v-else class="text-sm">
      No FeedBack Available. Please
      <RouterLink class="underline" :to="{ name: 'AddFeedback' }"
        >Add FeedBack</RouterLink
      >
      . To View The FeedBack Details
    </section>
    <section
      class="sm:w-1/3 w-full flex justify-between"
      v-if="feedbacks?.length > 0"
    >
      <button
        class="text-sm cursor-pointer rounded p-2 bg-[#FF5858] text-white flex items-center gap-2 px-4 py-2 transition-all hover:scale-105 hover:bg-opacity-70 focus:scale-105 active:scale-95 active:bg-opacity-80 disabled:pointer-events-none disabled:opacity-40"
        :disabled="isFirspage"
        @click="
          () => {
            if (firspage > 1) firspage--;
          }
        "
      >
        <img src="/arrowleftNoTail.svg" alt="ArrowLeft" />
      </button>
      <button
        class="text-sm cursor-pointer rounded p-2 bg-[#FF5858] text-white flex items-center gap-2 px-4 py-2 transition-all hover:scale-105 hover:bg-opacity-70 focus:scale-105 active:scale-95 active:bg-opacity-80 disabled:pointer-events-none disabled:opacity-40"
        :disabled="isLastPage"
        @click="() => firspage++"
      >
        <img src="/arrowleftNoTail.svg" class="rotate-180" alt="ArrowRight" />
      </button>
    </section>
  </section>
</template>
