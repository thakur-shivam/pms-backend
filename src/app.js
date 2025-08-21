import { env } from "../src/config/env/index.js"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from "express"

const app = express()

app.use(cookieParser())
app.use(express.json({
    limit: "1mb"
}))
app.use(express.urlencoded({
    extended: true, 
    limit: "1mb"
}))
app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.static("public"))

import { 
    documentsRoute,
    logsRoute,
    meetingMinutesRoute,
    notificationsRoute,
    prioritiesRoute,
    projectsRoute,
    projectStatusesRoute,
    reportsRoute,
    rolesRoute,
    taskAssigneesRoute,
    taskAssignmentsRoute,
    tasksRoute,
    taskStatusesRoute,
    userProjectsRoute,
    usersRoute
} from "./routes/index.js"


app.use("/api/v1/documents", documentsRoute);
app.use("/api/v1/logs", logsRoute);
app.use("/api/v1/meeting-minutes", meetingMinutesRoute);
app.use("/api/v1/notifications", notificationsRoute);
app.use("/api/v1/priorities", prioritiesRoute);
app.use("/api/v1/projects", projectsRoute);
app.use("/api/v1/project-statuses", projectStatusesRoute);
app.use("/api/v1/reports", reportsRoute);
app.use("/api/v1/roles", rolesRoute);
app.use("/api/v1/task-assignees", taskAssigneesRoute);
app.use("/api/v1/task-assignments", taskAssignmentsRoute);
app.use("/api/v1/tasks", tasksRoute);
app.use("/api/v1/task-statuses", taskStatusesRoute);
app.use("/api/v1/user-projects", userProjectsRoute);
app.use("/api/v1/users", usersRoute);

export default app