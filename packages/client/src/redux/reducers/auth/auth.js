const init_state = {
  id: 0,
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  is_verified: "",
  roles: "",
  birthdate: "",
  phone_no: "",
  gender: "",
  image_url: "",
  default_address: 0,
};
import auth_types from "./type";

function auth_reducer(state = init_state, action) {
  if (action.type === auth_types.AUTH_LOGIN) {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      email: action.payload.email,
      first_name: action.payload.first_name,
      last_name: action.payload.last_name,
      is_verified: action.payload.is_verified,
      roles: action.payload.roles,
      birthdate: action.payload.birthdate,
      phone_no: action.payload.phone_no,
      gender: action.payload.gender,
      image_url: action.payload.image_url,
      default_address: action.payload.default_address,
      
    };
  } else if (action.type === auth_types.AUTH_LOGOUT) {
    return init_state;
  }

  return state;
}

export default auth_reducer;
