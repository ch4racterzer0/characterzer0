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
    short: "NCM",
    name: "National Center for Missing & Exploited Children",
    mission:
      "The country's clearinghouse for missing-child cases. Runs the CyberTipline, the AMBER Alert system, and the 'Have You Seen Me?' poster program — 40 years of putting faces in mailboxes so the next person who sees the child knows. Recovers thousands of children every year.",
    url: "https://www.missingkids.org/",
    donateUrl: "https://www.missingkids.org/donate",
    tone: "red",
  },
  {
    short: "CHP",
    name: "The Charley Project",
    mission:
      "A one-woman publicity vehicle for over 16,500 cold-case missing persons whose stories the press forgot. No tip line, no investigation — just visibility, kept alive year after year. The closest existing site in spirit to this one.",
    url: "https://charleyproject.org/",
    tone: "cream",
  },
  {
    short: "NMU",
    name: "NamUs",
    mission:
      "The federal government's free database of missing and unidentified persons, run through the Department of Justice. Connects families, law enforcement, and medical examiners across jurisdictional lines so the John and Jane Does can find their names and the missing can find their way home.",
    url: "https://namus.nij.ojp.gov/",
    tone: "teal",
  },
  {
    short: "BMF",
    name: "Black & Missing Foundation",
    mission:
      "Founded by sisters-in-law to address the press blackout on missing Black children and adults — cases that historically receive a fraction of the coverage and a fraction of the search. Brings their faces forward, demands the same urgency, gets the AMBER alerts issued.",
    url: "https://blackandmissinginc.com/",
    donateUrl: "https://blackandmissinginc.com/donate/",
    tone: "yellow",
  },
];
