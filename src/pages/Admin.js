import React from 'react';
import './Admin.css'; 

const Admin = () => {
    return ( 
        <div>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-pattern">
                            <div className="card-body">
                                <div className="float-right">
                                    <i className="fa fa-archive text-primary h4 ml-3"></i>
                                </div>
                                <h5 className="font-size-20 mt-0 pt-1">24</h5>
                                <p className="text-muted mb-0">Total Projects</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-pattern">
                            <div className="card-body">
                                <div className="float-right">
                                    <i className="fa fa-th text-primary h4 ml-3"></i>
                                </div>
                                <h5 className="font-size-20 mt-0 pt-1">18</h5>
                                <p className="text-muted mb-0">Completed Projects</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card bg-pattern">
                            <div className="card-body">
                                <div className="float-right">
                                    <i className="fa fa-file text-primary h4 ml-3"></i>
                                </div>
                                <h5 className="font-size-20 mt-0 pt-1">06</h5>
                                <p className="text-muted mb-0">Pending Projects</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <form>
                                    <div className="form-group mb-0">
                                        <label>Search</label>
                                        <div className="input-group mb-4">
                                            <input type="text" className="form-control" placeholder="Search..." aria-describedby="project-search-addon" />
                                            <div className="input-group-append">
                                                <button className="btn btn-danger" type="button" id="project-search-addon">
                                                    <i className="fa fa-search search-icon font-12"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive project-list">
                                    <table className="table project-table table-centered table-nowrap">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Projects</th>
                                                <th scope="col"> Date</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Team</th>
                                                <th scope="col">Progress</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* Example row */}
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>New admin Design</td>
                                                <td>02/5/2019</td>
                                                <td>
                                                    <span className="text-success font-12"><i className="mdi mdi-checkbox-blank-circle mr-1"></i> Completed</span>
                                                </td>
                                                <td>
                                                    <div className="team">
                                                        <a href="javascript: void(0);" className="team-member" data-toggle="tooltip" data-placement="top" title="Roger Drake">
                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="rounded-circle avatar-xs" alt="" />
                                                        </a>

                                                    </div>
                                                </td>
                                                <td>
                                                    <p className="mb-0">Progress<span className="float-right">100%</span></p>
                                                    <div className="progress mt-2" style={{ height: "5px" }}>
                                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="action">
                                                        <a href="#" className="text-success mr-4" data-toggle="tooltip" data-placement="top" title="Edit">
                                                            <i className="fa fa-pencil h5 m-0"></i>
                                                        </a>
                                                        <a href="#" className="text-danger" data-toggle="tooltip" data-placement="top" title="Close">
                                                            <i className="fa fa-remove h5 m-0"></i>
                                                        </a>
                                                    </div>
                                                </td>
                                            </tr>
                                            {/* Add more rows as needed */}
                                        </tbody>
                                        
                                    </table>
                                </div>

                                <div className="pt-3">
                                    <ul className="pagination justify-content-end mb-0">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">Next</a>
                                        </li>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;