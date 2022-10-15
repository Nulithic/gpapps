import { useState, useEffect, StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import axios from "axios";

import { AuthProvider } from "@/auth/context";
import Router from "@/pages/routes";

const App = () => {
  return (
    <AuthProvider>
      <Router />
      <Toaster position="bottom-left" reverseOrder={false} />
    </AuthProvider>
  );
};

export default App;
