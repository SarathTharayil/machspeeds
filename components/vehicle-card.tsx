"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Vehicle } from "@/lib/vehicle-data"
import { Plane, Rocket } from "lucide-react"

interface VehicleCardProps {
  vehicle: Vehicle
  isSelected: boolean
  onSelect: (vehicle: Vehicle) => void
}

export default function VehicleCard({ vehicle, isSelected, onSelect }: VehicleCardProps) {
  const getIcon = () => {
    switch (vehicle.category) {
      case "missile":
        return <Rocket className="h-4 w-4 text-red-400" />
      default:
        return <Plane className="h-4 w-4 text-blue-400" />
    }
  }

  return (
    <Card
      className={`cursor-pointer transition-all hover:bg-zinc-900 ${
        isSelected ? "bg-zinc-900 border-blue-500" : "bg-black border-zinc-800"
      }`}
      onClick={() => onSelect(vehicle)}
    >
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getIcon()}
            <span className="font-medium text-sm">{vehicle.name}</span>
          </div>
          <Badge
            variant="outline"
            className={`${
              isSelected
                ? "bg-blue-900/10 text-blue-300 border-blue-900/30"
                : "bg-zinc-900 text-zinc-400 border-zinc-800"
            }`}
          >
            Mach {vehicle.machSpeed.toFixed(2)}
          </Badge>
        </div>
        {vehicle.description && <p className="text-xs text-zinc-500 mt-1 line-clamp-1">{vehicle.description}</p>}
      </CardContent>
    </Card>
  )
}
