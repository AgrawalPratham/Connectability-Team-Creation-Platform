import React from 'react'
import { AuthData } from './AuthWrapper'
import { Routes, Route } from 'react-router-dom'
import { nav } from './navigation'

export default function RenderRoutes() {
    const { user } = AuthData();

    return (
        <Routes>
            {
                nav.map((r, i) => {
                    if (r.isPrivate && user.isAuthenticated) {
                        return <Route key={i} path={r.path} element={r.element} />
                    }
                    else if (!r.isPrivate) {
                        return <Route key={i} path={r.path} element={r.element} />
                    }
                    else
                        return false;
                })
            }
        </Routes>
    )
}
