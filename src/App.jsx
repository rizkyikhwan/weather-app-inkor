import { useEffect, useState } from "react";
import Card from "./components/Card";
import { checkIfOnlySpaces } from "./lib/utils";
import { toast, Toaster } from "sonner";
import { MdOutlineMyLocation } from "react-icons/md";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);

  const searchWeather = async (value) => {
    try {
      setIsLoading(true);

      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${
          import.meta.env.VITE_API_KEY
        }&q=${value}`
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error.message);

        return;
      }

      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlerSearch = (value) => {
    if (!checkIfOnlySpaces(value)) {
      searchWeather(value);

      setIsDisabled(false);
    }
  };

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const success = (pos) => {
    const crd = pos.coords;

    searchWeather(`${crd.latitude}, ${crd.longitude}`);
    setIsDisabled(true);
  };

  const errors = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        console.log(result);
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(success, errors, options);
        } else if (result.state === "denied") {
          toast.warning("Please allow location access.");
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    searchWeather("madrid");
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-100/25">
        <div className="w-full max-w-sm space-y-3">
          <button
            aria-label="permission-location"
            className="flex items-center p-2 ml-auto text-sm rounded-lg backdrop-blur-sm bg-cyan-400/50 disabled:opacity-75"
            disabled={isDisabled}
            onClick={() => getCurrentLocation()}
          >
            <MdOutlineMyLocation className="mr-2 text-rose-500" />
            Current Location
          </button>
          <input
            type="text"
            className="w-full p-2 border border-blue-300 rounded-xl placeholder:text-sm focus:outline-none focus:ring disabled:opacity-75"
            placeholder="Search Location"
            aria-label="search-location"
            disabled={isLoading}
            onKeyDown={(e) => {
              e.key === "Enter" && handlerSearch(e.target.value);
            }}
          />
          <Card data={data} loading={isLoading} />
        </div>
      </div>
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
