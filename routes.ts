/**
 * This file is used to define the routes of the application.
 * @type {string[]} publicRoutes: Array of public routes.
 */

export const publicRoutes = [
    "/",
    "/blog",
    "/api/uploadthing",
    "/auth/verify-email",
];

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/app";