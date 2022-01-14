// constants
const GET_REACTIONS = '/reactions/getMessageReactions'
const ADD_REACTION = '/reactions/addReaction'
// const DELETE_REACTION = '/reactions/deleteReaction'

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

// const delete_Reaction = (reaction) => {
//   return {
//     type: DELETE_REACTION,
//     reaction
//   }
// }

export const getReactions = () => async (dispatch) => {
  const res = await fetch(`/api/reactions/`);
  if (res.ok) {
    const reactions = await res.json();
    dispatch(get_Reactions(reactions));
    return reactions;
  };
};


export const addReaction = (data, messageId) => async (dispatch) => {
  const res = await fetch(`/api/reactions/${messageId}/`, {
    method: 'POST',
    body: JSON.stringify({
        messageId, reaction: data
    })
  });
  if (res.ok) {
    const reaction = await res.json();
    dispatch(add_Reaction(reaction));
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
  let reactions = {};
  switch (action.type) {
    case GET_REACTIONS:
      action.reactions.forEach(individualReaction => {
        if (newState[individualReaction.messageId]) {
          let currentReactions = newState[individualReaction.messageId];
          currentReactions[individualReaction.reaction]++;
        } else {
          reactions = {'far fa-grin-beam fa-2x': 0, 'far fa-smile-wink fa-2x': 0,
          'far fa-grin-squint-tears fa-2x': 0, 'far fa-sad-tear fa-2x': 0,
          'far fa-angry fa-2x': 0};
          reactions[individualReaction.reaction]++;
          newState[individualReaction.messageId] = reactions;
        };
      });
      return newState;
    case ADD_REACTION:
      newState = Object.assign({}, state);
      const individualReaction = action.reaction;
      if (individualReaction.msg === 'reaction removed') {
        delete individualReaction['msg'];
        let msgReactions = newState[individualReaction.messageId];
        msgReactions[individualReaction.reaction]--;
      } else {
        delete individualReaction['msg'];
        if (newState[individualReaction.messageId]) {
          let currentReactions = newState[individualReaction.messageId];
          currentReactions[individualReaction.reaction]++;
        } else {
          reactions = {'far fa-grin-beam fa-2x': 0, 'far fa-smile-wink fa-2x': 0,
          'far fa-grin-squint-tears fa-2x': 0, 'far fa-sad-tear fa-2x': 0,
          'far fa-angry fa-2x': 0};
          reactions[individualReaction.reaction]++;
          newState[individualReaction.messageId] = reactions;
        };
      };
      return newState;
    default:
      return state;
  }
};

export default reactionReducer;
