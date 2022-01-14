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
    const [output, msg] = await res.json();
    // if (msg === 'reaction removed') {
    //   dispatch(delete_Reaction(output.reaction));
    // }
    if (msg !== "bad data") {
      dispatch(add_Reaction(output));
      return output;
    }
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
      const individualReaction = action.reaction;
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
    // case DELETE_REACTION:
    default:
      return state;
  }
};

export default reactionReducer;
