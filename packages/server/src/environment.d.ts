// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IProcessEnv {
  PORT: string;
  MONGO_URI: string;
  REDIS_URL: string;
  NODE_ENV: "development" | "production" | "test";
}

declare global {
  export namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface ProcessEnv extends IProcessEnv {}
  }
}
