// +page.ts
export async function load() {
    try {
        const response = await fetch('http://localhost:5000/pitikcats');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return { data };
    } catch (error) {
        console.error('API error:', error);
        // Return a fallback structure with an error message
        return {
            data: null,
            error: 'Oops, the data must have wandered off! Please paws and try again later.'
        };
    }
}
