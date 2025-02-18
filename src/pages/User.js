import React from 'react';

const UserStatistics = ({ connectedUsers, totalKilos, totalPrice }) => {
    return (
        <>
            {/* Statistiques des utilisateurs connectés */}
            <div className="row mb-4">
                <div className="col-xl-3 col-md-6">
                    <div className="card bg-dark text-white" style={{ height: '150px' }}>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div className="float-right">
                                <i className="fa fa-users text-white h4 ml-3"></i>
                            </div>
                            <h5 className="font-size-20 mt-0 pt-1" style={{ color: "white" }}>{connectedUsers.length}</h5>
                            <p className="text-white mb-0">Utilisateurs Connectés</p>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card bg-dark text-white" style={{ height: '150px' }}>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div className="float-right">
                                <i className="fa fa-balance-scale text-white h4 ml-3"></i>
                            </div>
                            <h5 className="font-size-20 mt-0 pt-1" style={{ color: "white" }}>{totalKilos}</h5>
                            <p className="text-white mb-0">Total Kilos</p>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6">
                    <div className="card bg-dark text-white" style={{ height: '150px' }}>
                        <div className="card-body d-flex flex-column justify-content-between">
                            <div className="float-right">
                                <i className="fa fa-euro-sign text-white h4 ml-3"></i>
                            </div>
                            <h5 className="font-size-20 mt-0 pt-1" style={{ color: "white" }}>{totalPrice.toFixed(2)} F CFA</h5>
                            <p className="text-white mb-0">Total Price</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table des Utilisateurs Connectés */}
            <h3>Utilisateurs connectés :</h3>
            <div className="table-responsive">
                <table className="table table-dark table-striped table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Prénom</th>
                            <th scope="col">Email</th>
                            <th scope="col">Statut</th>
                            <th scope="col">Dernière Activité</th>
                            <th scope="col">Tâche Actuelle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {connectedUsers.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.prenom}</td>
                                <td>{user.email}</td>
                                <td>{user.status}</td>
                                <td>{user.lastActivity ? new Date(user.lastActivity).toLocaleString() : 'N/A'}</td>
                                <td>{user.currentTask || 'Aucune'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UserStatistics;