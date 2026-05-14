export type Charity = {
  short: string;
  name: string;
  mission: string;
  url: string;
  donateUrl?: string;
};

export const CHARITIES: Charity[] = [
  {
    short: "WWP",
    name: "Wounded Warrior Project",
    mission:
      "Direct programs and services for post-9/11 wounded service members — mental health, physical rehab, peer support, career counseling, and family support.",
    url: "https://www.woundedwarriorproject.org/",
    donateUrl: "https://www.woundedwarriorproject.org/donate",
  },
  {
    short: "FOH",
    name: "Folds of Honor",
    mission:
      "Educational scholarships for the spouses and children of America's fallen and disabled service members. The legacy of those who gave continues through the next generation.",
    url: "https://foldsofhonor.org/",
    donateUrl: "https://foldsofhonor.org/donate/",
  },
  {
    short: "SSS",
    name: "Stop Soldier Suicide",
    mission:
      "The first veteran-founded, veteran-led suicide prevention nonprofit. Crisis intervention, peer support, and data-driven outreach for service members at risk.",
    url: "https://stopsoldiersuicide.org/",
    donateUrl: "https://stopsoldiersuicide.org/donate",
  },
  {
    short: "CFSRF",
    name: "Children of Fallen Soldiers Relief Fund",
    mission:
      "Financial assistance and college grants for the children and surviving spouses of military service members killed or disabled in combat.",
    url: "https://www.cfsrf.org/",
    donateUrl: "https://www.cfsrf.org/donate",
  },
];
