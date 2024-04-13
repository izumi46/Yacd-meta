export type ClashAPIConfig = {
  baseURL: string;
};

export type LogsAPIConfig = ClashAPIConfig & { logLevel: string };
