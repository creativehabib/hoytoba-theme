import { Maximize, Menu, Music, Settings} from "lucide-react";

export default function SettingIcon() {
  return (
    <div>
        <div className="flex items-center justify-end mt-3 mb-4 space-x-1 text-teal-900 font-extrabold">
              <button className="hover:text-teal-600"><Menu/></button>
              <button className="hover:text-teal-600"><Maximize/></button>
              <button className="hover:text-teal-600"><Settings/></button>
          </div>
    </div>
  )
}
