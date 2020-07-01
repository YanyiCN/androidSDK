import { PopLayer } from "./Const";

let PopMap: { [popId: number]: string } = {}
PopMap[PopLayer.POP_ALERT] = "common/AlertPop";
PopMap[PopLayer.POP_GET_AWARD] = "common/GetAwardPop";
PopMap[PopLayer.POP_TIP] = "common/TipPop";
PopMap[PopLayer.POP_RE_ENTER] = "common/ReEnterPop";
PopMap[PopLayer.POP_DEBUG_FUN] = "debug/DebugFunPop";
PopMap[PopLayer.POP_SELECT_LAYER] = "common/SelectBtnLayer";
PopMap[PopLayer.POP_LOGIN_PHONE] = "login/LoginPhonePop";
PopMap[PopLayer.POP_PROFILE_PANEL] = "profile/ProfilePanelPop";
PopMap[PopLayer.POP_SHOP] = "shop/ShopManagePop";
PopMap[PopLayer.POP_SHOP_BUY_PROP_TIP] = "shop/ShopBuyPropTipPop";
PopMap[PopLayer.POP_RANKING] = "ranking/RankingListPop";
PopMap[PopLayer.POP_RANKING_EXPLAIN] = "ranking/RankingExplainPop";
PopMap[PopLayer.POP_SET] = "set/SetManagePop";
PopMap[PopLayer.POP_SET_ACCOUNT_SAFETY] = "set/SetAccountSafetyPop";
PopMap[PopLayer.POP_SET_BIND_PHONE] = "set/SetBindPhonePop";
PopMap[PopLayer.POP_SET_CERTIFICATION] = "set/SetCertificationPop"
PopMap[PopLayer.POP_SET_CHANGE_PHONE] = "set/SetChangePhonePop"
PopMap[PopLayer.POP_SET_CONTACT_SERVICE] = "set/SetContactServicePop";
PopMap[PopLayer.POP_SET_FEEDBACK_DETAILS] = "set/SetFeedbackDetailsPop";
PopMap[PopLayer.POP_SET_FEEDBACK] = "set/SetFeedbackPop";
PopMap[PopLayer.POP_LOGIN_AGREEMENT] = "login/LoginAgreementPop";
PopMap[PopLayer.POP_CHANGE_HEAD_PHOTO] = "ChangeHeadPhotoPop";
PopMap[PopLayer.POP_CHANGE_NICK_NAME] = "ChangeNickNamePop";
PopMap[PopLayer.POP_MAIL] = "MailListPop";
PopMap[PopLayer.POP_BAG] = "BagPop";
PopMap[PopLayer.POP_VIP] = "VipPop";
PopMap[PopLayer.POP_DAILY_SIGNIN] = "signin/DailySignInPop";
PopMap[PopLayer.POP_DAILY_SIGNIN_TIP] = "signin/DailySignInTipPop";
PopMap[PopLayer.POP_SHOP_BUY_WAY] = "shop/ShopBuyWay";
PopMap[PopLayer.POP_SHOP_PAY_LOADING] = "shop/ShopPayLoadingLayer";
PopMap[PopLayer.POP_WATCH_AD] = "WatchADPop";
PopMap[PopLayer.POP_TASK] = "task/TaskPanelPop";
PopMap[PopLayer.POP_ACTIVE] = "active/ActivePanelPop";
PopMap[PopLayer.POP_WELFARE] = "welfare/WelfarePanelPop";
PopMap[PopLayer.POP_CARNIVAL] = "carnival/CarnivalPanelPop";
PopMap[PopLayer.POP_WANFA] = "game/GameWanfaPop";
PopMap[PopLayer.POP_PLAYING_METHOD] = "PlayingMethodPop";
PopMap[PopLayer.POP_INVITE_GIFT] = "InviteGiftPop";
export default PopMap;
export const PopMapPreUrl = "prefabs/pop/";