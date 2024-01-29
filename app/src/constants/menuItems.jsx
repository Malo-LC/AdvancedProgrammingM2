import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Settings } from "react-feather";

export const menuItemsStudent = [
  { label: "Faire ma demande", url: "/demandes", icon: <SupervisorAccountIcon /> },
  { label: "Documents", url: "/documents", icon: <DescriptionIcon /> },
  { label: "Mon stages", url: "/stages", icon: <BusinessIcon /> },
];

export const menuItemsAdmin = [
  { label: "Documents", url: "/documents", icon: <DescriptionIcon /> },
  { label: "Creation compte tuteur", url: "/tutor-register", icon: <SupervisorAccountIcon /> },
  { label: "Demandes de stages", url: "/demandes", icon: <BusinessIcon /> },
  { label: "Paramétrer les stages", url: "/parametres/stages", icon: <Settings /> },
  { label: "Liste des stages", url: "/stages", icon: <BusinessIcon /> },
];
export const menuItemsTuteur = [
  { label: "Documents", url: "/documents", icon: <DescriptionIcon /> },
  { label: "Demandes de validation", url: "/demandes", icon: <BusinessIcon /> },
];
