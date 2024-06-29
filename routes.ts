/**
 * This file is used to define the routes of the application.
 * @type {string[]} publicRoutes: Array of public routes.
 */

export const publicRoutes = [
    "/",
    "/blog",
];

export const authRoutes = [
    "/auth/login",
    "/auth/register",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/app";