import { GiphyFetch } from '@giphy/js-fetch-api';
import { useState, useEffect } from 'react';

const gf = new GiphyFetch('Ylam4BOGZgLw2EoOU0e0my6EhTbfvmC0'); //i know

export const GetGiphyData = (limit = 24) => {
    const [gifs, setGifs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { data: fetchedGifs } = await gf.trending({ limit });
                setGifs(fetchedGifs);
            } catch (error) {
                console.error('Error fetching Data from Giphy API:', error);
                setError('Failed to fetch GIFs');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [limit]);

    return { gifs, isLoading, error };
};