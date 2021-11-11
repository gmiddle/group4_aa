import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import SidebarChannel from '../SidebarChannel/Index'
import dcordicon from '../../public/dcordicon.png'
import './Sidebar.css'
import { updateUser } from "../../store/session";
import AddServerModal from '../AddServerForm';
import EditServerModal from '../EditServerForm';
import { deleteServer, getServers } from '../../store/server';
import { deleteChannel, editChannel } from '../../store/channel';

const Sidebar = ({currentServerId, setCurrentServerId, currentChannelId, setCurrentChannelId, currUser}) => {
    // const user = useSelector((state) => state.session.user.id)
    const {serverList} = useSelector((state) => state.session.user) 
    const currentServer = serverList.find(server=>`${server.id}` === localStorage.currentServerId)
    // const channelList = currentServer.channels
    // const currentChannel = channelList.find(channel=>`${channel.id}` === localStorage.currentChannelId)
    const dispatch = useDispatch();

    useEffect(() => {
    }, [serverList])

    const handleServerDeleteClick = async (e) => {
      e.preventDefault()
      let serverId = e.target.value
      await dispatch(deleteServer(serverId))
      await dispatch(updateUser(currUser.id))
    }

    const handleServerClick = () => {
        localStorage.setItem('currentServerId', currentServerId)
    }

    const handleChannelClick = () => {
        console.log('--------------------SideBar-index-currentChannelId',currentChannelId)
        localStorage.setItem('currentChannelId', currentChannelId)
    }

    const handleChannelDeleteClick = async (e) => {
        e.preventDefault()
        let channelId = e.target.value
        await dispatch(deleteChannel(channelId))
        await dispatch(updateUser(currUser.id))
    }
    

    return (

      <div className="sideBar">
           <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous" />
          <div className="sideBarTop">
              <div id="serversHeader">                   
                <h3>{'servers'}</h3>
                <AddServerModal 
                    setCurrentServerId={setCurrentServerId}
                    userId={currUser.id} />
              </div>
              {serverList.map((server)=>(
              <div className="serverCard">
                <div onClick={()=>handleServerClick(setCurrentServerId(server.id))} className="serverIcon"></div>
                <button value={server.id} onClick={handleServerDeleteClick}>Delete</button>
                <EditServerModal 
                    setCurrentServerId={setCurrentServerId}
                    userId={currUser.id}
                    serverToEdit={server}
                />
              </div>
              ))}
          </div>
          <div className="sideBarChannels">
              <div className="sideBarChannelName">
                  <div className="sideBarChannelNameText">
                      <h3>{'channels'}</h3>
                      </div>
                      <i className="fas fa-plus" id="addChannel"></i>
                  </div>
          <div className="sideBarChannelList">
          {currentServer && currentServer.channels.map((channel)=>(
              <SidebarChannel channel={channel} handleChannelClick={handleChannelClick} setCurrentChannelId={setCurrentChannelId}/>
          ))}


          </div>
      </div>
      <div className="sideBarUser">
          <div className="sideBarUserName">
              <h3> user name</h3>
              {/* {userName} */}
              </div>
              <div className="logoutIcon">
              <i className="fas fa-cog"></i>
              </div>
          </div>
      </div>
  )


}

export default Sidebar
