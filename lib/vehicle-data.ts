export interface Vehicle {
  name: string
  category: "missile" | "fighter" | "bomber" | "commercial"
  machSpeed: number
  description?: string
  imageUrl?: string
  details?: string
}

// Function to sort vehicles by Mach speed in descending order
function sortBySpeed<T extends Vehicle>(vehicles: T[]): T[] {
  return [...vehicles].sort((a, b) => b.machSpeed - a.machSpeed)
}

// Missiles data - unsorted (will be sorted when exported)
const missilesData: Vehicle[] = [
  {
    name: "Brahmos",
    category: "missile",
    machSpeed: 2.8,
    description: "Indo-Russian supersonic cruise missile with a range of 290 km",
    details:
      "The BrahMos is a medium-range ramjet supersonic cruise missile that can be launched from submarines, ships, aircraft, or land. It is one of the fastest operational supersonic cruise missiles in the world, traveling at speeds of Mach 2.8 to 3.0.",
  },
  {
    name: "Tomahawk",
    category: "missile",
    machSpeed: 0.74,
    description: "American subsonic cruise missile used for deep land attack warfare",
    details:
      "The Tomahawk Land Attack Missile (TLAM) is a long-range, all-weather, subsonic cruise missile. It is primarily used by the United States Navy and Royal Navy in ship and submarine-based land-attack operations.",
  },
  {
    name: "Kh-47M2 Kinzhal",
    category: "missile",
    machSpeed: 10,
    description: "Russian hypersonic ballistic missile with reported speeds of Mach 10",
    details:
      "The Kh-47M2 Kinzhal is a Russian nuclear-capable air-launched ballistic missile. It has a claimed range of more than 2,000 km, Mach 10 speed, and an ability to perform evasive maneuvers at every stage of its flight.",
  },
  {
    name: "DF-17",
    category: "missile",
    machSpeed: 10,
    description: "Chinese medium-range ballistic missile with a hypersonic glide vehicle",
    details:
      "The DF-17 is a Chinese medium-range ballistic missile designed to carry the DF-ZF hypersonic glide vehicle. The missile can reportedly reach speeds of up to Mach 10 and is designed to penetrate U.S. missile defense systems.",
  },
  {
    name: "AGM-183A ARRW",
    category: "missile",
    machSpeed: 20,
    description: "American hypersonic weapon designed to travel at speeds of up to Mach 20",
    details:
      "The AGM-183A ARRW (Air-Launched Rapid Response Weapon) is a hypersonic weapon being developed for the United States Air Force. It is designed to travel at speeds of up to Mach 20, making it one of the fastest missiles in development.",
  },
  {
    name: "3M22 Zircon",
    category: "missile",
    machSpeed: 9,
    description: "Russian hypersonic anti-ship cruise missile",
    details:
      "The 3M22 Zircon is a hypersonic anti-ship cruise missile developed by Russia. It can reportedly reach speeds of Mach 8-9 and has a range of approximately 1,000 km, making it difficult to intercept with current missile defense systems.",
  },
  {
    name: "Shaurya",
    category: "missile",
    machSpeed: 7.5,
    description: "Indian hypersonic surface-to-surface tactical missile",
    details:
      "The Shaurya missile is a canister-launched hypersonic surface-to-surface tactical missile developed by the Indian Defence Research and Development Organisation (DRDO). It can reach speeds of Mach 7.5 and has a range of 700-1,900 km.",
  },
  {
    name: "Harpoon",
    category: "missile",
    machSpeed: 0.85,
    description: "American anti-ship missile with over-the-horizon capability",
    details:
      "The Harpoon is an all-weather, over-the-horizon, anti-ship missile developed and manufactured by McDonnell Douglas (now Boeing Defense, Space & Security). It uses active radar homing and flies just above the water to evade defenses.",
  },
  {
    name: "X-51 Waverider",
    category: "missile",
    machSpeed: 5.1,
    description: "American experimental hypersonic cruise missile",
    details:
      "The Boeing X-51 Waverider is an unmanned research scramjet experimental aircraft for hypersonic flight testing. It completed its first powered flight in May 2010 and achieved Mach 5.1 during one of its test flights.",
  },
  {
    name: "Avangard",
    category: "missile",
    machSpeed: 27,
    description: "Russian hypersonic glide vehicle that can carry nuclear warheads",
    details:
      "The Avangard is a Russian hypersonic glide vehicle that can be carried as a MIRV payload by the UR-100UTTKh, R-36M2 and RS-28 Sarmat ICBMs. It can reportedly reach speeds of Mach 27 and can perform sharp maneuvers to evade missile defenses.",
  },
  {
    name: "Hwasong-8",
    category: "missile",
    machSpeed: 5,
    description: "North Korean hypersonic missile",
    details:
      "The Hwasong-8 is North Korea's first claimed hypersonic missile. It was first tested in September 2021 and is believed to be capable of reaching speeds of at least Mach 5, though exact specifications remain classified.",
  },
  {
    name: "IDAS",
    category: "missile",
    machSpeed: 0.95,
    description: "German submarine-launched anti-helicopter missile",
    details:
      "The IDAS (Interactive Defence and Attack System for Submarines) is a submarine-launched missile developed by Diehl BGT Defence for the German Navy. It's designed to engage helicopters, ships, and coastal targets while the submarine remains submerged.",
  },
]

