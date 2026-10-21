import { createContext, useContext, useReducer } from 'react';
import {
  CLIENTS_DATA, ORDERS_DATA, INIT_MESSAGES, INIT_NEW_ORDER, STAFF,
} from './data.js';

export const AppContext = createContext(null);

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return { ...state, role: action.profile.role, profile: action.profile };

    case 'UPDATE_NEW_ORDER':
      return { ...state, newOrder: { ...state.newOrder, ...action.data } };

    case 'RESET_NEW_ORDER':
      return { ...state, newOrder: INIT_NEW_ORDER };

    case 'ADD_ORDER': {
      const n = state.orders.length + 90;
      const ord = {
        ...action.order,
        id: `ORD-2025-${String(n).padStart(4, '0')}`,
        paid: false, status: 'Received',
        tailor: 'Ramesh K.', tailorId: 1,
      };
      return { ...state, orders: [ord, ...state.orders], newOrder: INIT_NEW_ORDER };
    }

    case 'UPDATE_STATUS':
      return {
        ...state,
        orders: state.orders.map(o => o.id === action.id ? { ...o, status: action.status } : o),
      };

    case 'MARK_PAID':
      return {
        ...state,
        orders: state.orders.map(o => o.id === action.id ? { ...o, paid: true } : o),
      };

    case 'SEND_MSG': {
      const existing = state.messages[action.orderId] || [];
      const now = new Date();
      const time = now.toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' });
      const msg = { from: state.role, text: action.text, time };
      if (state.role !== 'tailor') msg.name = `${state.profile.name} (Admin)`;
      return {
        ...state,
        messages: { ...state.messages, [action.orderId]: [...existing, msg] },
      };
    }

    case 'ADD_CLIENT': {
      const nc = {
        ...action.client,
        id: Date.now(), orders: 0, lifetime: 0, pending: 0, measurements: {},
      };
      return { ...state, clients: [nc, ...state.clients] };
    }

    case 'UPDATE_CLIENT':
      return {
        ...state,
        clients: state.clients.map(c => c.id === action.id ? { ...c, ...action.data } : c),
      };

    case 'UPDATE_MEASUREMENTS':
      return {
        ...state,
        clients: state.clients.map(c =>
          c.id === action.clientId ? { ...c, measurements: action.measurements } : c,
        ),
      };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    role: 'admin',
    profile: STAFF[0],
    clients: CLIENTS_DATA,
    orders: ORDERS_DATA,
    messages: INIT_MESSAGES,
    newOrder: INIT_NEW_ORDER,
  });

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};
