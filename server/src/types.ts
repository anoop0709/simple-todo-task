export const Tag = {
    URGENT: "URGENT",
    NOT_URGENT: "NOT_URGENT",
    HIGH: "HIGH",
    MEDIUM: "MEDIUM",
    LOW: "LOW",
} as const;

export type Tag = (typeof Tag)[keyof typeof Tag];

export type Task = {
    id?: string;
    name: string;
    dueDate?: string;
    tag?: Tag | undefined;
    note?: string | null;
    completed?: boolean;
};

export interface UserRecord {
    email: string;
    name: string;
    password: string;
}

export interface WeatherInfo {
    temperatureCelsius?: number;
}

export interface LocationSearchResult {
    current?: {
        temp_c?: number;
    }
}