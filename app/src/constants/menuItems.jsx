import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Settings } from "react-feather";

export const menuItemsStudent = [
  { label: "Faire ma demande", url: "/demandes", icon: <SupervisorAccountIcon /> },
  { label: "Documents", url: "/documents", icon: <DescriptionIcon /> },
  { label: "Stages", url: "/stages", icon: <BusinessIcon /> },
];

export const menuItemsAdmin = [
  { label: "Documents", url: "/documents", icon: <DescriptionIcon /> },
  { label: "Creation compte tuteur", url: "/creation-tuteur", icon: <SupervisorAccountIcon /> },
  { label: "Stages", url: "/stages", icon: <BusinessIcon /> },
  { label: "Prametrer les stages", url: "/parametres/stages", icon: <Settings /> },
];
export const menuItemsTuteur = [
  { label: "Documents", url: "/documents", icon: <DescriptionIcon /> },
  { label: "Creation compte tuteur", url: "/demandes", icon: <SupervisorAccountIcon /> },
  { label: "Stages", url: "/stages", icon: <BusinessIcon /> },
];
