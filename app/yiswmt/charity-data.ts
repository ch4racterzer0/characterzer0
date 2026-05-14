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
    short: "CFP",
    name: "Children of Fallen Patriots Foundation",
    mission:
      "College and trade-school scholarships, educational counseling, and career support for military children who lost a parent in the line of duty. Vision: every child of the fallen graduates debt-free.",
    url: "https://fallenpatriots.org/",
    donateUrl: "https://fallenpatriots.org/donate/?campaign=721104",
    tone: "red",
  },
  {
    short: "SOWF",
    name: "Special Operations Warrior Foundation",
    mission:
      "Full college tuition, family services, and lifelong grief support for the surviving children of fallen or seriously wounded U.S. special operations personnel. From kindergarten through the day they graduate.",
    url: "https://specialops.org/",
    donateUrl: "https://specialops.org/donate/",
    tone: "teal",
  },
  {
    short: "SBX",
    name: "Snowball Express — Gary Sinise Foundation",
    mission:
      "Year-round programs and retreats for the children and surviving spouses of fallen military and first-responder heroes. Connection, community, and remembrance so no Gold Star family carries the loss alone.",
    url: "https://www.garysinisefoundation.org/programs/honoring-families-of-fallen-heroes/",
    donateUrl: "https://www.garysinisefoundation.org/donate",
    tone: "yellow",
  },
  {
    short: "ASC",
    name: "A Soldier's Child Foundation",
    mission:
      "Birthday celebrations every year until age 18, an annual summer camp, and college scholarships for the children of active-duty military who gave their lives in service to the United States.",
    url: "https://asoldierschild.org/",
    donateUrl: "https://asoldierschild.org/donate/",
    tone: "cream",
  },
];
