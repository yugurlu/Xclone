import React from "react";
import { HomeIcon, ExploreIcon, NotificationsIcon, MessagesIcon, BookmarksIcon, ListsIcon, ProfileIcon, MoreIcon } from "../icon/Icon"
import "../Sidebar.css"
const SideBar = () => {
    return (
        <div className="icons">
            <HomeIcon></HomeIcon>
            <ExploreIcon></ExploreIcon>
            <NotificationsIcon></NotificationsIcon>
            <MessagesIcon></MessagesIcon>
            <BookmarksIcon></BookmarksIcon>
            <ListsIcon></ListsIcon>
            <ProfileIcon></ProfileIcon>
            <MoreIcon></MoreIcon>
        </div>
    )
}

export default SideBar