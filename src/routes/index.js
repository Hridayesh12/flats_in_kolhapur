// All components mapping with path for internal routes

import { lazy } from 'react'
// Import components lazily
const HomePage = lazy(() => import('../pages/HomePage'))

const AboutPage = lazy(() => import('../pages/AboutPage'))
const FavoritesPage = lazy(() => import('../pages/protected/FavoritesPage'))
const AccountPage = lazy(() => import('../pages/protected/AccountPage'))

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/favorite',
        component: FavoritesPage,
    },
    {
        path: '/my-account',
        component: AccountPage,
    }
]

export default routes