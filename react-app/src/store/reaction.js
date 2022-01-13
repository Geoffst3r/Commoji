// constants
const GET_REACTIONS = '/channels/getAllChannels'
const ADD_REACTION = 'channels/addChannel'

const get_Reactions = (reactions) => {
  return {
    type: GET_REACTIONS,
    reactions
  }
}

const add_Reaction = (reaction) => {
  return {
    type: ADD_REACTION,
    reaction
  }
}

export const getReactions = (messageId) => async (dispatch) => {
  if (!messageId) return;
  const res = await fetch(`/api/reactions/${messageId}/`);
  if (res.ok) {
    const reactions = await res.json();
    dispatch(get_Reactions(reactions));
    return reactions;
  };
};

export const addReaction = (reaction) => async (dispatch) => {
  const { messageId, userId, reactionString } = reaction;
  const res = await fetch(`/api/reactions/${messageId}/`, {
    method: 'POST',
    body: JSON.stringify({
        messageId, userId, reactionString
    })
  });
  if (res.ok) {
    const reaction = await res.json();
    if (reaction !== "bad data") {
      dispatch(add_Reaction(reaction));
    }
    return reaction;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
};

const reactionReducer = (state = {}, action) => {
  let newState = {};
  switch (action.type) {
    case GET_REACTIONS:
      action.reactions.forEach(reaction => {
        newState[reaction.id] = reaction;
      });
      return newState;
    case ADD_REACTION:
      newState = Object.assign({}, state);
      newState[action.reaction.id] = action.reaction;
      return newState;
    default:
      return state;
  }
};

export default reactionReducer;
