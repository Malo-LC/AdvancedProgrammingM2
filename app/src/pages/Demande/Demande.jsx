import React from 'react';
import './demande.css';
import Navbar from "../../components/Navbar/Navbar";

function Demandes() {

    const demandesList = [
        { id: 1, nom: 'Malo Le Corvec', type: 'Stage M1', status: 'Information du stage' },
        { id: 2, nom: 'Benjamin Liszewski', type: 'Stage M1', status: 'Information du stage' },
        { id: 3, nom: 'Victor Tran', type: 'Stage M1', status: 'Information du stage' },
        { id: 3, nom: 'Pape Mouhamadou Mamoune Sock', type: 'Stage M1', status: 'Information du stage' },

    ];

    return (
        <div>
            <Navbar />
            <div className="demandes-container">
                <h1>Mes Demandes ({demandesList.length})</h1>
                <div className="demandes-list">
                    {demandesList.map((demande) => (
                        <div key={demande.id} className="demande-card">
                            <div className="demande-info">
                                <p className="demande-name">{demande.nom}</p>
                                <p>{demande.type}</p>
                            </div>
                            <div className="demande-status">
                                <p>{demande.status}</p>
                            </div>
                            <div className="demande-actions">
                                <button className="btn accepter">Accepter</button>
                                <button className="btn refuser">Refuser</button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <button className="btn voir-plus">Voir les ... stages restants</button> */}
            </div>
        </div>
    );
}
export  default Demandes;