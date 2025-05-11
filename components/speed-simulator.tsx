"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Rocket,
  Timer,
  MapPin,
  Info,
  Zap,
  Plane,
  BookOpen,
  MapPinned,
  Navigation,
  ArrowRight,
  Clock,
  Globe,
} from "lucide-react"
import MapView from "@/components/map-view"
import VehicleCard from "@/components/vehicle-card"
import { missiles, fighterJets, bombers, commercialPlanes, type Vehicle } from "@/lib/vehicle-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SpeedSimulator() {
  const [selectedCategory, setSelectedCategory] = useState<string>("missiles")
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null)
  const [startLocation, setStartLocation] = useState<[number, number]>([9.9312, 76.2673]) // Kochi, Kerala
  const [endLocation, setEndLocation] = useState<[number, number]>([39.9042, 116.4074]) // Beijing, China
  const [distance, setDistance] = useState<number>(0)
  const [travelTime, setTravelTime] = useState<number>(0)
  const [comparisonVehicles, setComparisonVehicles] = useState<Vehicle[]>([])
  const [startCity, setStartCity] = useState<string>("Kochi, Kerala, India")
  const [endCity, setEndCity] = useState<string>("Beijing, China")
  const [clickMode, setClickMode] = useState<"start" | "end">("start")

  // City database with coordinates
  const cities = [
    { name: "New York, USA", coords: [40.7128, -74.006] },
    { name: "Los Angeles, USA", coords: [34.0522, -118.2437] },
    { name: "London, UK", coords: [51.5074, -0.1278] },
    { name: "Paris, France", coords: [48.8566, 2.3522] },
    { name: "Tokyo, Japan", coords: [35.6762, 139.6503] },
    { name: "Sydney, Australia", coords: [-33.8688, 151.2093] },
    { name: "Moscow, Russia", coords: [55.7558, 37.6173] },
    { name: "Mexico City, Mexico", coords: [19.4326, -99.1332] },
    { name: "Rio de Janeiro, Brazil", coords: [-22.9068, -43.1729] },
    { name: "Singapore", coords: [1.3521, 103.8198] },
    { name: "Dubai, UAE", coords: [25.2048, 55.2708] },
    { name: "Nairobi, Kenya", coords: [-1.2921, 36.8219] },
    { name: "Cairo, Egypt", coords: [30.0444, 31.2357] },
    { name: "Beijing, China", coords: [39.9042, 116.4074] },
    { name: "Mumbai, India", coords: [19.076, 72.8777] },
    { name: "Berlin, Germany", coords: [52.52, 13.405] },
    { name: "Toronto, Canada", coords: [43.6532, -79.3832] },
    { name: "Seoul, South Korea", coords: [37.5665, 126.978] },
    { name: "Cape Town, South Africa", coords: [-33.9249, 18.4241] },
    { name: "Buenos Aires, Argentina", coords: [-34.6037, -58.3816] },
    { name: "Istanbul, Turkey", coords: [41.0082, 28.9784] },
    { name: "Rome, Italy", coords: [41.9028, 12.4964] },
    { name: "Bangkok, Thailand", coords: [13.7563, 100.5018] },
    { name: "Auckland, New Zealand", coords: [-36.8509, 174.7645] },
    { name: "Stockholm, Sweden", coords: [59.3293, 18.0686] },
    { name: "Kochi, Kerala, India", coords: [9.9312, 76.2673] },
    { name: "Shanghai, China", coords: [31.2304, 121.4737] },
    { name: "Hong Kong", coords: [22.3193, 114.1694] },
    { name: "San Francisco, USA", coords: [37.7749, -122.4194] },
    { name: "Vancouver, Canada", coords: [49.2827, -123.1207] },
    { name: "Madrid, Spain", coords: [40.4168, -3.7038] },
    { name: "Amsterdam, Netherlands", coords: [52.3676, 4.9041] },
    { name: "Vienna, Austria", coords: [48.2082, 16.3738] },
    { name: "Helsinki, Finland", coords: [60.1699, 24.9384] },
    { name: "Oslo, Norway", coords: [59.9139, 10.7522] },
    { name: "Warsaw, Poland", coords: [52.2297, 21.0122] },
    { name: "Prague, Czech Republic", coords: [50.0755, 14.4378] },
    { name: "Budapest, Hungary", coords: [47.4979, 19.0402] },
    { name: "Athens, Greece", coords: [37.9838, 23.7275] },
    { name: "Lisbon, Portugal", coords: [38.7223, -9.1393] },
  ]

  // Get vehicles based on selected category
  const getVehiclesByCategory = () => {
    switch (selectedCategory) {
      case "missiles":
        return missiles
      case "fighterJets":
        return fighterJets
      case "bombers":
        return bombers
      case "commercialPlanes":
        return commercialPlanes
      default:
        return missiles
    }
  }

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1)
    const dLon = deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c // Distance in km
    return distance
  }

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180)
  }

  // Find nearest city to coordinates
  const findNearestCity = (lat: number, lng: number): string => {
    let nearestCity = ""
    let minDistance = Number.MAX_VALUE

    cities.forEach((city) => {
      const distance = calculateDistance(lat, lng, city.coords[0], city.coords[1])
      if (distance < minDistance) {
        minDistance = distance
        nearestCity = city.name
      }
    })

    if (minDistance > 500) {
      // If no city is within 500km, just return coordinates
      return `Unknown Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
    }

    return nearestCity
  }

  // Calculate travel time based on vehicle speed and distance
  const calculateTravelTime = () => {
    if (!selectedVehicle) return

    // Calculate distance between start and end locations
    const calculatedDistance = calculateDistance(startLocation[0], startLocation[1], endLocation[0], endLocation[1])

    setDistance(calculatedDistance)

    // Convert Mach speed to km/h (Mach 1 ≈ 1235 km/h at sea level)
    const speedKmh = selectedVehicle.machSpeed * 1235

    // Calculate time in hours
    const timeHours = calculatedDistance / speedKmh

    setTravelTime(timeHours)

    // Generate comparison vehicles
    generateComparisons()
  }

  // Generate comparison vehicles of the same type
  const generateComparisons = () => {
    if (!selectedVehicle) return

    // Get vehicles of the same category
    let categoryVehicles: Vehicle[] = []
    switch (selectedVehicle.category) {
      case "missile":
        categoryVehicles = missiles
        break
      case "fighter":
        categoryVehicles = fighterJets
        break
      case "bomber":
        categoryVehicles = bombers
        break
      case "commercial":
        categoryVehicles = commercialPlanes
        break
    }

    // Filter out the selected vehicle and take the top 3
    const comparisons = categoryVehicles.filter((vehicle) => vehicle.name !== selectedVehicle.name).slice(0, 3)

    setComparisonVehicles(comparisons)
  }

  // Handle vehicle selection
  const handleVehicleSelect = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle)
  }

  // Handle map click for setting locations
  const handleMapClick = (location: [number, number], type: "start" | "end") => {
    console.log(`Setting ${type} location to:`, location)

    if (type === "start") {
      setStartLocation(location)
      const nearestCity = findNearestCity(location[0], location[1])
      setStartCity(nearestCity)
    } else if (type === "end") {
      setEndLocation(location)
      const nearestCity = findNearestCity(location[0], location[1])
      setEndCity(nearestCity)
    }
  }

  // Handle city selection from dropdown
  const handleCitySelect = (cityName: string, type: "start" | "end") => {
    const city = cities.find((c) => c.name === cityName)
    if (city) {
      if (type === "start") {
        setStartLocation(city.coords)
        setStartCity(city.name)
      } else {
        setEndLocation(city.coords)
        setEndCity(city.name)
      }
    }
  }

  // Update calculations when vehicle or locations change
  useEffect(() => {
    if (selectedVehicle) {
      calculateTravelTime()
    }
  }, [selectedVehicle, startLocation, endLocation])

  // Format time to hours, minutes, seconds
  const formatTime = (timeInHours: number): string => {
    const hours = Math.floor(timeInHours)
    const minutes = Math.floor((timeInHours - hours) * 60)
    const seconds = Math.floor(((timeInHours - hours) * 60 - minutes) * 60)

    return `${hours}h ${minutes}m ${seconds}s`
  }

  // Toggle click mode manually
  const toggleClickMode = () => {
    setClickMode(clickMode === "start" ? "end" : "start")
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Row 1: Map */}
      <Card className="bg-black border-zinc-800">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <Navigation className="mr-2 h-5 w-5 text-blue-400" />
              Route Map
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleClickMode}
              className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800"
            >
              <span className={clickMode === "start" ? "text-green-400" : "text-red-400"}>
                Setting: {clickMode === "start" ? "Start Point" : "Destination"}
              </span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-zinc-500 mb-2">Click on the map to set starting and destination points</div>

          <div className="h-[400px] bg-zinc-900 rounded-lg overflow-hidden">
            <MapView
              startLocation={startLocation}
              endLocation={endLocation}
              selectedVehicle={selectedVehicle}
              onMapClick={handleMapClick}
              clickMode={clickMode}
              setClickMode={setClickMode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Row 2: Estimated Travel Time (Prominent) */}
      {selectedVehicle && (
        <Card className="bg-black border-blue-900/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="bg-blue-600 text-white p-4 rounded-full mr-6">
                  <Clock className="h-8 w-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Estimated Travel Time</h2>
                  <p className="text-zinc-400">
                    From {startCity} to {endCity}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="text-3xl font-bold text-white mb-1">{formatTime(travelTime)}</div>
                <div className="flex items-center text-zinc-400">
                  <span className="mr-2">Distance: {distance.toFixed(0)} km</span>
                  <span className="mx-2">|</span>
                  <span>Speed: Mach {selectedVehicle.machSpeed.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Row 3: Vehicle Selection (Moved up as requested) */}
      <Card className="bg-black border-zinc-800">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Rocket className="mr-2 h-5 w-5 text-blue-400" />
            Select Vehicle
          </h2>

          <Tabs defaultValue="missiles" onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-4 mb-4 bg-zinc-900 border border-zinc-800">
              <TabsTrigger value="missiles">Missiles</TabsTrigger>
              <TabsTrigger value="fighterJets">Fighters</TabsTrigger>
              <TabsTrigger value="bombers">Bombers</TabsTrigger>
              <TabsTrigger value="commercialPlanes">Commercial</TabsTrigger>
            </TabsList>

            <TabsContent value="missiles" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-2">
                {missiles.map((missile) => (
                  <VehicleCard
                    key={missile.name}
                    vehicle={missile}
                    isSelected={selectedVehicle?.name === missile.name}
                    onSelect={handleVehicleSelect}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fighterJets" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-2">
                {fighterJets.map((jet) => (
                  <VehicleCard
                    key={jet.name}
                    vehicle={jet}
                    isSelected={selectedVehicle?.name === jet.name}
                    onSelect={handleVehicleSelect}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bombers" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-2">
                {bombers.map((bomber) => (
                  <VehicleCard
                    key={bomber.name}
                    vehicle={bomber}
                    isSelected={selectedVehicle?.name === bomber.name}
                    onSelect={handleVehicleSelect}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="commercialPlanes" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto pr-2">
                {commercialPlanes.map((plane) => (
                  <VehicleCard
                    key={plane.name}
                    vehicle={plane}
                    isSelected={selectedVehicle?.name === plane.name}
                    onSelect={handleVehicleSelect}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Row 4: Location Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Starting Point Card */}
        <Card className="bg-black border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-3 flex items-center">
              <MapPin className="mr-2 h-4 w-4 text-green-400" />
              Starting Point
            </h2>

            <div className="space-y-3">
              <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-zinc-500">Latitude:</div>
                  <div className="font-mono text-sm">{startLocation[0].toFixed(4)}°</div>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-zinc-500">Longitude:</div>
                  <div className="font-mono text-sm">{startLocation[1].toFixed(4)}°</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-zinc-500">Nearest City:</div>
                  <div className="text-sm">{startCity}</div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Select onValueChange={(value) => handleCitySelect(value, "start")}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800">
                    <Globe className="mr-2 h-4 w-4 text-green-400" />
                    <SelectValue placeholder="Select a starting location" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {cities.map((city) => (
                      <SelectItem key={`start-${city.name}`} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
                  onClick={() => setClickMode("start")}
                >
                  <MapPin className="mr-2 h-4 w-4 text-green-400" />
                  Set New Starting Point
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Destination Card */}
        <Card className="bg-black border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-3 flex items-center">
              <MapPinned className="mr-2 h-4 w-4 text-red-400" />
              Destination
            </h2>

            <div className="space-y-3">
              <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-zinc-500">Latitude:</div>
                  <div className="font-mono text-sm">{endLocation[0].toFixed(4)}°</div>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <div className="text-xs text-zinc-500">Longitude:</div>
                  <div className="font-mono text-sm">{endLocation[1].toFixed(4)}°</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-xs text-zinc-500">Nearest City:</div>
                  <div className="text-sm">{endCity}</div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Select onValueChange={(value) => handleCitySelect(value, "end")}>
                  <SelectTrigger className="bg-zinc-900 border-zinc-800">
                    <Globe className="mr-2 h-4 w-4 text-red-400" />
                    <SelectValue placeholder="Select a destination" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {cities.map((city) => (
                      <SelectItem key={`end-${city.name}`} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-zinc-900 border-zinc-800 hover:bg-zinc-800"
                  onClick={() => setClickMode("end")}
                >
                  <MapPinned className="mr-2 h-4 w-4 text-red-400" />
                  Set New Destination
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Travel Details Card */}
        <Card className="bg-black border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-3 flex items-center">
              <Timer className="mr-2 h-4 w-4 text-blue-400" />
              Travel Details
            </h2>

            {selectedVehicle ? (
              <div className="space-y-3">
                <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-zinc-500">Vehicle:</div>
                    <div className="font-bold">{selectedVehicle.name}</div>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-zinc-500">Speed:</div>
                    <div className="font-bold">Mach {selectedVehicle.machSpeed.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-zinc-500">Equivalent:</div>
                    <div className="font-bold">{(selectedVehicle.machSpeed * 1235).toFixed(0)} km/h</div>
                  </div>
                </div>

                <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-xs text-zinc-500">Distance:</div>
                    <div className="font-bold">{distance.toFixed(0)} km</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-zinc-500">Flight Path:</div>
                    <div className="font-bold">Direct</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-zinc-500">
                <Plane className="h-8 w-8 mb-2 opacity-30" />
                <p className="text-sm">Select a vehicle to see details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Row 5: Comparisons and Vehicle Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparisons */}
        <Card className="bg-black border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-yellow-400" />
              Comparisons
            </h2>

            {selectedVehicle ? (
              <>
                <div className="mb-3 text-sm text-zinc-400">Comparing with other {selectedVehicle.category}s:</div>

                <div className="space-y-3">
                  {comparisonVehicles.length > 0 ? (
                    comparisonVehicles.map((vehicle) => (
                      <div key={vehicle.name} className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                        <div className="flex justify-between items-center">
                          <div className="text-sm">{vehicle.name}</div>
                          <Badge variant="outline" className="bg-blue-900/10 text-blue-300 border-blue-900/30">
                            Mach {vehicle.machSpeed.toFixed(2)}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-1 text-xs text-zinc-400">
                          <div>Travel time:</div>
                          <div>{formatTime(distance / (vehicle.machSpeed * 1235))}</div>
                        </div>
                        <div className="mt-2 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{
                              width: `${Math.min(100, (vehicle.machSpeed / selectedVehicle.machSpeed) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-zinc-500">
                      No other {selectedVehicle.category}s available for comparison
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-zinc-500">
                <Zap className="h-12 w-12 mb-3 opacity-30" />
                <p>Select a vehicle to see comparisons</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Vehicle Details */}
        <Card className="bg-black border-zinc-800">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-blue-400" />
              Vehicle Details
            </h2>

            {selectedVehicle ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{selectedVehicle.name}</h3>
                  <Badge variant="outline" className="bg-blue-900/10 text-blue-300 border-blue-900/30">
                    {selectedVehicle.category.charAt(0).toUpperCase() + selectedVehicle.category.slice(1)}
                  </Badge>
                </div>

                <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-zinc-400">Maximum Speed:</div>
                    <div className="font-bold">Mach {selectedVehicle.machSpeed.toFixed(2)}</div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-zinc-400">Equivalent:</div>
                    <div className="font-bold">{(selectedVehicle.machSpeed * 1235).toFixed(0)} km/h</div>
                  </div>
                </div>

                <div className="bg-zinc-900/70 p-4 rounded-lg border border-zinc-800">
                  <h4 className="text-sm font-semibold mb-2 text-zinc-300">Description</h4>
                  <p className="text-sm text-zinc-400">{selectedVehicle.description}</p>
                </div>

                {selectedVehicle.details && (
                  <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 max-h-[200px] overflow-y-auto">
                    <h4 className="text-sm font-semibold mb-2 text-zinc-300">Additional Information</h4>
                    <p className="text-sm text-zinc-400">{selectedVehicle.details}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-zinc-500">
                <Info className="h-12 w-12 mb-3 opacity-30" />
                <p>Select a vehicle to see detailed information</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
