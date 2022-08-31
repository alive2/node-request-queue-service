export enum RequestType {
    SMS,
    DLR,
}

export enum ResponseCode {
    Success = 0,
    /** There was a problem parsing your XML */
    XMLError = 1,
    /** XML fields missing */
    XmlFieldsMissing = 2,
    /** Username or password is incorrect */
    IncorrectCredentials = 3,
    /** Not enough credit */
    NotEnoughCredit = 4,
    /** No permission to send SMS at this time */
    NoPermissionToSendSmsNow = 5,
    /** Process failure */
    ProcessFailure = 6,
    /** You can not send in this format,you need send group in 'bulk', For more - call to Customer Service. */
    InvalidFormat = 7,
    /** All numbers are on a blocked list */
    AllNumbersOnBlockList = 8,
    /** destination/source/message length is too large or too small */
    LengthError = 9,
    /** invalid verify_phone request: no phones to verify */
    NoPhonesToVerify = 510,
    /** you have not permission for this function */
    NoPermissionForThisFunction = 511,
    /** Phone or reason not valid */
    InvalidPhoneOrReason = 933,
    /** Some of numbers not in blacklist */
    SomeOfNumbersNotInBlacklist = 944,
    /** Add unsubscribe error- invalid value */
    AddUnsubscribeError = 986,
    /** Contact list are entered not exist  */
    NonexistantContactList = 988,
    /** The message is too long or too short  */
    InvalidMessageLength = 989,
    /** Amount must be small amount of your credits */
    AmountMustBeSmallAmountOfCredits = 990,
    /** The amount must contain only digits */
    AmountMustContainDigitsOnly = 991,
    /** The source is too long or too short  */
    InvalidSourceLength = 992,
    /** The password is too long or too short */
    InvalidPasswordLength = 993,
    /** Username already exists */
    UsernameAlreadyExists = 994,
    /** The username is too long or too short */
    InvalidUsernameLength = 995,
    /** The name is too long or too short */
    InvalidNameLength = 996,
    /** Not a valid command sent  */
    InvalidCommand = 997,
    /** There was an unknown error in the request */
    UnknownErrorInRequest = 998,
    /** Campaign already cancel */
    CampaignAlreadyCancelled = 955,
    /** Campaign already sent */
    CampaignAlreadySent = 966,
    /** Campaign does not belong to customer or Not exist */
    CampaignDoesNotBelongToCustomerOrNonexistant = 977,
    /** Contact support  */
    ContactSupport = 999,
}

export enum DlrStatus {
    /** נשלח -ללא אישור מסירה 1 */
    SentWithoutVerification = -1,
    /** הגיע ליעד */
    ArrivedToTheDestination0 = 0,
    /** נכשל */
    Failed1 = 1,
    /** Timeout */
    Timeout = 2,
    /** נכשל */
    Failed3 = 3,
    /** נכשל סלולר */
    CellularFailed = 4,
    /** נכשל */
    Failed5 = 5,
    /** נכשל */
    Failed6 = 6,
    /** אין יתרה */
    NoBalance = 7,
    /** נכשל סלולר -עבר תהליך של store&forward */
    CellularFailedStoreAndForward = 8,
    /** מספר כשר */
    KosherNumber = 15,
    /** אין הרשאת שעת שליחה - Are not timing permitted to customer do not have timing permission */
    NoSendTimePermission = 16,
    /** חסום להודעות פירסומיות */
    AdvertisementsBlock = 17,
    /** הודעה לא חוקית */
    InvalidMessage = 18,
    /** לא הגיע ליעד */
    DidNotReachDestination101 = 101,
    /** הגיע ליעד */
    ArrivedToTheDestination102 = 102,
    /** פג תוקף */
    Expired = 103,
    /** נמחק */
    Removed = 104,
    /** לא הגיע ליעד */
    DidNotReachDestination105 = 105,
    /** לא הגיע ליעד */
    DidNotReachDestination106 = 106,
    /** לא הגיע ליעד  */
    DidNotReachDestination107 = 107,
    /** נדחה */
    Rejected = 108,
    /** לא הגיע ליעד */
    DidNotReachDestination109 = 109,
    /** לא הגיע ליעד */
    DidNotReachDestination110 = 110,
    /** לא הגיע ליעד */
    DidNotReachDestination111 = 111,
    /** לא הגיע ליעד */
    DidNotReachDestination112 = 112,
    /** לא הגיע ליעד */
    DidNotReachDestination113 = 113,
    /** לא הגיע ליעד */
    DidNotReachDestination114 = 114,
    /** לא הגיע ליעד */
    DidNotReachDestination115 = 115,
    /** לא הגיע ליעד */
    DidNotReachDestination116 = 116,
    /** לא הגיע ליעד */
    DidNotReachDestination117 = 117,
    /** לא הגיע ליעד */
    DidNotReachDestination118 = 118,
    /** לא הגיע ליעד */
    DidNotReachDestination119 = 119,
    /** לא הגיע ליעד */
    DidNotReachDestination120 = 120,
    /** לא הגיע ליעד */
    DidNotReachDestination121 = 121,
    /** לא הגיע ליעד */
    DidNotReachDestination122 = 122,
    /** לא הגיע ליעד */
    DidNotReachDestination123 = 123,
    /** לא הגיע ליעד */
    DidNotReachDestination124 = 124,
    /** לא הגיע ליעד */
    DidNotReachDestination125 = 125,
    /** לא הגיע ליעד */
    DidNotReachDestination126 = 126,
    /** לא הגיע ליעד */
    DidNotReachDestination127 = 127,
    /** לא הגיע ליעד */
    DidNotReachDestination128 = 128,
    /** לא הגיע ליעד */
    DidNotReachDestination129 = 129,
    /** לא הגיע ליעד */
    DidNotReachDestination130 = 130,
    /** לא הגיע ליעד */
    DidNotReachDestination131 = 131,
    /** לא הגיע ליעד */
    DidNotReachDestination132 = 132,
    /** נחסם לפי בקשה */
    BlockedOnRequest = 201,
    /** מנוי נמצא מחוץ לכיסוי רשת מקומית */
    OutOfLocalNetworkCoverage = 747,
    /** אין הרשאה */
    NoPermission = 998,
    /** שגיאה לא ידועה */
    UnknownError = 999,
}