// Fighter Jets data - unsorted (will be sorted when exported)
const fighterJetsData: Vehicle[] = [
  {
    name: "F-22 Raptor",
    category: "fighter",
    machSpeed: 2.25,
    description: "American stealth tactical fighter aircraft developed for air superiority",
    details:
      "The Lockheed Martin F-22 Raptor is a single-seat, twin-engine, all-weather stealth tactical fighter aircraft developed for the United States Air Force. It was designed primarily as an air superiority fighter, but also has ground attack, electronic warfare, and signal intelligence capabilities.",
  },
  {
    name: "Su-57",
    category: "fighter",
    machSpeed: 2,
    description: "Russian stealth multirole fighter aircraft",
    details:
      "The Sukhoi Su-57 is a Russian single-seat, twin-engine stealth multirole fighter aircraft. It is the first aircraft in Russian military service to use stealth technology and is designed to have supercruise capability, supermaneuverability, and advanced avionics to overcome previous-generation fighter aircraft and ground defenses.",
  },
  {
    name: "F-35 Lightning II",
    category: "fighter",
    machSpeed: 1.6,
    description: "American stealth multirole combat aircraft",
    details:
      "The Lockheed Martin F-35 Lightning II is an American family of single-seat, single-engine, all-weather stealth multirole combat aircraft. It is intended to perform both air superiority and strike missions while also providing electronic warfare and intelligence, surveillance, and reconnaissance capabilities.",
  },
  {
    name: "Eurofighter Typhoon",
    category: "fighter",
    machSpeed: 2,
    description: "European multirole fighter aircraft",
    details:
      "The Eurofighter Typhoon is a twin-engine, canard delta wing, multirole fighter aircraft. It is being manufactured by a consortium of Airbus, BAE Systems, and Leonardo that conducts the majority of the project through a joint holding company, Eurofighter Jagdflugzeug GmbH.",
  },
  {
    name: "Dassault Rafale",
    category: "fighter",
    machSpeed: 1.8,
    description: "French twin-engine multirole fighter aircraft",
    details:
      "The Dassault Rafale is a French twin-engine, canard delta wing, multirole fighter aircraft designed and built by Dassault Aviation. Equipped with a wide range of weapons, the Rafale is intended to perform air supremacy, interdiction, aerial reconnaissance, ground support, in-depth strike, anti-ship strike, and nuclear deterrence missions.",
  },
  {
    name: "MiG-31",
    category: "fighter",
    machSpeed: 2.83,
    description: "Russian supersonic interceptor aircraft",
    details:
      "The Mikoyan MiG-31 is a supersonic interceptor aircraft developed for use by the Soviet Air Forces. It was designed by the Mikoyan design bureau as a replacement for the earlier MiG-25 'Foxbat'. The MiG-31 is among the fastest combat jets in the world and continues to be operated by the Russian Air Force and Kazakhstan Air Force.",
  },
  {
    name: "J-20",
    category: "fighter",
    machSpeed: 2.5,
    description: "Chinese stealth fighter aircraft",
    details:
      "The Chengdu J-20, also known as Mighty Dragon, is a single-seat, twinjet, all-weather, stealth, fifth-generation fighter aircraft developed by China's Chengdu Aerospace Corporation for the People's Liberation Army Air Force. It is designed as an air superiority fighter with precision strike capability.",
  },
  {
    name: "F-15 Eagle",
    category: "fighter",
    machSpeed: 2.5,
    description: "American twin-engine, all-weather tactical fighter aircraft",
    details:
      "The McDonnell Douglas F-15 Eagle is an American twin-engine, all-weather tactical fighter aircraft designed by McDonnell Douglas (now part of Boeing). The F-15 has an impressive combat record, with over 100 victories and no losses in aerial combat.",
  },
  {
    name: "MiG-25",
    category: "fighter",
    machSpeed: 3.2,
    description: "Soviet supersonic interceptor and reconnaissance aircraft",
    details:
      "The Mikoyan-Gurevich MiG-25 is a supersonic interceptor and reconnaissance aircraft designed by the Soviet Union. When it was introduced, it was capable of reaching Mach 3.2, making it one of the fastest military aircraft ever made. However, sustained speeds above Mach 2.8 would cause engine damage.",
  },
  {
    name: "F-104 Starfighter",
    category: "fighter",
    machSpeed: 2.2,
    description: "American supersonic interceptor aircraft",
    details:
      "The Lockheed F-104 Starfighter is a single-engine, supersonic interceptor aircraft that served with the United States Air Force from 1958 to 1969. It was known as 'the missile with a man in it' due to its sleek, aerodynamic design and impressive speed capabilities.",
  },
  {
    name: "Su-35",
    category: "fighter",
    machSpeed: 2.25,
    description: "Russian single-seat, twin-engine, supermaneuverable fighter",
    details:
      "The Sukhoi Su-35 is a single-seat, twin-engine, supermaneuverable aircraft designed by the Sukhoi Design Bureau. It is a heavily upgraded derivative of the Su-27 'Flanker' and was designed for air superiority missions. The Su-35 features thrust vectoring nozzles for extreme maneuverability.",
  },
  {
    name: "X-15",
    category: "fighter",
    machSpeed: 6.7,
    description: "American experimental hypersonic rocket-powered aircraft",
    details:
      "The North American X-15 was a hypersonic rocket-powered aircraft operated by the USAF and NASA. It set speed and altitude records in the 1960s, reaching the edge of outer space and returning with valuable data used in aircraft and spacecraft design. On October 3, 1967, William J. Knight set the official world record for the highest speed ever recorded by a manned, powered aircraft, at Mach 6.70.",
  },
]

