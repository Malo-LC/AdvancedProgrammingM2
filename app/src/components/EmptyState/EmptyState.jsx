//style
import "./emptystate.css";
import emptyDoc from "../../assets/images/no_doc.jpg";

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="no-doc-image">
        <img src={emptyDoc} />
      </div>
      <div className="empty-text-container">
        <p className="text-[32px] font-semibold">Aucune demande</p>
        <p className="text-[#706f6f]">Vos demandes apparaissent ici lorsqu&apos;un étudiant soumet un document</p>
      </div>
    </div>
  );
}

export default EmptyState;
