import Vue from "vue";
import VueRouter from "vue-router";
import Index from "@/components/Index";
// import AddSmoothie from "@/components/AddSmoothie";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  // {
  //   path: "/add-smoothie",
  //   name: "AddSmoothie",
  //   component: AddSmoothie,
  // },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/add-smoothie",
    name: "AddSmoothie",
    component: () =>
      import(/* webpackChunkName: "AddSmoothie" */ "@/components/AddSmoothie"),
  },
  {
    path: "/edit-smoothie/:smoothie_slug",
    name: "EditSmoothie",
    component: () =>
      import(
        /* webpackChunkName: "EditSmoothie" */ "@/components/EditSmoothie"
      ),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
