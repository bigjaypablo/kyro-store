// Demo portraits from randomuser.me. Format: "women/NN" or "men/NN" (NN from 0 to 99).
const map: Record<string, string> = {
  "Sara Adams": "women/44",
  "Daniel Okoye": "men/75",
  "Albert Banks": "men/32",
  "Joy Martins": "women/65",
  "Tunde Bello": "men/52",
  "Grace Obi": "women/26",
  "Mike Turner": "men/46",
  "Amara Nwosu": "women/79",
  "Leo Grant": "men/22",
  "Hannah Cole": "women/12",
};

export const avatarFor = (name: string) =>
  map[name] ? `https://randomuser.me/api/portraits/${map[name]}.jpg` : "";