// Bombers data - unsorted (will be sorted when exported)
const bombersData: Vehicle[] = [
  {
    name: "B-1B Lancer",
    category: "bomber",
    machSpeed: 1.25,
    description: "American supersonic variable-sweep wing heavy bomber",
    details:
      "The Rockwell B-1 Lancer is a supersonic variable-sweep wing heavy bomber used by the United States Air Force. It is commonly called the 'Bone' (from 'B-One'). It is one of three strategic bombers in the U.S. Air Force fleet as of 2021, the other two being the B-2 Spirit and the B-52 Stratofortress.",
  },
  {
    name: "B-2 Spirit",
    category: "bomber",
    machSpeed: 0.95,
    description: "American heavy penetration strategic stealth bomber",
    details:
      "The Northrop Grumman B-2 Spirit, also known as the Stealth Bomber, is an American heavy penetration strategic bomber, featuring low observable stealth technology designed for penetrating dense anti-aircraft defenses. It is a flying wing design with a crew of two.",
  },
  {
    name: "Tu-160",
    category: "bomber",
    machSpeed: 2.05,
    description: "Russian supersonic strategic bomber, the largest and heaviest combat aircraft",
    details:
      "The Tupolev Tu-160 is a supersonic, variable-sweep wing heavy strategic bomber designed by the Tupolev Design Bureau in the Soviet Union. It is the largest and heaviest combat aircraft, the fastest bomber currently in use, and the largest and heaviest variable-sweep wing aircraft ever flown.",
  },
  {
    name: "B-52 Stratofortress",
    category: "bomber",
    machSpeed: 0.9,
    description: "American long-range, subsonic, jet-powered strategic bomber",
    details:
      "The Boeing B-52 Stratofortress is an American long-range, subsonic, jet-powered strategic bomber. The B-52 was designed and built by Boeing, which has continued to provide support and upgrades. It has been operated by the United States Air Force (USAF) since the 1950s.",
  },
  {
    name: "Tu-95",
    category: "bomber",
    machSpeed: 0.83,
    description: "Russian turboprop-powered strategic bomber and missile platform",
    details:
      "The Tupolev Tu-95 is a large, four-engine turboprop-powered strategic bomber and missile platform. First flown in 1952, it is the only propeller-powered strategic bomber still in operational use today. The Tu-95 is expected to serve the Russian Air Force until at least 2040.",
  },
  {
    name: "H-6",
    category: "bomber",
    machSpeed: 0.75,
    description: "Chinese license-built version of the Soviet Tu-16 twin-engine jet bomber",
    details:
      "The Xian H-6 is a license-built version of the Soviet Tupolev Tu-16 twin-engine jet bomber, built for China's People's Liberation Army Air Force. Delivery of the Tu-16 to China began in 1958, and the Xi'an Aircraft Industrial Corporation (XAC) signed a license production agreement with the USSR to manufacture the aircraft in China.",
  },
  {
    name: "B-21 Raider",
    category: "bomber",
    machSpeed: 0.95,
    description: "American heavy bomber under development by Northrop Grumman",
    details:
      "The Northrop Grumman B-21 Raider is an American heavy bomber under development for the United States Air Force. As part of the Long Range Strike Bomber program (LRS-B), it is to be a very long-range, stealth strategic bomber for the U.S. Air Force capable of delivering conventional and thermonuclear weapons.",
  },
  {
    name: "Tu-22M",
    category: "bomber",
    machSpeed: 1.88,
    description: "Russian supersonic, variable-sweep wing, long-range strategic bomber",
    details:
      "The Tupolev Tu-22M is a supersonic, variable-sweep wing, long-range strategic and maritime strike bomber developed by the Tupolev Design Bureau. It is known to NATO as the 'Backfire' and has been in service with the Russian Air Force and Russian Naval Aviation since the 1970s.",
  },
  {
    name: "XB-70 Valkyrie",
    category: "bomber",
    machSpeed: 3.1,
    description: "American prototype nuclear-armed deep-penetration strategic bomber",
    details:
      "The North American XB-70 Valkyrie was a prototype nuclear-armed, deep-penetration strategic bomber for the U.S. Air Force's Strategic Air Command. It was capable of reaching Mach 3+ while flying at 70,000 feet. Only two prototypes were built before the program was canceled.",
  },
  {
    name: "B-58 Hustler",
    category: "bomber",
    machSpeed: 2.0,
    description: "American supersonic medium bomber",
    details:
      "The Convair B-58 Hustler was the first operational supersonic jet bomber capable of Mach 2 flight. The aircraft was designed by Convair and developed for the United States Air Force for service in the Strategic Air Command during the 1960s.",
  },
]

