"use client";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
    locationName: string;
}

const LocationMap = ({ locationName }: Props) => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&countrycodes=bd&q=${encodeURIComponent(
                        locationName
                    )}`
                );
                const data = await res.json();
                if (data?.[0]) {
                    setPosition([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
                } else {
                    console.warn("No location found for:", locationName);
                }
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        };
        fetchCoordinates();
    }, [locationName]);

    const customIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -30],
    });

    if (!position) return <p className="text-gray-500">Loading map...</p>;

    return (
        <MapContainer
            center={position}
            zoom={11}
            scrollWheelZoom={false}
            className="h-64 w-full rounded-xl overflow-hidden z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
                <Popup>{locationName}</Popup>
                <Tooltip
                    direction="top"
                    offset={[0, -25]}
                    opacity={1}
                    permanent
                    className="bg-white text-black px-2 py-1 rounded-md shadow-md font-semibold text-sm"
                >
                    {locationName}
                </Tooltip>
            </Marker>
        </MapContainer>
    );
};

export default LocationMap;
