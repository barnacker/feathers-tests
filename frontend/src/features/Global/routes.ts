export default [
  {
    path: "/",
    component: () => import("./layouts/MainLayout.vue"),
    children: [
      {
        name: "index",
        path: "",
        component: () => import("src/features/Global/components/IndexView.vue"),
      },
    ],
  },
];
