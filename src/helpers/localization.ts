import { useEffect, useState } from "react";
import axios from "axios";

const useUserCountry = () => {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://ipapi.co/json/")
      .then((res) => {
        setCountry(res.data.country_name);
      })
      .catch((err) => {
        console.error("Error al obtener la ubicación:", err);
      });
  }, []);

  return country;
};

export default useUserCountry;
