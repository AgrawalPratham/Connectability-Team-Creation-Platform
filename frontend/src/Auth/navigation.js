import CreateProject from '../pages/create_project/createProject.js'
import Dashboard from '../pages/dashboard/dashboard.js'
import LoginSignup from '../pages/login_signup/loginsignup.js'
import Invitation from '../pages/invitation/invitation.js'
import InviteMembers from '../pages/invite_members/inviteMembers.js'
import Profile from '../pages/profile/profile.js' 
import Project from '../pages/project/project.js'

export const nav = [
    { path: "/",                name: "LoginSignup",        element: <LoginSignup />,       isPrivate: false },
    { path: "/dashboard",       name: "Dashboard",          element: <Dashboard />,         isPrivate: false },
    { path: "/invitation",      name: "Invitation",         element: <Invitation />,        isPrivate: true },
    { path: "/createproject",   name: "CreateProject",      element: <CreateProject />,     isPrivate: true },
    { path: "/invitemembers",   name: "InviteMembers",      element: <InviteMembers />,     isPrivate: true },
    { path: "/profile",         name: "Profile",            element: <Profile />,           isPrivate: true },
    { path: "/project",         name: "Project",            element: <Project />,           isPrivate: true }
]