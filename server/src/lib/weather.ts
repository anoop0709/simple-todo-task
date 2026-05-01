import dotenv from "dotenv";
import { LocationSearchResult, Task, WeatherInfo } from "../types";
import nlp from "compromise";

dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY;
const API_BASE = process.env.WEATHER_API_BASE_URL || "http://api.weatherapi.com/v1/current.json";

function findFirstCityInText(text: string): string | undefined {
    const doc = nlp(text);
    const places = doc.places().out("array");
    return places.length ? places[0] : undefined;
}


async function fetchWeatherForCity(city: string): Promise<WeatherInfo | null> {
    if (!API_KEY) {
        return null;
    }

    try {
        const lookupUrl = `${API_BASE}?key=${API_KEY}&q=${city}&aqi=no`;
        const lookup = await fetch(lookupUrl);
        const lookupData = (await lookup.json()) as LocationSearchResult;
        const celsius = lookupData?.current?.temp_c !== undefined ? Number(lookupData.current.temp_c) : undefined;


        return {
            temperatureCelsius: Number(celsius),
        };
    } catch (error) {
        console.error("Weather lookup failed", error);
        throw new Error('weather lookup failed')
    }
}

async function enrichTask(title: string) {
    const city = findFirstCityInText(title);
    if (!city) {
        return null;
    }
    return fetchWeatherForCity(city);
}


export async function enrichTasksWithWeatherData(tasks: any[]) {
    return Promise.all(
        tasks.map(async (task) => {

            const weather = await enrichTask(task.name);

            return {
                id: task._id.toString(),
                name: task.name,
                note: weather
                    ? `${weather.temperatureCelsius} °C`
                    : task.note,
                dueDate: task.dueDate,
                tag: task.tag,
                completed: task.completed,
            }
        }));
}