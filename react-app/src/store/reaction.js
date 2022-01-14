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

// const delete_Reaction = (messageId) => {
//   return {
//     type: DELETE_REACTION,
//     messageId
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
    const outputReaction = await res.json();
    // if (outputReaction === 'reaction removed') {
    //   dispatch(delete_Reaction(messageId));
    // }
    if (outputReaction !== "bad data") {
      dispatch(add_Reaction(outputReaction));
    }
    return outputReaction;
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
        if (newState[reaction.messageId]) {
          let reactions = {...newState[reaction.messageId]};
          reactions[reaction.id] = reaction;
          newState[reaction.messageId] = reactions;
        } else {
          let reactions = {};
          reactions[reaction.id] = reaction;
          newState[reaction.messageId] = reactions;
        };
      });
      return newState;
    case ADD_REACTION:
      newState = Object.assign({}, state);
      const givenReaction = action.reaction
      if (newState[givenReaction.messageId]) {
        let reactions = {...newState[givenReaction.messageId]};
        reactions[givenReaction.id] = givenReaction;
        newState[givenReaction.messageId] = reactions;
      } else {
        let reactions = {}
        reactions[givenReaction.id] = givenReaction;
        newState[givenReaction.messageId] = reactions;
      };
      return newState;
    default:
      return state;
  }
};

export default reactionReducer;
