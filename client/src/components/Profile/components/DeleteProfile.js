import React from 'react'
import "../Profile.css";

const DeleteProfile = ({showingDeleteFunc}) => {
    return (
        <div className="card delete-profile-alert">
            <h2 className="title is-5">Are you sure you want to delete? This action is irreversible.</h2>
            <div className="level">
                <button className="button is-danger">
                    Delete Profile
                </button>
                <button className="button is-light" onClick={showingDeleteFunc}>
                    Cancel
                </button>
            </div>
        </div>
    )
}
export default DeleteProfile
