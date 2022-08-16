//#region General Endpoints
const register_user='register-user'
const login_user='login-user'
const forgot_password='forgot-password'
const update_profile_image='update-profile-image'
const update_location='update-location'
const update_password='update-password'
const get_otp_code='get-OTP-code'
const verify_otp_code='verify-otp-code'
const get_updated_user_data='get-updated-user-data'

//#endregion

//#region Muslim user endpoints
//Tasbih
const update_tasbih='update-tasbih'
const get_tasbih_count='get-tasbih-count'

//Quran Recitation
const get_recitation_stats='get-recitation-stats'
const mark_surah_as_read='mark-surah-as-read'
const mark_surah_as_unread='mark-surah-as-unread'
const mark_parah_as_read='mark-parah-as-read'
const mark_parah_as_unread='mark-parah-as-unread'
const update_last_read_surah='update-last-read-surah'
const get_last_read_surah='get-last-read-surah'
const update_last_read_parah='update-last-read-parah'
const get_last_read_parah='get-last-read-parah'
const check_surah_is_read='check-surah-is-read'
const check_parah_is_read='check-parah-is-read'

//Namaz Accountability

const update_namaz_accountability='update-namaz-accountability'
const get_namaz_accountability='get-namaz-accountability'

//Fast Accountability
const update_fast_accountability='update-fast-accountability'
const get_fast_accountability='get-fast-accountability'

//Muslim User preferences
const update_primary_mosque='update-primary-mosque'
const update_auto_silent_settings='update-auto-silent-setting'
const update_namaz_notifications_setting='update-namaz-notifications-setting'
const update_accountability_notifications_setting='update-accountability-notifications-setting'


// const update_auto_silent_settings='update-auto-silent-settings'

//Mosques
const get_all_mosques='get-all-mosques'
const get_closest_mosques='get-closest-mosques'
const get_unverified_mosques_around_user='get-unverified-mosques-aroundUser'
const add_mosque='add-mosque'
const get_mosque_by_id='get-mosque-by-id'
const cast_up_vote='cast-up-vote'
const cast_down_vote='cast-down-vote'

//Learn Namaz
const get_learn_namaz_progress='get-learn-namaz-progress'
const update_learn_namaz_progress='update-learn-namaz-progress'


//Notifications

const get_user_notifications='get-user-notifications'
const delete_muslim_notification='delete-muslim-notification'

//Imam
const become_imam='become-imam'
const get_imam_by_id='get-imam-by-id'
const cast_up_vote_for_imam='cast-up-vote-for-imam'
const cast_down_vote_for_imam='cast-down-vote-for-imam'

//Announcements
const make_announcement='make-announcement'
const delete_announcement='delete-announcement'
const get_announcements='get-all-announcements'

//Namaz timing
const update_namaz_times='update-namaz-times'
const get_times_for_user='get-times-for-user'

//QuranInfo
const get_parahs='get-parahs'

//#endregion

//#region Hindu User endpoints

//Temples
const get_all_temples='get-all-temples'
const get_closest_temples='get-closest-temples'
const get_unverified_temples_around_user='get-unverified-temples-around-user'
const add_temple='add-temple'
const get_temple_by_id='get-temple-by-id'
const cast_up_vote_for_temple='cast-up-vote-for-temple'
const cast_down_vote_for_temple='cast-down-vote-for-temple'

//Notifications
const get_hindu_user_notifications='get-hindu-user-notifications'
const delete_hindu_notification='delete-hindu-notification'

//Preferences
const update_primary_temple='update-primary-temple'
const update_auto_silent_settings_for_hindu_user='update-auto-silent-settings-for-hindu-user'
const update_veg_notifications_setting='update-veg-notifications-setting'

//#endregion

////#region General endpoints
export{
    register_user,
    login_user,
    update_password,
    forgot_password,
    update_profile_image,
    update_location,
    get_otp_code,
    verify_otp_code,
    get_updated_user_data,
}

//#endregion

//#region For Hindus
export{
    get_temple_by_id,
    get_all_temples,
    get_closest_temples,
    get_unverified_temples_around_user,
    add_temple,
    cast_up_vote_for_temple,
    cast_down_vote_for_temple,
    update_primary_temple,
    update_veg_notifications_setting,
    update_auto_silent_settings_for_hindu_user,
    get_hindu_user_notifications,
    delete_hindu_notification
}

//#endregion

//#region Endpoints for Muslim Users
export {
    
    get_imam_by_id,
    update_namaz_times,
    update_tasbih,
    get_recitation_stats,
    mark_surah_as_read,
    mark_surah_as_unread,
    mark_parah_as_read,
    mark_parah_as_unread,
    update_last_read_surah,
    update_last_read_parah,
    check_surah_is_read,
    check_parah_is_read,
    get_last_read_parah,
    get_last_read_surah,
    get_parahs,

    get_namaz_accountability,
    update_namaz_accountability,
    update_fast_accountability,
    get_fast_accountability,
    update_primary_mosque,
    update_auto_silent_settings,
    
    get_all_mosques,
    get_closest_mosques,
    get_unverified_mosques_around_user,
    add_mosque,
    get_mosque_by_id,
    cast_up_vote,
    cast_down_vote,

    cast_up_vote_for_imam,
    cast_down_vote_for_imam,

    get_learn_namaz_progress,
    update_learn_namaz_progress,
    become_imam,
    make_announcement,
    delete_announcement,
    get_announcements,
    update_namaz_notifications_setting,
    update_accountability_notifications_setting,
    get_tasbih_count,
    get_user_notifications,
    delete_muslim_notification,
    get_times_for_user
}
//#endregion