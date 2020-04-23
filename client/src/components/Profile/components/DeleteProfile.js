import React from 'react'
import "../Profile.css";
import { useAuth } from "../../App/Authentication";

const DeleteProfile = ({showingDeleteFunc}) => {
    const { user, setUser, isAuthed } = useAuth();
    const deleteProfile = () => {
        if(!isAuthed) return
        fetch(`/api/v1/deleteUser/${user.id}`, 
        {
            method: "DELETE",
        })
        .then(res => {
            if(res.ok)
            {
                setUser(null)
            }
        })
        .catch(err => console.log("Error", err.message))
        //use user from context or session cookie to find user in db,
        //then delete that profile and also delete the session cookie.
    }

    return (
        <div className="card delete-profile-alert">
            <h2 className="title is-5">Are you sure you want to delete? This action is irreversible.</h2>
            <div className="level">
                <button className="button is-danger" onClick={deleteProfile}>
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
