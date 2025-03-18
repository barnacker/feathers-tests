export default [
  {
    path: "/features/c",
    component: () => import("../Global/layouts/MainLayout.vue"),
    children: [
      {
        name: "feature-c",
        path: "/features/c",
        component: () => import("./components/FeatureC.vue"),
      },
    ],
  },
];
