// constants
const GET_CHANNELS = '/channels/getAllChannels'
const ADD_CHANNEL = 'channels/addChannel'
const REMOVE_CHANNEL = 'channels/removeChannel'
const UPDATE_CHANNEL = 'channels/updateChannel'

const get_Channels = (channels) => {
  return {
    type: GET_CHANNELS,
    channels
  }
}

const add_Channel = (channel) => {
  return {
    type: ADD_CHANNEL,
    payload: channel
  }
}

const remove_Channel = (id) => {
  return {
    type: REMOVE_CHANNEL,
    payload: id
  }
}

const update_Channel = (channel) => {
  return {
    type: UPDATE_CHANNEL,
    payload: channel
  }
}

export const getChannels = (serverId) => async (dispatch) => {
  const res = await fetch(`/api/channels/${serverId}`);
  if (res.ok) {
    const [channels_list, servers_list] = await res.json();
    console.log(servers_list)
    if (channels_list.length > 0) {
      dispatch(get_Channels(channels_list));
      return channels_list;
    } else {
      return 'Nah'
    }
  };
};

export const addChannel = (inputChannel) => async (dispatch) => {
  const {title, serverId} = inputChannel;
  const res = await fetch(`/api/channels/${serverId}`, {
      method: 'POST',
      body: JSON.stringify({
          title, serverId
      })
  });
  if (res.ok) {
    const channel = await res.json();
    dispatch(add_Channel(channel));
    return channel;
  };
};

export const removeChannel = (inputChannel) => async (dispatch) => {
  const {id, serverId} = inputChannel;
  const res = await fetch(`/api/channels/${serverId}/${id}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    const msg = await res.json();
    if (msg === 'Success') dispatch(remove_Channel(id))
  };
};

export const updateChannel = (inputChannel) => async (dispatch) => {
  const {id, title, serverId} = inputChannel;
  const res = await fetch(`/api/channels/${serverId}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id, title, serverId
    })
  });
  if (res.ok) {
    const channel = await res.json();
    dispatch(update_Channel(channel));
    return channel;
  };
};

const channelReducer = (state = {}, action) => {
  let newState;
  switch (action.type) {
      case GET_CHANNELS:
          console.log(action.payload)
          newState = {};
          action.channels.forEach(channel => {
            newState[channel.id] = channel
          })
          return newState;
      case ADD_CHANNEL:
          newState = Object.assign({}, state);
          newState[action.channel.id] = action.channel;
          return newState;
      case REMOVE_CHANNEL:
        newState = Object.assign({}, state);
        delete newState[action.id];
        return newState;
      case UPDATE_CHANNEL:
        newState = Object.assign({}, state);
        newState[action.id] = action;
        return newState
      default:
          return state;
  }
};

export default channelReducer;
