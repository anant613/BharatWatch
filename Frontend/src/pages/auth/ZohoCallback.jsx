import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api.js";

const ZohoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) {
      navigate("/login");
      return;
    }

    (async () => {
      const res = await api.zohoLogin(code);
      if (res.success) {
        navigate("/home");
      } else {
        navigate("/login");
      }
    })();
  }, [navigate]);

  return <p>Signing you in with Zoho...</p>;
};

export default ZohoCallback;
