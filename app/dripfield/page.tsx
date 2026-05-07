import { EasyPass } from "../easy-pass";
import { DripfieldShell } from "./dripfield-shell";

export const dynamic = "force-dynamic";

export default function DripfieldPage() {
  return (
    <EasyPass>
      <DripfieldShell />
    </EasyPass>
  );
}
