import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        server: {
            port: env.APP_PORT ? Number(env.APP_PORT) : 5173,
        },
    };
});