// Commercial Planes data - unsorted (will be sorted when exported)
const commercialPlanesData: Vehicle[] = [
  {
    name: "Concorde",
    category: "commercial",
    machSpeed: 2.04,
    description: "British-French supersonic passenger airliner (retired)",
    details:
      "The Concorde was a British-French turbojet-powered supersonic passenger airliner that was operated from 1976 until 2003. It had a maximum speed over twice the speed of sound, at Mach 2.04, with seating for 92 to 128 passengers. It remains one of only two supersonic passenger airliners to have entered commercial service.",
  },
  {
    name: "Boeing 747",
    category: "commercial",
    machSpeed: 0.85,
    description: "American wide-body commercial jet airliner",
    details:
      "The Boeing 747 is a large, long-range wide-body airliner manufactured by Boeing Commercial Airplanes in the United States. After introducing the 707 in October 1958, Pan Am wanted a jet 2+1⁄2 times its size, to reduce its seat cost by 30%. The 747 was first flown commercially in 1970.",
  },
  {
    name: "Airbus A380",
    category: "commercial",
    machSpeed: 0.85,
    description: "European double-deck, wide-body, four-engine jet airliner",
    details:
      "The Airbus A380 is a large wide-body airliner that was developed and produced by Airbus. It is the world's largest passenger airliner and only full-length double-deck jet airliner. The A380's upper deck extends along the entire length of the fuselage, and its width is equivalent to that of a wide-body aircraft.",
  },
  {
    name: "Boeing 787 Dreamliner",
    category: "commercial",
    machSpeed: 0.85,
    description: "American long-haul, mid-size wide-body, twin-engine jet airliner",
    details:
      "The Boeing 787 Dreamliner is an American wide-body jet airliner manufactured by Boeing Commercial Airplanes. After dropping its Sonic Cruiser project, Boeing announced the conventional 7E7 on January 29, 2003, focused on efficiency. The program was launched on April 26, 2004, with an order for 50 from All Nippon Airways.",
  },
  {
    name: "Airbus A350",
    category: "commercial",
    machSpeed: 0.89,
    description: "European long-range, wide-body jet airliner",
    details:
      "The Airbus A350 is a long-range, wide-body jet airliner developed by Airbus. The first A350 design proposed by Airbus in 2004, in response to the Boeing 787 Dreamliner, would have been a development of the A330 with composite wings and new engines.",
  },
  {
    name: "Tu-144",
    category: "commercial",
    machSpeed: 2.15,
    description: "Soviet supersonic passenger airliner (retired)",
    details:
      "The Tupolev Tu-144 was a Soviet supersonic passenger airliner designed by Tupolev in operation from 1968 to 1999. The Tu-144 was the world's first commercial supersonic transport aircraft with its prototype's maiden flight from Zhukovsky Airport on 31 December 1968, two months before the first flight of Concorde.",
  },
  {
    name: "Boeing 777",
    category: "commercial",
    machSpeed: 0.84,
    description: "American long-range wide-body twin-engine jet airliner",
    details:
      "The Boeing 777 is a long-range wide-body twin-engine jet airliner developed and manufactured by Boeing Commercial Airplanes. It is the world's largest twinjet and has a typical seating capacity of 314 to 396 passengers, with a range of 5,240 to 8,555 nautical miles.",
  },
  {
    name: "Airbus A320neo",
    category: "commercial",
    machSpeed: 0.82,
    description: "European narrow-body jet airliner",
    details:
      "The Airbus A320neo family is a development of the A320 family of narrow-body airliners produced by Airbus. The 'neo' stands for 'new engine option' and is the name given to the modernized A320 family, which was announced in December 2010.",
  },
  {
    name: "Boeing 737 MAX",
    category: "commercial",
    machSpeed: 0.79,
    description: "American narrow-body aircraft series",
    details:
      "The Boeing 737 MAX is the fourth generation of the Boeing 737, a narrow-body airliner manufactured by Boeing Commercial Airplanes. It succeeds the Boeing 737 Next Generation (NG) and competes with the Airbus A320neo family.",
  },
  {
    name: "Boom Overture",
    category: "commercial",
    machSpeed: 1.7,
    description: "American supersonic passenger airliner (in development)",
    details:
      "The Boom Overture is a supersonic passenger airliner in development by Boom Technology. The aircraft is projected to have a range of 4,888 km with 65–88 passengers and to cruise at Mach 1.7 with a cruising altitude of 60,000 feet. The company anticipates the aircraft will enter service by 2029.",
  },
  {
    name: "Boeing 2707",
    category: "commercial",
    machSpeed: 2.7,
    description: "American supersonic passenger airliner (canceled)",
    details:
      "The Boeing 2707 was the first American supersonic transport (SST) project. After winning a competition for a government-funded contract to build an American SST, Boeing began development at its facilities in Seattle, Washington. The design emerged as a large aircraft with seating for 250 to 300 passengers and cruise speeds of approximately Mach 3. The project was eventually canceled in 1971 before the prototypes were completed.",
  },
]

// Export sorted vehicles
export const missiles = sortBySpeed(missilesData)
export const fighterJets = sortBySpeed(fighterJetsData)
export const bombers = sortBySpeed(bombersData)
export const commercialPlanes = sortBySpeed(commercialPlanesData)
