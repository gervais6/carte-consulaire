import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../pages/Profils.css';
import { FaCamera } from 'react-icons/fa'; 
import Header from '../pages/Header';
import Footer from '../pages/Footer';

const Profile = () => {
    

    return (
        <div>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet"/>

        <div class="bg-light">
            <div class="container">
                <div class="row">
                    <div class="col-12 mb-4">
                        <div class="profile-header position-relative mb-4">
                            <div class="position-absolute top-0 end-0 p-3">
                                <button class="btn btn-light"><i class="fas fa-edit me-2"></i>Edit Cover</button>
                            </div>
                        </div>
                        <div class="text-center">
                            <div class="position-relative d-inline-block">
                                <img src="https://randomuser.me/api/portraits/men/40.jpg" class="rounded-circle profile-pic" alt="Profile Picture"/>
                                <button class="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle">
                                    <i class="fas fa-camera"></i>
                                </button>
                            </div>
                            <h3 class="mt-3 mb-1">Alex Johnson</h3>
                            <p class="text-muted mb-3">Senior Product Designer</p>
                            <div class="d-flex justify-content-center gap-2 mb-4">
                                <button class="btn btn-outline-primary"style={{ fontSize: '17px' }}><i class="fas fa-envelope me-2"></i>Message</button>
                                <button class="btn btn-primary"style={{ fontSize: '17px' }}><i class="fas fa-user-plus me-2"></i>Connect</button>
                            </div>
                        </div>
                    </div>
        
                    <div class=" col-12">
                        <div class="card border-0 shadow-sm">
                            <div class="card-body p-0">
                                <div class="row g-0">
                                    <div class="col-lg-3 border-end">
                                        <div class="p-4">
                                            <div class="nav flex-column nav-pills">
                                                <a class="nav-link active" href="#" style={{ fontSize: '18px' }}><i class="fas fa-user me-2"></i>Personal Info</a>
                                                <a class="nav-link" href="#" style={{ fontSize: '18px' }}><i class="fas fa-lock me-2"></i>Security</a>
                                                <a class="nav-link" href="#" style={{ fontSize: '18px' }}><i class="fas fa-bell me-2"></i>Notifications</a>
                                                <a class="nav-link" href="#" style={{ fontSize: '18px' }}><i class="fas fa-credit-card me-2"></i>Billing</a>
                                                <a class="nav-link" href="#" style={{ fontSize: '18px' }}><i class="fas fa-chart-line me-2"></i>Activity</a>
                                            </div>
                                        </div>
                                    </div>
        
                                    <div class="col-lg-9">
                                        <div class="p-4">
                                            <div class="mb-4">
                                                <h5 class="mb-4" style={{ fontSize: '18px' }}>Personal Information</h5>
                                                <div class="row g-3">
                                                    <div class="col-md-6">
                                                        <label class="form-label" style={{ fontSize: '18px' }}>First Name</label>
                                                        <input type="text" class="form-control" value="" style={{ fontSize: '18px' }}/>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label" style={{ fontSize: '18px' }}>Last Name</label>
                                                        <input type="text" class="form-control" value="" style={{ fontSize: '18px' }}/>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label" style={{ fontSize: '18px' }}>Email</label>
                                                        <input type="email" class="form-control" value="" style={{ fontSize: '18px' }}/>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <label class="form-label" style={{ fontSize: '18px' }}>Phone</label>
                                                        <input type="phone" class="form-control" value="" style={{ fontSize: '18px' }}/>
                                                    </div>
                                                    <div class="col-12">
                                                        <label class="form-label" style={{ fontSize: '18px' }}>Bio</label>
                                                        <textarea class="form-control" rows="4" style={{ fontSize: '18px' }}></textarea>
                                                    </div>
                                                </div>
                                            </div>
        
                                            <div class="row g-4 mb-4">
                                                <div class="col-md-6">
                                                    <div class="settings-card card">
                                                        <div class="card-body">
                                                            <div class="d-flex justify-content-between align-items-center">
                                                                <div>
                                                                    <h6 class="mb-1" style={{ fontSize: '18px' }}>Two-Factor Authentication</h6>
                                                                    <p class="text-muted mb-0 small" style={{ fontSize: '18px' }}>Add an extra layer of security</p>
                                                                </div>
                                                                <div class="form-check form-switch">
                                                                    <input class="form-check-input" type="checkbox" checked/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="settings-card card">
                                                        <div class="card-body">
                                                            <div class="d-flex justify-content-between align-items-center">
                                                                <div>
                                                                    <h6 class="mb-1" style={{ fontSize: '18px' }}>Email Notifications</h6>
                                                                    <p class="text-muted mb-0 small" style={{ fontSize: '18px' }}>Receive activity updates</p>
                                                                </div>
                                                                <div class="form-check form-switch">
                                                                    <input class="form-check-input" type="checkbox" checked/>
                                                                </div>
                                                            </ div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
        
                                            <div>
                                                <h5 class="mb-4" style={{ fontSize: '18px' }}>Recent Activity</h5>
                                                <div class="activity-item mb-3">
                                                    <h6 class="mb-1" style={{ fontSize: '18px' }}>Updated profile picture</h6>
                                                    <p class="text-muted small mb-0" style={{ fontSize: '18px' }}>2 hours ago</p>
                                                </div>
                                                <div class="activity-item mb-3">
                                                    <h6 class="mb-1" style={{ fontSize: '18px' }}>Changed password</h6>
                                                    <p class="text-muted small mb-0" style={{ fontSize: '18px' }}>Yesterday</p>
                                                </div>
                                                <div class="activity-item">
                                                    <h6 class="mb-1" style={{ fontSize: '18px' }}>Updated billing information</h6>
                                                    <p class="text-muted small mb-0" style={{ fontSize: '18px' }}>3 days ago</p>
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
)};

export default Profile;