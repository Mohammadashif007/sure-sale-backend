import { Router } from "express";

export const router = Router();

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes,
    },
];

moduleRoutes.forEach((router) => {
    router.use(router.path, router.route);
});
