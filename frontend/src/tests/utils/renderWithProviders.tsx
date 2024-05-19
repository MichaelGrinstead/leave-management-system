import { render as testingRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "../../components/Ui/Toaster";

const queryClient = new QueryClient();

export default function render(children: React.ReactNode) {
  return testingRender(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Router>{children}</Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}
