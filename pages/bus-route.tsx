import BusRoute from "@apps/BusRoute";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BusRoute />
    </QueryClientProvider>
  );
};

export default App;
