import { AxiosInstance, InternalAxiosRequestConfig } from "axios";

interface RequestConfig extends InternalAxiosRequestConfig {
  metadata?: { skipHeaderAdd?: boolean; startTime?: number };
}

export function addAuthInterceptor(instance: AxiosInstance) {
  instance.interceptors.request.use(
    async function addHeaders(config: InternalAxiosRequestConfig) {
      const configWithMetadata = config as RequestConfig;
      const { metadata } = configWithMetadata;
      configWithMetadata.metadata = { ...metadata, startTime: Date.now() };
      if (configWithMetadata.metadata.skipHeaderAdd) {
        return config;
      }

      return config;
    },
    function onError(error: unknown) {
      return Promise.reject(error);
    }
  );
}
