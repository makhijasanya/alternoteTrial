/* AlterNote — Seed Data */

export const CLIENTS_DATA = [
  {
    id: 1, name: 'Meera Kapoor', phone: '+91 98100 00001',
    initials: 'MK', color: '#d9385e', textColor: '#fff',
    tags: ['Bridal', 'VIP'], orders: 7, lifetime: 62000, pending: 8000,
    notes: 'Prefers 0.5 inch extra on waist. Very particular about blouse fitting — at least 2 fittings. Favourite: Banarasi silk.',
    birthday: '12 March', email: 'meera@email.com', since: 'Jan 2022',
    measurements: {
      Bust: '36', Waist: '28', Hip: '38',
      'Shoulder Width': '14.5', 'Sleeve Length': '22',
      'Back Length': '15', 'Front Length': '16', Armhole: '7.5',
    },
  },
  {
    id: 2, name: 'Sneha Rao', phone: '+91 98100 00002',
    initials: 'SR', color: '#eff6ff', textColor: '#2563eb',
    tags: ['Regular'], orders: 3, lifetime: 24000, pending: 1500,
    notes: '',
    birthday: '22 Jul', email: 'sneha@email.com', since: 'Mar 2023',
    measurements: {
      Bust: '34', Waist: '26', Hip: '36',
      'Shoulder Width': '13.5', 'Sleeve Length': '21',
      'Back Length': '14', 'Front Length': '15',
    },
  },
  {
    id: 3, name: 'Anita Sharma', phone: '+91 98100 00003',
    initials: 'AS', color: '#ecfdf5', textColor: '#059669',
    tags: ['Bridal'], orders: 4, lifetime: 34000, pending: 0,
    notes: 'Prefers heavy embroidery. Likes flared silhouettes.',
    birthday: '5 Jun', email: 'anita@email.com', since: 'Jun 2023',
    measurements: {
      Bust: '38', Waist: '30', Hip: '40',
      'Shoulder Width': '14', 'Sleeve Length': '22', 'Back Length': '15.5',
    },
  },
  {
    id: 4, name: 'Pooja Gupta', phone: '+91 98100 00004',
    initials: 'PG', color: '#fffbeb', textColor: '#d97706',
    tags: ['Regular'], orders: 2, lifetime: 8400, pending: 0,
    notes: '',
    birthday: '', email: 'pooja@email.com', since: 'Sep 2024',
    measurements: {
      Bust: '36', Waist: '28', Hip: '38', 'Sleeve Length': '20',
    },
  },
  {
    id: 5, name: 'Nisha Verma', phone: '+91 98100 00005',
    initials: 'NV', color: '#fdf4ff', textColor: '#9333ea',
    tags: ['VIP'], orders: 5, lifetime: 44000, pending: 0,
    notes: 'Very precise about measurements. Always wants a receipt.',
    birthday: '1 Dec', email: 'nisha@email.com', since: 'Feb 2022',
    measurements: {
      Bust: '35', Waist: '27', Hip: '37',
      'Shoulder Width': '13.5', 'Sleeve Length': '21.5',
    },
  },
];

export const ORDERS_DATA = [
  {
    id: 'ORD-2025-0089', clientId: 1, garment: 'Bridal Lehenga',
    tailor: 'Ramesh K.', tailorId: 1, status: 'In Progress',
    tags: ['Rush', 'Bridal'], due: '27 Apr', amount: 36500,
    description: 'Heavy embroidery, Banarasi base, sage green dupatta. Flare panels — not A-line. Handle skirt first.',
    type: 'order', paid: false,
  },
  {
    id: 'ORD-2025-0088', clientId: 2, garment: 'Blouse + Petticoat',
    tailor: 'Mohan J.', tailorId: 2, status: 'For Fitting',
    tags: ['Regular'], due: '2 May', amount: 4800,
    description: 'Green silk blouse with mirror work embroidery — backless design.',
    type: 'order', paid: false,
  },
  {
    id: 'ORD-2025-0087', clientId: 3, garment: 'Sharara Set',
    tailor: 'Ramesh K.', tailorId: 1, status: 'Received',
    tags: ['Bridal'], due: '8 May', amount: 28000,
    description: 'Heavy embroidery sharara with flared dupatta in royal blue.',
    type: 'order', paid: false,
  },
  {
    id: 'ALT-2025-0011', clientId: 2, garment: 'Cotton Blouse',
    tailor: 'Mohan J.', tailorId: 2, status: 'For Fitting',
    tags: ['Regular'], due: '12 May', amount: 1500,
    description: 'Take waist in by 2 inches. Reduce right sleeve by 1.5 inches only. Do NOT touch the neckline.',
    type: 'alteration', paid: false,
  },
  {
    id: 'ORD-2025-0086', clientId: 5, garment: 'Blouse',
    tailor: 'Ramesh K.', tailorId: 1, status: 'In Progress',
    tags: ['VIP'], due: '5 May', amount: 8500,
    description: 'Royal blue silk blouse, boat neckline, sleeveless.',
    type: 'order', paid: false,
  },
  {
    id: 'ORD-2025-0085', clientId: 4, garment: 'Kurti Set',
    tailor: 'Mohan J.', tailorId: 2, status: 'Delivered',
    tags: ['Regular'], due: '20 Apr', amount: 4200,
    description: 'Cotton kurti with patchwork detailing.',
    type: 'order', paid: true,
  },
];

