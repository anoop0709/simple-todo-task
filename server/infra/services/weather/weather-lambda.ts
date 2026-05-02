type Event = {
  body: string;
};
type cityNamesInTaskMap = Record<string, string>;

export const handler = async (event: Event) => {

  const { cityNamesInTaskMap } = JSON.parse(event.body || "{}") as cityNamesInTaskMap;
  const cities = [...new Set(Object.values(cityNamesInTaskMap || {}))];

  const API_KEY = process.env.WEATHER_API_KEY;
  const API_BASE = process.env.WEATHER_API_BASE_URL || "http://api.weatherapi.com/v1/current.json";

  const cityTemperatureMap: Record<string, number> = {};

  await Promise.all(
    cities.map(async (city: string) => {
      const res = await fetch(
        `${API_BASE}?key=${API_KEY}&q=${city}&aqi=no`
      );
      const data = await res.json();
      if (res.ok) {
        cityTemperatureMap[city] = data.current.temp_c;
      }
    })
  );
  const result: Record<string, number> = {};
  for (const [taskId, city] of Object.entries(cityNamesInTaskMap || {})) {
    if (cityTemperatureMap[city]) {
      result[taskId] = cityTemperatureMap[city];
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};