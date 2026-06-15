export async function getMovies() {
    try {
        const response = await fetch("data/movies.json");

        if (!response.ok) {
            throw new Error("Failed to load movie data");
        }

        return await response.json();

    } catch (error) {
        console.error("Movie data error:", error);
        return [];
    }
}