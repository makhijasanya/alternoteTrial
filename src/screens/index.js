/* Screen registry — maps navigation IDs to React components */

export { SplashScreen }       from './onboarding/SplashScreen.jsx';
export { LoginScreen }        from './onboarding/LoginScreen.jsx';
export { SignUpScreen }       from './onboarding/SignUpScreen.jsx';
export { OTPScreen }          from './onboarding/OTPScreen.jsx';
export { ProfileSelectScreen } from './onboarding/ProfileSelectScreen.jsx';
export { SetupScreen }        from './onboarding/SetupScreen.jsx';
export { TemplateSetupScreen } from './onboarding/TemplateSetupScreen.jsx';
export { StaffSetupScreen }   from './onboarding/StaffSetupScreen.jsx';
export { OnboardDoneScreen }  from './onboarding/OnboardDoneScreen.jsx';

export { DashboardScreen }    from './admin/DashboardScreen.jsx';
export { ClientListScreen }   from './admin/ClientListScreen.jsx';
export { ClientProfileScreen } from './admin/ClientProfileScreen.jsx';
export { AddClientScreen }    from './admin/AddClientScreen.jsx';
export { EditClientScreen }   from './admin/EditClientScreen.jsx';
export { MeasurementScreen }  from './admin/MeasurementScreen.jsx';
export { MeasurementListScreen, MeasurementTemplateScreen } from './admin/MeasurementListScreen.jsx';
export { OrderListScreen }    from './admin/OrderListScreen.jsx';
export { OrderDetailScreen }  from './admin/OrderDetailScreen.jsx';
export { BillingHistoryScreen, BillingScreen } from './admin/BillingScreens.jsx';
export { AnalyticsScreen }    from './admin/AnalyticsScreen.jsx';
export { SettingsScreen, SettingsBizScreen, SettingsStaffScreen, SettingsTemplatesScreen, SettingsRolesScreen } from './admin/SettingsScreens.jsx';
export { PaymentSetupScreen, PaymentLinkScreen } from './admin/PaymentScreens.jsx';
export { ConversationsScreen } from './admin/ConversationsScreen.jsx';
export { NewOrderS1Screen, NewOrderS2Screen, NewOrderS3Screen, NewOrderS4Screen, OrderReviewScreen } from './admin/NewOrderScreens.jsx';

export {
  AlterClientScreen, AlterNewScreen, AlterMeasScreen, AlterDeliveryScreen,
  AlterReviewScreen, AlterDetailScreen, AlterBillScreen,
} from './alteration/AlterationScreens.jsx';

export {
  TailorOrdersScreen, TailorOrderDetailScreen,
  TailorChatsScreen, TailorChatScreen, TailorSettingsScreen,
} from './tailor/TailorScreens.jsx';

export {
  HelpDashScreen, HelpOrdersScreen, HelpOrderDetailScreen, HelpSettingsScreen,
} from './help/HelpScreens.jsx';

export {
  WebAnalyticsScreen, WebClientsScreen, WebBillingScreen,
  WebSettingsScreen, WebBlockedScreen,
} from './web/WebScreens.jsx';

/* ────────────────────────────────────────────────────────────────
   SCREEN MAP
   Keys are the navigation IDs used in navigate(), navigate(), etc.
   Values are { component, passParams } where passParams lists the
   params keys to forward from nav params to component props.
──────────────────────────────────────────────────────────────── */
import { SplashScreen as _Splash }            from './onboarding/SplashScreen.jsx';
import { LoginScreen as _Login }              from './onboarding/LoginScreen.jsx';
import { SignUpScreen as _SignUp }            from './onboarding/SignUpScreen.jsx';
import { OTPScreen as _OTP }                 from './onboarding/OTPScreen.jsx';
import { ProfileSelectScreen as _ProfSel }   from './onboarding/ProfileSelectScreen.jsx';
import { SetupScreen as _Setup }             from './onboarding/SetupScreen.jsx';
import { TemplateSetupScreen as _TmplSetup } from './onboarding/TemplateSetupScreen.jsx';
import { StaffSetupScreen as _StaffSetup }   from './onboarding/StaffSetupScreen.jsx';
import { OnboardDoneScreen as _OnboardDone } from './onboarding/OnboardDoneScreen.jsx';

import { DashboardScreen as _Dash }          from './admin/DashboardScreen.jsx';
import { ClientListScreen as _CList }        from './admin/ClientListScreen.jsx';
import { ClientProfileScreen as _CProf }     from './admin/ClientProfileScreen.jsx';
import { AddClientScreen as _AddClient }     from './admin/AddClientScreen.jsx';
import { EditClientScreen as _EditClient }   from './admin/EditClientScreen.jsx';
import { MeasurementScreen as _Meas }        from './admin/MeasurementScreen.jsx';
import { MeasurementListScreen as _MeasList, MeasurementTemplateScreen as _MeasTmpl } from './admin/MeasurementListScreen.jsx';
import { OrderListScreen as _OList }         from './admin/OrderListScreen.jsx';
import { OrderDetailScreen as _ODet }        from './admin/OrderDetailScreen.jsx';
import { BillingHistoryScreen as _BHist, BillingScreen as _Bill } from './admin/BillingScreens.jsx';
import { AnalyticsScreen as _Analytics }     from './admin/AnalyticsScreen.jsx';
import { SettingsScreen as _Settings, SettingsBizScreen as _SettBiz, SettingsStaffScreen as _SettStaff, SettingsTemplatesScreen as _SettTmpl, SettingsRolesScreen as _SettRoles } from './admin/SettingsScreens.jsx';
import { PaymentSetupScreen as _PaySetup, PaymentLinkScreen as _PayLink } from './admin/PaymentScreens.jsx';
import { ConversationsScreen as _Convos }    from './admin/ConversationsScreen.jsx';
import { NewOrderS1Screen as _OS1, NewOrderS2Screen as _OS2, NewOrderS3Screen as _OS3, NewOrderS4Screen as _OS4, OrderReviewScreen as _OReview } from './admin/NewOrderScreens.jsx';

