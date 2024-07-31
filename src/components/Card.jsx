import { FiWind } from "react-icons/fi";
import { HiLocationMarker } from "react-icons/hi";
import { WiHumidity } from "react-icons/wi";

const Card = ({ data, loading }) => {
  const forecastHours = loading
    ? []
    : data?.forecast?.forecastday?.[data.forecast.forecastday.length - 1].hour
        .filter(
          (item) =>
            new Date(data.location.localtime).getHours() <
            new Date(item.time).getHours()
        )
        .slice(0, 3);

  return (
    <div className="p-2 border border-blue-300 shadow rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="flex flex-col space-y-2 mt-1.5">
        <div className="flex items-start justify-between">
          <div className="flex space-x-1">
            <HiLocationMarker className="mt-1 text-white" />
            <div>
              {loading ? (
                <>
                  <div className="w-24 h-5 mb-1 rounded-md animate-pulse bg-slate-200/75" />
                  <div className="h-4 rounded-md animate-pulse w-14 bg-slate-200/75" />
                </>
              ) : (
                <>
                  <p className="text-white">{data?.location?.name}</p>
                  <p className="text-xs text-white">
                    {data?.location?.country}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="mt-1 mr-2">
            {loading ? (
              <div className="w-12 h-3 rounded-md animate-pulse bg-slate-200/75" />
            ) : (
              <p className="text-xs text-white">
                {data?.location?.localtime?.split(" ")[1]}
              </p>
            )}
          </div>
        </div>
        <div className="relative flex flex-col items-center h-32">
          {loading ? (
            <div className="w-20 h-20 mb-2 rounded-md animate-pulse bg-slate-200/75" />
          ) : (
            <img
              src={data?.current?.condition?.icon}
              alt={data?.current?.condition?.text}
              className="size-16"
            />
          )}
          {loading ? (
            <>
              <div className="h-10 mb-2 rounded-md animate-pulse w-36 bg-slate-200/75" />
              <div className="w-20 h-5 rounded-md animate-pulse bg-slate-200/75" />
            </>
          ) : (
            <>
              <h1 className="relative text-4xl font-semibold text-white">
                {data?.current?.temp_c}°c
              </h1>
              <p className="text-white">{data?.current?.condition?.text}</p>
            </>
          )}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {loading
            ? [...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-full p-2 space-y-2 rounded-2xl backdrop-blur-sm bg-white/20"
                >
                  <div className="w-8 h-8 rounded-md animate-pulse bg-slate-200/75" />
                  <div className="w-16 h-3 rounded-md animate-pulse bg-slate-200/75" />
                  <div className="animate-pulse w-14 h-2.5 rounded-md bg-slate-200/75" />
                  <div className="animate-pulse w-12 h-2.5 rounded-md bg-slate-200/75" />
                </div>
              ))
            : forecastHours?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-full p-2 rounded-2xl backdrop-blur-sm bg-white/20"
                >
                  <img
                    src={item.condition.icon}
                    alt={item.condition.text}
                    className="flex-none size-8"
                  />
                  <div>
                    <p className="text-sm font-semibold text-center text-white">
                      {item.temp_c}°c
                    </p>
                    <p className="text-[10px] text-white text-center">
                      {item.condition.text}
                    </p>
                    <p className="text-xs text-center text-white">
                      {item.time.split(" ")[1]}
                    </p>
                  </div>
                </div>
              ))}
        </div>
        <div className="flex items-center justify-between p-4 text-white rounded-2xl backdrop-blur-sm bg-white/20">
          <div className="flex justify-center space-x-1">
            <WiHumidity size={28} />
            <div>
              {loading ? (
                <div className="w-20 h-5 mb-2 rounded-md animate-pulse bg-slate-200/75" />
              ) : (
                <p className="text-sm">{data?.current?.humidity}%</p>
              )}
              <p className="text-xs">Humidity</p>
            </div>
          </div>
          <div className="flex justify-center space-x-1">
            <FiWind size={28} />
            <div>
              {loading ? (
                <div className="w-20 h-5 mb-2 rounded-md animate-pulse bg-slate-200/75" />
              ) : (
                <p className="text-sm">{data?.current?.wind_kph} Kmp/h</p>
              )}
              <p className="text-xs">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
