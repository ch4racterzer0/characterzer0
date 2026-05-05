import { Gate } from "../../madhu/gate";
import { WarRoomShell } from "./war-room-shell";

export default function GatedMadhu() {
  return (
    <Gate>
      <WarRoomShell />
    </Gate>
  );
}
