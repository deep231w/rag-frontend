import axios from "axios";

const AUTH_STORAGE_KEYS = {
  token: "token",
  admin: "admin",
};

let authInterceptorsInitialized = false;

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_STORAGE_KEYS.token);
}

export function getStoredAdmin(): any | null {
  try {
    const rawAdmin = localStorage.getItem(AUTH_STORAGE_KEYS.admin);
    return rawAdmin ? JSON.parse(rawAdmin) : null;
  } catch {
    return null;
  }
}

export function setStoredAuth(token: string, admin?: Record<string, any> | null) {
  localStorage.setItem(AUTH_STORAGE_KEYS.token, token);

  if (admin) {
    localStorage.setItem(AUTH_STORAGE_KEYS.admin, JSON.stringify(admin));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEYS.admin);
  }

  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function clearStoredAuth() {
  localStorage.removeItem(AUTH_STORAGE_KEYS.token);
  localStorage.removeItem(AUTH_STORAGE_KEYS.admin);
  delete axios.defaults.headers.common.Authorization;
}

export function isAuthenticated(): boolean {
  return Boolean(getStoredToken());
}

export function initializeAuth() {
  if (authInterceptorsInitialized) {
    return;
  }

  const token = getStoredToken();
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  axios.interceptors.request.use((config) => {
    const activeToken = getStoredToken();

    if (activeToken) {
      config.headers = {
        ...(config.headers ?? {}),
        Authorization: `Bearer ${activeToken}`,
      } as any;
    } else {
      delete config.headers?.Authorization;
    }

    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        clearStoredAuth();

        const currentPath = window.location.pathname;
        if (currentPath !== "/signin") {
          window.location.assign("/signin");
        }
      }

      return Promise.reject(error);
    },
  );

  authInterceptorsInitialized = true;
}
