declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL: string;
      SESSION_SECRET: string;
    }
  }
}

export {}
