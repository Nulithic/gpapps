import { useState, useEffect, StrictMode } from "react";
import axios from "axios";

import { AuthProvider } from "@/auth/context";
import Router from "@/pages/routes";

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
