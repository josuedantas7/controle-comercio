import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dispatch, SetStateAction } from "react"

interface InputPrimarioProps {
    label: string
    onChange: Dispatch<SetStateAction<string>>
}
 
export default function InputPrimario({label,onChange} : InputPrimarioProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">{label}</Label>
      <Input onChange={(e) => onChange(e.target.value)} type="email" id="email" placeholder={`${label}`} />
    </div>
  )
}