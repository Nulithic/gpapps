import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/auth/context";
import Permission from "@/auth/permission";
import Router from "@/pages/routes";

const App = () => {
  return (
    <AuthProvider>
      <Permission>
        <Router />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            className: "bg-neutral text-white",
          }}
        />
      </Permission>
    </AuthProvider>
  );
};

export default App;
