import BusNearBy from "@apps/BusNearby";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BusNearBy />
    </QueryClientProvider>
  );
};

export default App;