export const TAILORS = [
  { id: 1, name: 'Ramesh Kumar', initials: 'RK', color: '#ecfdf5', textColor: '#059669', active: 3 },
  { id: 2, name: 'Mohan Joshi',  initials: 'MJ', color: '#fffbeb', textColor: '#d97706', active: 2 },
];

export const STAFF = [
  { id: 1, name: 'Priya Mehta',    initials: 'PM', role: 'admin',  roleLabel: 'Admin · Owner',       color: '#d9385e', textColor: '#fff' },
  { id: 2, name: 'Anika Singh',    initials: 'AS', role: 'help',   roleLabel: 'Help / Assistant',    color: '#eff6ff', textColor: '#2563eb' },
  { id: 3, name: 'Ramesh Kumar',   initials: 'RK', role: 'tailor', roleLabel: 'Tailor',              color: '#ecfdf5', textColor: '#059669' },
  { id: 4, name: 'Mohan Joshi',    initials: 'MJ', role: 'tailor', roleLabel: 'Tailor',              color: '#fffbeb', textColor: '#d97706' },
];

export const INIT_MESSAGES = {
  'ORD-2025-0089': [
    { from: 'admin',  name: 'Priya (Admin)', text: 'Ramesh bhai, Meera ka bridal lehenga assigned hai. Rush order — 27 April deadline. Skirt panels se start karo.', time: '9:00 AM' },
    { from: 'tailor',                         text: 'Haan didi, dekh liya. Fabric client layegi kab?',                                                                  time: '9:05 AM' },
    { from: 'admin',  name: 'Priya (Admin)', text: 'Kal tak de degi. Tab tak pattern cut kar lo.',                                                                      time: '9:08 AM' },
    { from: 'tailor',                         text: 'Theek hai didi 👍',                                                                                                 time: '9:12 AM' },
    { from: 'admin',  name: 'Priya (Admin)', text: 'Ek baat aur — neckline bilkul mat chhedna. Client ne khaas kaha hai.',                                             time: '9:48 AM' },
    { from: 'tailor',                         text: 'Ji didi, noted ✅',                                                                                                 time: '9:50 AM' },
  ],
};

export const INIT_NEW_ORDER = {
  step: 1, client: null, garmentType: 'Blouse', description: '',
  tags: [], measurements: {}, deliveryDate: '27 Apr 2025', tailor: null,
};

export const GARMENT_TYPES = ['Blouse', 'Lehenga', 'Kurti', 'Sharara', 'Sherwani', 'Suit', 'Saree', 'Custom'];
export const ALL_ORDER_TAGS = ['Rush', 'Bridal', 'New Design', 'VIP'];
export const STATUS_LIST = ['Received', 'In Progress', 'For Fitting', 'Completed', 'Delivered'];
export const TAILOR_STATUS_LIST = ['Received', 'In Progress', 'For Fitting', 'Completed'];

export const STATUS_COLORS = {
  'Received':    { bg: '#f8fafc', color: '#64748b', dot: '#64748b' },
  'In Progress': { bg: '#fffbeb', color: '#d97706', dot: '#d97706' },
  'For Fitting': { bg: '#eff6ff', color: '#2563eb', dot: '#2563eb' },
  'Completed':   { bg: '#ecfdf5', color: '#059669', dot: '#059669' },
  'Delivered':   { bg: '#f0fdf4', color: '#16a34a', dot: '#16a34a' },
};

export const TAG_COLORS = {
  'Bridal':     { bg: '#fffbeb', color: '#d97706' },
  'VIP':        { bg: '#fef2f4', color: '#d9385e' },
  'Rush':       { bg: '#fef2f4', color: '#d9385e' },
  'Regular':    { bg: '#f8fafc', color: '#64748b', border: '#e2e8f0' },
  'Alteration': { bg: '#eff6ff', color: '#2563eb' },
  'New Design': { bg: '#f5f3ff', color: '#7c3aed' },
  'Referral':   { bg: '#f0fdf4', color: '#059669' },
};
