import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Settings } from "react-feather";

export const menuItemsStudent = [
  { label: "Faire ma demande", url: "/demandes", icon: <SupervisorAccountIcon /> },
  { label: "Documents", url: "/documents", icon: <DescriptionIcon /> },
  { label: "Mon stage", url: "/stages", icon: <BusinessIcon /> },
  { label: "Formulaires", url: "/form", icon: <BusinessIcon /> },
];

export const menuItemsAdmin = [
  { label: "Creation compte tuteur", url: "/tutor-register", icon: <SupervisorAccountIcon /> },
  { label: "Paramétrer les stages", url: "/parametres/stages", icon: <Settings /> },
  { label: "Paramétrer les formulaires", url: "/parametres/form", icon: <Settings /> },
  { label: "Liste des stages", url: "/stages/liste", icon: <BusinessIcon /> },
];
export const menuItemsTuteur = [
  { label: "Documents", url: "/documents", icon: <DescriptionIcon /> },
  { label: "Demandes de validation", url: "/document-validation", icon: <BusinessIcon /> },
];
