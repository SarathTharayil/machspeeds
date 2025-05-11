"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import type { Vehicle } from "@/lib/vehicle-data"

interface MapViewProps {
  startLocation: [number, number]
  endLocation: [number, number]
  selectedVehicle: Vehicle | null
  onMapClick: (location: [number, number], type: "start" | "end") => void
  clickMode: "start" | "end"
  setClickMode: (mode: "start" | "end") => void
}

export default function MapView({
  startLocation,
  endLocation,
  selectedVehicle,
  onMapClick,
  clickMode,
  setClickMode,
}: MapViewProps) {
  // Add this validation function at the top of the component, right after the props destructuring
  const isValidLatLng = (coords: [number, number]): boolean => {
    return (
      Array.isArray(coords) &&
      coords.length === 2 &&
      !isNaN(coords[0]) &&
      !isNaN(coords[1]) &&
      coords[0] >= -90 &&
      coords[0] <= 90 &&
      coords[1] >= -180 &&
      coords[1] <= 180
    )
  }
  const mapRef = useRef<L.Map | null>(null)
  const tileLayerRef = useRef<L.TileLayer | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const [isMapReady, setIsMapReady] = useState(false)

  // Initialize map only once when component mounts
  useEffect(() => {
    // Prevent multiple initializations
    if (mapRef.current) return

    // Wait for next tick to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!mapContainerRef.current) return

      try {
        // Create map instance with continuous world wrapping
        const map = L.map(mapContainerRef.current, {
          worldCopyJump: true,
          minZoom: 1,
          zoomControl: false,
          attributionControl: false,
          // Remove maxBounds to allow continuous scrolling
        }).setView([20, 0], 2)

        // Add tile layer and store reference - remove noWrap to allow continuous world
        tileLayerRef.current = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom: 19,
        }).addTo(map)

        // Add controls
        L.control.zoom({ position: "bottomright" }).addTo(map)
        L.control
          .attribution({
            position: "bottomleft",
            prefix: false,
          })
          .addTo(map)

        // Add click handler
        map.on("click", (e) => {
          const { lat, lng } = e.latlng
          const currentMode = clickMode
          console.log(`Map clicked in ${currentMode} mode at:`, [lat, lng])

          // Call the parent's click handler with the current mode
          onMapClick([lat, lng], currentMode)

          // Toggle click mode after setting a point
          setClickMode(currentMode === "start" ? "end" : "start")
        })

        // Store map reference
        mapRef.current = map

        // Mark map as ready after a short delay to ensure it's fully initialized
        setTimeout(() => {
          setIsMapReady(true)
        }, 500)
      } catch (error) {
        console.error("Error initializing map:", error)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
        tileLayerRef.current = null
        setIsMapReady(false)
      }
    }
  }, [])

  // Update click mode indicator
  useEffect(() => {
    if (!mapRef.current || !isMapReady) return

    try {
      // Remove existing control if it exists
      const existingControl = document.querySelector(".click-mode-control")
      if (existingControl) {
        existingControl.remove()
      }

      // Create new control
      const clickModeControl = L.control({ position: "topright" })
      clickModeControl.onAdd = () => {
        const div = L.DomUtil.create("div", "click-mode-control")
        div.innerHTML = `
          <div class="bg-black/80 text-white px-3 py-2 rounded-md text-sm shadow-lg border border-zinc-700">
            Click to set: <span class="font-bold ${
              clickMode === "start" ? "text-green-400" : "text-red-400"
            }">${clickMode === "start" ? "Starting Point" : "Destination"}</span>
          </div>
        `
        return div
      }
      clickModeControl.addTo(mapRef.current)
    } catch (error) {
      console.error("Error updating click mode indicator:", error)
    }
  }, [clickMode, isMapReady])

  // Update markers and path when locations or vehicle changes
  useEffect(() => {
    if (!mapRef.current || !isMapReady) return

    try {
      // Validate coordinates before proceeding
      if (!isValidLatLng(startLocation) || !isValidLatLng(endLocation)) {
        console.error("Invalid coordinates:", { startLocation, endLocation })
        return
      }

      // Clear existing markers and paths but keep the tile layer
      mapRef.current.eachLayer((layer) => {
        if (layer !== tileLayerRef.current && !(layer instanceof L.Control.Attribution)) {
          mapRef.current?.removeLayer(layer)
        }
      })

      // Add start marker
      const startIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-8 h-8">
                <div class="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <div class="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>`,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      L.marker(startLocation, { icon: startIcon })
        .addTo(mapRef.current)
        .bindPopup(
          `<div class="text-center">
            <b>Starting Point</b><br>
            <span class="text-xs">${startLocation[0].toFixed(4)}, ${startLocation[1].toFixed(4)}</span>
          </div>`,
        )

      // Add end marker
      const endIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-8 h-8">
                <div class="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <div class="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>`,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      L.marker(endLocation, { icon: endIcon })
        .addTo(mapRef.current)
        .bindPopup(
          `<div class="text-center">
            <b>Destination</b><br>
            <span class="text-xs">${endLocation[0].toFixed(4)}, ${endLocation[1].toFixed(4)}</span>
          </div>`,
        )

      // Draw straight path instead of curved
      const pathColor = selectedVehicle ? "#3b82f6" : "#94a3b8"
      L.polyline([startLocation, endLocation], {
        color: pathColor,
        weight: 3,
        opacity: 0.8,
        dashArray: "6, 12",
        lineCap: "round",
      }).addTo(mapRef.current)

      // Add vehicle info if selected
      if (selectedVehicle) {
        // Add speed label at midpoint
        const midLat = (startLocation[0] + endLocation[0]) / 2
        const midLng = (startLocation[1] + endLocation[1]) / 2

        if (!isNaN(midLat) && !isNaN(midLng)) {
          const pathLabel = L.divIcon({
            html: `<div class="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-full shadow-lg border border-blue-400">
                    Mach ${selectedVehicle.machSpeed.toFixed(1)}
                  </div>`,
            className: "",
            iconSize: [80, 24],
            iconAnchor: [40, 12],
          })

          L.marker([midLat, midLng], { icon: pathLabel }).addTo(mapRef.current)
        }

        // Add distance marker
        const distancePoint = getPointAtDistance(startLocation, endLocation, 0.3)
        if (isValidLatLng(distancePoint)) {
          const distance = calculateDistance(startLocation[0], startLocation[1], endLocation[0], endLocation[1])

          const distanceLabel = L.divIcon({
            html: `<div class="px-2 py-1 bg-black/80 text-white text-xs rounded shadow border border-zinc-700">
                    ${distance.toFixed(0)} km
                  </div>`,
            className: "",
            iconSize: [60, 20],
            iconAnchor: [30, 10],
          })

          L.marker(distancePoint, { icon: distanceLabel }).addTo(mapRef.current)
        }
      }

      // Fit bounds safely
      try {
        const bounds = L.latLngBounds([startLocation, endLocation])
        if (bounds.isValid()) {
          mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 6 })
        }
      } catch (error) {
        console.error("Error fitting bounds:", error)
      }
    } catch (error) {
      console.error("Error updating map markers:", error)
    }
  }, [startLocation, endLocation, selectedVehicle, isMapReady])

  // Helper functions
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c // Distance in km
  }

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180)
  }

  const getPointAtDistance = (start: [number, number], end: [number, number], fraction: number): [number, number] => {
    return [start[0] + (end[0] - start[0]) * fraction, start[1] + (end[1] - start[1]) * fraction]
  }

  return <div ref={mapContainerRef} className="h-full w-full" style={{ minHeight: "400px", position: "relative" }} />
}
