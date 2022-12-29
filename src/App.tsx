import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/auth/context";
import Permission from "@/auth/permission";
import Router from "@/pages/routes";

const App = () => {
  return (
    <AuthProvider>
      <Permission>
        <Router />
        <Toaster position="bottom-left" reverseOrder={false} />
      </Permission>
    </AuthProvider>
  );
};

export default App;
