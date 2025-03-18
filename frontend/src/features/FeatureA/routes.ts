export default [
  {
    path: "/features/a",
    component: () => import("../Global/layouts/MainLayout.vue"),
    children: [
      {
        name: "feature-a",
        path: "/features/a",
        component: () => import("./components/FeatureA.vue"),
      },
    ],
  },
];
