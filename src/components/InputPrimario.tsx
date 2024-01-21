import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dispatch, SetStateAction } from "react"

interface InputPrimarioProps {
    label: string
    onChange: Dispatch<SetStateAction<string>>
}
 
export default function InputPrimario({label,onChange} : InputPrimarioProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label htmlFor="email">{label}</Label>
      <Input className="text-black" onChange={(e) => onChange(e.target.value)} type="text" id="text" placeholder={`${label}`} />
    </div>
  )
}