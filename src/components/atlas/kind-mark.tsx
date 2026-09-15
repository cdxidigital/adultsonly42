import {
  Briefcase,
  Building2,
  Clapperboard,
  Gavel,
  Calendar,
  Share2,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { Kind } from "@/lib/catalog/types";

export const KIND_ICON: Record<Kind, LucideIcon> = {
  performers: UserRound,
  productions: Clapperboard,
  companies: Building2,
  agents: Briefcase,
  events: Calendar,
  social: Share2,
  law: Gavel,
};
