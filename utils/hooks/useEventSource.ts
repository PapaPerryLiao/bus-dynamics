import { useEffect } from "react";

type params = {
  url: string;
  onMessage: Function;
  onError?: Function;
};

const useEventSource = ({ url, onMessage, onError }: params) => {
  useEffect(() => {
    const eventSource = new EventSource(url, {
      withCredentials: true,
    });
    eventSource.onmessage = function (event) {
      onMessage(event);
    };
    eventSource.onerror = function (event: any) {
      onError && onError(event);
      eventSource.close();
    };
    eventSource.addEventListener("close", () => eventSource.close());

    return () => eventSource.close();
  }, [url]);
};

export default useEventSource;
