// src/utils/useUserLocationSync.ts
import { useEffect, useRef } from 'react';
import { getUser, getToken } from '../app/context/auth';

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8080/graphql';

export function useUserLocationSync() {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const user = getUser();
    if (!user || !user.id) return;

    const updateLocation = () => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const mutation = `mutation UpdateUserLocation($userId: ID!, $latitude: Float!, $longitude: Float!) {\n  updateUserLocation(userId: $userId, latitude: $latitude, longitude: $longitude)\n}`;
        const variables = { userId: user.id, latitude, longitude };
        await fetch(GRAPHQL_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify({ query: mutation, variables })
        });
      });
    };

    // Initial update
    updateLocation();
    // Every 15 minutes
    intervalRef.current = setInterval(updateLocation, 15 * 60 * 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
}