import { AlterClientScreen as _AltClient, AlterNewScreen as _AltNew, AlterMeasScreen as _AltMeas, AlterDeliveryScreen as _AltDel, AlterReviewScreen as _AltRev, AlterDetailScreen as _AltDet, AlterBillScreen as _AltBill } from './alteration/AlterationScreens.jsx';

import { TailorOrdersScreen as _TOrd, TailorOrderDetailScreen as _TODet, TailorChatsScreen as _TChats, TailorChatScreen as _TChat, TailorSettingsScreen as _TSet } from './tailor/TailorScreens.jsx';

import { HelpDashScreen as _HDash, HelpOrdersScreen as _HOrd, HelpOrderDetailScreen as _HODet, HelpSettingsScreen as _HSet } from './help/HelpScreens.jsx';

import { WebAnalyticsScreen as _WAnalytics, WebClientsScreen as _WClients, WebBillingScreen as _WBill, WebSettingsScreen as _WSet, WebBlockedScreen as _WBlock } from './web/WebScreens.jsx';

export const SCREEN_MAP = {
  /* Onboarding */
  splash:           { component: _Splash,     params: [] },
  login:            { component: _Login,      params: [] },
  signUp:           { component: _SignUp,     params: [] },
  otp:              { component: _OTP,        params: [] },
  profileSelect:    { component: _ProfSel,    params: [] },
  setup:            { component: _Setup,      params: [] },
  templateSetup:    { component: _TmplSetup,  params: [] },
  staffSetup:       { component: _StaffSetup, params: [] },
  onboardDone:      { component: _OnboardDone,params: [] },

  /* Admin */
  dashboard:        { component: _Dash,       params: [] },
  clientList:       { component: _CList,      params: [] },
  clientProfile:    { component: _CProf,      params: ['clientId'] },
  addClient:        { component: _AddClient,  params: [] },
  editClient:       { component: _EditClient, params: ['clientId'] },
  measurements:     { component: _Meas,       params: ['clientId'] },
  measList:         { component: _MeasList,   params: ['clientId'] },
  measTemplate:     { component: _MeasTmpl,   params: ['clientId', 'templateId', 'templateName'] },
  orderList:        { component: _OList,      params: [] },
  orderDetail:      { component: _ODet,       params: ['orderId'] },
  billingHistory:   { component: _BHist,      params: [] },
  billing:          { component: _Bill,       params: ['orderId'] },
  analytics:        { component: _Analytics,  params: [] },
  settings:         { component: _Settings,   params: [] },
  settingsBiz:      { component: _SettBiz,    params: [] },
  settingsStaff:    { component: _SettStaff,  params: [] },
  settingsTemplates:{ component: _SettTmpl,   params: [] },
  settingsRoles:    { component: _SettRoles,  params: [] },
  paymentSetup:     { component: _PaySetup,   params: [] },
  paymentLink:      { component: _PayLink,    params: ['orderId'] },
  conversations:    { component: _Convos,     params: [] },
  orderS1:          { component: _OS1,        params: ['preselectedClientId'] },
  orderS2:          { component: _OS2,        params: [] },
  orderS3:          { component: _OS3,        params: [] },
  orderS4:          { component: _OS4,        params: [] },
  orderReview:      { component: _OReview,    params: [] },

  /* Alteration */
  alterClient:      { component: _AltClient,  params: [] },
  alterNew:         { component: _AltNew,     params: ['clientId'] },
  alterMeas:        { component: _AltMeas,    params: ['clientId'] },
  alterDelivery:    { component: _AltDel,     params: ['clientId'] },
  alterReview:      { component: _AltRev,     params: ['clientId'] },
  alterDetail:      { component: _AltDet,     params: ['orderId'] },
  alterBill:        { component: _AltBill,    params: ['orderId'] },

  /* Tailor */
  tailorOrders:     { component: _TOrd,       params: [] },
  tailorOrderDetail:{ component: _TODet,      params: ['orderId'] },
  tailorChats:      { component: _TChats,     params: [] },
  tailorChat:       { component: _TChat,      params: ['orderId'] },
  tailorSettings:   { component: _TSet,       params: [] },

  /* Help/Assistant */
  helpDash:         { component: _HDash,      params: [] },
  helpOrders:       { component: _HOrd,       params: [] },
  helpOrderDetail:  { component: _HODet,      params: ['orderId'] },
  helpSettings:     { component: _HSet,       params: [] },

  /* Web Dashboard */
  webAnalytics:     { component: _WAnalytics, params: [] },
  webClients:       { component: _WClients,   params: [] },
  webBilling:       { component: _WBill,      params: [] },
  webSettings:      { component: _WSet,       params: [] },
  webBlocked:       { component: _WBlock,     params: [] },
};
