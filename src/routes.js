import { createWebHistory, createRouter } from "vue-router";
import LoginPage from "./views/LoginPage.vue";
import RegisterPage from "./views/RegisterPage.vue";
import FeedbackPageView from "./views/FeedbackView.vue";
import AddFeedback from "./views/AddFeedback.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "FeedbackPage",
    component: FeedbackPageView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
  },
  {
    path: "/add-feedback",
    name: "AddFeedback",
    component: AddFeedback,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListner = onAuthStateChanged(getAuth(), (user) => {
      removeListner();
      resolve(user);
    });
  });
};

router.beforeEach(async (to, from, next) => {
  const currentUser = await getCurrentUser();

  if ((to.name === "LoginPage" || to.name === "RegisterPage") && currentUser) {
    next({ name: "FeedbackPage" });
  } else if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !currentUser
  ) {
    next({ name: "LoginPage" });
  } else {
    next();
  }
});

export default router;
