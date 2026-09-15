import { o as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, S as useRouter, U as notFound, W as require_react, _ as createFileRoute, b as Navigate, d as HeadContent, f as useRouterState, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRoute, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as createServerFn, s as __exportAll } from "./ssr.mjs";
import { c as writeAgeOk, n as readAgeOkClient, r as safeRedirect } from "./pending-DwzrSU6r.mjs";
import { A as boolean, D as _enum, F as object, M as literal, P as number, R as string, z as union } from "../_libs/@better-auth/core+[...].mjs";
import { i as signOut, t as authClient } from "./client-B40BzJxt.mjs";
import { t as authMiddleware } from "./middleware-DaLAjX5Q.mjs";
import { a as hasGateSessionMarker, n as auth } from "./server-CrtFThNC.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { c as Menu, i as ShoppingBag, r as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/types-CbESJ1wr.js
var KINDS = [
	"performers",
	"productions",
	"companies",
	"agents",
	"events",
	"social",
	"law"
];
var KIND_META = {
	performers: {
		label: "Performers",
		singular: "Performer",
		blurb: "Signed and public-record talent. Search a name to query live industry databases (21+)."
	},
	productions: {
		label: "Productions",
		singular: "Production",
		blurb: "Features, series, and titles listed in the public industry databases."
	},
	companies: {
		label: "Companies",
		singular: "Company",
		blurb: "Studios, platforms, agencies, distributors, and trade bodies — including houses listed in IAFD and AFDB."
	},
	agents: {
		label: "Agents",
		singular: "Agent",
		blurb: "Representation, casting, and roster management."
	},
	events: {
		label: "Events",
		singular: "Event",
		blurb: "Awards, expos, trade fairs, and industry convenings."
	},
	social: {
		label: "Social",
		singular: "Profile",
		blurb: "Public handles attached to talent, houses, and organizations."
	},
	law: {
		label: "Law",
		singular: "Statute",
		blurb: "Statutes, cases, and compliance notes that govern the trade."
	}
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/search-CZqHDJh5.js
var industry = [
	{
		id: "helix-house",
		kind: "companies",
		name: "Helix House",
		subtitle: "Premium studio",
		summary: "Los Angeles house known for director-led features, long contracts, and a closed 2257 desk. Flagship imprint of the contemporary West Coast scene.",
		body: "Founded in 2012 in Silver Lake, Helix House produces a short slate of high-budget features and a standing series, Glass Harbor. The company keeps a staff custodian of records, will not shoot without picture identification on file, and books through Redwood Talent and Meridian Casting. Contract talent typically sign two-year terms with first-look on directing.",
		tags: [
			"studio",
			"los-angeles",
			"features",
			"2257"
		],
		region: "Los Angeles",
		status: "Active",
		facts: [
			{
				label: "Founded",
				value: "2012"
			},
			{
				label: "HQ",
				value: "Silver Lake, Los Angeles"
			},
			{
				label: "Imprint",
				value: "Features & series"
			},
			{
				label: "Custodian",
				value: "On-staff, inspected"
			}
		],
		related: [
			{
				kind: "productions",
				id: "glass-harbor",
				label: "Flagship series"
			},
			{
				kind: "productions",
				id: "wintering",
				label: "Feature"
			},
			{
				kind: "agents",
				id: "mara-ellison"
			},
			{
				kind: "law",
				id: "usc-2257"
			}
		],
		socials: [
			{
				platform: "X",
				handle: "@helixhouse"
			},
			{
				platform: "Instagram",
				handle: "@helixhouse"
			},
			{
				platform: "Site",
				handle: "helix.house"
			}
		],
		source: "index"
	},
	{
		id: "northstar-pictures",
		kind: "companies",
		name: "Northstar Pictures",
		subtitle: "Feature studio",
		summary: "Narrative-first studio in the San Fernando Valley. Known for long-form features, union-style call sheets, and Palisade nominations.",
		body: "Northstar treats adult features as a production discipline: department heads, rehearsal days, and a published 2257 statement on every title card. Distributes through Eastbound. Several directors (Wren Solis, Evander Crowe) move between Northstar and Nightjar.",
		tags: [
			"studio",
			"features",
			"valley",
			"narrative"
		],
		region: "Los Angeles",
		status: "Active",
		facts: [
			{
				label: "Founded",
				value: "2008"
			},
			{
				label: "HQ",
				value: "Van Nuys, California"
			},
			{
				label: "Distribution",
				value: "Eastbound"
			}
		],
		related: [
			{
				kind: "productions",
				id: "the-night-ledger"
			},
			{
				kind: "productions",
				id: "eastern-standard"
			},
			{
				kind: "companies",
				id: "eastbound"
			},
			{
				kind: "performers",
				id: "wren-solis"
			}
		],
		socials: [{
			platform: "X",
			handle: "@northstarpix"
		}],
		source: "index"
	},
	{
		id: "nightjar-films",
		kind: "companies",
		name: "Nightjar Films",
		subtitle: "Auteur imprint",
		summary: "Director-owned imprint. Small crews, location work, and a roster of performers who also direct.",
		tags: [
			"studio",
			"indie",
			"directors"
		],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "Founded",
			value: "2018"
		}, {
			label: "Model",
			value: "Director-owned"
		}],
		related: [
			{
				kind: "performers",
				id: "isla-vane"
			},
			{
				kind: "performers",
				id: "wren-solis"
			},
			{
				kind: "productions",
				id: "low-light"
			},
			{
				kind: "productions",
				id: "second-unit"
			},
			{
				kind: "events",
				id: "nightjar-forum-2026"
			}
		],
		socials: [{
			platform: "Instagram",
			handle: "@nightjarfilms"
		}],
		source: "index"
	},
	{
		id: "afterlight-media",
		kind: "companies",
		name: "Afterlight Media",
		subtitle: "European house",
		summary: "Berlin studio and sales agent. Shoots in German, French, and English; handles EU DSA age-assurance for its own storefront.",
		tags: [
			"studio",
			"berlin",
			"europe",
			"dsa"
		],
		region: "Berlin",
		status: "Active",
		facts: [
			{
				label: "Founded",
				value: "2014"
			},
			{
				label: "HQ",
				value: "Neukölln, Berlin"
			},
			{
				label: "Markets",
				value: "EU, UK, North America"
			}
		],
		related: [
			{
				kind: "performers",
				id: "omar-leclerc"
			},
			{
				kind: "performers",
				id: "tamsin-rowe"
			},
			{
				kind: "agents",
				id: "sabine-kohler"
			},
			{
				kind: "productions",
				id: "corridor"
			},
			{
				kind: "events",
				id: "venus-berlin-2026"
			},
			{
				kind: "law",
				id: "eu-dsa"
			}
		],
		socials: [{
			platform: "X",
			handle: "@afterlightmedia"
		}],
		source: "index"
	},
	{
		id: "pine-vale",
		kind: "companies",
		name: "Pine & Vale",
		subtitle: "Boutique studio",
		summary: "Vancouver boutique. Short-run series, stills-led campaigns, and a reputation for performer-directors.",
		tags: [
			"studio",
			"vancouver",
			"boutique"
		],
		region: "Vancouver",
		status: "Active",
		facts: [{
			label: "Founded",
			value: "2016"
		}, {
			label: "HQ",
			value: "Vancouver, BC"
		}],
		related: [
			{
				kind: "performers",
				id: "maren-dahl"
			},
			{
				kind: "performers",
				id: "sienna-park"
			},
			{
				kind: "productions",
				id: "salt-and-copper"
			}
		],
		socials: [{
			platform: "Instagram",
			handle: "@pineandvale"
		}],
		source: "index"
	},
	{
		id: "vellum-digital",
		kind: "companies",
		name: "Vellum",
		subtitle: "Direct-to-fan platform",
		summary: "Subscription platform for independent adult creators. Secondary-producer 2257 posture; creators remain primary producers of their own work.",
		body: "Vellum is the catalog's stand-in for the direct-to-fan stack: subscriptions, PPV, and tipping. The company stores copies of creator IDs as a secondary producer and requires a 2257 statement on every profile. TAKE IT DOWN Act notice-and-removal is published in the footer, with a 48-hour SLA.",
		tags: [
			"platform",
			"direct-to-fan",
			"2257",
			"take-it-down"
		],
		region: "United States",
		status: "Active",
		facts: [
			{
				label: "Launched",
				value: "2019"
			},
			{
				label: "Role",
				value: "Secondary producer"
			},
			{
				label: "Removal SLA",
				value: "48 hours"
			}
		],
		related: [
			{
				kind: "performers",
				id: "noa-pell"
			},
			{
				kind: "performers",
				id: "aisha-nasser"
			},
			{
				kind: "law",
				id: "usc-2257"
			},
			{
				kind: "law",
				id: "take-it-down"
			},
			{
				kind: "law",
				id: "card-networks"
			}
		],
		socials: [{
			platform: "X",
			handle: "@vellum"
		}, {
			platform: "Site",
			handle: "vellum.example"
		}],
		source: "index"
	},
	{
		id: "cobalt-interactive",
		kind: "companies",
		name: "Cobalt",
		subtitle: "Live platform",
		summary: "Live-cam and ticketed shows. Age-gates at signup; geo-blocks jurisdictions with strict AV statutes when it cannot verify.",
		tags: [
			"platform",
			"live",
			"age-assurance"
		],
		region: "United States",
		status: "Active",
		facts: [{
			label: "Launched",
			value: "2011"
		}, {
			label: "Format",
			value: "Live + tickets"
		}],
		related: [
			{
				kind: "performers",
				id: "kade-morin"
			},
			{
				kind: "law",
				id: "fsc-v-paxton"
			},
			{
				kind: "law",
				id: "state-av-laws"
			}
		],
		socials: [{
			platform: "X",
			handle: "@cobaltlive"
		}],
		source: "index"
	},
	{
		id: "aurelia-network",
		kind: "companies",
		name: "Aurelia Network",
		subtitle: "Aggregator",
		summary: "Licensed tube and clip aggregator. DMCA agent on file; 2257 statements inherited from studio partners; geo-fencing after FSC v. Paxton.",
		tags: [
			"platform",
			"tube",
			"dmca",
			"geo-fence"
		],
		region: "Cyprus / United States",
		status: "Active",
		facts: [{
			label: "Launched",
			value: "2007"
		}, {
			label: "Model",
			value: "Licensed aggregator"
		}],
		related: [
			{
				kind: "companies",
				id: "eastbound"
			},
			{
				kind: "law",
				id: "dmca-512"
			},
			{
				kind: "law",
				id: "fsc-v-paxton"
			},
			{
				kind: "law",
				id: "fosta-sesta"
			}
		],
		socials: [{
			platform: "X",
			handle: "@aurelia"
		}],
		source: "index"
	},
	{
		id: "eastbound",
		kind: "companies",
		name: "Eastbound Distribution",
		subtitle: "Sales & distribution",
		summary: "North American sales agent for Helix, Northstar, Pine & Vale, and Afterlight's English-language slate.",
		tags: ["distributor", "sales"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "Founded",
			value: "2004"
		}, {
			label: "HQ",
			value: "Hollywood, California"
		}],
		related: [
			{
				kind: "companies",
				id: "helix-house"
			},
			{
				kind: "companies",
				id: "northstar-pictures"
			},
			{
				kind: "companies",
				id: "afterlight-media"
			},
			{
				kind: "events",
				id: "avn-expo-2026"
			}
		],
		socials: [{
			platform: "X",
			handle: "@eastboundhq"
		}],
		source: "index"
	},
	{
		id: "redwood-talent",
		kind: "companies",
		name: "Redwood Talent",
		subtitle: "Talent agency",
		summary: "Full-service agency for on-camera talent, directors, and a growing direct-to-fan book. Los Angeles with a Berlin desk via Sabine Köhler.",
		tags: ["agency", "representation"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "Founded",
			value: "2009"
		}, {
			label: "Desks",
			value: "Los Angeles, Berlin"
		}],
		related: [
			{
				kind: "agents",
				id: "mara-ellison"
			},
			{
				kind: "agents",
				id: "devon-reyes"
			},
			{
				kind: "companies",
				id: "helix-house"
			}
		],
		socials: [{
			platform: "Instagram",
			handle: "@redwoodtalent"
		}],
		source: "index"
	},
	{
		id: "meridian-casting",
		kind: "companies",
		name: "Meridian Casting",
		subtitle: "Casting",
		summary: "Casting office for features and series. Keeps a private 2257 pre-clear list; will not submit a performer without current identification on file.",
		tags: ["casting", "2257"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "Founded",
			value: "2011"
		}, {
			label: "Specialty",
			value: "Features & series"
		}],
		related: [
			{
				kind: "agents",
				id: "jonah-peck"
			},
			{
				kind: "companies",
				id: "northstar-pictures"
			},
			{
				kind: "law",
				id: "usc-2257"
			}
		],
		source: "index"
	},
	{
		id: "palisade-institute",
		kind: "companies",
		name: "Palisade Institute",
		subtitle: "Awards body",
		summary: "Trade academy behind the Palisade Honors. Publishes eligibility rules, a performer-safety pledge, and an annual craft ballot.",
		tags: ["awards", "trade-body"],
		region: "Las Vegas",
		status: "Active",
		facts: [{
			label: "Founded",
			value: "1999"
		}, {
			label: "Flagship",
			value: "Palisade Honors"
		}],
		related: [{
			kind: "events",
			id: "palisade-honors-2026"
		}, {
			kind: "events",
			id: "avn-expo-2026"
		}],
		socials: [{
			platform: "X",
			handle: "@palisadehonors"
		}],
		source: "index"
	},
	{
		id: "counsel-group",
		kind: "companies",
		name: "Counsel Group",
		subtitle: "Industry counsel",
		summary: "Boutique firm for 2257 programs, performer contracts, platform terms, and state age-verification maps. Hosts Counsel Day.",
		tags: [
			"law-firm",
			"compliance",
			"2257"
		],
		region: "Los Angeles / Washington",
		status: "Active",
		facts: [{
			label: "Founded",
			value: "2006"
		}, {
			label: "Desks",
			value: "Los Angeles, D.C."
		}],
		related: [
			{
				kind: "events",
				id: "counsel-day-2026"
			},
			{
				kind: "law",
				id: "usc-2257"
			},
			{
				kind: "law",
				id: "fsc-v-paxton"
			},
			{
				kind: "law",
				id: "take-it-down"
			}
		],
		socials: [{
			platform: "Site",
			handle: "counsel.group"
		}],
		source: "index"
	},
	{
		id: "copperline-pr",
		kind: "companies",
		name: "Copperline",
		subtitle: "Public relations",
		summary: "Trade PR and awards campaign shop. Books talent at expos and manages Palisade campaigns.",
		tags: ["pr", "awards"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "Founded",
			value: "2015"
		}],
		related: [
			{
				kind: "events",
				id: "avn-expo-2026"
			},
			{
				kind: "events",
				id: "xbiz-2026"
			},
			{
				kind: "companies",
				id: "palisade-institute"
			}
		],
		source: "index"
	},
	{
		id: "fsc",
		kind: "companies",
		name: "Free Speech Coalition",
		subtitle: "Trade association",
		summary: "U.S. trade association for the adult industry. Plaintiff in Free Speech Coalition v. Paxton (2025). Advocacy, compliance education, and performer resources.",
		body: "The Free Speech Coalition is the principal U.S. trade group for adult producers, platforms, and performers. It litigates and lobbies on First Amendment, record-keeping, payment, and age-verification issues, and publishes compliance guidance for members. In 2025 it was the named petitioner in Free Speech Coalition v. Paxton, the Supreme Court case on Texas H.B. 1181.",
		tags: [
			"trade-body",
			"advocacy",
			"united-states",
			"public"
		],
		region: "United States",
		status: "Active",
		facts: [
			{
				label: "Founded",
				value: "1991"
			},
			{
				label: "Type",
				value: "Trade association"
			},
			{
				label: "Record",
				value: "FSC v. Paxton (2025)"
			}
		],
		related: [
			{
				kind: "law",
				id: "fsc-v-paxton"
			},
			{
				kind: "law",
				id: "fosta-sesta"
			},
			{
				kind: "law",
				id: "usc-2257"
			},
			{
				kind: "companies",
				id: "asacp"
			}
		],
		socials: [{
			platform: "X",
			handle: "@FreeSpeechFSC"
		}, {
			platform: "Site",
			handle: "freespeechcoalition.com"
		}],
		source: "public"
	},
	{
		id: "asacp",
		kind: "companies",
		name: "ASACP",
		subtitle: "Child-protection nonprofit",
		summary: "Association of Sites Advocating Child Protection. Independent nonprofit that fights child sexual abuse material online and runs a hotline used across the adult trade.",
		tags: [
			"nonprofit",
			"child-protection",
			"public"
		],
		region: "United States",
		status: "Active",
		facts: [{
			label: "Founded",
			value: "1996"
		}, {
			label: "Type",
			value: "Nonprofit"
		}],
		related: [{
			kind: "companies",
			id: "fsc"
		}, {
			kind: "law",
			id: "usc-2257"
		}],
		socials: [{
			platform: "Site",
			handle: "asacp.org"
		}],
		source: "public"
	},
	{
		id: "mara-ellison",
		kind: "agents",
		name: "Mara Ellison",
		subtitle: "Partner, Redwood Talent",
		summary: "Books Helix House contracts and a select independent list. Known for long-term deals with first-look directing clauses.",
		tags: [
			"agent",
			"los-angeles",
			"contracts"
		],
		region: "Los Angeles",
		status: "Active",
		facts: [
			{
				label: "Agency",
				value: "Redwood Talent"
			},
			{
				label: "Desk",
				value: "On-camera & directors"
			},
			{
				label: "Since",
				value: "2013"
			}
		],
		credits: [
			{
				role: "Represents",
				title: "Isla Vane",
				year: "2019–",
				kind: "performers",
				id: "isla-vane"
			},
			{
				role: "Represents",
				title: "Roman Calder",
				year: "2016–",
				kind: "performers",
				id: "roman-calder"
			},
			{
				role: "Represents",
				title: "Juniper Hale",
				year: "2021–",
				kind: "performers",
				id: "juniper-hale"
			},
			{
				role: "Represents",
				title: "Cassian Wolfe",
				year: "2018–",
				kind: "performers",
				id: "cassian-wolfe"
			}
		],
		related: [
			{
				kind: "companies",
				id: "redwood-talent"
			},
			{
				kind: "companies",
				id: "helix-house"
			},
			{
				kind: "performers",
				id: "isla-vane"
			}
		],
		socials: [{
			platform: "X",
			handle: "@maraellison"
		}],
		source: "index"
	},
	{
		id: "devon-reyes",
		kind: "agents",
		name: "Devon Reyes",
		subtitle: "Agent, Redwood Talent",
		summary: "Direct-to-fan and crossover book. Places clients on Vellum and brokered the Pine & Vale Vancouver slate.",
		tags: ["agent", "direct-to-fan"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "Agency",
			value: "Redwood Talent"
		}, {
			label: "Desk",
			value: "Direct-to-fan"
		}],
		credits: [
			{
				role: "Represents",
				title: "Noa Pell",
				year: "2022–",
				kind: "performers",
				id: "noa-pell"
			},
			{
				role: "Represents",
				title: "Aisha Nasser",
				year: "2023–",
				kind: "performers",
				id: "aisha-nasser"
			},
			{
				role: "Represents",
				title: "Sienna Park",
				year: "2020–",
				kind: "performers",
				id: "sienna-park"
			}
		],
		related: [{
			kind: "companies",
			id: "redwood-talent"
		}, {
			kind: "companies",
			id: "vellum-digital"
		}],
		source: "index"
	},
	{
		id: "jonah-peck",
		kind: "agents",
		name: "Jonah Peck",
		subtitle: "Casting director, Meridian",
		summary: "Casts Northstar features and the Glass Harbor rotating company. Runs Meridian's 2257 pre-clear.",
		tags: ["casting", "features"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "Office",
			value: "Meridian Casting"
		}, {
			label: "Since",
			value: "2011"
		}],
		related: [
			{
				kind: "companies",
				id: "meridian-casting"
			},
			{
				kind: "companies",
				id: "northstar-pictures"
			},
			{
				kind: "productions",
				id: "glass-harbor"
			}
		],
		source: "index"
	},
	{
		id: "sabine-kohler",
		kind: "agents",
		name: "Sabine Köhler",
		subtitle: "EU desk, Redwood / Afterlight",
		summary: "Berlin-based booker for Afterlight and Redwood's European list. Places talent at Venus Berlin and handles DSA-facing storefront copy.",
		tags: [
			"agent",
			"berlin",
			"europe"
		],
		region: "Berlin",
		status: "Active",
		facts: [{
			label: "Desks",
			value: "Redwood Talent, Afterlight"
		}, {
			label: "Market",
			value: "EU & UK"
		}],
		credits: [
			{
				role: "Represents",
				title: "Omar Leclerc",
				year: "2017–",
				kind: "performers",
				id: "omar-leclerc"
			},
			{
				role: "Represents",
				title: "Tamsin Rowe",
				year: "2019–",
				kind: "performers",
				id: "tamsin-rowe"
			},
			{
				role: "Represents",
				title: "Felix Arden",
				year: "2021–",
				kind: "performers",
				id: "felix-arden"
			}
		],
		related: [
			{
				kind: "companies",
				id: "afterlight-media"
			},
			{
				kind: "companies",
				id: "redwood-talent"
			},
			{
				kind: "events",
				id: "venus-berlin-2026"
			}
		],
		socials: [{
			platform: "Instagram",
			handle: "@sabinekohler"
		}],
		source: "index"
	},
	{
		id: "nina-braswell",
		kind: "agents",
		name: "Nina Braswell",
		subtitle: "Independent manager",
		summary: "Manager for performer-directors and a small trans roster. Advises on TAKE IT DOWN notices and platform terms.",
		tags: ["manager", "independent"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "Practice",
			value: "Independent management"
		}, {
			label: "Since",
			value: "2020"
		}],
		credits: [
			{
				role: "Manages",
				title: "Wren Solis",
				year: "2020–",
				kind: "performers",
				id: "wren-solis"
			},
			{
				role: "Manages",
				title: "Percy Lane",
				year: "2021–",
				kind: "performers",
				id: "percy-lane"
			},
			{
				role: "Manages",
				title: "Ellis Hart",
				year: "2022–",
				kind: "performers",
				id: "ellis-hart"
			}
		],
		related: [{
			kind: "performers",
			id: "wren-solis"
		}, {
			kind: "law",
			id: "take-it-down"
		}],
		source: "index"
	},
	{
		id: "haruki-mori",
		kind: "agents",
		name: "Haruki Mori",
		subtitle: "Pacific booker",
		summary: "Independent booker splitting Tokyo and Los Angeles. Places bilingual talent on Helix and Afterlight English-language days.",
		tags: [
			"agent",
			"tokyo",
			"los-angeles"
		],
		region: "Tokyo / Los Angeles",
		status: "Active",
		facts: [{
			label: "Practice",
			value: "Independent"
		}, {
			label: "Languages",
			value: "Japanese, English"
		}],
		credits: [{
			role: "Represents",
			title: "Liora Chen",
			year: "2020–",
			kind: "performers",
			id: "liora-chen"
		}, {
			role: "Represents",
			title: "Sienna Park",
			year: "2024–",
			kind: "performers",
			id: "sienna-park"
		}],
		related: [{
			kind: "performers",
			id: "liora-chen"
		}, {
			kind: "companies",
			id: "helix-house"
		}],
		source: "index"
	},
	{
		id: "isla-vane",
		kind: "performers",
		name: "Isla Vane",
		subtitle: "Performer · director",
		aka: ["I. Vane"],
		summary: "Helix House contract 2020–2024. Palisade Best New Star, 2020. Now directing for Nightjar and releasing independently on Vellum.",
		body: "Isla Vane first credited in 2019 and signed with Helix House the following year. Four Palisade nominations followed, including a Best New Star win. After her contract lapsed she moved into direction on Low Light and keeps a direct-to-fan studio. Represented by Mara Ellison. All credits are of a working adult; first year of professional work is 2019.",
		tags: [
			"performer",
			"director",
			"los-angeles",
			"helix"
		],
		region: "Los Angeles",
		status: "Independent",
		facts: [
			{
				label: "First credited",
				value: "2019"
			},
			{
				label: "Contract",
				value: "Helix House, 2020–2024"
			},
			{
				label: "Representation",
				value: "Mara Ellison, Redwood"
			},
			{
				label: "Awards",
				value: "Palisade Best New Star, 2020"
			}
		],
		credits: [
			{
				role: "Lead",
				title: "Glass Harbor",
				year: "2020–24",
				kind: "productions",
				id: "glass-harbor"
			},
			{
				role: "Lead",
				title: "Wintering",
				year: "2022",
				kind: "productions",
				id: "wintering"
			},
			{
				role: "Director",
				title: "Low Light",
				year: "2025",
				kind: "productions",
				id: "low-light"
			},
			{
				role: "Lead",
				title: "A Room in Silverlake",
				year: "2023",
				kind: "productions",
				id: "silverlake"
			}
		],
		related: [
			{
				kind: "agents",
				id: "mara-ellison"
			},
			{
				kind: "companies",
				id: "helix-house"
			},
			{
				kind: "companies",
				id: "nightjar-films"
			},
			{
				kind: "productions",
				id: "low-light"
			}
		],
		socials: [
			{
				platform: "Instagram",
				handle: "@islavane"
			},
			{
				platform: "X",
				handle: "@islavane"
			},
			{
				platform: "Vellum",
				handle: "isla"
			}
		],
		source: "index"
	},
	{
		id: "roman-calder",
		kind: "performers",
		name: "Roman Calder",
		subtitle: "Performer",
		summary: "Valley veteran. Northstar and Helix regular; Palisade Best Supporting, 2023. Brother of Bo Calder.",
		tags: [
			"performer",
			"los-angeles",
			"veteran"
		],
		region: "Los Angeles",
		status: "Active",
		facts: [
			{
				label: "First credited",
				value: "2014"
			},
			{
				label: "Representation",
				value: "Mara Ellison, Redwood"
			},
			{
				label: "Awards",
				value: "Palisade Best Supporting, 2023"
			}
		],
		credits: [
			{
				role: "Lead",
				title: "The Night Ledger",
				year: "2021",
				kind: "productions",
				id: "the-night-ledger"
			},
			{
				role: "Supporting",
				title: "Glass Harbor",
				year: "2021–24",
				kind: "productions",
				id: "glass-harbor"
			},
			{
				role: "Lead",
				title: "Eastern Standard",
				year: "2024",
				kind: "productions",
				id: "eastern-standard"
			}
		],
		related: [
			{
				kind: "performers",
				id: "bo-calder",
				label: "Sibling"
			},
			{
				kind: "agents",
				id: "mara-ellison"
			},
			{
				kind: "companies",
				id: "northstar-pictures"
			}
		],
		socials: [{
			platform: "X",
			handle: "@romancalder"
		}],
		source: "index"
	},
	{
		id: "juniper-hale",
		kind: "performers",
		name: "Juniper Hale",
		subtitle: "Performer",
		summary: "Helix contract talent. Breakthrough in A Room in Silverlake; Palisade nominee, 2024.",
		tags: [
			"performer",
			"helix",
			"contract"
		],
		region: "Los Angeles",
		status: "Contract",
		facts: [
			{
				label: "First credited",
				value: "2021"
			},
			{
				label: "Contract",
				value: "Helix House, 2022–"
			},
			{
				label: "Representation",
				value: "Mara Ellison, Redwood"
			}
		],
		credits: [
			{
				role: "Lead",
				title: "A Room in Silverlake",
				year: "2023",
				kind: "productions",
				id: "silverlake"
			},
			{
				role: "Lead",
				title: "Glass Harbor",
				year: "2023–",
				kind: "productions",
				id: "glass-harbor"
			},
			{
				role: "Supporting",
				title: "Wintering",
				year: "2022",
				kind: "productions",
				id: "wintering"
			}
		],
		related: [
			{
				kind: "agents",
				id: "mara-ellison"
			},
			{
				kind: "companies",
				id: "helix-house"
			},
			{
				kind: "performers",
				id: "isla-vane"
			}
		],
		socials: [{
			platform: "Instagram",
			handle: "@juniperhale"
		}, {
			platform: "Vellum",
			handle: "juniper"
		}],
		source: "index"
	},
	{
		id: "mateo-ruiz",
		kind: "performers",
		name: "Mateo Ruiz",
		subtitle: "Performer · stills",
		summary: "Performer and stills photographer. Credits at Helix and Pine & Vale; campaigns for Copperline.",
		tags: ["performer", "photographer"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2018"
		}, {
			label: "Also",
			value: "Stills & campaigns"
		}],
		credits: [{
			role: "Lead",
			title: "Salt & Copper",
			year: "2023",
			kind: "productions",
			id: "salt-and-copper"
		}, {
			role: "Supporting",
			title: "Glass Harbor",
			year: "2022",
			kind: "productions",
			id: "glass-harbor"
		}],
		related: [{
			kind: "companies",
			id: "pine-vale"
		}, {
			kind: "companies",
			id: "copperline-pr"
		}],
		socials: [{
			platform: "Instagram",
			handle: "@mateoruizstill"
		}],
		source: "index"
	},
	{
		id: "sable-quinn",
		kind: "performers",
		name: "Sable Quinn",
		subtitle: "Performer",
		summary: "Northstar exclusive 2019–2023. Known for long-form features; now splitting time between direction and Vellum.",
		tags: [
			"performer",
			"northstar",
			"features"
		],
		region: "Los Angeles",
		status: "Independent",
		facts: [{
			label: "First credited",
			value: "2016"
		}, {
			label: "Exclusive",
			value: "Northstar, 2019–2023"
		}],
		credits: [{
			role: "Lead",
			title: "The Night Ledger",
			year: "2021",
			kind: "productions",
			id: "the-night-ledger"
		}, {
			role: "Lead",
			title: "Eastern Standard",
			year: "2024",
			kind: "productions",
			id: "eastern-standard"
		}],
		related: [{
			kind: "companies",
			id: "northstar-pictures"
		}, {
			kind: "performers",
			id: "roman-calder"
		}],
		socials: [{
			platform: "X",
			handle: "@sablequinn"
		}, {
			platform: "Vellum",
			handle: "sable"
		}],
		source: "index"
	},
	{
		id: "theo-marsh",
		kind: "performers",
		name: "Theo Marsh",
		subtitle: "Performer",
		summary: "Helix and Nightjar. Palisade ensemble nominee with the Glass Harbor company, 2024.",
		tags: ["performer", "helix"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2020"
		}, {
			label: "Representation",
			value: "Redwood Talent"
		}],
		credits: [{
			role: "Ensemble",
			title: "Glass Harbor",
			year: "2021–",
			kind: "productions",
			id: "glass-harbor"
		}, {
			role: "Supporting",
			title: "Low Light",
			year: "2025",
			kind: "productions",
			id: "low-light"
		}],
		related: [{
			kind: "companies",
			id: "helix-house"
		}, {
			kind: "productions",
			id: "glass-harbor"
		}],
		socials: [{
			platform: "Instagram",
			handle: "@theomarsh"
		}],
		source: "index"
	},
	{
		id: "liora-chen",
		kind: "performers",
		name: "Liora Chen",
		subtitle: "Performer",
		summary: "Bilingual talent booked between Los Angeles and Tokyo. Helix guest lead; Afterlight English-language days.",
		tags: [
			"performer",
			"tokyo",
			"los-angeles"
		],
		region: "Tokyo / Los Angeles",
		status: "Active",
		facts: [
			{
				label: "First credited",
				value: "2020"
			},
			{
				label: "Representation",
				value: "Haruki Mori"
			},
			{
				label: "Languages",
				value: "English, Japanese"
			}
		],
		credits: [{
			role: "Guest lead",
			title: "Glass Harbor",
			year: "2024",
			kind: "productions",
			id: "glass-harbor"
		}, {
			role: "Lead",
			title: "Corridor",
			year: "2025",
			kind: "productions",
			id: "corridor"
		}],
		related: [
			{
				kind: "agents",
				id: "haruki-mori"
			},
			{
				kind: "companies",
				id: "helix-house"
			},
			{
				kind: "companies",
				id: "afterlight-media"
			}
		],
		socials: [{
			platform: "Instagram",
			handle: "@liorachen"
		}],
		source: "index"
	},
	{
		id: "cassian-wolfe",
		kind: "performers",
		name: "Cassian Wolfe",
		subtitle: "Performer",
		summary: "Helix contract, 2018–. Palisade Best Lead, 2022. Frequent pairing with Isla Vane and Juniper Hale.",
		tags: [
			"performer",
			"helix",
			"contract"
		],
		region: "Los Angeles",
		status: "Contract",
		facts: [
			{
				label: "First credited",
				value: "2017"
			},
			{
				label: "Contract",
				value: "Helix House, 2018–"
			},
			{
				label: "Representation",
				value: "Mara Ellison, Redwood"
			},
			{
				label: "Awards",
				value: "Palisade Best Lead, 2022"
			}
		],
		credits: [
			{
				role: "Lead",
				title: "Glass Harbor",
				year: "2018–",
				kind: "productions",
				id: "glass-harbor"
			},
			{
				role: "Lead",
				title: "Wintering",
				year: "2022",
				kind: "productions",
				id: "wintering"
			},
			{
				role: "Lead",
				title: "A Room in Silverlake",
				year: "2023",
				kind: "productions",
				id: "silverlake"
			}
		],
		related: [
			{
				kind: "agents",
				id: "mara-ellison"
			},
			{
				kind: "companies",
				id: "helix-house"
			},
			{
				kind: "performers",
				id: "isla-vane"
			}
		],
		socials: [{
			platform: "X",
			handle: "@cassianwolfe"
		}, {
			platform: "Instagram",
			handle: "@cassianwolfe"
		}],
		source: "index"
	},
	{
		id: "noa-pell",
		kind: "performers",
		name: "Noa Pell",
		subtitle: "Creator · performer",
		summary: "Direct-to-fan first. Vellum top-tier; selective studio days through Devon Reyes. Speaks on platform terms at Ledger Week.",
		tags: [
			"creator",
			"direct-to-fan",
			"vellum"
		],
		region: "Austin",
		status: "Independent",
		facts: [
			{
				label: "First credited",
				value: "2021"
			},
			{
				label: "Platform",
				value: "Vellum"
			},
			{
				label: "Representation",
				value: "Devon Reyes, Redwood"
			}
		],
		credits: [{
			role: "Creator",
			title: "Vellum studio",
			year: "2021–",
			kind: "companies",
			id: "vellum-digital"
		}, {
			role: "Guest",
			title: "Second Unit",
			year: "2025",
			kind: "productions",
			id: "second-unit"
		}],
		related: [
			{
				kind: "agents",
				id: "devon-reyes"
			},
			{
				kind: "companies",
				id: "vellum-digital"
			},
			{
				kind: "events",
				id: "ledger-week-2026"
			}
		],
		socials: [{
			platform: "Vellum",
			handle: "noa"
		}, {
			platform: "X",
			handle: "@noapell"
		}],
		source: "index"
	},
	{
		id: "evander-crowe",
		kind: "performers",
		name: "Evander Crowe",
		subtitle: "Director · performer",
		summary: "Director of The Night Ledger and Eastern Standard. Occasional on-camera credit. Nightjar partner.",
		tags: [
			"director",
			"performer",
			"northstar"
		],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2012"
		}, {
			label: "Primary",
			value: "Direction"
		}],
		credits: [
			{
				role: "Director",
				title: "The Night Ledger",
				year: "2021",
				kind: "productions",
				id: "the-night-ledger"
			},
			{
				role: "Director",
				title: "Eastern Standard",
				year: "2024",
				kind: "productions",
				id: "eastern-standard"
			},
			{
				role: "Director",
				title: "The Palisade Brief",
				year: "2025",
				kind: "productions",
				id: "palisade-brief"
			}
		],
		related: [{
			kind: "companies",
			id: "northstar-pictures"
		}, {
			kind: "companies",
			id: "nightjar-films"
		}],
		socials: [{
			platform: "X",
			handle: "@evandercrowe"
		}],
		source: "index"
	},
	{
		id: "wren-solis",
		kind: "performers",
		name: "Wren Solis",
		subtitle: "Director · performer",
		summary: "Performer-director. Nightjar partner; directed Second Unit. Managed by Nina Braswell.",
		tags: [
			"director",
			"performer",
			"nightjar"
		],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2015"
		}, {
			label: "Management",
			value: "Nina Braswell"
		}],
		credits: [
			{
				role: "Director",
				title: "Second Unit",
				year: "2025",
				kind: "productions",
				id: "second-unit"
			},
			{
				role: "Lead",
				title: "Low Light",
				year: "2025",
				kind: "productions",
				id: "low-light"
			},
			{
				role: "Supporting",
				title: "The Night Ledger",
				year: "2021",
				kind: "productions",
				id: "the-night-ledger"
			}
		],
		related: [
			{
				kind: "agents",
				id: "nina-braswell"
			},
			{
				kind: "companies",
				id: "nightjar-films"
			},
			{
				kind: "performers",
				id: "isla-vane"
			}
		],
		socials: [{
			platform: "Instagram",
			handle: "@wrensolis"
		}, {
			platform: "X",
			handle: "@wrensolis"
		}],
		source: "index"
	},
	{
		id: "dax-harlan",
		kind: "performers",
		name: "Dax Harlan",
		subtitle: "Performer",
		summary: "Northstar and Helix supporting player. Palisade crafts nominee (ensemble), 2024.",
		tags: ["performer", "supporting"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2019"
		}],
		credits: [{
			role: "Supporting",
			title: "Eastern Standard",
			year: "2024",
			kind: "productions",
			id: "eastern-standard"
		}, {
			role: "Ensemble",
			title: "Glass Harbor",
			year: "2022–",
			kind: "productions",
			id: "glass-harbor"
		}],
		related: [{
			kind: "companies",
			id: "northstar-pictures"
		}],
		socials: [{
			platform: "Instagram",
			handle: "@daxharlan"
		}],
		source: "index"
	},
	{
		id: "amara-voss",
		kind: "performers",
		name: "Amara Voss",
		subtitle: "Performer",
		summary: "Pine & Vale contract, Vancouver. Lead of Salt & Copper. Occasional Los Angeles days.",
		tags: [
			"performer",
			"vancouver",
			"pine-vale"
		],
		region: "Vancouver",
		status: "Contract",
		facts: [{
			label: "First credited",
			value: "2020"
		}, {
			label: "Contract",
			value: "Pine & Vale, 2021–"
		}],
		credits: [{
			role: "Lead",
			title: "Salt & Copper",
			year: "2023",
			kind: "productions",
			id: "salt-and-copper"
		}, {
			role: "Guest",
			title: "Glass Harbor",
			year: "2024",
			kind: "productions",
			id: "glass-harbor"
		}],
		related: [{
			kind: "companies",
			id: "pine-vale"
		}, {
			kind: "performers",
			id: "maren-dahl"
		}],
		socials: [{
			platform: "Instagram",
			handle: "@amaravoss"
		}],
		source: "index"
	},
	{
		id: "nico-bell",
		kind: "performers",
		name: "Nico Bell",
		subtitle: "Performer",
		summary: "Helix and Cobalt. Live-ticketed shows plus studio days; talks age-assurance at Counsel Day.",
		tags: [
			"performer",
			"live",
			"cobalt"
		],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2018"
		}, {
			label: "Live",
			value: "Cobalt"
		}],
		credits: [{
			role: "Host",
			title: "Cobalt nights",
			year: "2019–",
			kind: "companies",
			id: "cobalt-interactive"
		}, {
			role: "Supporting",
			title: "A Room in Silverlake",
			year: "2023",
			kind: "productions",
			id: "silverlake"
		}],
		related: [{
			kind: "companies",
			id: "cobalt-interactive"
		}, {
			kind: "events",
			id: "counsel-day-2026"
		}],
		socials: [{
			platform: "Cobalt",
			handle: "nicobell"
		}, {
			platform: "X",
			handle: "@nicobell"
		}],
		source: "index"
	},
	{
		id: "percy-lane",
		kind: "performers",
		name: "Persephone Lane",
		subtitle: "Performer",
		aka: ["Percy Lane"],
		summary: "Trans performer-director. Nightjar and independent Vellum. Managed by Nina Braswell. Palisade Breakthrough, 2023.",
		tags: [
			"performer",
			"director",
			"trans"
		],
		region: "Los Angeles",
		status: "Independent",
		facts: [
			{
				label: "First credited",
				value: "2020"
			},
			{
				label: "Management",
				value: "Nina Braswell"
			},
			{
				label: "Awards",
				value: "Palisade Breakthrough, 2023"
			}
		],
		credits: [{
			role: "Lead",
			title: "Second Unit",
			year: "2025",
			kind: "productions",
			id: "second-unit"
		}, {
			role: "Lead",
			title: "Low Light",
			year: "2025",
			kind: "productions",
			id: "low-light"
		}],
		related: [
			{
				kind: "agents",
				id: "nina-braswell"
			},
			{
				kind: "companies",
				id: "nightjar-films"
			},
			{
				kind: "performers",
				id: "wren-solis"
			}
		],
		socials: [{
			platform: "Instagram",
			handle: "@percylane"
		}, {
			platform: "Vellum",
			handle: "percy"
		}],
		source: "index"
	},
	{
		id: "kade-morin",
		kind: "performers",
		name: "Kade Morin",
		subtitle: "Performer · live",
		summary: "Cobalt headliner who crossed into Helix guest days. Direct-to-fan on Vellum.",
		tags: [
			"performer",
			"live",
			"cobalt"
		],
		region: "Miami",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2019"
		}, {
			label: "Live",
			value: "Cobalt"
		}],
		credits: [{
			role: "Headliner",
			title: "Cobalt",
			year: "2019–",
			kind: "companies",
			id: "cobalt-interactive"
		}, {
			role: "Guest",
			title: "Glass Harbor",
			year: "2023",
			kind: "productions",
			id: "glass-harbor"
		}],
		related: [{
			kind: "companies",
			id: "cobalt-interactive"
		}, {
			kind: "companies",
			id: "vellum-digital"
		}],
		socials: [{
			platform: "Cobalt",
			handle: "kade"
		}, {
			platform: "Vellum",
			handle: "kade"
		}],
		source: "index"
	},
	{
		id: "yara-okonkwo",
		kind: "performers",
		name: "Yara Okonkwo",
		subtitle: "Performer",
		summary: "Northstar lead. Eastern Standard opposite Roman Calder. Palisade Best Lead nominee, 2025.",
		tags: [
			"performer",
			"northstar",
			"features"
		],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2018"
		}, {
			label: "Awards",
			value: "Palisade Best Lead nominee, 2025"
		}],
		credits: [{
			role: "Lead",
			title: "Eastern Standard",
			year: "2024",
			kind: "productions",
			id: "eastern-standard"
		}, {
			role: "Lead",
			title: "The Palisade Brief",
			year: "2025",
			kind: "productions",
			id: "palisade-brief"
		}],
		related: [{
			kind: "companies",
			id: "northstar-pictures"
		}, {
			kind: "performers",
			id: "roman-calder"
		}],
		socials: [{
			platform: "Instagram",
			handle: "@yaraokonkwo"
		}, {
			platform: "X",
			handle: "@yaraokonkwo"
		}],
		source: "index"
	},
	{
		id: "ellis-hart",
		kind: "performers",
		name: "Ellis Hart",
		subtitle: "Performer",
		summary: "Non-binary performer. Nightjar and Vellum. Palisade ensemble, 2025.",
		tags: ["performer", "nightjar"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2022"
		}, {
			label: "Management",
			value: "Nina Braswell"
		}],
		credits: [{
			role: "Ensemble",
			title: "Second Unit",
			year: "2025",
			kind: "productions",
			id: "second-unit"
		}, {
			role: "Supporting",
			title: "Low Light",
			year: "2025",
			kind: "productions",
			id: "low-light"
		}],
		related: [{
			kind: "agents",
			id: "nina-braswell"
		}, {
			kind: "companies",
			id: "nightjar-films"
		}],
		socials: [{
			platform: "Instagram",
			handle: "@ellishart"
		}, {
			platform: "Vellum",
			handle: "ellis"
		}],
		source: "index"
	},
	{
		id: "maren-dahl",
		kind: "performers",
		name: "Maren Dahl",
		subtitle: "Performer · director",
		summary: "Pine & Vale partner in Vancouver. Directed Salt & Copper; stills background.",
		tags: [
			"performer",
			"director",
			"vancouver"
		],
		region: "Vancouver",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2016"
		}, {
			label: "House",
			value: "Pine & Vale"
		}],
		credits: [{
			role: "Director / lead",
			title: "Salt & Copper",
			year: "2023",
			kind: "productions",
			id: "salt-and-copper"
		}],
		related: [{
			kind: "companies",
			id: "pine-vale"
		}, {
			kind: "performers",
			id: "amara-voss"
		}],
		socials: [{
			platform: "Instagram",
			handle: "@marendahl"
		}],
		source: "index"
	},
	{
		id: "felix-arden",
		kind: "performers",
		name: "Felix Arden",
		subtitle: "Performer",
		summary: "Afterlight contract, Berlin. English- and German-language credits. Venus Berlin regular.",
		tags: [
			"performer",
			"berlin",
			"afterlight"
		],
		region: "Berlin",
		status: "Contract",
		facts: [{
			label: "First credited",
			value: "2021"
		}, {
			label: "Representation",
			value: "Sabine Köhler"
		}],
		credits: [{
			role: "Lead",
			title: "Corridor",
			year: "2025",
			kind: "productions",
			id: "corridor"
		}],
		related: [
			{
				kind: "agents",
				id: "sabine-kohler"
			},
			{
				kind: "companies",
				id: "afterlight-media"
			},
			{
				kind: "events",
				id: "venus-berlin-2026"
			}
		],
		socials: [{
			platform: "Instagram",
			handle: "@felixarden"
		}],
		source: "index"
	},
	{
		id: "sienna-park",
		kind: "performers",
		name: "Sienna Park",
		subtitle: "Performer",
		summary: "Pine & Vale and Helix guest. Split representation: Devon Reyes (D2F) and Haruki Mori (Pacific studio days).",
		tags: [
			"performer",
			"vancouver",
			"los-angeles"
		],
		region: "Vancouver",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2020"
		}, {
			label: "Representation",
			value: "Reyes / Mori"
		}],
		credits: [{
			role: "Supporting",
			title: "Salt & Copper",
			year: "2023",
			kind: "productions",
			id: "salt-and-copper"
		}, {
			role: "Guest",
			title: "Wintering",
			year: "2022",
			kind: "productions",
			id: "wintering"
		}],
		related: [
			{
				kind: "agents",
				id: "devon-reyes"
			},
			{
				kind: "agents",
				id: "haruki-mori"
			},
			{
				kind: "companies",
				id: "pine-vale"
			}
		],
		socials: [{
			platform: "Vellum",
			handle: "sienna"
		}, {
			platform: "Instagram",
			handle: "@siennapark"
		}],
		source: "index"
	},
	{
		id: "omar-leclerc",
		kind: "performers",
		name: "Omar Leclerc",
		subtitle: "Performer",
		summary: "Afterlight lead. French-English bilingual. Corridor opposite Liora Chen and Tamsin Rowe.",
		tags: [
			"performer",
			"berlin",
			"paris"
		],
		region: "Berlin / Paris",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2017"
		}, {
			label: "Representation",
			value: "Sabine Köhler"
		}],
		credits: [{
			role: "Lead",
			title: "Corridor",
			year: "2025",
			kind: "productions",
			id: "corridor"
		}],
		related: [
			{
				kind: "agents",
				id: "sabine-kohler"
			},
			{
				kind: "companies",
				id: "afterlight-media"
			},
			{
				kind: "performers",
				id: "tamsin-rowe"
			}
		],
		socials: [{
			platform: "Instagram",
			handle: "@omarleclerc"
		}],
		source: "index"
	},
	{
		id: "tamsin-rowe",
		kind: "performers",
		name: "Tamsin Rowe",
		subtitle: "Performer · producer",
		summary: "Afterlight producer-performer. UK-born, Berlin-based. Advises on Online Safety Act storefront copy.",
		tags: [
			"performer",
			"producer",
			"berlin",
			"uk"
		],
		region: "Berlin",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2015"
		}, {
			label: "Representation",
			value: "Sabine Köhler"
		}],
		credits: [{
			role: "Producer / lead",
			title: "Corridor",
			year: "2025",
			kind: "productions",
			id: "corridor"
		}],
		related: [
			{
				kind: "agents",
				id: "sabine-kohler"
			},
			{
				kind: "companies",
				id: "afterlight-media"
			},
			{
				kind: "law",
				id: "uk-online-safety"
			}
		],
		socials: [{
			platform: "X",
			handle: "@tamsinrowe"
		}, {
			platform: "Instagram",
			handle: "@tamsinrowe"
		}],
		source: "index"
	},
	{
		id: "bo-calder",
		kind: "performers",
		name: "Bo Calder",
		subtitle: "Performer",
		summary: "Younger Calder. Helix guest and Vellum. First credited 2022.",
		tags: ["performer", "helix"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2022"
		}, {
			label: "Family",
			value: "Sibling of Roman Calder"
		}],
		credits: [{
			role: "Guest",
			title: "Glass Harbor",
			year: "2023",
			kind: "productions",
			id: "glass-harbor"
		}, {
			role: "Supporting",
			title: "A Room in Silverlake",
			year: "2023",
			kind: "productions",
			id: "silverlake"
		}],
		related: [{
			kind: "performers",
			id: "roman-calder",
			label: "Sibling"
		}, {
			kind: "companies",
			id: "helix-house"
		}],
		socials: [{
			platform: "Instagram",
			handle: "@bocalder"
		}, {
			platform: "Vellum",
			handle: "bo"
		}],
		source: "index"
	},
	{
		id: "rivka-stein",
		kind: "performers",
		name: "Rivka Stein",
		subtitle: "Performer · writer",
		summary: "Wrote The Palisade Brief for Northstar; occasional on-camera. Craft-side Palisade nominee, 2025.",
		tags: [
			"writer",
			"performer",
			"northstar"
		],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2017"
		}, {
			label: "Primary",
			value: "Writing"
		}],
		credits: [{
			role: "Writer",
			title: "The Palisade Brief",
			year: "2025",
			kind: "productions",
			id: "palisade-brief"
		}, {
			role: "Writer",
			title: "Eastern Standard",
			year: "2024",
			kind: "productions",
			id: "eastern-standard"
		}],
		related: [{
			kind: "companies",
			id: "northstar-pictures"
		}, {
			kind: "performers",
			id: "evander-crowe"
		}],
		socials: [{
			platform: "X",
			handle: "@rivkastein"
		}],
		source: "index"
	},
	{
		id: "gideon-vale",
		kind: "performers",
		name: "Gideon Vale",
		subtitle: "Performer",
		summary: "Nightjar ensemble. Supporting in Low Light and Second Unit.",
		tags: ["performer", "nightjar"],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2021"
		}],
		credits: [{
			role: "Supporting",
			title: "Low Light",
			year: "2025",
			kind: "productions",
			id: "low-light"
		}, {
			role: "Ensemble",
			title: "Second Unit",
			year: "2025",
			kind: "productions",
			id: "second-unit"
		}],
		related: [{
			kind: "companies",
			id: "nightjar-films"
		}],
		socials: [{
			platform: "Instagram",
			handle: "@gideonvale"
		}],
		source: "index"
	},
	{
		id: "aisha-nasser",
		kind: "performers",
		name: "Aisha Nasser",
		subtitle: "Creator · performer",
		summary: "Vellum-native creator. Devon Reyes client. Speaks on card-network rules and 2257 for solo producers.",
		tags: [
			"creator",
			"direct-to-fan",
			"vellum"
		],
		region: "Chicago",
		status: "Independent",
		facts: [{
			label: "First credited",
			value: "2022"
		}, {
			label: "Representation",
			value: "Devon Reyes, Redwood"
		}],
		credits: [{
			role: "Creator",
			title: "Vellum studio",
			year: "2022–",
			kind: "companies",
			id: "vellum-digital"
		}],
		related: [
			{
				kind: "agents",
				id: "devon-reyes"
			},
			{
				kind: "companies",
				id: "vellum-digital"
			},
			{
				kind: "law",
				id: "usc-2257"
			},
			{
				kind: "law",
				id: "card-networks"
			}
		],
		socials: [{
			platform: "Vellum",
			handle: "aisha"
		}, {
			platform: "X",
			handle: "@aishanasser"
		}],
		source: "index"
	},
	{
		id: "cole-brennan",
		kind: "performers",
		name: "Cole Brennan",
		subtitle: "Performer",
		summary: "Helix supporting and Northstar features. Palisade ensemble, 2024.",
		tags: [
			"performer",
			"helix",
			"northstar"
		],
		region: "Los Angeles",
		status: "Active",
		facts: [{
			label: "First credited",
			value: "2018"
		}],
		credits: [
			{
				role: "Supporting",
				title: "Wintering",
				year: "2022",
				kind: "productions",
				id: "wintering"
			},
			{
				role: "Supporting",
				title: "The Night Ledger",
				year: "2021",
				kind: "productions",
				id: "the-night-ledger"
			},
			{
				role: "Ensemble",
				title: "Glass Harbor",
				year: "2020–",
				kind: "productions",
				id: "glass-harbor"
			}
		],
		related: [{
			kind: "companies",
			id: "helix-house"
		}, {
			kind: "companies",
			id: "northstar-pictures"
		}],
		socials: [{
			platform: "Instagram",
			handle: "@colebrennan"
		}],
		source: "index"
	},
	{
		id: "glass-harbor",
		kind: "productions",
		name: "Glass Harbor",
		subtitle: "Series · Helix House",
		summary: "Helix House flagship series, 2018–. Rotating company, director-led episodes, Palisade ensemble winner 2024.",
		body: "Glass Harbor is the standing series against which Helix House contracts are measured. Episodes are credited to individual directors; Jonah Peck casts a rotating company. The 2024 Palisade ensemble award went to the Harbor company.",
		tags: [
			"series",
			"helix",
			"flagship"
		],
		region: "Los Angeles",
		status: "Ongoing",
		facts: [
			{
				label: "Studio",
				value: "Helix House"
			},
			{
				label: "Years",
				value: "2018–"
			},
			{
				label: "Casting",
				value: "Jonah Peck, Meridian"
			},
			{
				label: "Awards",
				value: "Palisade Ensemble, 2024"
			}
		],
		credits: [
			{
				role: "Studio",
				title: "Helix House",
				year: "2018–",
				kind: "companies",
				id: "helix-house"
			},
			{
				role: "Casting",
				title: "Jonah Peck",
				year: "2018–",
				kind: "agents",
				id: "jonah-peck"
			},
			{
				role: "Lead",
				title: "Cassian Wolfe",
				year: "2018–",
				kind: "performers",
				id: "cassian-wolfe"
			},
			{
				role: "Lead",
				title: "Isla Vane",
				year: "2020–24",
				kind: "performers",
				id: "isla-vane"
			},
			{
				role: "Lead",
				title: "Juniper Hale",
				year: "2023–",
				kind: "performers",
				id: "juniper-hale"
			}
		],
		related: [
			{
				kind: "companies",
				id: "helix-house"
			},
			{
				kind: "performers",
				id: "cassian-wolfe"
			},
			{
				kind: "performers",
				id: "isla-vane"
			}
		],
		source: "index"
	},
	{
		id: "wintering",
		kind: "productions",
		name: "Wintering",
		subtitle: "Feature · Helix House",
		summary: "2022 Helix feature. Isla Vane and Cassian Wolfe. Palisade Best Feature nominee.",
		tags: ["feature", "helix"],
		region: "Los Angeles",
		status: "Released",
		facts: [
			{
				label: "Studio",
				value: "Helix House"
			},
			{
				label: "Year",
				value: "2022"
			},
			{
				label: "Distribution",
				value: "Eastbound"
			}
		],
		credits: [
			{
				role: "Lead",
				title: "Isla Vane",
				year: "2022",
				kind: "performers",
				id: "isla-vane"
			},
			{
				role: "Lead",
				title: "Cassian Wolfe",
				year: "2022",
				kind: "performers",
				id: "cassian-wolfe"
			},
			{
				role: "Supporting",
				title: "Juniper Hale",
				year: "2022",
				kind: "performers",
				id: "juniper-hale"
			},
			{
				role: "Supporting",
				title: "Cole Brennan",
				year: "2022",
				kind: "performers",
				id: "cole-brennan"
			}
		],
		related: [{
			kind: "companies",
			id: "helix-house"
		}, {
			kind: "companies",
			id: "eastbound"
		}],
		source: "index"
	},
	{
		id: "silverlake",
		kind: "productions",
		name: "A Room in Silverlake",
		subtitle: "Feature · Helix House",
		summary: "2023 feature that made Juniper Hale. Location-heavy, stills by Mateo Ruiz.",
		tags: ["feature", "helix"],
		region: "Los Angeles",
		status: "Released",
		facts: [{
			label: "Studio",
			value: "Helix House"
		}, {
			label: "Year",
			value: "2023"
		}],
		credits: [
			{
				role: "Lead",
				title: "Juniper Hale",
				year: "2023",
				kind: "performers",
				id: "juniper-hale"
			},
			{
				role: "Lead",
				title: "Isla Vane",
				year: "2023",
				kind: "performers",
				id: "isla-vane"
			},
			{
				role: "Lead",
				title: "Cassian Wolfe",
				year: "2023",
				kind: "performers",
				id: "cassian-wolfe"
			},
			{
				role: "Supporting",
				title: "Nico Bell",
				year: "2023",
				kind: "performers",
				id: "nico-bell"
			}
		],
		related: [{
			kind: "companies",
			id: "helix-house"
		}],
		source: "index"
	},
	{
		id: "the-night-ledger",
		kind: "productions",
		name: "The Night Ledger",
		subtitle: "Feature · Northstar",
		summary: "2021 Northstar feature directed by Evander Crowe. Palisade Best Feature, 2022.",
		tags: [
			"feature",
			"northstar",
			"award"
		],
		region: "Los Angeles",
		status: "Released",
		facts: [
			{
				label: "Studio",
				value: "Northstar Pictures"
			},
			{
				label: "Year",
				value: "2021"
			},
			{
				label: "Director",
				value: "Evander Crowe"
			},
			{
				label: "Awards",
				value: "Palisade Best Feature, 2022"
			}
		],
		credits: [
			{
				role: "Director",
				title: "Evander Crowe",
				year: "2021",
				kind: "performers",
				id: "evander-crowe"
			},
			{
				role: "Lead",
				title: "Sable Quinn",
				year: "2021",
				kind: "performers",
				id: "sable-quinn"
			},
			{
				role: "Lead",
				title: "Roman Calder",
				year: "2021",
				kind: "performers",
				id: "roman-calder"
			},
			{
				role: "Supporting",
				title: "Wren Solis",
				year: "2021",
				kind: "performers",
				id: "wren-solis"
			}
		],
		related: [{
			kind: "companies",
			id: "northstar-pictures"
		}, {
			kind: "performers",
			id: "evander-crowe"
		}],
		source: "index"
	},
	{
		id: "eastern-standard",
		kind: "productions",
		name: "Eastern Standard",
		subtitle: "Feature · Northstar",
		summary: "2024 Crowe/Stein collaboration. Yara Okonkwo and Roman Calder. Palisade Best Lead nominee (Okonkwo), 2025.",
		tags: ["feature", "northstar"],
		region: "Los Angeles",
		status: "Released",
		facts: [
			{
				label: "Studio",
				value: "Northstar Pictures"
			},
			{
				label: "Year",
				value: "2024"
			},
			{
				label: "Director",
				value: "Evander Crowe"
			},
			{
				label: "Writer",
				value: "Rivka Stein"
			}
		],
		credits: [
			{
				role: "Director",
				title: "Evander Crowe",
				year: "2024",
				kind: "performers",
				id: "evander-crowe"
			},
			{
				role: "Writer",
				title: "Rivka Stein",
				year: "2024",
				kind: "performers",
				id: "rivka-stein"
			},
			{
				role: "Lead",
				title: "Yara Okonkwo",
				year: "2024",
				kind: "performers",
				id: "yara-okonkwo"
			},
			{
				role: "Lead",
				title: "Roman Calder",
				year: "2024",
				kind: "performers",
				id: "roman-calder"
			}
		],
		related: [{
			kind: "companies",
			id: "northstar-pictures"
		}],
		source: "index"
	},
	{
		id: "palisade-brief",
		kind: "productions",
		name: "The Palisade Brief",
		subtitle: "Feature · Northstar",
		summary: "2025 Northstar title written by Rivka Stein. A feature about a counsel's office — meta, on purpose.",
		tags: ["feature", "northstar"],
		region: "Los Angeles",
		status: "Released",
		facts: [{
			label: "Studio",
			value: "Northstar Pictures"
		}, {
			label: "Year",
			value: "2025"
		}],
		credits: [
			{
				role: "Director",
				title: "Evander Crowe",
				year: "2025",
				kind: "performers",
				id: "evander-crowe"
			},
			{
				role: "Writer",
				title: "Rivka Stein",
				year: "2025",
				kind: "performers",
				id: "rivka-stein"
			},
			{
				role: "Lead",
				title: "Yara Okonkwo",
				year: "2025",
				kind: "performers",
				id: "yara-okonkwo"
			}
		],
		related: [{
			kind: "companies",
			id: "northstar-pictures"
		}, {
			kind: "companies",
			id: "palisade-institute"
		}],
		source: "index"
	},
	{
		id: "low-light",
		kind: "productions",
		name: "Low Light",
		subtitle: "Feature · Nightjar",
		summary: "Isla Vane's directing debut, 2025. Wren Solis and Percy Lane. Nightjar imprint.",
		tags: [
			"feature",
			"nightjar",
			"directing-debut"
		],
		region: "Los Angeles",
		status: "Released",
		facts: [
			{
				label: "Studio",
				value: "Nightjar Films"
			},
			{
				label: "Year",
				value: "2025"
			},
			{
				label: "Director",
				value: "Isla Vane"
			}
		],
		credits: [
			{
				role: "Director",
				title: "Isla Vane",
				year: "2025",
				kind: "performers",
				id: "isla-vane"
			},
			{
				role: "Lead",
				title: "Wren Solis",
				year: "2025",
				kind: "performers",
				id: "wren-solis"
			},
			{
				role: "Lead",
				title: "Persephone Lane",
				year: "2025",
				kind: "performers",
				id: "percy-lane"
			},
			{
				role: "Supporting",
				title: "Ellis Hart",
				year: "2025",
				kind: "performers",
				id: "ellis-hart"
			}
		],
		related: [{
			kind: "companies",
			id: "nightjar-films"
		}, {
			kind: "performers",
			id: "isla-vane"
		}],
		source: "index"
	},
	{
		id: "second-unit",
		kind: "productions",
		name: "Second Unit",
		subtitle: "Feature · Nightjar",
		summary: "Wren Solis directs. Percy Lane, Ellis Hart, Noa Pell guest. 2025.",
		tags: ["feature", "nightjar"],
		region: "Los Angeles",
		status: "Released",
		facts: [
			{
				label: "Studio",
				value: "Nightjar Films"
			},
			{
				label: "Year",
				value: "2025"
			},
			{
				label: "Director",
				value: "Wren Solis"
			}
		],
		credits: [
			{
				role: "Director",
				title: "Wren Solis",
				year: "2025",
				kind: "performers",
				id: "wren-solis"
			},
			{
				role: "Lead",
				title: "Persephone Lane",
				year: "2025",
				kind: "performers",
				id: "percy-lane"
			},
			{
				role: "Ensemble",
				title: "Ellis Hart",
				year: "2025",
				kind: "performers",
				id: "ellis-hart"
			},
			{
				role: "Guest",
				title: "Noa Pell",
				year: "2025",
				kind: "performers",
				id: "noa-pell"
			}
		],
		related: [{
			kind: "companies",
			id: "nightjar-films"
		}],
		source: "index"
	},
	{
		id: "corridor",
		kind: "productions",
		name: "Corridor",
		subtitle: "Feature · Afterlight",
		summary: "2025 Berlin feature produced by Tamsin Rowe. English-language, shot for EU and North American sales.",
		tags: [
			"feature",
			"afterlight",
			"berlin"
		],
		region: "Berlin",
		status: "Released",
		facts: [
			{
				label: "Studio",
				value: "Afterlight Media"
			},
			{
				label: "Year",
				value: "2025"
			},
			{
				label: "Producer",
				value: "Tamsin Rowe"
			},
			{
				label: "Sales",
				value: "Eastbound (English)"
			}
		],
		credits: [
			{
				role: "Producer / lead",
				title: "Tamsin Rowe",
				year: "2025",
				kind: "performers",
				id: "tamsin-rowe"
			},
			{
				role: "Lead",
				title: "Omar Leclerc",
				year: "2025",
				kind: "performers",
				id: "omar-leclerc"
			},
			{
				role: "Lead",
				title: "Liora Chen",
				year: "2025",
				kind: "performers",
				id: "liora-chen"
			},
			{
				role: "Lead",
				title: "Felix Arden",
				year: "2025",
				kind: "performers",
				id: "felix-arden"
			}
		],
		related: [
			{
				kind: "companies",
				id: "afterlight-media"
			},
			{
				kind: "companies",
				id: "eastbound"
			},
			{
				kind: "events",
				id: "venus-berlin-2026"
			}
		],
		source: "index"
	},
	{
		id: "salt-and-copper",
		kind: "productions",
		name: "Salt & Copper",
		subtitle: "Feature · Pine & Vale",
		summary: "Maren Dahl directs in Vancouver, 2023. Amara Voss and Mateo Ruiz. Stills-led campaign.",
		tags: [
			"feature",
			"pine-vale",
			"vancouver"
		],
		region: "Vancouver",
		status: "Released",
		facts: [
			{
				label: "Studio",
				value: "Pine & Vale"
			},
			{
				label: "Year",
				value: "2023"
			},
			{
				label: "Director",
				value: "Maren Dahl"
			}
		],
		credits: [
			{
				role: "Director / lead",
				title: "Maren Dahl",
				year: "2023",
				kind: "performers",
				id: "maren-dahl"
			},
			{
				role: "Lead",
				title: "Amara Voss",
				year: "2023",
				kind: "performers",
				id: "amara-voss"
			},
			{
				role: "Lead",
				title: "Mateo Ruiz",
				year: "2023",
				kind: "performers",
				id: "mateo-ruiz"
			},
			{
				role: "Supporting",
				title: "Sienna Park",
				year: "2023",
				kind: "performers",
				id: "sienna-park"
			}
		],
		related: [{
			kind: "companies",
			id: "pine-vale"
		}],
		source: "index"
	}
];
var desk = [
	{
		id: "xbiz-2026",
		kind: "events",
		name: "XBIZ 2026",
		subtitle: "Trade show · Hollywood",
		summary: "North American flagship adult-industry trade show. Studios, platforms, talent, and buyers. 12–15 January 2026, Hollywood.",
		body: "XBIZ is the principal West Coast trade gathering: meetings, product, and the XBIZ Awards. The 2026 edition ran 12–15 January in Hollywood. fleshsesh indexes it as a public calendar record.",
		tags: [
			"trade-show",
			"awards",
			"hollywood",
			"public"
		],
		region: "Hollywood, California",
		status: "Past",
		venue: "Hollywood, California",
		dateStart: "2026-01-12",
		dateEnd: "2026-01-15",
		facts: [
			{
				label: "When",
				value: "12–15 January 2026"
			},
			{
				label: "Where",
				value: "Hollywood, California"
			},
			{
				label: "Type",
				value: "Trade show & awards"
			}
		],
		related: [
			{
				kind: "companies",
				id: "copperline-pr"
			},
			{
				kind: "companies",
				id: "fsc"
			},
			{
				kind: "events",
				id: "avn-expo-2026"
			}
		],
		socials: [{
			platform: "Site",
			handle: "xbiz.com"
		}],
		source: "public"
	},
	{
		id: "avn-expo-2026",
		kind: "events",
		name: "AVN Expo 2026",
		subtitle: "Expo · Las Vegas",
		summary: "Largest U.S. adult expo. Floor, seminars, and the AVN Awards. 21–24 January 2026, Virgin Hotels Las Vegas.",
		body: "The AVN Expo (Adult Entertainment Expo) concentrates studios, pleasure brands, talent, and press in Las Vegas each January. The 2026 show ran 21–24 January at Virgin Hotels Las Vegas. Awards night sits inside the same week.",
		tags: [
			"expo",
			"awards",
			"las-vegas",
			"public"
		],
		region: "Las Vegas",
		status: "Past",
		venue: "Virgin Hotels Las Vegas",
		dateStart: "2026-01-21",
		dateEnd: "2026-01-24",
		facts: [
			{
				label: "When",
				value: "21–24 January 2026"
			},
			{
				label: "Where",
				value: "Virgin Hotels Las Vegas"
			},
			{
				label: "Type",
				value: "Expo & awards"
			}
		],
		related: [
			{
				kind: "events",
				id: "palisade-honors-2026"
			},
			{
				kind: "companies",
				id: "eastbound"
			},
			{
				kind: "companies",
				id: "fsc"
			}
		],
		socials: [{
			platform: "Site",
			handle: "avn.com"
		}],
		source: "public"
	},
	{
		id: "venus-berlin-2026",
		kind: "events",
		name: "Venus Berlin 2026",
		subtitle: "Trade fair · Berlin",
		summary: "Europe's largest adult products and multimedia fair. 22–25 October 2026, Messe Berlin.",
		body: "Venus Berlin, held since the mid-1990s at the Messegelände, is the European trade and consumer fair for adult products, platforms, and performance. The 2026 edition is 22–25 October. Afterlight Media and Sabine Köhler's book typically work the floor.",
		tags: [
			"trade-fair",
			"berlin",
			"europe",
			"public",
			"upcoming"
		],
		region: "Berlin",
		status: "Upcoming",
		venue: "Messe Berlin",
		dateStart: "2026-10-22",
		dateEnd: "2026-10-25",
		facts: [
			{
				label: "When",
				value: "22–25 October 2026"
			},
			{
				label: "Where",
				value: "Messe Berlin"
			},
			{
				label: "Type",
				value: "Trade fair"
			}
		],
		related: [
			{
				kind: "companies",
				id: "afterlight-media"
			},
			{
				kind: "agents",
				id: "sabine-kohler"
			},
			{
				kind: "productions",
				id: "corridor"
			}
		],
		socials: [{
			platform: "Site",
			handle: "venus-berlin.com"
		}],
		source: "public"
	},
	{
		id: "palisade-honors-2026",
		kind: "events",
		name: "Palisade Honors 2026",
		subtitle: "Awards · Las Vegas",
		summary: "Palisade Institute's annual craft ballot and ceremony, held during Las Vegas expo week.",
		tags: ["awards", "las-vegas"],
		region: "Las Vegas",
		status: "Past",
		venue: "Las Vegas",
		dateStart: "2026-01-23",
		facts: [{
			label: "When",
			value: "23 January 2026"
		}, {
			label: "Body",
			value: "Palisade Institute"
		}],
		related: [
			{
				kind: "companies",
				id: "palisade-institute"
			},
			{
				kind: "events",
				id: "avn-expo-2026"
			},
			{
				kind: "productions",
				id: "glass-harbor"
			}
		],
		source: "index"
	},
	{
		id: "nightjar-forum-2026",
		kind: "events",
		name: "Nightjar Forum 2026",
		subtitle: "Creator & director forum",
		summary: "Small Los Angeles forum for performer-directors, stills, and independent slates. 12–14 November 2026.",
		tags: [
			"forum",
			"directors",
			"los-angeles",
			"upcoming"
		],
		region: "Los Angeles",
		status: "Upcoming",
		venue: "Los Angeles",
		dateStart: "2026-11-12",
		dateEnd: "2026-11-14",
		facts: [{
			label: "When",
			value: "12–14 November 2026"
		}, {
			label: "Host",
			value: "Nightjar Films"
		}],
		related: [
			{
				kind: "companies",
				id: "nightjar-films"
			},
			{
				kind: "performers",
				id: "wren-solis"
			},
			{
				kind: "performers",
				id: "isla-vane"
			}
		],
		source: "index"
	},
	{
		id: "counsel-day-2026",
		kind: "events",
		name: "Counsel Day 2026",
		subtitle: "Legal briefing",
		summary: "Annual CLE-style briefing from Counsel Group: 2257, state age-verification maps, TAKE IT DOWN, and card-network rules. 18 September 2026, Los Angeles.",
		tags: [
			"legal",
			"compliance",
			"los-angeles",
			"upcoming"
		],
		region: "Los Angeles",
		status: "Upcoming",
		venue: "Los Angeles",
		dateStart: "2026-09-18",
		facts: [{
			label: "When",
			value: "18 September 2026"
		}, {
			label: "Host",
			value: "Counsel Group"
		}],
		related: [
			{
				kind: "companies",
				id: "counsel-group"
			},
			{
				kind: "law",
				id: "usc-2257"
			},
			{
				kind: "law",
				id: "fsc-v-paxton"
			},
			{
				kind: "law",
				id: "take-it-down"
			},
			{
				kind: "performers",
				id: "nico-bell"
			}
		],
		source: "index"
	},
	{
		id: "ledger-week-2026",
		kind: "events",
		name: "Ledger Week 2026",
		subtitle: "Creator convening",
		summary: "Direct-to-fan and platform week. Panels on 2257 for solo producers, payments, and notice-and-removal. March 2026, Phoenix.",
		tags: [
			"creators",
			"platforms",
			"phoenix"
		],
		region: "Phoenix",
		status: "Past",
		venue: "Phoenix, Arizona",
		dateStart: "2026-03-04",
		dateEnd: "2026-03-07",
		facts: [{
			label: "When",
			value: "4–7 March 2026"
		}, {
			label: "Where",
			value: "Phoenix"
		}],
		related: [
			{
				kind: "performers",
				id: "noa-pell"
			},
			{
				kind: "companies",
				id: "vellum-digital"
			},
			{
				kind: "law",
				id: "usc-2257"
			}
		],
		source: "index"
	},
	{
		id: "usc-2257",
		kind: "law",
		name: "18 U.S.C. § 2257",
		subtitle: "Record-keeping requirements",
		citation: "18 U.S.C. § 2257",
		jurisdiction: "United States (federal)",
		summary: "Federal criminal statute requiring producers of actual sexually explicit visual depictions to examine picture identification, keep indexed records, and affix a custodian statement to every copy — including every webpage.",
		body: "Section 2257 is the backbone of adult-industry compliance in the United States. Anyone who produces visual depictions of actual sexually explicit conduct must, before production, examine a government-issued picture identification document for every performer, record the legal name and date of birth, cross-index every alias and stage name, and keep those records available for inspection. A statement naming the Custodian of Records and a physical address must appear on every copy, including every page of a website on which the matter appears.\n\nPrimary producers (the people who actually shoot) and secondary producers (those who duplicate, manage content, or publish) both have duties; platforms such as Vellum typically take a secondary-producer posture while creators remain primary producers of their own work. Failure is a federal felony — up to five years for a first offense.\n\nThis is a summary of public law, not legal advice. Producers should retain qualified counsel and read 28 C.F.R. Part 75 alongside the statute.",
		tags: [
			"federal",
			"2257",
			"records",
			"criminal",
			"producers"
		],
		status: "In force",
		facts: [
			{
				label: "Citation",
				value: "18 U.S.C. § 2257"
			},
			{
				label: "Enacted posture",
				value: "Post-1990 depictions"
			},
			{
				label: "Penalty",
				value: "Felony; up to 5 years (first)"
			},
			{
				label: "Companion",
				value: "28 C.F.R. Part 75"
			}
		],
		related: [
			{
				kind: "law",
				id: "usc-2257a"
			},
			{
				kind: "law",
				id: "cfr-28-75"
			},
			{
				kind: "companies",
				id: "helix-house"
			},
			{
				kind: "companies",
				id: "vellum-digital"
			},
			{
				kind: "companies",
				id: "counsel-group"
			}
		],
		source: "public"
	},
	{
		id: "usc-2257a",
		kind: "law",
		name: "18 U.S.C. § 2257A",
		subtitle: "Simulated depictions",
		citation: "18 U.S.C. § 2257A",
		jurisdiction: "United States (federal)",
		summary: "Extends 2257-style record-keeping to simulated sexually explicit conduct and to lascivious exhibition, with a certification exemption for some mainstream producers.",
		body: "Section 2257A covers visual depictions of simulated sexually explicit conduct and certain lascivious exhibition. Producers must keep performer records similar to § 2257 unless they qualify for a certification exemption used mainly by mainstream film and television that already complies with other child-protection regimes.\n\nAdult producers generally should not assume they qualify for that exemption. Counsel Group's desk treats 2257 and 2257A as one program with two statutory hooks.\n\nNot legal advice.",
		tags: [
			"federal",
			"2257a",
			"simulated",
			"records"
		],
		status: "In force",
		facts: [{
			label: "Citation",
			value: "18 U.S.C. § 2257A"
		}, {
			label: "Covers",
			value: "Simulated conduct; lascivious exhibition"
		}],
		related: [{
			kind: "law",
			id: "usc-2257"
		}, {
			kind: "law",
			id: "cfr-28-75"
		}],
		source: "public"
	},
	{
		id: "cfr-28-75",
		kind: "law",
		name: "28 C.F.R. Part 75",
		subtitle: "Attorney General regulations",
		citation: "28 C.F.R. §§ 75.1–75.9",
		jurisdiction: "United States (federal)",
		summary: "The regulations that make 2257 operational: what a record must contain, how it is indexed, where it is kept, how long, and how it is inspected.",
		body: "Part 75 is the operational manual for §§ 2257 and 2257A. It specifies picture-identification copies, alphabetical indexing by legal name with cross-references for aliases and titles, retention (generally seven years from creation or last amendment, and five years after a producer leaves the business — whichever runs longer), and inspection during ordinary business hours.\n\nA 2257 program that tracks the statute but ignores Part 75 is incomplete. Custodians, filenames, and URL indexes live here.\n\nNot legal advice.",
		tags: [
			"federal",
			"regulation",
			"2257",
			"retention"
		],
		status: "In force",
		facts: [{
			label: "Citation",
			value: "28 C.F.R. Part 75"
		}, {
			label: "Retention",
			value: "7 years / 5 years after exit"
		}],
		related: [{
			kind: "law",
			id: "usc-2257"
		}, {
			kind: "law",
			id: "usc-2257a"
		}],
		source: "public"
	},
	{
		id: "fosta-sesta",
		kind: "law",
		name: "FOSTA-SESTA",
		subtitle: "Platform liability carve-out",
		citation: "Allow States and Victims to Fight Online Sex Trafficking Act, Pub. L. 115–164",
		jurisdiction: "United States (federal)",
		summary: "2018 statute that carved sex-trafficking claims out of Section 230 immunity and created federal civil and criminal exposure for platforms that promote or facilitate prostitution.",
		body: "FOSTA-SESTA, signed in 2018, narrowed 47 U.S.C. § 230 so that platforms can be held responsible for certain sex-trafficking and prostitution-related activity. It did not outlaw adult content, but it changed how hosts, classifieds, and social products moderate sexual services and escort advertising.\n\nThe practical effect on the trade has been a chill in advertising channels, more aggressive terms of service, and a migration of independent work onto platforms that can show a compliance story. It sits beside, and is often confused with, 18 U.S.C. § 1591.\n\nNot legal advice.",
		tags: [
			"federal",
			"platforms",
			"section-230",
			"trafficking"
		],
		status: "In force",
		facts: [
			{
				label: "Enacted",
				value: "2018"
			},
			{
				label: "Public law",
				value: "Pub. L. 115–164"
			},
			{
				label: "Hooks",
				value: "§ 230 carve-out; 18 U.S.C. § 2421A"
			}
		],
		related: [
			{
				kind: "law",
				id: "section-230"
			},
			{
				kind: "law",
				id: "usc-1591"
			},
			{
				kind: "companies",
				id: "aurelia-network"
			},
			{
				kind: "companies",
				id: "fsc"
			}
		],
		source: "public"
	},
	{
		id: "section-230",
		kind: "law",
		name: "47 U.S.C. § 230",
		subtitle: "Platform immunity",
		citation: "47 U.S.C. § 230",
		jurisdiction: "United States (federal)",
		summary: "Communications Decency Act provision that generally immunizes interactive computer services from liability for third-party speech, with statutory exceptions including federal criminal law and FOSTA's trafficking carve-out.",
		body: "Section 230 is why user-generated platforms can host speech without being treated as the publisher of every post. Adult platforms rely on it for comments, profiles, and uploaded media — subject to federal criminal law (including 2257's own duties where they apply) and the FOSTA-SESTA exceptions.\n\nIt is not a license to ignore record-keeping, age-verification statutes, or the TAKE IT DOWN Act's notice-and-removal duties, which are separate regimes.\n\nNot legal advice.",
		tags: [
			"federal",
			"platforms",
			"immunity",
			"cda"
		],
		status: "In force",
		facts: [{
			label: "Citation",
			value: "47 U.S.C. § 230"
		}, {
			label: "Enacted",
			value: "1996"
		}],
		related: [
			{
				kind: "law",
				id: "fosta-sesta"
			},
			{
				kind: "law",
				id: "take-it-down"
			},
			{
				kind: "law",
				id: "dmca-512"
			}
		],
		source: "public"
	},
	{
		id: "miller-v-california",
		kind: "law",
		name: "Miller v. California",
		subtitle: "Obscenity test",
		citation: "413 U.S. 15 (1973)",
		jurisdiction: "United States (Supreme Court)",
		summary: "The three-part test that decides whether material is legally obscene — and therefore unprotected by the First Amendment.",
		body: "Miller asks whether the average person, applying contemporary community standards, would find that the work, taken as a whole, appeals to the prurient interest; whether it depicts sexual conduct in a patently offensive way as defined by state law; and whether it lacks serious literary, artistic, political, or scientific value.\n\nMost commercially distributed adult material is designed to sit on the protected side of Miller. The test still governs criminal obscenity prosecutions and is the backdrop against which later cases (Ashcroft, Paxton) reason about what states may do to keep material from minors.\n\nNot legal advice.",
		tags: [
			"case",
			"obscenity",
			"first-amendment",
			"supreme-court"
		],
		status: "Leading case",
		facts: [{
			label: "Citation",
			value: "413 U.S. 15 (1973)"
		}, {
			label: "Court",
			value: "U.S. Supreme Court"
		}],
		related: [{
			kind: "law",
			id: "ashcroft-fsc"
		}, {
			kind: "law",
			id: "fsc-v-paxton"
		}],
		source: "public"
	},
	{
		id: "ashcroft-fsc",
		kind: "law",
		name: "Ashcroft v. Free Speech Coalition",
		subtitle: "Virtual depictions",
		citation: "535 U.S. 234 (2002)",
		jurisdiction: "United States (Supreme Court)",
		summary: "Struck down parts of the CPPA that banned sexually explicit images that appeared to depict minors but were produced without real children — including adult actors and purely virtual images.",
		body: "The Court held that the First Amendment does not permit Congress to ban protected adult speech merely because it might be mistaken for illegal child pornography. The government may prohibit images of actual children; it may not, on that record, prohibit speech that only appears to involve them.\n\nThe decision is why adult producers can depict characters who are written as adults (and are performed by adults), and why later age-verification fights are framed as burdens on adults' access rather than as a ban on the speech itself.\n\nNot legal advice.",
		tags: [
			"case",
			"first-amendment",
			"supreme-court",
			"cppa"
		],
		status: "Leading case",
		facts: [{
			label: "Citation",
			value: "535 U.S. 234 (2002)"
		}, {
			label: "Plaintiff",
			value: "Free Speech Coalition"
		}],
		related: [
			{
				kind: "law",
				id: "miller-v-california"
			},
			{
				kind: "law",
				id: "fsc-v-paxton"
			},
			{
				kind: "companies",
				id: "fsc"
			}
		],
		source: "public"
	},
	{
		id: "fsc-v-paxton",
		kind: "law",
		name: "Free Speech Coalition v. Paxton",
		subtitle: "Age verification upheld",
		citation: "605 U.S. ___ (2025)",
		jurisdiction: "United States (Supreme Court)",
		summary: "June 27, 2025. The Court held 6–3 that Texas H.B. 1181's commercial age-verification requirement for sites with a substantial amount of material that is obscene to minors survives intermediate scrutiny.",
		body: "Texas H.B. 1181 requires certain commercial sites that publish sexually explicit material obscene to minors to verify that visitors are 18 or older. The Fifth Circuit had applied rational-basis review. The Supreme Court, in an opinion by Justice Thomas, held that the law only incidentally burdens adults' protected speech, is subject to intermediate scrutiny, and survives that review. Adults, the Court said, have no First Amendment right to access such speech without first submitting proof of age.\n\nJustice Kagan dissented, joined by Justices Sotomayor and Jackson. The decision effectively opened the door to similar statutes nationwide and is the reason many aggregators geo-fence or age-gate whole U.S. states. It sits in tension with older cases that applied strict scrutiny to similar burdens (including a 2004 decision the majority declined to follow).\n\nNot legal advice. Read the opinion; state statutes differ in coverage threshold, acceptable methods, and penalties.",
		tags: [
			"case",
			"age-verification",
			"texas",
			"supreme-court",
			"first-amendment"
		],
		status: "Decided 27 June 2025",
		facts: [
			{
				label: "Decided",
				value: "27 June 2025"
			},
			{
				label: "Vote",
				value: "6–3"
			},
			{
				label: "Author",
				value: "Thomas, J."
			},
			{
				label: "Docket",
				value: "23-1122"
			},
			{
				label: "Statute",
				value: "Texas H.B. 1181"
			}
		],
		related: [
			{
				kind: "law",
				id: "texas-hb-1181"
			},
			{
				kind: "law",
				id: "state-av-laws"
			},
			{
				kind: "law",
				id: "ashcroft-fsc"
			},
			{
				kind: "companies",
				id: "fsc"
			},
			{
				kind: "companies",
				id: "aurelia-network"
			}
		],
		source: "public"
	},
	{
		id: "texas-hb-1181",
		kind: "law",
		name: "Texas H.B. 1181",
		subtitle: "Commercial age verification",
		citation: "Tex. Civ. Prac. & Rem. Code ch. 129B",
		jurisdiction: "Texas",
		summary: "Requires covered commercial websites that publish a substantial portion of material harmful to minors to use reasonable age-verification methods. Civil penalties and injunctions. Upheld in FSC v. Paxton.",
		body: "H.B. 1181 is the statute the Supreme Court reviewed in 2025. Coverage is keyed to a commercial site's publication of sexually explicit material that is obscene to minors, typically at a one-third threshold. Acceptable methods include government ID and commercial age-verification systems. Knowing violations expose covered entities to injunctions and civil penalties.\n\nAfter Paxton, analog statutes in other states are harder to preliminarily enjoin on First Amendment grounds. Implementation details — which vendors, what data retention, what to do with VPN traffic — remain a compliance practice, not a constitutional given.\n\nNot legal advice.",
		tags: [
			"texas",
			"age-verification",
			"civil",
			"platforms"
		],
		status: "In force; upheld 2025",
		facts: [
			{
				label: "Jurisdiction",
				value: "Texas"
			},
			{
				label: "Enacted",
				value: "2023"
			},
			{
				label: "Review",
				value: "Upheld, FSC v. Paxton"
			}
		],
		related: [{
			kind: "law",
			id: "fsc-v-paxton"
		}, {
			kind: "law",
			id: "state-av-laws"
		}],
		source: "public"
	},
	{
		id: "state-av-laws",
		kind: "law",
		name: "State age-verification statutes",
		subtitle: "The post-Paxton map",
		jurisdiction: "U.S. states",
		summary: "A growing set of state laws requiring commercial adult sites to verify age. After FSC v. Paxton (2025), similar statutes are on firmer constitutional ground. Coverage, methods, and penalties still vary.",
		body: "Louisiana's 2023 Act 440 was an early model; Texas, Utah, Virginia, Mississippi, and others followed with their own coverage thresholds and vendor rules. Some states require a registered-agent or reporting duty; some impose civil liability to individuals; some are criminal.\n\nPaxton did not write a national statute. A site that geo-fences Texas is not thereby compliant in every other state. Counsel Day 2026 is built around this map. Aggregators (Aurelia) and live platforms (Cobalt) have been the first to implement hard gates or withdrawals.\n\nNot legal advice. Check current bill text; this desk does not host a live legislative tracker.",
		tags: [
			"states",
			"age-verification",
			"platforms",
			"compliance"
		],
		status: "Patchwork; expanding",
		facts: [{
			label: "Trigger case",
			value: "FSC v. Paxton (2025)"
		}, {
			label: "Early model",
			value: "Louisiana Act 440 (2023)"
		}],
		related: [
			{
				kind: "law",
				id: "fsc-v-paxton"
			},
			{
				kind: "law",
				id: "texas-hb-1181"
			},
			{
				kind: "companies",
				id: "cobalt-interactive"
			},
			{
				kind: "events",
				id: "counsel-day-2026"
			}
		],
		source: "public"
	},
	{
		id: "measure-b",
		kind: "law",
		name: "L.A. County Measure B",
		subtitle: "Safer-sex ordinance",
		citation: "Los Angeles County Safer Sex in the Adult Film Industry Act",
		jurisdiction: "Los Angeles County, California",
		summary: "2012 voter-approved ordinance requiring condom use in adult films shot in Los Angeles County and a public-health permit for producers.",
		body: "Measure B is a county public-health ordinance, not a federal speech statute. It pushed a substantial share of production out of Los Angeles County in the 2010s. California's statewide Proposition 60 (2016), which would have expanded similar rules, failed.\n\nStudios still shooting in the county treat permitting and on-set protocols as a production cost. Houses in this index list a mix of county and out-of-county stages.\n\nNot legal advice.",
		tags: [
			"california",
			"los-angeles",
			"public-health",
			"production"
		],
		status: "In force (county)",
		facts: [{
			label: "Approved",
			value: "2012"
		}, {
			label: "Jurisdiction",
			value: "Los Angeles County"
		}],
		related: [{
			kind: "companies",
			id: "helix-house"
		}, {
			kind: "companies",
			id: "northstar-pictures"
		}],
		source: "public"
	},
	{
		id: "ab5-classification",
		kind: "law",
		name: "California A.B. 5",
		subtitle: "Worker classification",
		citation: "Cal. Lab. Code § 2775 et seq. (A.B. 5, 2019)",
		jurisdiction: "California",
		summary: "Codifies the ABC test for employee versus independent contractor. Adult performers, crew, and some creators working in California have to be classified under it unless an exemption applies.",
		body: "A.B. 5 and the Dynamex ABC test make it harder to treat on-set labor as a roster of independent contractors. Subsequent legislation carved exemptions for some professions; adult performance is not a clean statutory carve-out, so California producers often mix payroll companies, loan-outs, and W-2 days.\n\nDirect-to-fan creators shooting alone in California face a different question than a Helix call sheet. Misclassification risk is a labor issue, not a 2257 issue — they stack.\n\nNot legal advice.",
		tags: [
			"california",
			"labor",
			"classification",
			"ab5"
		],
		status: "In force",
		facts: [{
			label: "Enacted",
			value: "2019"
		}, {
			label: "Test",
			value: "ABC / Dynamex"
		}],
		related: [{
			kind: "law",
			id: "work-for-hire"
		}, {
			kind: "companies",
			id: "helix-house"
		}],
		source: "public"
	},
	{
		id: "uk-online-safety",
		kind: "law",
		name: "UK Online Safety Act 2023",
		subtitle: "Age assurance, duties of care",
		citation: "Online Safety Act 2023 (UK)",
		jurisdiction: "United Kingdom",
		summary: "Imposes duties of care on user-to-user and search services, including highly effective age assurance for pornography. Ofcom is the regulator.",
		body: "The Online Safety Act requires services that publish or user-generate pornography to prevent children from encountering it, using highly effective age assurance. Ofcom's codes and the Part 5 duties on pornographic content have driven UK age-gating, withdrawals, and VPN workarounds similar to the U.S. state map — on a national scale.\n\nAfterlight's UK-facing storefront and Tamsin Rowe's producer notes treat OSA as a product requirement, not a terms footnote.\n\nNot legal advice. Ofcom guidance changes.",
		tags: [
			"united-kingdom",
			"ofcom",
			"age-assurance",
			"platforms"
		],
		status: "In force",
		facts: [{
			label: "Enacted",
			value: "2023"
		}, {
			label: "Regulator",
			value: "Ofcom"
		}],
		related: [
			{
				kind: "law",
				id: "eu-dsa"
			},
			{
				kind: "performers",
				id: "tamsin-rowe"
			},
			{
				kind: "companies",
				id: "afterlight-media"
			}
		],
		source: "public"
	},
	{
		id: "eu-dsa",
		kind: "law",
		name: "EU Digital Services Act",
		subtitle: "Platform due diligence",
		citation: "Regulation (EU) 2022/2065",
		jurisdiction: "European Union",
		summary: "EU-wide rules for intermediary services: notice-and-action, transparency, risk assessment for very large platforms, and protection of minors — including age-assurance expectations for adult content.",
		body: "The DSA is a regulation, directly applicable. Hosting services must provide notice-and-action for illegal content; very large platforms carry additional risk-assessment and audit duties. Combined with member-state criminal law and the forthcoming / adjacent age-assurance standards, it is the European compliance ceiling for Aurelia-style aggregators and Afterlight's own storefront.\n\nIllegal content under the DSA is defined by other law (including CSAM, which has no place in this industry and is not indexed here).\n\nNot legal advice.",
		tags: [
			"european-union",
			"platforms",
			"dsa",
			"age-assurance"
		],
		status: "In force",
		facts: [{
			label: "Citation",
			value: "Reg. (EU) 2022/2065"
		}, {
			label: "Applies",
			value: "EU intermediary services"
		}],
		related: [
			{
				kind: "law",
				id: "uk-online-safety"
			},
			{
				kind: "companies",
				id: "afterlight-media"
			},
			{
				kind: "companies",
				id: "aurelia-network"
			}
		],
		source: "public"
	},
	{
		id: "take-it-down",
		kind: "law",
		name: "TAKE IT DOWN Act",
		subtitle: "NCII and deepfakes",
		citation: "Pub. L. 119–12 (2025)",
		jurisdiction: "United States (federal)",
		summary: "Criminalizes knowing publication (or threats) of nonconsensual intimate images, including AI digital forgeries, and requires covered platforms to remove reported depictions and identical copies within 48 hours. FTC enforcement of the platform duty began 19 May 2026.",
		body: "The Tools to Address Known Exploitation by Immobilizing Technological Deepfakes on Websites and Networks Act was signed 19 May 2025. It has two engines: a criminal prohibition on knowingly publishing, or threatening to publish, nonconsensual intimate visual depictions of an identifiable person — authentic or AI-generated — and a platform notice-and-removal duty.\n\nCovered platforms must publish a process, then remove the identified depiction and make reasonable efforts to strip known identical copies as soon as possible, not later than 48 hours after a valid request. The FTC treats failures as rule violations; its portal opened when the platform provisions took effect on 19 May 2026.\n\nThis is distinct from 2257 (which is about age and identity of performers who consented to production) and from FOSTA (trafficking). Talent managers such as Nina Braswell now treat TAKE IT DOWN notices as a standard representation task.\n\nNot legal advice.",
		tags: [
			"federal",
			"ncii",
			"deepfakes",
			"platforms",
			"ftc"
		],
		status: "In force; FTC duty live 19 May 2026",
		facts: [
			{
				label: "Public law",
				value: "Pub. L. 119–12"
			},
			{
				label: "Signed",
				value: "19 May 2025"
			},
			{
				label: "Platform duty",
				value: "48 hours; FTC from 19 May 2026"
			}
		],
		related: [
			{
				kind: "law",
				id: "section-230"
			},
			{
				kind: "law",
				id: "dmca-512"
			},
			{
				kind: "companies",
				id: "vellum-digital"
			},
			{
				kind: "agents",
				id: "nina-braswell"
			}
		],
		source: "public"
	},
	{
		id: "card-networks",
		kind: "law",
		name: "Card-network integrity rules",
		subtitle: "Mastercard AN 5196 · Visa VIRP",
		jurisdiction: "Payment networks (global)",
		summary: "Private-network rules, not statutes. In 2025–2026 they became a de facto production standard: documented performer consent, 2257-quality records, and brand-protection reviews as a condition of taking cards.",
		body: "Mastercard's adult-content announcement (AN 5196) and Visa's Integrity Risk Program sit outside the U.S. Code but decide whether a studio or creator can get paid. Networks have asked acquirers for evidence of age, consent, and — in practice — signed releases that federal 2257 never required.\n\nA producer can be 2257-clean and still lose card processing. Direct-to-fan talent (Aisha Nasser, Noa Pell) feel this first. Counsel Day treats network rules as a third rail beside statute and state AV law.\n\nNot legal advice; network bulletins change without notice.",
		tags: [
			"payments",
			"mastercard",
			"visa",
			"consent",
			"private-rules"
		],
		status: "In force (network)",
		facts: [{
			label: "Nature",
			value: "Private network rules"
		}, {
			label: "Pressure",
			value: "Acquirers & platforms"
		}],
		related: [
			{
				kind: "law",
				id: "usc-2257"
			},
			{
				kind: "companies",
				id: "vellum-digital"
			},
			{
				kind: "performers",
				id: "aisha-nasser"
			}
		],
		source: "public"
	},
	{
		id: "usc-1591",
		kind: "law",
		name: "18 U.S.C. § 1591",
		subtitle: "Sex trafficking",
		citation: "18 U.S.C. § 1591",
		jurisdiction: "United States (federal)",
		summary: "Federal sex-trafficking statute. Adult production of consensual work by adults is not trafficking; platforms and producers still train to this line because FOSTA made the civil shadow longer.",
		body: "Section 1591 criminalizes sex trafficking of children and of adults by force, fraud, or coercion. Consensual adult production, correctly documented, is a different activity. The industry indexes 1591 because FOSTA-SESTA created civil exposure for platforms that host or promote violations, and because reputable houses treat recruitment, housing, and immigration of talent as a compliance problem, not a vibe.\n\nfleshsesh does not provide investigative how-to. If you need to report trafficking, use law enforcement and the National Human Trafficking Hotline (1-888-373-7888).\n\nNot legal advice.",
		tags: [
			"federal",
			"criminal",
			"trafficking"
		],
		status: "In force",
		facts: [{
			label: "Citation",
			value: "18 U.S.C. § 1591"
		}, {
			label: "Hotline",
			value: "1-888-373-7888"
		}],
		related: [
			{
				kind: "law",
				id: "fosta-sesta"
			},
			{
				kind: "companies",
				id: "fsc"
			},
			{
				kind: "companies",
				id: "asacp"
			}
		],
		source: "public"
	},
	{
		id: "right-of-publicity",
		kind: "law",
		name: "Right of publicity",
		subtitle: "Name, image, likeness",
		jurisdiction: "U.S. states (common law & statute)",
		summary: "State-law right to control commercial use of one's identity. Performer contracts, clips used in trailers, and deepfakes all run through it — alongside copyright and TAKE IT DOWN.",
		body: "California, New York, and others recognize a right of publicity. Adult performers license name, image, and likeness in performing agreements; problems arise with scrapes, compilation tubes, lookalike marketing, and unauthorized AI. TAKE IT DOWN is a federal removal tool for intimate imagery; publicity is the civil claim for commercial identity.\n\nNot legal advice. Choice of law matters.",
		tags: [
			"state",
			"publicity",
			"nil",
			"contracts"
		],
		status: "Varies by state",
		facts: [{
			label: "Nature",
			value: "State law"
		}, {
			label: "Neighbors",
			value: "Copyright, TAKE IT DOWN"
		}],
		related: [{
			kind: "law",
			id: "take-it-down"
		}, {
			kind: "law",
			id: "work-for-hire"
		}],
		source: "public"
	},
	{
		id: "dmca-512",
		kind: "law",
		name: "DMCA § 512",
		subtitle: "Notice-and-takedown",
		citation: "17 U.S.C. § 512",
		jurisdiction: "United States (federal)",
		summary: "Safe harbor for online service providers that expeditiously remove allegedly infringing material after a valid copyright notice. Standard path for stolen scenes and scraped Vellum posts.",
		body: "Section 512 is copyright procedure, not 2257 and not TAKE IT DOWN. A studio or creator sends a notice identifying the work, the infringing URL, and a statement under penalty of perjury; a qualifying host that removes expeditiously keeps the safe harbor.\n\nAurelia Network lists a DMCA agent. TAKE IT DOWN now sits beside 512 for nonconsensual intimate imagery that may or may not be a copyright of the victim.\n\nNot legal advice.",
		tags: [
			"federal",
			"copyright",
			"dmca",
			"platforms"
		],
		status: "In force",
		facts: [{
			label: "Citation",
			value: "17 U.S.C. § 512"
		}, {
			label: "Hook",
			value: "Registered DMCA agent"
		}],
		related: [
			{
				kind: "law",
				id: "take-it-down"
			},
			{
				kind: "law",
				id: "section-230"
			},
			{
				kind: "companies",
				id: "aurelia-network"
			}
		],
		source: "public"
	},
	{
		id: "work-for-hire",
		kind: "law",
		name: "Work made for hire & performer deals",
		subtitle: "Copyright and contracts",
		citation: "17 U.S.C. § 101; state contract law",
		jurisdiction: "United States",
		summary: "Who owns the master, the stills, the stage name, and the platform upload. Default copyright rules plus the four-page performer agreement that actually runs the set.",
		body: "U.S. copyright vests in the author unless a work is made for hire (employee in the scope of employment, or a specially commissioned work in a statutory category with a signed agreement) or is assigned. Adult sets often rely on performer agreements that assign copyright, license publicity, and confirm 2257 cooperation and STI protocols.\n\nCalifornia classification (A.B. 5) can cut against a clean work-for-hire employee story. Direct-to-fan talent who shoot themselves usually own the copyright unless they signed it away to a platform — most platforms take a license, not an assignment.\n\nNot legal advice. Do not shoot without a signed deal and a 2257 file.",
		tags: [
			"copyright",
			"contracts",
			"performers"
		],
		status: "Background law",
		facts: [{
			label: "Copyright",
			value: "17 U.S.C. § 101"
		}, {
			label: "Labor overlay",
			value: "A.B. 5 in California"
		}],
		related: [
			{
				kind: "law",
				id: "ab5-classification"
			},
			{
				kind: "law",
				id: "right-of-publicity"
			},
			{
				kind: "law",
				id: "usc-2257"
			}
		],
		source: "public"
	}
];
/** fleshsesh house records folded into the industry index. */
var house = [
	{
		id: "fleshsesh",
		kind: "companies",
		name: "fleshsesh",
		subtitle: "Gender-fluid house · Perth",
		summary: "Perth house for signed talent, atelier objects, academy seats, and a professional industry index. Not a tube. Not a classifieds board.",
		body: "fleshsesh is a gender-fluid adult house. The roster is signed and consent-first. Creator OS, capture days, editorial lookbooks, and Perth nights sit on one ledger. The Atlas indexes public industry databases via Wikidata with a 21+ filter. No explicit media is hosted on this domain.",
		tags: [
			"house",
			"perth",
			"studio",
			"index",
			"gender-fluid"
		],
		region: "Perth, Western Australia",
		status: "Active",
		facts: [
			{
				label: "Founded",
				value: "Perth"
			},
			{
				label: "Model",
				value: "House + index + tools"
			},
			{
				label: "Door",
				value: "18+ on site · 21+ live index"
			}
		],
		related: [
			{
				kind: "performers",
				id: "vale-noir"
			},
			{
				kind: "performers",
				id: "juniper-hale"
			},
			{
				kind: "agents",
				id: "fleshsesh-desk"
			},
			{
				kind: "events",
				id: "northbridge-silk-2026"
			},
			{
				kind: "law",
				id: "usc-2257"
			}
		],
		socials: [{
			platform: "Site",
			handle: "fleshsesh.com"
		}],
		source: "index"
	},
	{
		id: "fleshsesh-desk",
		kind: "agents",
		name: "fleshsesh desk",
		subtitle: "House representation · Perth",
		summary: "The desk that reads files. Roster management, campaign briefs, and lookbook leases. Pronouns travel with the paperwork.",
		tags: [
			"agency",
			"perth",
			"roster"
		],
		region: "Perth",
		status: "Active",
		facts: [{
			label: "Seat",
			value: "Perth"
		}, {
			label: "Take",
			value: "File-based, not a walk-up"
		}],
		related: [
			{
				kind: "companies",
				id: "fleshsesh"
			},
			{
				kind: "performers",
				id: "vale-noir"
			},
			{
				kind: "performers",
				id: "ash-vesper"
			}
		],
		source: "index"
	},
	{
		id: "vale-noir",
		kind: "performers",
		name: "Vale Noir",
		subtitle: "Presence / campaign",
		aka: ["Vale"],
		summary: "Androgynous stills and live presence. The face the house uses when it does not want a gender on the poster.",
		tags: [
			"signed",
			"perth",
			"campaign",
			"they-them"
		],
		region: "Perth",
		status: "Signed",
		facts: [{
			label: "Pronouns",
			value: "they/them"
		}, {
			label: "House",
			value: "fleshsesh"
		}],
		related: [
			{
				kind: "companies",
				id: "fleshsesh"
			},
			{
				kind: "agents",
				id: "fleshsesh-desk"
			},
			{
				kind: "performers",
				id: "sable-quinn"
			}
		],
		source: "index"
	},
	{
		id: "juniper-hale",
		kind: "performers",
		name: "Juniper Hale",
		subtitle: "Campaign / language",
		summary: "Editorial and brand work. Writes their own brief. Will not be recast as a type.",
		tags: [
			"signed",
			"editorial",
			"she-they"
		],
		region: "Perth",
		status: "Signed",
		facts: [{
			label: "Pronouns",
			value: "she/they"
		}, {
			label: "House",
			value: "fleshsesh"
		}],
		related: [{
			kind: "companies",
			id: "fleshsesh"
		}, {
			kind: "agents",
			id: "fleshsesh-desk"
		}],
		source: "index"
	},
	{
		id: "ash-vesper",
		kind: "performers",
		name: "Ash Vesper",
		subtitle: "Directed rooms",
		summary: "Directed rooms. Calm, unreadable, expensive. Books in two-hour blocks only.",
		tags: [
			"signed",
			"rooms",
			"he-they"
		],
		region: "Perth",
		status: "Signed",
		facts: [{
			label: "Pronouns",
			value: "he/they"
		}, {
			label: "House",
			value: "fleshsesh"
		}],
		related: [{
			kind: "companies",
			id: "fleshsesh"
		}, {
			kind: "events",
			id: "closed-rehearsal-2026"
		}],
		source: "index"
	},
	{
		id: "sable-quinn",
		kind: "performers",
		name: "Sable Quinn",
		subtitle: "Stills / atelier",
		summary: "Objects and bodies in the same frame. The atelier's quiet favourite.",
		tags: [
			"signed",
			"stills",
			"atelier"
		],
		region: "Perth",
		status: "Signed",
		facts: [{
			label: "Pronouns",
			value: "any"
		}, {
			label: "House",
			value: "fleshsesh"
		}],
		related: [{
			kind: "companies",
			id: "fleshsesh"
		}, {
			kind: "performers",
			id: "vale-noir"
		}],
		source: "index"
	},
	{
		id: "northbridge-silk-2026",
		kind: "events",
		name: "Northbridge silk",
		subtitle: "House night · Perth",
		summary: "A Perth night with a door. Gender-fluid dress code: none. Members first. 19 September 2026.",
		tags: [
			"perth",
			"night",
			"upcoming",
			"house"
		],
		region: "Perth",
		status: "Upcoming",
		venue: "The Velvet Room, Northbridge",
		dateStart: "2026-09-19",
		facts: [{
			label: "When",
			value: "19 September 2026"
		}, {
			label: "Where",
			value: "Northbridge, Perth"
		}],
		related: [{
			kind: "companies",
			id: "fleshsesh"
		}, {
			kind: "events",
			id: "fremantle-heat-2026"
		}],
		source: "public"
	},
	{
		id: "fremantle-heat-2026",
		kind: "events",
		name: "Fremantle heat",
		subtitle: "House night · Fremantle",
		summary: "Harbour air, a magenta line, a two-hour door. 3 October 2026.",
		tags: [
			"fremantle",
			"night",
			"upcoming"
		],
		region: "Fremantle",
		status: "Upcoming",
		venue: "South jetty loft",
		dateStart: "2026-10-03",
		facts: [{
			label: "When",
			value: "3 October 2026"
		}, {
			label: "Where",
			value: "Fremantle"
		}],
		related: [{
			kind: "companies",
			id: "fleshsesh"
		}],
		source: "public"
	},
	{
		id: "closed-rehearsal-2026",
		kind: "events",
		name: "Closed rehearsal",
		subtitle: "House night · Perth",
		summary: "Signed talent and House passes. Directed stills. If you do not have a file, the door will not know you. 12 October 2026.",
		tags: [
			"perth",
			"rehearsal",
			"upcoming"
		],
		region: "Perth",
		status: "Upcoming",
		venue: "Navy Corridor",
		dateStart: "2026-10-12",
		facts: [{
			label: "When",
			value: "12 October 2026"
		}, {
			label: "Where",
			value: "Perth"
		}],
		related: [{
			kind: "companies",
			id: "fleshsesh"
		}, {
			kind: "performers",
			id: "ash-vesper"
		}],
		source: "public"
	}
];
var entities = [
	...industry,
	...desk,
	...house
];
var byId = /* @__PURE__ */ new Map();
for (const e of entities) {
	byId.set(`${e.kind}:${e.id}`, e);
	byId.set(e.id, e);
}
function isKind(value) {
	return KINDS.includes(value);
}
function getEntity(kind, id) {
	return byId.get(`${kind}:${id}`);
}
function getById(id) {
	return byId.get(id);
}
function listKind(kind) {
	if (kind === "social") return [];
	return entities.filter((e) => e.kind === kind);
}
function counts() {
	const out = {
		performers: 0,
		productions: 0,
		companies: 0,
		agents: 0,
		events: 0,
		social: 0,
		law: 0
	};
	for (const e of entities) out[e.kind] += 1;
	out.social = socialDirectory().length;
	return out;
}
function socialDirectory() {
	const rows = [];
	for (const e of entities) for (const s of e.socials ?? []) rows.push({
		platform: s.platform,
		handle: s.handle,
		href: s.href,
		entity: e
	});
	rows.sort((a, b) => a.platform.localeCompare(b.platform) || a.handle.localeCompare(b.handle));
	return rows;
}
function tokenize(q) {
	return q.toLowerCase().split(/[^a-z0-9§+]+/i).map((t) => t.trim()).filter((t) => t.length > 0);
}
function haystack(e) {
	return [
		e.name,
		e.subtitle,
		...e.aka ?? [],
		e.summary,
		e.body ?? "",
		e.tags.join(" "),
		e.region ?? "",
		e.status ?? "",
		e.citation ?? "",
		e.jurisdiction ?? "",
		e.venue ?? "",
		...(e.facts ?? []).map((f) => `${f.label} ${f.value}`),
		...(e.credits ?? []).map((c) => `${c.role} ${c.title}`),
		...(e.socials ?? []).map((s) => `${s.platform} ${s.handle}`)
	].join(" ").toLowerCase();
}
function search(q, kind) {
	const tokens = tokenize(q);
	const pool = kind && kind !== "all" ? kind === "social" ? [] : listKind(kind) : entities;
	if (tokens.length === 0) return pool.map((entity) => ({
		entity,
		score: 1
	}));
	const hits = [];
	for (const entity of pool) {
		const name = entity.name.toLowerCase();
		const aka = (entity.aka ?? []).map((a) => a.toLowerCase());
		const blob = haystack(entity);
		let score = 0;
		let miss = false;
		for (const t of tokens) if (name === t) score += 80;
		else if (name.startsWith(t)) score += 48;
		else if (name.includes(t)) score += 32;
		else if (aka.some((a) => a === t || a.includes(t))) score += 28;
		else if (entity.citation?.toLowerCase().includes(t)) score += 40;
		else if (entity.tags.some((tag) => tag.includes(t))) score += 16;
		else if (blob.includes(t)) score += 8;
		else {
			miss = true;
			break;
		}
		if (!miss) hits.push({
			entity,
			score
		});
	}
	hits.sort((a, b) => b.score - a.score || a.entity.name.localeCompare(b.entity.name));
	return hits;
}
function relatedOf(entity) {
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	for (const r of entity.related) {
		const hit = getEntity(r.kind, r.id);
		if (hit && !seen.has(`${hit.kind}:${hit.id}`)) {
			seen.add(`${hit.kind}:${hit.id}`);
			out.push(hit);
		}
	}
	return out;
}
function resolveCredit(c) {
	if (!c.kind || !c.id) return void 0;
	return getEntity(c.kind, c.id);
}
entities.length;
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Dt0_uhc_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-void px-6 text-center text-ivory",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-heat",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-lg tracking-wide uppercase",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	const { data, isPending } = authClient.useSession();
	const user = data?.user;
	return {
		user: user ? {
			id: user.id,
			displayName: user.name ?? null,
			primaryEmail: user.email ?? null,
			profileImageUrl: user.image ?? null,
			isDevFallback: false
		} : null,
		isPending
	};
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/** Render children only when a user is present (real session, or the disabled-auth dev user). */
function SignedIn({ children }) {
	const { user } = useCurrentUserState();
	return user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
}
/**
* Render children only once we KNOW the visitor is signed out (`isPending` has
* cleared and there is no user). Hidden while the session is still loading.
*/
function SignedOut({ children }) {
	const { user, isPending } = useCurrentUserState();
	if (isPending || user) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var listProducts = createServerFn({ method: "GET" }).validator((kind) => typeof kind === "string" ? kind : "").handler(createSsrRpc("741b8bd188813d7d396f95ea74805584ce6f7a424994980a515e738f105f1e89"));
var getProduct = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("c51a67b4d68558e25f2a4d267983c9afa599ba75687d3cdd3d87c18bd26802c9"));
var listTalent = createServerFn({ method: "GET" }).handler(createSsrRpc("6b0efdee43a97f68367a6d30c6cd7b70e0a403fa9d4afe7f52b8e137507c77e3"));
var getTalent = createServerFn({ method: "GET" }).validator((id) => id).handler(createSsrRpc("2540b7b11a6f484f804d4f82a7b40f7de8fa1d434ee7d8b180cd76d417c39035"));
var listRooms = createServerFn({ method: "GET" }).handler(createSsrRpc("770f14375f67e8042af794f75e0e56ce1183d644bc092f3c79e55b74255aeb5b"));
var getCart = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("78be03387fae999d10f2aa0f91e39494adcaf54b57bb7b993b704ee41a333612"));
var addToCart = createServerFn({ method: "POST" }).validator((input) => ({
	productId: input.productId,
	qty: Math.max(1, Math.min(8, input.qty ?? 1)),
	spec: typeof input.spec === "string" ? input.spec.slice(0, 400) : ""
})).middleware([authMiddleware]).handler(createSsrRpc("6ed0c9890eeae6aec6eea03db057843ddb32452809735bf32d741f4de1baa054"));
var setCartQty = createServerFn({ method: "POST" }).validator((input) => input).middleware([authMiddleware]).handler(createSsrRpc("b5da19482ec9db43f3a672998b17f53936da8857e5edf61a5135268e94d9eeb0"));
var getDesk = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("a0d70c8c9b7617ac0e20c6abebdafccde673d0f3b296ae50004d85401c5def33"));
var checkout = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(createSsrRpc("4c317887ffd6317f9659416cc910be5de40766f7b0030c9de1b78e3a4054e330"));
var getCourse = createServerFn({ method: "GET" }).validator((slug) => slug).handler(createSsrRpc("7d904d3562bc104fb67879950dc332fbf6018214298fbecd0b48053462cb479b"));
var getCourseReader = createServerFn({ method: "GET" }).validator((slug) => slug).middleware([authMiddleware]).handler(createSsrRpc("0a163ca9929a2d41e7eb49ffb47a2f57bd13ccc2f70ef3e55b7d55ff56f35936"));
var bookingInput = object({
	roomId: string(),
	date: string(),
	startHour: number(),
	hours: number()
});
var listRoomDay = createServerFn({ method: "GET" }).validator((input) => input).handler(createSsrRpc("6a350458c3ec4db01ae9c90f9a009f6325bef5ef61de398ba1e52cbafaf31b7e"));
var bookRoom = createServerFn({ method: "POST" }).validator((input) => bookingInput.parse(input)).middleware([authMiddleware]).handler(createSsrRpc("7a8c0d70950fbe2f71922115546557c0b93e93eb4a4a9b48dece6fdf64ee9612"));
var briefInput = object({
	kind: _enum([
		"talent",
		"campaign",
		"twin",
		"service"
	]),
	talentId: string().optional(),
	company: string().max(120),
	contactName: string().max(80),
	details: string().min(12).max(2e3),
	payFee: boolean()
});
var submitBrief = createServerFn({ method: "POST" }).validator((input) => briefInput.parse(input)).middleware([authMiddleware]).handler(createSsrRpc("3d243e85508cdf0cdd33158748214232fd05bae039c747016bdfa52d5b110e92"));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
/** The mark is always lowercase, even inside display type. */
function houseCase(name) {
	return /fleshsesh/i.test(name) ? "lowercase" : "uppercase";
}
var SRC = {
	wordmark: "/wordmark-3d.png",
	lockup: "/lockup-lips.png",
	original: "/logo.png"
};
function BrandLogo({ className, alt = "fleshsesh", variant = "wordmark" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: SRC[variant],
		alt,
		className: cn("pointer-events-none select-none object-contain", className)
	});
}
function AgeGate({ onEnter }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex items-end justify-center bg-navy md:items-center",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "gate-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/still-lips.jpg",
				alt: "",
				className: "absolute inset-0 size-full object-cover opacity-45"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-b from-navy/70 via-navy/55 to-void" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 flex w-full max-w-xl flex-col items-center px-6 pb-12 pt-20 text-center md:pb-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, {
						variant: "lockup",
						className: "mb-8 h-36 w-auto md:h-48"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "gate-title",
						className: "font-display text-3xl font-medium tracking-wide text-ivory uppercase md:text-5xl",
						children: "18+ to enter"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-sm text-sm leading-relaxed text-muted",
						children: "Adult house. Adult only. Confirm you are eighteen or older and that adult content is legal where you are."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onEnter,
							className: "min-h-12 bg-heat px-8 py-3 font-display text-sm tracking-widest text-navy uppercase transition-colors hover:bg-ivory",
							children: "I am 18+"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://www.google.com",
							className: "flex min-h-12 items-center justify-center border border-line px-8 py-3 font-display text-sm tracking-widest text-ivory uppercase transition-colors hover:border-heat hover:text-heat",
							children: "Exit"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-xs tracking-wide text-muted",
						children: "No explicit media on this domain."
					})
				]
			})
		]
	});
}
var NAV = [
	{
		to: "/pass",
		label: "Pass"
	},
	{
		to: "/atelier",
		label: "Atelier"
	},
	{
		to: "/academy",
		label: "Academy"
	},
	{
		to: "/talent",
		label: "Talent"
	},
	{
		to: "/os",
		label: "OS"
	},
	{
		to: "/atlas",
		label: "Atlas"
	},
	{
		to: "/nights",
		label: "Nights"
	},
	{
		to: "/ledger",
		label: "Ledger"
	}
];
function AgeShell({ children, ssrOk = false }) {
	const [allowed, setAllowed] = (0, import_react.useState)(ssrOk);
	(0, import_react.useEffect)(() => {
		if (ssrOk) {
			writeAgeOk();
			return;
		}
		if (readAgeOkClient()) {
			writeAgeOk();
			setAllowed(true);
		}
	}, [ssrOk]);
	function enter() {
		writeAgeOk();
		setAllowed(true);
	}
	if (!allowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeGate, { onEnter: enter });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function SignInHere({ next }) {
	const here = useRouterState({ select: (s) => s.location.pathname + (s.location.searchStr || "") });
	const href = typeof window !== "undefined" ? window.location.pathname + window.location.search : here;
	const candidate = next || href || here;
	const redirect = candidate.startsWith("/") && !candidate.startsWith("//") && !candidate.startsWith("/login") ? candidate : "/desk";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
		to: "/login",
		search: { redirect }
	});
}
function HouseChrome({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const path = useRouterState({ select: (s) => s.location.pathname });
	const { user, isPending } = useCurrentUserState();
	const [count, setCount] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!user) {
			setCount(0);
			return;
		}
		getCart().then((rows) => setCount(rows.reduce((n, r) => n + r.qty, 0))).catch(() => setCount(0));
	}, [user, path]);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [path]);
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh bg-void text-ivory",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grain" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-line/70 bg-void/80 px-5 py-3.5 backdrop-blur-md md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "relative z-10 shrink-0",
						"aria-label": "fleshsesh home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandLogo, { className: "h-12 w-auto md:h-16" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-3 font-display text-[11px] tracking-widest uppercase xl:flex",
						children: [
							NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("text-ivory/80 hover:text-heat", path.startsWith(item.to) && "text-heat"),
								children: item.label
							}, item.to)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cart",
								className: "relative flex size-11 items-center justify-center text-ivory hover:text-heat",
								"aria-label": "Cart",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-5" }), count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-1 right-1 min-w-4 bg-heat px-1 font-display text-[10px] leading-4 text-navy tabular-nums",
									children: count
								}) : null]
							}),
							isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-20 animate-pulse bg-navy" }) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/desk",
									className: "text-heat",
									children: "Desk"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "border border-heat px-3 py-2 text-heat hover:bg-heat hover:text-navy",
								children: "Sign in"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 xl:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/cart",
							className: "relative flex size-11 items-center justify-center",
							"aria-label": "Cart",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-5" }), count > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-1 right-1 min-w-4 bg-heat px-1 font-display text-[10px] leading-4 text-navy tabular-nums",
								children: count
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "flex size-11 items-center justify-center",
							"aria-label": open ? "Close menu" : "Open menu",
							onClick: () => setOpen((v) => !v),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})]
					})
				]
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 bg-navy px-5 pt-28 xl:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col font-display text-3xl tracking-wide uppercase",
					children: [
						NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							onClick: () => setOpen(false),
							className: "border-b border-line py-4",
							children: item.label
						}, item.to)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/join",
							onClick: () => setOpen(false),
							className: "border-b border-line py-4",
							children: "Join"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/desk",
							onClick: () => setOpen(false),
							className: "border-b border-line py-4",
							children: "Desk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedOut, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							onClick: () => setOpen(false),
							className: "py-4 text-heat",
							children: "Sign in"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignedIn, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
						}) })
					]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "relative z-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "relative z-10 mt-auto flex flex-wrap justify-between gap-4 border-t border-line px-5 py-8 text-xs tracking-wide text-muted md:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" fleshsesh · Perth"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Gender-fluid · 18+ · No explicit media on this domain" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/legal",
								className: "hover:text-heat",
								children: "Legal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/ledger",
								className: "hover:text-heat",
								children: "Ledger"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/atlas",
								className: "hover:text-heat",
								children: "Atlas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/os",
								className: "hover:text-heat",
								children: "OS"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/join",
								className: "hover:text-heat",
								children: "Join"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/apply",
								className: "hover:text-heat",
								children: "Apply"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/desk",
								className: "hover:text-heat",
								children: "Desk"
							})
						]
					})
				]
			})
		]
	});
}
function PageHero({ kicker, title, image, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative flex min-h-[62dvh] items-end px-5 pb-12 pt-32 md:min-h-[70dvh] md:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: image,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-linear-to-t from-void via-void/45 to-navy/40" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-3 font-display text-xs tracking-widest text-heat uppercase",
						children: kicker
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl font-medium tracking-wide text-ivory uppercase md:text-7xl",
						children: title
					}),
					children
				]
			})
		]
	});
}
function HeatButton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...props,
		className: cn("inline-flex min-h-12 items-center justify-center bg-heat px-6 py-3 font-display text-xs tracking-widest text-navy uppercase transition-colors hover:bg-ivory disabled:opacity-50", className)
	});
}
function GhostButton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...props,
		className: cn("inline-flex min-h-12 items-center justify-center border border-line px-6 py-3 font-display text-xs tracking-widest text-ivory uppercase transition-colors hover:border-heat hover:text-heat disabled:opacity-50", className)
	});
}
var styles_default = "/assets/styles-DjuS8La-.css";
var APP_NAME = "fleshsesh";
var readAgeCookie = createServerFn({ method: "GET" }).handler(createSsrRpc("183cc80904db2ed73edceccd0a398335c9eabbaa1c679e4702c12c22b470b34d"));
var Route$45 = createRootRoute({
	beforeLoad: async () => ({ ageOk: await readAgeCookie() }),
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Gender-fluid adult house in Perth. Membership, made-to-order atelier, academy, talent, Creator OS, and an industry atlas. Eighteen and over."
			},
			{
				name: "theme-color",
				content: "#0B022D"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: RootShell
});
function RootShell() {
	const { ageOk } = Route$45.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "bg-void text-ivory font-sans",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgeShell, {
					ssrOk: ageOk,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
					theme: "dark",
					position: "bottom-center",
					toastOptions: {
						className: "font-sans",
						style: {
							background: "var(--color-navy)",
							color: "var(--color-ivory)",
							border: "1px solid var(--color-line)",
							borderRadius: 0
						}
					}
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$43 = () => import("./routes-DKNBXkm3.mjs");
var Route$44 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$43, "component") });
var $$splitComponentImporter$42 = () => import("./academy-itxGmW1T.mjs");
var Route$43 = createFileRoute("/academy")({ component: lazyRouteComponent($$splitComponentImporter$42, "component") });
var $$splitComponentImporter$41 = () => import("./apply-2dPaJhyN.mjs");
var Route$42 = createFileRoute("/apply")({
	validateSearch: (s) => ({ talent: typeof s.talent === "string" ? s.talent : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var $$splitComponentImporter$40 = () => import("./atelier-CyQGPfQh.mjs");
var Route$41 = createFileRoute("/atelier")({ component: lazyRouteComponent($$splitComponentImporter$40, "component") });
var $$splitComponentImporter$39 = () => import("./atlas-BPR590ug.mjs");
var Route$40 = createFileRoute("/atlas")({ component: lazyRouteComponent($$splitComponentImporter$39, "component") });
var $$splitComponentImporter$38 = () => import("./cart-W_-BtTqj.mjs");
var Route$39 = createFileRoute("/cart")({ component: lazyRouteComponent($$splitComponentImporter$38, "component") });
var $$splitComponentImporter$37 = () => import("./desk-CPxEFDdH.mjs");
var Route$38 = createFileRoute("/desk")({ component: lazyRouteComponent($$splitComponentImporter$37, "component") });
var $$splitComponentImporter$36 = () => import("./join-CSFRawOa.mjs");
var Route$37 = createFileRoute("/join")({ component: lazyRouteComponent($$splitComponentImporter$36, "component") });
var $$splitComponentImporter$35 = () => import("./ledger-GRBrIR0Q.mjs");
var Route$36 = createFileRoute("/ledger")({ component: lazyRouteComponent($$splitComponentImporter$35, "component") });
var $$splitComponentImporter$34 = () => import("./legal-RqvdOOgU.mjs");
var Route$35 = createFileRoute("/legal")({ component: lazyRouteComponent($$splitComponentImporter$34, "component") });
var $$splitComponentImporter$33 = () => import("./live-CneBN_7i.mjs");
var Route$34 = createFileRoute("/live")({ component: lazyRouteComponent($$splitComponentImporter$33, "component") });
var $$splitComponentImporter$32 = () => import("./login-CpMoqdfW.mjs");
var Route$33 = createFileRoute("/login")({
	validateSearch: (s) => ({ redirect: typeof s.redirect === "string" ? safeRedirect(s.redirect) : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./lookbook-_i0Brj8n.mjs");
var Route$32 = createFileRoute("/lookbook")({ component: lazyRouteComponent($$splitComponentImporter$31, "component") });
var $$splitComponentImporter$30 = () => import("./nights-DR8ghZPv.mjs");
var Route$31 = createFileRoute("/nights")({ component: lazyRouteComponent($$splitComponentImporter$30, "component") });
var $$splitComponentImporter$29 = () => import("./os-v23Uudqp.mjs");
var Route$30 = createFileRoute("/os")({ component: lazyRouteComponent($$splitComponentImporter$29, "component") });
var $$splitComponentImporter$28 = () => import("./pass-CXqFAq9K.mjs");
var Route$29 = createFileRoute("/pass")({ component: lazyRouteComponent($$splitComponentImporter$28, "component") });
var $$splitComponentImporter$27 = () => import("./services-C3eaKQq7.mjs");
var Route$28 = createFileRoute("/services")({ component: lazyRouteComponent($$splitComponentImporter$27, "component") });
var $$splitComponentImporter$26 = () => import("./talent-B9igOC46.mjs");
var Route$27 = createFileRoute("/talent")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var $$splitComponentImporter$25 = () => import("./academy.index-DLixp4QX.mjs");
var Route$26 = createFileRoute("/academy/")({ component: lazyRouteComponent($$splitComponentImporter$25, "component") });
var $$splitComponentImporter$24 = () => import("./academy._slug-QOTac4aa.mjs");
var Route$25 = createFileRoute("/academy/$slug")({ component: lazyRouteComponent($$splitComponentImporter$24, "component") });
var $$splitComponentImporter$23 = () => import("./academy.exam-CPBzko90.mjs");
var Route$24 = createFileRoute("/academy/exam")({ component: lazyRouteComponent($$splitComponentImporter$23, "component") });
var $$splitComponentImporter$22 = () => import("./atelier.index-CLilcKlx.mjs");
var Route$23 = createFileRoute("/atelier/")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./atelier._slug-Dhm9p6_H.mjs");
var Route$22 = createFileRoute("/atelier/$slug")({ component: lazyRouteComponent($$splitComponentImporter$21, "component") });
var $$splitComponentImporter$20 = () => import("./atlas.index-B6KFwmis.mjs");
var Route$21 = createFileRoute("/atlas/")({ component: lazyRouteComponent($$splitComponentImporter$20, "component") });
var $$splitNotFoundComponentImporter$2 = () => import("./atlas._kind-DvtDM8os.mjs");
var $$splitComponentImporter$19 = () => import("./atlas._kind-Ccl8Uygg.mjs");
var Route$20 = createFileRoute("/atlas/$kind")({
	component: lazyRouteComponent($$splitComponentImporter$19, "component"),
	beforeLoad: ({ params }) => {
		if (!isKind(params.kind)) throw notFound();
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent")
});
var $$splitComponentImporter$18 = () => import("./atlas.dossier-Do9U4pMV.mjs");
var Route$19 = createFileRoute("/atlas/dossier")({
	validateSearch: (s) => ({
		q: typeof s.q === "string" ? s.q : "",
		qid: typeof s.qid === "string" ? s.qid : "",
		id: typeof s.id === "string" ? s.id : ""
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./atlas.saved-BLQJueLW.mjs");
var Route$18 = createFileRoute("/atlas/saved")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./atlas.search-Cbel7f5J.mjs");
var Route$17 = createFileRoute("/atlas/search")({
	validateSearch: (s) => ({
		q: typeof s.q === "string" ? s.q : "",
		kind: typeof s.kind === "string" ? s.kind : "all"
	}),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./atlas.sources-CzgJ6yQS.mjs");
var Route$16 = createFileRoute("/atlas/sources")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./ledger.index-DcSCVVl6.mjs");
var Route$15 = createFileRoute("/ledger/")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
function TapeRow({ row }) {
	const up = row.amount > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex items-baseline justify-between gap-4 border-t border-line py-4 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: row.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs tracking-wide text-muted uppercase",
			children: row.state
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: `font-display tabular-nums ${up ? "text-heat" : "text-muted"}`,
			children: [up ? "+" : "", row.amount.toLocaleString("en-AU")]
		})]
	});
}
var $$splitComponentImporter$13 = () => import("./ledger.activity-UmbiSJas.mjs");
var Route$14 = createFileRoute("/ledger/activity")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./ledger.collection-bRx8-FIp.mjs");
var Route$13 = createFileRoute("/ledger/collection")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./ledger.rewards-BHg-XTGP.mjs");
var Route$12 = createFileRoute("/ledger/rewards")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./ledger.wallet-DwxkvfGf.mjs");
var Route$11 = createFileRoute("/ledger/wallet")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./lookbook.index-D9v0BFkE.mjs");
var Route$10 = createFileRoute("/lookbook/")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./lookbook._id-9WBJp4J0.mjs");
var Route$9 = createFileRoute("/lookbook/$id")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./os.index-BY4s_mMR.mjs");
var Route$8 = createFileRoute("/os/")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./os._handle-_XTNVbuF.mjs");
var Route$7 = createFileRoute("/os/$handle")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./os.desk-aDMIl_Ln.mjs");
var Route$6 = createFileRoute("/os/desk")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./talent.index-DtxVnBZj.mjs");
var Route$5 = createFileRoute("/talent/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./talent._id-ZUODpXLf.mjs");
var Route$4 = createFileRoute("/talent/$id")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var Route$3 = createFileRoute("/api/auth/$")({ server: { handlers: {
	GET: ({ request }) => auth.handler(request),
	POST: ({ request }) => auth.handler(request)
} } });
var $$splitComponentImporter$2 = () => import("./atlas._kind.index-BUKbWzzl.mjs");
var Route$2 = createFileRoute("/atlas/$kind/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitNotFoundComponentImporter$1 = () => import("./atlas._kind._id-CAI9bMhx.mjs");
var $$splitComponentImporter$1 = () => import("./atlas._kind._id-Tp2kDCzY.mjs");
var Route$1 = createFileRoute("/atlas/$kind/$id")({
	component: lazyRouteComponent($$splitComponentImporter$1, "component"),
	beforeLoad: ({ params }) => {
		if (!isKind(params.kind)) throw notFound();
		if (!getEntity(params.kind, params.id)) throw notFound();
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent")
});
var $$splitNotFoundComponentImporter = () => import("./atlas.live._qid-DQjtZamU.mjs");
var $$splitComponentImporter = () => import("./atlas.live._qid-BAiQb-oR.mjs");
var Route = createFileRoute("/atlas/live/$qid")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	beforeLoad: ({ params }) => {
		if (!/^Q[1-9]\d{0,12}$/.test(params.qid)) throw notFound();
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var IndexRoute = Route$44.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$45
});
var AcademyRoute = Route$43.update({
	id: "/academy",
	path: "/academy",
	getParentRoute: () => Route$45
});
var ApplyRoute = Route$42.update({
	id: "/apply",
	path: "/apply",
	getParentRoute: () => Route$45
});
var AtelierRoute = Route$41.update({
	id: "/atelier",
	path: "/atelier",
	getParentRoute: () => Route$45
});
var AtlasRoute = Route$40.update({
	id: "/atlas",
	path: "/atlas",
	getParentRoute: () => Route$45
});
var CartRoute = Route$39.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$45
});
var DeskRoute = Route$38.update({
	id: "/desk",
	path: "/desk",
	getParentRoute: () => Route$45
});
var JoinRoute = Route$37.update({
	id: "/join",
	path: "/join",
	getParentRoute: () => Route$45
});
var LedgerRoute = Route$36.update({
	id: "/ledger",
	path: "/ledger",
	getParentRoute: () => Route$45
});
var LegalRoute = Route$35.update({
	id: "/legal",
	path: "/legal",
	getParentRoute: () => Route$45
});
var LiveRoute = Route$34.update({
	id: "/live",
	path: "/live",
	getParentRoute: () => Route$45
});
var LoginRoute = Route$33.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$45
});
var LookbookRoute = Route$32.update({
	id: "/lookbook",
	path: "/lookbook",
	getParentRoute: () => Route$45
});
var NightsRoute = Route$31.update({
	id: "/nights",
	path: "/nights",
	getParentRoute: () => Route$45
});
var OsRoute = Route$30.update({
	id: "/os",
	path: "/os",
	getParentRoute: () => Route$45
});
var PassRoute = Route$29.update({
	id: "/pass",
	path: "/pass",
	getParentRoute: () => Route$45
});
var ServicesRoute = Route$28.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$45
});
var TalentRoute = Route$27.update({
	id: "/talent",
	path: "/talent",
	getParentRoute: () => Route$45
});
var AcademyIndexRoute = Route$26.update({
	id: "/",
	path: "/",
	getParentRoute: () => AcademyRoute
});
var AcademySlugRoute = Route$25.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => AcademyRoute
});
var AcademyExamRoute = Route$24.update({
	id: "/exam",
	path: "/exam",
	getParentRoute: () => AcademyRoute
});
var AtelierIndexRoute = Route$23.update({
	id: "/",
	path: "/",
	getParentRoute: () => AtelierRoute
});
var AtelierSlugRoute = Route$22.update({
	id: "/$slug",
	path: "/$slug",
	getParentRoute: () => AtelierRoute
});
var AtlasIndexRoute = Route$21.update({
	id: "/",
	path: "/",
	getParentRoute: () => AtlasRoute
});
var AtlasKindRoute = Route$20.update({
	id: "/$kind",
	path: "/$kind",
	getParentRoute: () => AtlasRoute
});
var AtlasDossierRoute = Route$19.update({
	id: "/dossier",
	path: "/dossier",
	getParentRoute: () => AtlasRoute
});
var AtlasSavedRoute = Route$18.update({
	id: "/saved",
	path: "/saved",
	getParentRoute: () => AtlasRoute
});
var AtlasSearchRoute = Route$17.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => AtlasRoute
});
var AtlasSourcesRoute = Route$16.update({
	id: "/sources",
	path: "/sources",
	getParentRoute: () => AtlasRoute
});
var LedgerIndexRoute = Route$15.update({
	id: "/",
	path: "/",
	getParentRoute: () => LedgerRoute
});
var LedgerActivityRoute = Route$14.update({
	id: "/activity",
	path: "/activity",
	getParentRoute: () => LedgerRoute
});
var LedgerCollectionRoute = Route$13.update({
	id: "/collection",
	path: "/collection",
	getParentRoute: () => LedgerRoute
});
var LedgerRewardsRoute = Route$12.update({
	id: "/rewards",
	path: "/rewards",
	getParentRoute: () => LedgerRoute
});
var LedgerWalletRoute = Route$11.update({
	id: "/wallet",
	path: "/wallet",
	getParentRoute: () => LedgerRoute
});
var LookbookIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => LookbookRoute
});
var LookbookIdRoute = Route$9.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => LookbookRoute
});
var OsIndexRoute = Route$8.update({
	id: "/",
	path: "/",
	getParentRoute: () => OsRoute
});
var OsHandleRoute = Route$7.update({
	id: "/$handle",
	path: "/$handle",
	getParentRoute: () => OsRoute
});
var OsDeskRoute = Route$6.update({
	id: "/desk",
	path: "/desk",
	getParentRoute: () => OsRoute
});
var TalentIndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => TalentRoute
});
var TalentIdRoute = Route$4.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => TalentRoute
});
var ApiAuthSplatRoute = Route$3.update({
	id: "/api/auth/$",
	path: "/api/auth/$",
	getParentRoute: () => Route$45
});
var AtlasKindIndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => AtlasKindRoute
});
var AtlasKindIdRoute = Route$1.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => AtlasKindRoute
});
var AtlasLiveQidRoute = Route.update({
	id: "/live/$qid",
	path: "/live/$qid",
	getParentRoute: () => AtlasRoute
});
var AcademyRouteChildren = {
	AcademySlugRoute,
	AcademyExamRoute,
	AcademyIndexRoute
};
var AcademyRouteWithChildren = AcademyRoute._addFileChildren(AcademyRouteChildren);
var AtelierRouteChildren = {
	AtelierSlugRoute,
	AtelierIndexRoute
};
var AtelierRouteWithChildren = AtelierRoute._addFileChildren(AtelierRouteChildren);
var AtlasKindRouteChildren = {
	AtlasKindIdRoute,
	AtlasKindIndexRoute
};
var AtlasRouteChildren = {
	AtlasKindRoute: AtlasKindRoute._addFileChildren(AtlasKindRouteChildren),
	AtlasDossierRoute,
	AtlasSavedRoute,
	AtlasSearchRoute,
	AtlasSourcesRoute,
	AtlasIndexRoute,
	AtlasLiveQidRoute
};
var AtlasRouteWithChildren = AtlasRoute._addFileChildren(AtlasRouteChildren);
var LedgerRouteChildren = {
	LedgerActivityRoute,
	LedgerCollectionRoute,
	LedgerRewardsRoute,
	LedgerWalletRoute,
	LedgerIndexRoute
};
var LedgerRouteWithChildren = LedgerRoute._addFileChildren(LedgerRouteChildren);
var LookbookRouteChildren = {
	LookbookIdRoute,
	LookbookIndexRoute
};
var LookbookRouteWithChildren = LookbookRoute._addFileChildren(LookbookRouteChildren);
var OsRouteChildren = {
	OsHandleRoute,
	OsDeskRoute,
	OsIndexRoute
};
var OsRouteWithChildren = OsRoute._addFileChildren(OsRouteChildren);
var TalentRouteChildren = {
	TalentIdRoute,
	TalentIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AcademyRoute: AcademyRouteWithChildren,
	ApplyRoute,
	AtelierRoute: AtelierRouteWithChildren,
	AtlasRoute: AtlasRouteWithChildren,
	CartRoute,
	DeskRoute,
	JoinRoute,
	LedgerRoute: LedgerRouteWithChildren,
	LegalRoute,
	LiveRoute,
	LoginRoute,
	LookbookRoute: LookbookRouteWithChildren,
	NightsRoute,
	OsRoute: OsRouteWithChildren,
	PassRoute,
	ServicesRoute,
	TalentRoute: TalentRoute._addFileChildren(TalentRouteChildren),
	ApiAuthSplatRoute
};
var routeTree = Route$45._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-void px-5 text-center text-ivory",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xs tracking-widest text-heat uppercase",
				children: "Missing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-5xl tracking-wide uppercase",
				children: "No such door."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-8 inline-flex min-h-12 items-center bg-heat px-6 font-display text-xs tracking-widest text-navy uppercase",
				children: "The house"
			})
		] })
	});
}
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFound
	});
}
//#endregion
export { getProduct as A, getById as B, addToCart as C, getCourse as D, getCart as E, listTalent as F, resolveCredit as G, isKind as H, setCartQty as I, KINDS as J, search as K, submitBrief as L, listProducts as M, listRoomDay as N, getCourseReader as O, listRooms as P, useCurrentUserState as R, houseCase as S, checkout as T, listKind as U, getEntity as V, relatedOf as W, KIND_META as Y, HouseChrome as _, Route$4 as a, BrandLogo as b, TapeRow as c, Route$22 as d, Route$25 as f, HeatButton as g, GhostButton as h, Route$2 as i, getTalent as j, getDesk as k, Route$17 as l, Route$42 as m, Route as n, Route$7 as o, Route$33 as p, socialDirectory as q, Route$1 as r, Route$9 as s, router_exports as t, Route$19 as u, PageHero as v, bookRoom as w, cn as x, SignInHere as y, counts as z };
