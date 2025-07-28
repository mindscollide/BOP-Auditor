const baseURL = import.meta.env.VITE_BASE_URL;

const authApi = `${baseURL}${import.meta.env.VITE_AUTH_PORT}`;
const reportApi = `${baseURL}${import.meta.env.VITE_REPORT_PORT}`;
const auditorApi = `${baseURL}${import.meta.env.VITE_AUDITOR_PORT}`;
const settingsApi = `${baseURL}${import.meta.env.VITE_SETTINGS_PORT}`;

export { authApi, reportApi, auditorApi, settingsApi };
