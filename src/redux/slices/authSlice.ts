export interface AuthState {
  isLoggedIn: boolean;
  user: {
    id: string;
    name: string;
  } | null;
}


const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};


const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";


export const login = (user: { id: string; name: string }) => ({
  type: LOGIN,
  payload: user,
});

export const logout = () => ({
  type: LOGOUT,
});

export default function authReducer(
  state = initialState,
  action: any
): AuthState {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
}