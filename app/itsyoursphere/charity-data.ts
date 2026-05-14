export type LunchboxTone = "red" | "yellow" | "teal" | "cream";

export type Charity = {
  short: string;
  name: string;
  mission: string;
  url: string;
  donateUrl?: string;
  tone: LunchboxTone;
};

export const CHARITIES: Charity[] = [
  {
    short: "SHP",
    name: "Sandy Hook Promise",
    mission:
      "Founded by family members of children and educators killed at Sandy Hook Elementary. Builds youth violence-prevention programs in schools across the country so kids see the warning signs before another child becomes a name.",
    url: "https://www.sandyhookpromise.org/",
    donateUrl: "https://www.sandyhookpromise.org/donate/",
    tone: "teal",
  },
  {
    short: "EVT",
    name: "Everytown for Gun Safety",
    mission:
      "The largest gun-violence-prevention organization in the country. Out-organizes the gun lobby in statehouses and at the ballot box, funds research, supports survivors, and pushes the policy fights that make schools safer.",
    url: "https://www.everytown.org/",
    donateUrl: "https://secure.everytown.org/a/donate",
    tone: "red",
  },
  {
    short: "BDY",
    name: "Brady — United Against Gun Violence",
    mission:
      "Named for James Brady, Reagan's press secretary, who was shot and paralyzed in 1981. The longest-running national gun-violence-prevention organization, taking on the gun lobby in court, in Congress, and inside the industry itself.",
    url: "https://www.bradyunited.org/",
    donateUrl: "https://www.bradyunited.org/donate",
    tone: "cream",
  },
  {
    short: "MFL",
    name: "March For Our Lives",
    mission:
      "Founded by the surviving students of Marjory Stoneman Douglas High School after the 2018 Parkland shooting. A youth-led movement organizing voters, marches, and policy fights to end gun violence in their generation, not the next one.",
    url: "https://marchforourlives.com/",
    donateUrl: "https://marchforourlives.com/donate/",
    tone: "yellow",
  },
];
