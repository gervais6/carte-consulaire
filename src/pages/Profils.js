import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../pages/Profils.css';
import { FaCamera } from 'react-icons/fa'; 
import Header from '../pages/Header';
import Footer from '../pages/Footer';

const Profile = () => {
    return (
        <div className="full-height">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"/>

            <div className="bg-light flex-grow-1">
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-4">
                            <div className="profile-header position-relative mb-4">
                                <div className="position-absolute top-0 end-0 p-3">
                                    <button className="btn btn-light"><i className="fas fa-edit me-2"></i>Edit Cover</button>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="position-relative d-inline-block">
                                    <img src="https://randomuser.me/api/portraits/men/40.jpg" className="rounded-circle profile-pic" alt="Profile Picture"/>
                                    <button className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle">
                                        <i className="fas fa-camera"></i>
                                    </button>
                                </div>
                                <h3 className="mt-3 mb-1">Alex Johnson</h3>
                                <p className="text-muted mb-3">Senior Product Designer</p>
                                <div className="d-flex justify-content-center gap-2 mb-4">
                                    <button className="btn btn-outline-primary" style={{ fontSize: '17px' }}><i className="fas fa-envelope me-2"></i>Message</button>
                                    <button className="btn btn-primary" style={{ fontSize: '17px' }}><i className="fas fa-user-plus me-2"></i>Connect</button>
                                </div>
                            </div>
                        </div>
        
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body p-0">
                                    <div className="row g-0">
                                        <div className="col-lg-3 border-end">
                                            <div className="p-4">
                                                <div className="nav flex-column nav-pills">
                                                    <a className="nav-link active" href="#" style={{ fontSize: '18px' }}><i className="fas fa-user me-2"></i>Personal Info</a>
                                                    <a className="nav-link" href="#" style={{ fontSize: '18px' }}><i className="fas fa-lock me-2"></i>Security</a>
                                                    <a className="nav-link" href="#" style={{ fontSize: '18px' }}><i className="fas fa-bell me-2"></i>Notifications</a>
                                                    <a className="nav-link" href="#" style={{ fontSize: '18px' }}><i className="fas fa-credit-card me-2"></i>Billing</a>
                                                    <a className="nav-link" href="#" style={{ fontSize: '18px' }}><i className="fas fa-chart-line me-2"></i>Activity</a>
                                                </div>
                                            </div>
                                        </div>
        
                                        <div className="col-lg-9">
                                            <div className="p-4">
                                                <div className="mb-4">
                                                    <h5 className="mb-4" style={{ fontSize: '18px' }}>Personal Information</h5>
                                                    <div className="row g-3">
                                                        <div className="col-md-6">
                                                            <label className="form-label" style={{ fontSize: '18px' }}>First Name</label>
                                                            <input type="text" className="form-control" value="" style={{ fontSize: '18px' }}/>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label" style={{ fontSize: '18px' }}>Last Name</label>
                                                            <input type="text" className="form-control" value="" style={{ fontSize: '18px' }}/>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label" style={{ fontSize: '18px' }}>Email</label>
                                                            <input type="email" className="form-control" value="" style={{ fontSize: '18px' }}/>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label className="form-label" style={{ fontSize: '18px' }}>Phone</label>
                                                            <input type="phone" className="form-control" value="" style={{ fontSize: '18px' }}/>
                                                        </div>
                                                        <div className="col-12">
                                                            <label className="form-label" style={{ fontSize: '18px' }}>Bio</label>
                                                            <textarea className="form-control" rows="4" style={{ fontSize: '18px' }}></textarea>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div className="row g-4 mb-4">
                                                    <div className="col-md-6">
                                                        <div className="settings-card card">
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        <h6 className="mb-1" style={{ fontSize: '18px' }}>Two-Factor Authentication</h6>
                                                                        <p className="text-muted mb-0 small" style={{ fontSize: '18px' }}>Add an extra layer of security</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" checked/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="settings-card card">
                                                            <div className="card-body">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <div>
                                                                        <h6 className="mb-1" style={{ fontSize: '18px' }}>Email Notifications</h6>
                                                                        <p className="text-muted mb-0 small" style={{ fontSize: '18px' }}>Receive activity updates</p>
                                                                    </div>
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input" type="checkbox" checked/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
        
                                                <div>
                                                    <h5 className="mb-4" style={{ fontSize: '18px' }}>Recent Activity</h5>
                                                    <div className="activity-item mb-3">
                                                        <h6 className="mb-1" style={{ fontSize: '18px' }}>Updated profile picture</h6>
                                                        <p className="text-muted small mb-0" style={{ fontSize: '18px' }}>2 hours ago</p>
                                                    </div>
                                                    <div className="activity-item mb-3">
                                                        <h6 className="mb-1" style={{ fontSize: '18px' }}>Changed password</h6>
                                                        <p className="text-muted small mb-0" style={{ fontSize: '18px' }}>Yesterday</p>
                                                    </div>
                                                    <div className="activity-item">
                                                        <h6 className="mb-1" style={{ fontSize: '18px' }}>Updated billing information</h6>
                                                        <p className="text-muted small mb-0" style={{ fontSize: '18px' }}>3 days ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;