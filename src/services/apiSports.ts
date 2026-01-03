import { supabase } from "@/integrations/supabase/client";

const API_KEY = import.meta.env.VITE_API_FOOTBALL_KEY;
const API_URL = "https://v3.football.api-sports.io";
const LEAGUE_ID = 6; // Africa Cup of Nations
const SEASON = 2025;

export interface ExternalMatch {
    fixture: {
        id: number;
        date: string;
        status: {
            short: string; // "FT", "NS", "1H", etc.
            long: string;
        };
    };
    teams: {
        home: { name: string; winner: boolean | null; logo: string };
        away: { name: string; winner: boolean | null; logo: string };
    };
    goals: {
        home: number | null;
        away: number | null;
    };
}

export const fetchAndSyncMatches = async () => {
    if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
        throw new Error("API Key is missing. Please set VITE_API_FOOTBALL_KEY in your .env file.");
    }

    // Debug: Check if key is loaded (don't log full key in prod)
    console.log("Using API Key:", API_KEY ? `${API_KEY.substring(0, 4)}...` : "UNDEFINED");

    try {
        let response = await fetch(`${API_URL}/fixtures?league=${LEAGUE_ID}&season=${SEASON}`, {
            method: "GET",
            headers: {
                "x-apisports-key": API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        let data = await response.json();

        const fixtures: ExternalMatch[] = data.response;

        if (!fixtures || fixtures.length === 0) {
            console.warn("No fixtures found for CAN 2025/2024.");
            // Check for API errors
            if (data.errors && Object.keys(data.errors).length > 0) {
                console.error("API Errors:", data.errors);
                return { count: 0, message: `API Error: ${JSON.stringify(data.errors)}` };
            }
            return { count: 0, message: "No matches found. Check Console for details." };
        }

        console.log(`Found ${fixtures.length} matches!`);

        // Log the first match to see structure
        if (fixtures.length > 0) {
            console.log("Sample Match:", fixtures[0]);
        }

        let updatedCount = 0;

        for (const fixture of fixtures) {
            // Here we would map the API data to our DB.
            // Since mapping teams by name can be tricky, for now we will just log what we found
            // or try to match by approximate date/stage if possible.

            // For this V1 implementation, let's just log the connection success.
            console.log(`Found match: ${fixture.teams.home.name} vs ${fixture.teams.away.name} (${fixture.goals.home}-${fixture.goals.away})`);
        }

        // In a real implementation we would do:
        // await supabase.from('matches').upsert(...)

        return { count: fixtures.length, message: `Successfully connected! Found ${fixtures.length} matches.` };

    } catch (error) {
        console.error("Sync Error:", error);
        throw error;
    }
};
