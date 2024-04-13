import { trimTrailingSlash } from '~/misc/utils';
import { ClashAPIConfig, LogsAPIConfig } from '~/types';

const headersCommon = { 'Content-Type': 'application/json' };

function genCommonHeaders() {
  const h = { ...headersCommon };
  return h;
}
function buildWebSocketURLBase(baseURL: string, params: URLSearchParams, endpoint: string) {
  const qs = '?' + params.toString();
  const url = new URL(baseURL);
  url.protocol === 'https:' ? (url.protocol = 'wss:') : (url.protocol = 'ws:');
  return `${trimTrailingSlash(url.href)}${endpoint}${qs}`;
}

export function getURLAndInit({ baseURL }: ClashAPIConfig) {
  const headers = genCommonHeaders();
  return {
    url: baseURL,
    init: { headers },
  };
}

export function buildWebSocketURL(apiConfig: ClashAPIConfig, endpoint: string) {
  const { baseURL } = apiConfig;
  const params = new URLSearchParams();

  return buildWebSocketURLBase(baseURL, params, endpoint);
}

export function buildLogsWebSocketURL(apiConfig: LogsAPIConfig, endpoint: string) {
  const { baseURL, logLevel } = apiConfig;
  const params = new URLSearchParams({
    level: logLevel,
  });

  return buildWebSocketURLBase(baseURL, params, endpoint);
}
