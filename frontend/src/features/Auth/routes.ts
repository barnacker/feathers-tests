export default [
  {
    path: "/auth",
    component: () => import("../Global/layouts/MainLayout.vue"),
    children: [
      {
        name: "auth-login",
        path: "/auth/login",
        component: () => import("src/features/Auth/components/LoginView.vue"),
      },
      {
        name: "auth-signup",
        path: "/auth/signup",
        component: () => import("src/features/Auth/components/SignupView.vue"),
      },
    ],
  },
  {
    path: "/users",
    component: () => import("../Global/layouts/MainLayout.vue"),
    children: [
      {
        name: "user-list",
        path: "/users/",
        component: () => import("src/features/Auth/components/UserListView.vue"),
      },
    ],
  },
];
