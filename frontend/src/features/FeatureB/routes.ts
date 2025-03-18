export default [
  {
    path: "/features/b",
    component: () => import("../Global/layouts/MainLayout.vue"),
    children: [
      {
        name: "feature-b",
        path: "/features/b",
        component: () => import("./components/FeatureB.vue"),
      },
    ],
  },
];
