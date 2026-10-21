import { createContext, useContext, useReducer, useRef, useEffect } from 'react';

export const NavContext = createContext(null);

const navReducer = (state, action) => {
  switch (action.type) {
    case 'PUSH':
      return { ...state, stack: [...state.stack, { id: action.id, params: action.params || {} }], anim: 'forward' };
    case 'POP':
      if (state.stack.length <= 1) return state;
      return { ...state, stack: state.stack.slice(0, -1), anim: 'back' };
    case 'REPLACE':
      return { ...state, stack: [...state.stack.slice(0, -1), { id: action.id, params: action.params || {} }], anim: 'forward' };
    case 'RESET':
      return { stack: [{ id: action.id, params: action.params || {} }], anim: null };
    case 'CLEAR_ANIM':
      return { ...state, anim: null };
    default:
      return state;
  }
};

export const NavProvider = ({ children }) => {
  const [state, dispatch] = useReducer(navReducer, {
    stack: [{ id: 'splash', params: {} }],
    anim: null,
  });

  const navigate  = (id, params = {}) => dispatch({ type: 'PUSH',    id, params });
  const goBack    = ()                 => dispatch({ type: 'POP' });
  const replace   = (id, params = {}) => dispatch({ type: 'REPLACE', id, params });
  const resetTo   = (id, params = {}) => dispatch({ type: 'RESET',   id, params });
  const clearAnim = ()                 => dispatch({ type: 'CLEAR_ANIM' });

  const current = state.stack[state.stack.length - 1];

  return (
    <NavContext.Provider value={{ navigate, goBack, replace, resetTo, clearAnim, current, stackLen: state.stack.length, anim: state.anim }}>
      {children}
    </NavContext.Provider>
  );
};

export const useNav = () => {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error('useNav must be used inside NavProvider');
  return ctx;
};
