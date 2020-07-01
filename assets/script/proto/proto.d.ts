import * as $protobuf from "protobufjs";
/** Namespace Lobby. */
export namespace Lobby {

    /** Properties of a BaseMsg. */
    interface IBaseMsg {

        /** BaseMsg type */
        type?: (number|null);

        /** BaseMsg mid */
        mid?: (number|null);

        /** BaseMsg req_id */
        req_id?: (number|Long|null);

        /** BaseMsg server_id */
        server_id?: (string|null);

        /** BaseMsg data */
        data?: (Uint8Array|null);
    }

    /** Represents a BaseMsg. */
    class BaseMsg implements IBaseMsg {

        /**
         * Constructs a new BaseMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IBaseMsg);

        /** BaseMsg type. */
        public type: number;

        /** BaseMsg mid. */
        public mid: number;

        /** BaseMsg req_id. */
        public req_id: (number|Long);

        /** BaseMsg server_id. */
        public server_id: string;

        /** BaseMsg data. */
        public data: Uint8Array;

        /**
         * Creates a new BaseMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BaseMsg instance
         */
        public static create(properties?: Lobby.IBaseMsg): Lobby.BaseMsg;

        /**
         * Encodes the specified BaseMsg message. Does not implicitly {@link Lobby.BaseMsg.verify|verify} messages.
         * @param message BaseMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IBaseMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BaseMsg message, length delimited. Does not implicitly {@link Lobby.BaseMsg.verify|verify} messages.
         * @param message BaseMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IBaseMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BaseMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BaseMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.BaseMsg;

        /**
         * Decodes a BaseMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BaseMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.BaseMsg;

        /**
         * Verifies a BaseMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BaseMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BaseMsg
         */
        public static fromObject(object: { [k: string]: any }): Lobby.BaseMsg;

        /**
         * Creates a plain object from a BaseMsg message. Also converts values to other types if specified.
         * @param message BaseMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.BaseMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BaseMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ServerErrorRes. */
    interface IServerErrorRes {

        /** ServerErrorRes req_id */
        req_id?: (number|Long|null);

        /** ServerErrorRes error_msg */
        error_msg?: (string|null);

        /** ServerErrorRes error_code */
        error_code?: (number|null);

        /** ServerErrorRes error_msg_ext */
        error_msg_ext?: (string|null);
    }

    /** Represents a ServerErrorRes. */
    class ServerErrorRes implements IServerErrorRes {

        /**
         * Constructs a new ServerErrorRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IServerErrorRes);

        /** ServerErrorRes req_id. */
        public req_id: (number|Long);

        /** ServerErrorRes error_msg. */
        public error_msg: string;

        /** ServerErrorRes error_code. */
        public error_code: number;

        /** ServerErrorRes error_msg_ext. */
        public error_msg_ext: string;

        /**
         * Creates a new ServerErrorRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ServerErrorRes instance
         */
        public static create(properties?: Lobby.IServerErrorRes): Lobby.ServerErrorRes;

        /**
         * Encodes the specified ServerErrorRes message. Does not implicitly {@link Lobby.ServerErrorRes.verify|verify} messages.
         * @param message ServerErrorRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IServerErrorRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ServerErrorRes message, length delimited. Does not implicitly {@link Lobby.ServerErrorRes.verify|verify} messages.
         * @param message ServerErrorRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IServerErrorRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ServerErrorRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ServerErrorRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.ServerErrorRes;

        /**
         * Decodes a ServerErrorRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ServerErrorRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.ServerErrorRes;

        /**
         * Verifies a ServerErrorRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ServerErrorRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ServerErrorRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.ServerErrorRes;

        /**
         * Creates a plain object from a ServerErrorRes message. Also converts values to other types if specified.
         * @param message ServerErrorRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.ServerErrorRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ServerErrorRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PageObj. */
    interface IPageObj {

        /** PageObj cur_pg */
        cur_pg?: (number|null);

        /** PageObj tot_pg */
        tot_pg?: (number|null);

        /** PageObj show_row */
        show_row?: (number|null);

        /** PageObj tot_row */
        tot_row?: (number|null);

        /** PageObj req_order */
        req_order?: (string|null);
    }

    /** Represents a PageObj. */
    class PageObj implements IPageObj {

        /**
         * Constructs a new PageObj.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IPageObj);

        /** PageObj cur_pg. */
        public cur_pg: number;

        /** PageObj tot_pg. */
        public tot_pg: number;

        /** PageObj show_row. */
        public show_row: number;

        /** PageObj tot_row. */
        public tot_row: number;

        /** PageObj req_order. */
        public req_order: string;

        /**
         * Creates a new PageObj instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PageObj instance
         */
        public static create(properties?: Lobby.IPageObj): Lobby.PageObj;

        /**
         * Encodes the specified PageObj message. Does not implicitly {@link Lobby.PageObj.verify|verify} messages.
         * @param message PageObj message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IPageObj, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PageObj message, length delimited. Does not implicitly {@link Lobby.PageObj.verify|verify} messages.
         * @param message PageObj message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IPageObj, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PageObj message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PageObj
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.PageObj;

        /**
         * Decodes a PageObj message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PageObj
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.PageObj;

        /**
         * Verifies a PageObj message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PageObj message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PageObj
         */
        public static fromObject(object: { [k: string]: any }): Lobby.PageObj;

        /**
         * Creates a plain object from a PageObj message. Also converts values to other types if specified.
         * @param message PageObj
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.PageObj, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PageObj to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginReq. */
    interface ILoginReq {

        /** LoginReq login_type */
        login_type?: (number|null);

        /** LoginReq account_params */
        account_params?: (string|null);

        /** LoginReq client_info */
        client_info?: (Lobby.IClientInfo|null);
    }

    /** Represents a LoginReq. */
    class LoginReq implements ILoginReq {

        /**
         * Constructs a new LoginReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.ILoginReq);

        /** LoginReq login_type. */
        public login_type: number;

        /** LoginReq account_params. */
        public account_params: string;

        /** LoginReq client_info. */
        public client_info?: (Lobby.IClientInfo|null);

        /**
         * Creates a new LoginReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginReq instance
         */
        public static create(properties?: Lobby.ILoginReq): Lobby.LoginReq;

        /**
         * Encodes the specified LoginReq message. Does not implicitly {@link Lobby.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.ILoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginReq message, length delimited. Does not implicitly {@link Lobby.LoginReq.verify|verify} messages.
         * @param message LoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.ILoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.LoginReq;

        /**
         * Decodes a LoginReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.LoginReq;

        /**
         * Verifies a LoginReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.LoginReq;

        /**
         * Creates a plain object from a LoginReq message. Also converts values to other types if specified.
         * @param message LoginReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.LoginReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a LoginRes. */
    interface ILoginRes {

        /** LoginRes code */
        code?: (number|null);

        /** LoginRes message */
        message?: (string|null);

        /** LoginRes user_info */
        user_info?: (Lobby.IUserInfoRes|null);

        /** LoginRes user_other_info */
        user_other_info?: (Lobby.IUserOtherInfoRes|null);

        /** LoginRes user_use_prop_info */
        user_use_prop_info?: (Lobby.IUserUsePropRes|null);

        /** LoginRes address */
        address?: (string|null);
    }

    /** Represents a LoginRes. */
    class LoginRes implements ILoginRes {

        /**
         * Constructs a new LoginRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.ILoginRes);

        /** LoginRes code. */
        public code: number;

        /** LoginRes message. */
        public message: string;

        /** LoginRes user_info. */
        public user_info?: (Lobby.IUserInfoRes|null);

        /** LoginRes user_other_info. */
        public user_other_info?: (Lobby.IUserOtherInfoRes|null);

        /** LoginRes user_use_prop_info. */
        public user_use_prop_info?: (Lobby.IUserUsePropRes|null);

        /** LoginRes address. */
        public address: string;

        /**
         * Creates a new LoginRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns LoginRes instance
         */
        public static create(properties?: Lobby.ILoginRes): Lobby.LoginRes;

        /**
         * Encodes the specified LoginRes message. Does not implicitly {@link Lobby.LoginRes.verify|verify} messages.
         * @param message LoginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.ILoginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified LoginRes message, length delimited. Does not implicitly {@link Lobby.LoginRes.verify|verify} messages.
         * @param message LoginRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.ILoginRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a LoginRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns LoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.LoginRes;

        /**
         * Decodes a LoginRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns LoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.LoginRes;

        /**
         * Verifies a LoginRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a LoginRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns LoginRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.LoginRes;

        /**
         * Creates a plain object from a LoginRes message. Also converts values to other types if specified.
         * @param message LoginRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.LoginRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this LoginRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReConnectionReq. */
    interface IReConnectionReq {

        /** ReConnectionReq token */
        token?: (string|null);

        /** ReConnectionReq uid */
        uid?: (number|Long|null);

        /** ReConnectionReq client_info */
        client_info?: (Lobby.IClientInfo|null);
    }

    /** Represents a ReConnectionReq. */
    class ReConnectionReq implements IReConnectionReq {

        /**
         * Constructs a new ReConnectionReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IReConnectionReq);

        /** ReConnectionReq token. */
        public token: string;

        /** ReConnectionReq uid. */
        public uid: (number|Long);

        /** ReConnectionReq client_info. */
        public client_info?: (Lobby.IClientInfo|null);

        /**
         * Creates a new ReConnectionReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReConnectionReq instance
         */
        public static create(properties?: Lobby.IReConnectionReq): Lobby.ReConnectionReq;

        /**
         * Encodes the specified ReConnectionReq message. Does not implicitly {@link Lobby.ReConnectionReq.verify|verify} messages.
         * @param message ReConnectionReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IReConnectionReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReConnectionReq message, length delimited. Does not implicitly {@link Lobby.ReConnectionReq.verify|verify} messages.
         * @param message ReConnectionReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IReConnectionReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReConnectionReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReConnectionReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.ReConnectionReq;

        /**
         * Decodes a ReConnectionReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReConnectionReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.ReConnectionReq;

        /**
         * Verifies a ReConnectionReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReConnectionReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReConnectionReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.ReConnectionReq;

        /**
         * Creates a plain object from a ReConnectionReq message. Also converts values to other types if specified.
         * @param message ReConnectionReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.ReConnectionReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReConnectionReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ReConnectionRes. */
    interface IReConnectionRes {

        /** ReConnectionRes code */
        code?: (number|null);

        /** ReConnectionRes message */
        message?: (string|null);

        /** ReConnectionRes user_info */
        user_info?: (Lobby.IUserInfoRes|null);

        /** ReConnectionRes user_other_info */
        user_other_info?: (Lobby.IUserOtherInfoRes|null);

        /** ReConnectionRes user_use_prop_info */
        user_use_prop_info?: (Lobby.IUserUsePropRes|null);

        /** ReConnectionRes address */
        address?: (string|null);
    }

    /** Represents a ReConnectionRes. */
    class ReConnectionRes implements IReConnectionRes {

        /**
         * Constructs a new ReConnectionRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IReConnectionRes);

        /** ReConnectionRes code. */
        public code: number;

        /** ReConnectionRes message. */
        public message: string;

        /** ReConnectionRes user_info. */
        public user_info?: (Lobby.IUserInfoRes|null);

        /** ReConnectionRes user_other_info. */
        public user_other_info?: (Lobby.IUserOtherInfoRes|null);

        /** ReConnectionRes user_use_prop_info. */
        public user_use_prop_info?: (Lobby.IUserUsePropRes|null);

        /** ReConnectionRes address. */
        public address: string;

        /**
         * Creates a new ReConnectionRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ReConnectionRes instance
         */
        public static create(properties?: Lobby.IReConnectionRes): Lobby.ReConnectionRes;

        /**
         * Encodes the specified ReConnectionRes message. Does not implicitly {@link Lobby.ReConnectionRes.verify|verify} messages.
         * @param message ReConnectionRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IReConnectionRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ReConnectionRes message, length delimited. Does not implicitly {@link Lobby.ReConnectionRes.verify|verify} messages.
         * @param message ReConnectionRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IReConnectionRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ReConnectionRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ReConnectionRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.ReConnectionRes;

        /**
         * Decodes a ReConnectionRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ReConnectionRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.ReConnectionRes;

        /**
         * Verifies a ReConnectionRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ReConnectionRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ReConnectionRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.ReConnectionRes;

        /**
         * Creates a plain object from a ReConnectionRes message. Also converts values to other types if specified.
         * @param message ReConnectionRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.ReConnectionRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ReConnectionRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ClientInfo. */
    interface IClientInfo {

        /** ClientInfo gps_loc */
        gps_loc?: (string|null);

        /** ClientInfo version */
        version?: (string|null);

        /** ClientInfo device_type */
        device_type?: (number|null);

        /** ClientInfo client_type */
        client_type?: (number|null);

        /** ClientInfo channel */
        channel?: (string|null);
    }

    /** Represents a ClientInfo. */
    class ClientInfo implements IClientInfo {

        /**
         * Constructs a new ClientInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IClientInfo);

        /** ClientInfo gps_loc. */
        public gps_loc: string;

        /** ClientInfo version. */
        public version: string;

        /** ClientInfo device_type. */
        public device_type: number;

        /** ClientInfo client_type. */
        public client_type: number;

        /** ClientInfo channel. */
        public channel: string;

        /**
         * Creates a new ClientInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ClientInfo instance
         */
        public static create(properties?: Lobby.IClientInfo): Lobby.ClientInfo;

        /**
         * Encodes the specified ClientInfo message. Does not implicitly {@link Lobby.ClientInfo.verify|verify} messages.
         * @param message ClientInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IClientInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ClientInfo message, length delimited. Does not implicitly {@link Lobby.ClientInfo.verify|verify} messages.
         * @param message ClientInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IClientInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ClientInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ClientInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.ClientInfo;

        /**
         * Decodes a ClientInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ClientInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.ClientInfo;

        /**
         * Verifies a ClientInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ClientInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ClientInfo
         */
        public static fromObject(object: { [k: string]: any }): Lobby.ClientInfo;

        /**
         * Creates a plain object from a ClientInfo message. Also converts values to other types if specified.
         * @param message ClientInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.ClientInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ClientInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserInfoRes. */
    interface IUserInfoRes {

        /** UserInfoRes user_id */
        user_id?: (number|Long|null);

        /** UserInfoRes login_token */
        login_token?: (string|null);

        /** UserInfoRes nick_name */
        nick_name?: (string|null);

        /** UserInfoRes head_img_url */
        head_img_url?: (string|null);

        /** UserInfoRes sex */
        sex?: (number|null);

        /** UserInfoRes coin_a */
        coin_a?: (number|Long|null);

        /** UserInfoRes coin_b */
        coin_b?: (number|Long|null);

        /** UserInfoRes coin_c */
        coin_c?: (number|Long|null);

        /** UserInfoRes level */
        level?: (number|null);

        /** UserInfoRes exp */
        exp?: (number|Long|null);

        /** UserInfoRes vip_level */
        vip_level?: (number|null);

        /** UserInfoRes vip_exp */
        vip_exp?: (number|Long|null);

        /** UserInfoRes title_id */
        title_id?: (number|null);

        /** UserInfoRes cur_game_server_id */
        cur_game_server_id?: (string|null);

        /** UserInfoRes cur_room_unique_id */
        cur_room_unique_id?: (string|null);
    }

    /** Represents a UserInfoRes. */
    class UserInfoRes implements IUserInfoRes {

        /**
         * Constructs a new UserInfoRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserInfoRes);

        /** UserInfoRes user_id. */
        public user_id: (number|Long);

        /** UserInfoRes login_token. */
        public login_token: string;

        /** UserInfoRes nick_name. */
        public nick_name: string;

        /** UserInfoRes head_img_url. */
        public head_img_url: string;

        /** UserInfoRes sex. */
        public sex: number;

        /** UserInfoRes coin_a. */
        public coin_a: (number|Long);

        /** UserInfoRes coin_b. */
        public coin_b: (number|Long);

        /** UserInfoRes coin_c. */
        public coin_c: (number|Long);

        /** UserInfoRes level. */
        public level: number;

        /** UserInfoRes exp. */
        public exp: (number|Long);

        /** UserInfoRes vip_level. */
        public vip_level: number;

        /** UserInfoRes vip_exp. */
        public vip_exp: (number|Long);

        /** UserInfoRes title_id. */
        public title_id: number;

        /** UserInfoRes cur_game_server_id. */
        public cur_game_server_id: string;

        /** UserInfoRes cur_room_unique_id. */
        public cur_room_unique_id: string;

        /**
         * Creates a new UserInfoRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserInfoRes instance
         */
        public static create(properties?: Lobby.IUserInfoRes): Lobby.UserInfoRes;

        /**
         * Encodes the specified UserInfoRes message. Does not implicitly {@link Lobby.UserInfoRes.verify|verify} messages.
         * @param message UserInfoRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserInfoRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserInfoRes message, length delimited. Does not implicitly {@link Lobby.UserInfoRes.verify|verify} messages.
         * @param message UserInfoRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserInfoRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserInfoRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserInfoRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserInfoRes;

        /**
         * Decodes a UserInfoRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserInfoRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserInfoRes;

        /**
         * Verifies a UserInfoRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserInfoRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserInfoRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserInfoRes;

        /**
         * Creates a plain object from a UserInfoRes message. Also converts values to other types if specified.
         * @param message UserInfoRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserInfoRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserInfoRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserOtherInfoRes. */
    interface IUserOtherInfoRes {

        /** UserOtherInfoRes mobile */
        mobile?: (string|null);

        /** UserOtherInfoRes mobile_bind_time */
        mobile_bind_time?: (number|Long|null);

        /** UserOtherInfoRes id_card */
        id_card?: (string|null);

        /** UserOtherInfoRes modify_nick_name */
        modify_nick_name?: (number|null);

        /** UserOtherInfoRes first_tixian */
        first_tixian?: (number|null);

        /** UserOtherInfoRes titles */
        titles?: (number[]|null);
    }

    /** Represents a UserOtherInfoRes. */
    class UserOtherInfoRes implements IUserOtherInfoRes {

        /**
         * Constructs a new UserOtherInfoRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserOtherInfoRes);

        /** UserOtherInfoRes mobile. */
        public mobile: string;

        /** UserOtherInfoRes mobile_bind_time. */
        public mobile_bind_time: (number|Long);

        /** UserOtherInfoRes id_card. */
        public id_card: string;

        /** UserOtherInfoRes modify_nick_name. */
        public modify_nick_name: number;

        /** UserOtherInfoRes first_tixian. */
        public first_tixian: number;

        /** UserOtherInfoRes titles. */
        public titles: number[];

        /**
         * Creates a new UserOtherInfoRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserOtherInfoRes instance
         */
        public static create(properties?: Lobby.IUserOtherInfoRes): Lobby.UserOtherInfoRes;

        /**
         * Encodes the specified UserOtherInfoRes message. Does not implicitly {@link Lobby.UserOtherInfoRes.verify|verify} messages.
         * @param message UserOtherInfoRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserOtherInfoRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserOtherInfoRes message, length delimited. Does not implicitly {@link Lobby.UserOtherInfoRes.verify|verify} messages.
         * @param message UserOtherInfoRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserOtherInfoRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserOtherInfoRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserOtherInfoRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserOtherInfoRes;

        /**
         * Decodes a UserOtherInfoRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserOtherInfoRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserOtherInfoRes;

        /**
         * Verifies a UserOtherInfoRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserOtherInfoRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserOtherInfoRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserOtherInfoRes;

        /**
         * Creates a plain object from a UserOtherInfoRes message. Also converts values to other types if specified.
         * @param message UserOtherInfoRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserOtherInfoRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserOtherInfoRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserUsePropRes. */
    interface IUserUsePropRes {

        /** UserUsePropRes head_skin_json */
        head_skin_json?: (string|null);

        /** UserUsePropRes clock_skin_json */
        clock_skin_json?: (string|null);

        /** UserUsePropRes bubble_skin_json */
        bubble_skin_json?: (string|null);

        /** UserUsePropRes prop_json */
        prop_json?: (string|null);
    }

    /** Represents a UserUsePropRes. */
    class UserUsePropRes implements IUserUsePropRes {

        /**
         * Constructs a new UserUsePropRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserUsePropRes);

        /** UserUsePropRes head_skin_json. */
        public head_skin_json: string;

        /** UserUsePropRes clock_skin_json. */
        public clock_skin_json: string;

        /** UserUsePropRes bubble_skin_json. */
        public bubble_skin_json: string;

        /** UserUsePropRes prop_json. */
        public prop_json: string;

        /**
         * Creates a new UserUsePropRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserUsePropRes instance
         */
        public static create(properties?: Lobby.IUserUsePropRes): Lobby.UserUsePropRes;

        /**
         * Encodes the specified UserUsePropRes message. Does not implicitly {@link Lobby.UserUsePropRes.verify|verify} messages.
         * @param message UserUsePropRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserUsePropRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserUsePropRes message, length delimited. Does not implicitly {@link Lobby.UserUsePropRes.verify|verify} messages.
         * @param message UserUsePropRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserUsePropRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserUsePropRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserUsePropRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserUsePropRes;

        /**
         * Decodes a UserUsePropRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserUsePropRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserUsePropRes;

        /**
         * Verifies a UserUsePropRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserUsePropRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserUsePropRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserUsePropRes;

        /**
         * Creates a plain object from a UserUsePropRes message. Also converts values to other types if specified.
         * @param message UserUsePropRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserUsePropRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserUsePropRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VerificationCodeReq. */
    interface IVerificationCodeReq {

        /** VerificationCodeReq handle_type */
        handle_type?: (number|null);

        /** VerificationCodeReq phone */
        phone?: (string|null);
    }

    /** Represents a VerificationCodeReq. */
    class VerificationCodeReq implements IVerificationCodeReq {

        /**
         * Constructs a new VerificationCodeReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IVerificationCodeReq);

        /** VerificationCodeReq handle_type. */
        public handle_type: number;

        /** VerificationCodeReq phone. */
        public phone: string;

        /**
         * Creates a new VerificationCodeReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VerificationCodeReq instance
         */
        public static create(properties?: Lobby.IVerificationCodeReq): Lobby.VerificationCodeReq;

        /**
         * Encodes the specified VerificationCodeReq message. Does not implicitly {@link Lobby.VerificationCodeReq.verify|verify} messages.
         * @param message VerificationCodeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IVerificationCodeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VerificationCodeReq message, length delimited. Does not implicitly {@link Lobby.VerificationCodeReq.verify|verify} messages.
         * @param message VerificationCodeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IVerificationCodeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VerificationCodeReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VerificationCodeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.VerificationCodeReq;

        /**
         * Decodes a VerificationCodeReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VerificationCodeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.VerificationCodeReq;

        /**
         * Verifies a VerificationCodeReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VerificationCodeReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VerificationCodeReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.VerificationCodeReq;

        /**
         * Creates a plain object from a VerificationCodeReq message. Also converts values to other types if specified.
         * @param message VerificationCodeReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.VerificationCodeReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VerificationCodeReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VerificationCodeRes. */
    interface IVerificationCodeRes {

        /** VerificationCodeRes handle_type */
        handle_type?: (number|null);

        /** VerificationCodeRes code */
        code?: (number|null);

        /** VerificationCodeRes message */
        message?: (string|null);
    }

    /** Represents a VerificationCodeRes. */
    class VerificationCodeRes implements IVerificationCodeRes {

        /**
         * Constructs a new VerificationCodeRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IVerificationCodeRes);

        /** VerificationCodeRes handle_type. */
        public handle_type: number;

        /** VerificationCodeRes code. */
        public code: number;

        /** VerificationCodeRes message. */
        public message: string;

        /**
         * Creates a new VerificationCodeRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VerificationCodeRes instance
         */
        public static create(properties?: Lobby.IVerificationCodeRes): Lobby.VerificationCodeRes;

        /**
         * Encodes the specified VerificationCodeRes message. Does not implicitly {@link Lobby.VerificationCodeRes.verify|verify} messages.
         * @param message VerificationCodeRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IVerificationCodeRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VerificationCodeRes message, length delimited. Does not implicitly {@link Lobby.VerificationCodeRes.verify|verify} messages.
         * @param message VerificationCodeRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IVerificationCodeRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VerificationCodeRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VerificationCodeRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.VerificationCodeRes;

        /**
         * Decodes a VerificationCodeRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VerificationCodeRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.VerificationCodeRes;

        /**
         * Verifies a VerificationCodeRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VerificationCodeRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VerificationCodeRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.VerificationCodeRes;

        /**
         * Creates a plain object from a VerificationCodeRes message. Also converts values to other types if specified.
         * @param message VerificationCodeRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.VerificationCodeRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VerificationCodeRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameStaticConfigReq. */
    interface IGameStaticConfigReq {

        /** GameStaticConfigReq config_list */
        config_list?: (Lobby.IGameStaticConfigItem[]|null);
    }

    /** Represents a GameStaticConfigReq. */
    class GameStaticConfigReq implements IGameStaticConfigReq {

        /**
         * Constructs a new GameStaticConfigReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IGameStaticConfigReq);

        /** GameStaticConfigReq config_list. */
        public config_list: Lobby.IGameStaticConfigItem[];

        /**
         * Creates a new GameStaticConfigReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameStaticConfigReq instance
         */
        public static create(properties?: Lobby.IGameStaticConfigReq): Lobby.GameStaticConfigReq;

        /**
         * Encodes the specified GameStaticConfigReq message. Does not implicitly {@link Lobby.GameStaticConfigReq.verify|verify} messages.
         * @param message GameStaticConfigReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IGameStaticConfigReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameStaticConfigReq message, length delimited. Does not implicitly {@link Lobby.GameStaticConfigReq.verify|verify} messages.
         * @param message GameStaticConfigReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IGameStaticConfigReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameStaticConfigReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameStaticConfigReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.GameStaticConfigReq;

        /**
         * Decodes a GameStaticConfigReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameStaticConfigReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.GameStaticConfigReq;

        /**
         * Verifies a GameStaticConfigReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameStaticConfigReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameStaticConfigReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.GameStaticConfigReq;

        /**
         * Creates a plain object from a GameStaticConfigReq message. Also converts values to other types if specified.
         * @param message GameStaticConfigReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.GameStaticConfigReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameStaticConfigReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameStaticConfigRes. */
    interface IGameStaticConfigRes {

        /** GameStaticConfigRes config_list */
        config_list?: (Lobby.IGameStaticConfigItem[]|null);
    }

    /** Represents a GameStaticConfigRes. */
    class GameStaticConfigRes implements IGameStaticConfigRes {

        /**
         * Constructs a new GameStaticConfigRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IGameStaticConfigRes);

        /** GameStaticConfigRes config_list. */
        public config_list: Lobby.IGameStaticConfigItem[];

        /**
         * Creates a new GameStaticConfigRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameStaticConfigRes instance
         */
        public static create(properties?: Lobby.IGameStaticConfigRes): Lobby.GameStaticConfigRes;

        /**
         * Encodes the specified GameStaticConfigRes message. Does not implicitly {@link Lobby.GameStaticConfigRes.verify|verify} messages.
         * @param message GameStaticConfigRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IGameStaticConfigRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameStaticConfigRes message, length delimited. Does not implicitly {@link Lobby.GameStaticConfigRes.verify|verify} messages.
         * @param message GameStaticConfigRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IGameStaticConfigRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameStaticConfigRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameStaticConfigRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.GameStaticConfigRes;

        /**
         * Decodes a GameStaticConfigRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameStaticConfigRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.GameStaticConfigRes;

        /**
         * Verifies a GameStaticConfigRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameStaticConfigRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameStaticConfigRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.GameStaticConfigRes;

        /**
         * Creates a plain object from a GameStaticConfigRes message. Also converts values to other types if specified.
         * @param message GameStaticConfigRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.GameStaticConfigRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameStaticConfigRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameStaticConfigItem. */
    interface IGameStaticConfigItem {

        /** GameStaticConfigItem config_type */
        config_type?: (string|null);

        /** GameStaticConfigItem config_md5 */
        config_md5?: (string|null);

        /** GameStaticConfigItem config_str */
        config_str?: (string|null);
    }

    /** Represents a GameStaticConfigItem. */
    class GameStaticConfigItem implements IGameStaticConfigItem {

        /**
         * Constructs a new GameStaticConfigItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IGameStaticConfigItem);

        /** GameStaticConfigItem config_type. */
        public config_type: string;

        /** GameStaticConfigItem config_md5. */
        public config_md5: string;

        /** GameStaticConfigItem config_str. */
        public config_str: string;

        /**
         * Creates a new GameStaticConfigItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameStaticConfigItem instance
         */
        public static create(properties?: Lobby.IGameStaticConfigItem): Lobby.GameStaticConfigItem;

        /**
         * Encodes the specified GameStaticConfigItem message. Does not implicitly {@link Lobby.GameStaticConfigItem.verify|verify} messages.
         * @param message GameStaticConfigItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IGameStaticConfigItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameStaticConfigItem message, length delimited. Does not implicitly {@link Lobby.GameStaticConfigItem.verify|verify} messages.
         * @param message GameStaticConfigItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IGameStaticConfigItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameStaticConfigItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameStaticConfigItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.GameStaticConfigItem;

        /**
         * Decodes a GameStaticConfigItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameStaticConfigItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.GameStaticConfigItem;

        /**
         * Verifies a GameStaticConfigItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameStaticConfigItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameStaticConfigItem
         */
        public static fromObject(object: { [k: string]: any }): Lobby.GameStaticConfigItem;

        /**
         * Creates a plain object from a GameStaticConfigItem message. Also converts values to other types if specified.
         * @param message GameStaticConfigItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.GameStaticConfigItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameStaticConfigItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserDataReq. */
    interface IUserDataReq {

        /** UserDataReq config_type_list */
        config_type_list?: (number[]|null);
    }

    /** Represents a UserDataReq. */
    class UserDataReq implements IUserDataReq {

        /**
         * Constructs a new UserDataReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserDataReq);

        /** UserDataReq config_type_list. */
        public config_type_list: number[];

        /**
         * Creates a new UserDataReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserDataReq instance
         */
        public static create(properties?: Lobby.IUserDataReq): Lobby.UserDataReq;

        /**
         * Encodes the specified UserDataReq message. Does not implicitly {@link Lobby.UserDataReq.verify|verify} messages.
         * @param message UserDataReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserDataReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserDataReq message, length delimited. Does not implicitly {@link Lobby.UserDataReq.verify|verify} messages.
         * @param message UserDataReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserDataReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserDataReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserDataReq;

        /**
         * Decodes a UserDataReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserDataReq;

        /**
         * Verifies a UserDataReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserDataReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserDataReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserDataReq;

        /**
         * Creates a plain object from a UserDataReq message. Also converts values to other types if specified.
         * @param message UserDataReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserDataReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserDataReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserDataRes. */
    interface IUserDataRes {

        /** UserDataRes config_list */
        config_list?: (Lobby.IUserDataItem[]|null);
    }

    /** Represents a UserDataRes. */
    class UserDataRes implements IUserDataRes {

        /**
         * Constructs a new UserDataRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserDataRes);

        /** UserDataRes config_list. */
        public config_list: Lobby.IUserDataItem[];

        /**
         * Creates a new UserDataRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserDataRes instance
         */
        public static create(properties?: Lobby.IUserDataRes): Lobby.UserDataRes;

        /**
         * Encodes the specified UserDataRes message. Does not implicitly {@link Lobby.UserDataRes.verify|verify} messages.
         * @param message UserDataRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserDataRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserDataRes message, length delimited. Does not implicitly {@link Lobby.UserDataRes.verify|verify} messages.
         * @param message UserDataRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserDataRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserDataRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserDataRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserDataRes;

        /**
         * Decodes a UserDataRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserDataRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserDataRes;

        /**
         * Verifies a UserDataRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserDataRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserDataRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserDataRes;

        /**
         * Creates a plain object from a UserDataRes message. Also converts values to other types if specified.
         * @param message UserDataRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserDataRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserDataRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserDataItem. */
    interface IUserDataItem {

        /** UserDataItem config_type */
        config_type?: (number|null);

        /** UserDataItem config_json */
        config_json?: (string|null);
    }

    /** Represents a UserDataItem. */
    class UserDataItem implements IUserDataItem {

        /**
         * Constructs a new UserDataItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserDataItem);

        /** UserDataItem config_type. */
        public config_type: number;

        /** UserDataItem config_json. */
        public config_json: string;

        /**
         * Creates a new UserDataItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserDataItem instance
         */
        public static create(properties?: Lobby.IUserDataItem): Lobby.UserDataItem;

        /**
         * Encodes the specified UserDataItem message. Does not implicitly {@link Lobby.UserDataItem.verify|verify} messages.
         * @param message UserDataItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserDataItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserDataItem message, length delimited. Does not implicitly {@link Lobby.UserDataItem.verify|verify} messages.
         * @param message UserDataItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserDataItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserDataItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserDataItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserDataItem;

        /**
         * Decodes a UserDataItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserDataItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserDataItem;

        /**
         * Verifies a UserDataItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserDataItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserDataItem
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserDataItem;

        /**
         * Creates a plain object from a UserDataItem message. Also converts values to other types if specified.
         * @param message UserDataItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserDataItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserDataItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageReq. */
    interface IPackageReq {

        /** PackageReq handle_type */
        handle_type?: (number|null);

        /** PackageReq handle_value */
        handle_value?: (number|Long|null);
    }

    /** Represents a PackageReq. */
    class PackageReq implements IPackageReq {

        /**
         * Constructs a new PackageReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IPackageReq);

        /** PackageReq handle_type. */
        public handle_type: number;

        /** PackageReq handle_value. */
        public handle_value: (number|Long);

        /**
         * Creates a new PackageReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageReq instance
         */
        public static create(properties?: Lobby.IPackageReq): Lobby.PackageReq;

        /**
         * Encodes the specified PackageReq message. Does not implicitly {@link Lobby.PackageReq.verify|verify} messages.
         * @param message PackageReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IPackageReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageReq message, length delimited. Does not implicitly {@link Lobby.PackageReq.verify|verify} messages.
         * @param message PackageReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IPackageReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.PackageReq;

        /**
         * Decodes a PackageReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.PackageReq;

        /**
         * Verifies a PackageReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.PackageReq;

        /**
         * Creates a plain object from a PackageReq message. Also converts values to other types if specified.
         * @param message PackageReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.PackageReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageRes. */
    interface IPackageRes {

        /** PackageRes handle_type */
        handle_type?: (number|null);

        /** PackageRes package_item */
        package_item?: (Lobby.IPackageItemRes|null);

        /** PackageRes package_list */
        package_list?: (Lobby.IPackageItemRes[]|null);
    }

    /** Represents a PackageRes. */
    class PackageRes implements IPackageRes {

        /**
         * Constructs a new PackageRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IPackageRes);

        /** PackageRes handle_type. */
        public handle_type: number;

        /** PackageRes package_item. */
        public package_item?: (Lobby.IPackageItemRes|null);

        /** PackageRes package_list. */
        public package_list: Lobby.IPackageItemRes[];

        /**
         * Creates a new PackageRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageRes instance
         */
        public static create(properties?: Lobby.IPackageRes): Lobby.PackageRes;

        /**
         * Encodes the specified PackageRes message. Does not implicitly {@link Lobby.PackageRes.verify|verify} messages.
         * @param message PackageRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IPackageRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageRes message, length delimited. Does not implicitly {@link Lobby.PackageRes.verify|verify} messages.
         * @param message PackageRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IPackageRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.PackageRes;

        /**
         * Decodes a PackageRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.PackageRes;

        /**
         * Verifies a PackageRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.PackageRes;

        /**
         * Creates a plain object from a PackageRes message. Also converts values to other types if specified.
         * @param message PackageRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.PackageRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PackageItemRes. */
    interface IPackageItemRes {

        /** PackageItemRes up_id */
        up_id?: (number|Long|null);

        /** PackageItemRes item_id */
        item_id?: (number|null);

        /** PackageItemRes item_num */
        item_num?: (number|null);
    }

    /** Represents a PackageItemRes. */
    class PackageItemRes implements IPackageItemRes {

        /**
         * Constructs a new PackageItemRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IPackageItemRes);

        /** PackageItemRes up_id. */
        public up_id: (number|Long);

        /** PackageItemRes item_id. */
        public item_id: number;

        /** PackageItemRes item_num. */
        public item_num: number;

        /**
         * Creates a new PackageItemRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PackageItemRes instance
         */
        public static create(properties?: Lobby.IPackageItemRes): Lobby.PackageItemRes;

        /**
         * Encodes the specified PackageItemRes message. Does not implicitly {@link Lobby.PackageItemRes.verify|verify} messages.
         * @param message PackageItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IPackageItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PackageItemRes message, length delimited. Does not implicitly {@link Lobby.PackageItemRes.verify|verify} messages.
         * @param message PackageItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IPackageItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PackageItemRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PackageItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.PackageItemRes;

        /**
         * Decodes a PackageItemRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PackageItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.PackageItemRes;

        /**
         * Verifies a PackageItemRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PackageItemRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PackageItemRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.PackageItemRes;

        /**
         * Creates a plain object from a PackageItemRes message. Also converts values to other types if specified.
         * @param message PackageItemRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.PackageItemRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PackageItemRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayReq. */
    interface IPayReq {

        /** PayReq item_id */
        item_id?: (number|null);

        /** PayReq item_type */
        item_type?: (number|null);

        /** PayReq item_name */
        item_name?: (string|null);

        /** PayReq pay_type */
        pay_type?: (number|null);

        /** PayReq config_id */
        config_id?: (number|null);

        /** PayReq pay_num */
        pay_num?: (number|null);

        /** PayReq other */
        other?: (string|null);
    }

    /** Represents a PayReq. */
    class PayReq implements IPayReq {

        /**
         * Constructs a new PayReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IPayReq);

        /** PayReq item_id. */
        public item_id: number;

        /** PayReq item_type. */
        public item_type: number;

        /** PayReq item_name. */
        public item_name: string;

        /** PayReq pay_type. */
        public pay_type: number;

        /** PayReq config_id. */
        public config_id: number;

        /** PayReq pay_num. */
        public pay_num: number;

        /** PayReq other. */
        public other: string;

        /**
         * Creates a new PayReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayReq instance
         */
        public static create(properties?: Lobby.IPayReq): Lobby.PayReq;

        /**
         * Encodes the specified PayReq message. Does not implicitly {@link Lobby.PayReq.verify|verify} messages.
         * @param message PayReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IPayReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayReq message, length delimited. Does not implicitly {@link Lobby.PayReq.verify|verify} messages.
         * @param message PayReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IPayReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.PayReq;

        /**
         * Decodes a PayReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.PayReq;

        /**
         * Verifies a PayReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.PayReq;

        /**
         * Creates a plain object from a PayReq message. Also converts values to other types if specified.
         * @param message PayReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.PayReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PayRes. */
    interface IPayRes {

        /** PayRes code */
        code?: (number|null);

        /** PayRes message */
        message?: (string|null);

        /** PayRes item_id */
        item_id?: (number|null);

        /** PayRes pay_type */
        pay_type?: (number|null);

        /** PayRes game_order_num */
        game_order_num?: (string|null);

        /** PayRes center_order_num */
        center_order_num?: (string|null);

        /** PayRes other_param */
        other_param?: (string|null);

        /** PayRes item_type */
        item_type?: (number|null);

        /** PayRes price_fen */
        price_fen?: (number|null);
    }

    /** Represents a PayRes. */
    class PayRes implements IPayRes {

        /**
         * Constructs a new PayRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IPayRes);

        /** PayRes code. */
        public code: number;

        /** PayRes message. */
        public message: string;

        /** PayRes item_id. */
        public item_id: number;

        /** PayRes pay_type. */
        public pay_type: number;

        /** PayRes game_order_num. */
        public game_order_num: string;

        /** PayRes center_order_num. */
        public center_order_num: string;

        /** PayRes other_param. */
        public other_param: string;

        /** PayRes item_type. */
        public item_type: number;

        /** PayRes price_fen. */
        public price_fen: number;

        /**
         * Creates a new PayRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PayRes instance
         */
        public static create(properties?: Lobby.IPayRes): Lobby.PayRes;

        /**
         * Encodes the specified PayRes message. Does not implicitly {@link Lobby.PayRes.verify|verify} messages.
         * @param message PayRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IPayRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PayRes message, length delimited. Does not implicitly {@link Lobby.PayRes.verify|verify} messages.
         * @param message PayRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IPayRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PayRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PayRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.PayRes;

        /**
         * Decodes a PayRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PayRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.PayRes;

        /**
         * Verifies a PayRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PayRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PayRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.PayRes;

        /**
         * Creates a plain object from a PayRes message. Also converts values to other types if specified.
         * @param message PayRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.PayRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PayRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a FeedbackReq. */
    interface IFeedbackReq {

        /** FeedbackReq handle_type */
        handle_type?: (number|null);

        /** FeedbackReq handle_value */
        handle_value?: (number|Long|null);

        /** FeedbackReq handle_value_str */
        handle_value_str?: (string|null);
    }

    /** Represents a FeedbackReq. */
    class FeedbackReq implements IFeedbackReq {

        /**
         * Constructs a new FeedbackReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IFeedbackReq);

        /** FeedbackReq handle_type. */
        public handle_type: number;

        /** FeedbackReq handle_value. */
        public handle_value: (number|Long);

        /** FeedbackReq handle_value_str. */
        public handle_value_str: string;

        /**
         * Creates a new FeedbackReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FeedbackReq instance
         */
        public static create(properties?: Lobby.IFeedbackReq): Lobby.FeedbackReq;

        /**
         * Encodes the specified FeedbackReq message. Does not implicitly {@link Lobby.FeedbackReq.verify|verify} messages.
         * @param message FeedbackReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IFeedbackReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FeedbackReq message, length delimited. Does not implicitly {@link Lobby.FeedbackReq.verify|verify} messages.
         * @param message FeedbackReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IFeedbackReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FeedbackReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FeedbackReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.FeedbackReq;

        /**
         * Decodes a FeedbackReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FeedbackReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.FeedbackReq;

        /**
         * Verifies a FeedbackReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FeedbackReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FeedbackReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.FeedbackReq;

        /**
         * Creates a plain object from a FeedbackReq message. Also converts values to other types if specified.
         * @param message FeedbackReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.FeedbackReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FeedbackReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a FeedbackRes. */
    interface IFeedbackRes {

        /** FeedbackRes handle_type */
        handle_type?: (number|null);

        /** FeedbackRes code */
        code?: (number|null);

        /** FeedbackRes message */
        message?: (string|null);

        /** FeedbackRes feedback_list */
        feedback_list?: (Lobby.IFeedbackItemRes[]|null);
    }

    /** Represents a FeedbackRes. */
    class FeedbackRes implements IFeedbackRes {

        /**
         * Constructs a new FeedbackRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IFeedbackRes);

        /** FeedbackRes handle_type. */
        public handle_type: number;

        /** FeedbackRes code. */
        public code: number;

        /** FeedbackRes message. */
        public message: string;

        /** FeedbackRes feedback_list. */
        public feedback_list: Lobby.IFeedbackItemRes[];

        /**
         * Creates a new FeedbackRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FeedbackRes instance
         */
        public static create(properties?: Lobby.IFeedbackRes): Lobby.FeedbackRes;

        /**
         * Encodes the specified FeedbackRes message. Does not implicitly {@link Lobby.FeedbackRes.verify|verify} messages.
         * @param message FeedbackRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IFeedbackRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FeedbackRes message, length delimited. Does not implicitly {@link Lobby.FeedbackRes.verify|verify} messages.
         * @param message FeedbackRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IFeedbackRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FeedbackRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FeedbackRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.FeedbackRes;

        /**
         * Decodes a FeedbackRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FeedbackRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.FeedbackRes;

        /**
         * Verifies a FeedbackRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FeedbackRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FeedbackRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.FeedbackRes;

        /**
         * Creates a plain object from a FeedbackRes message. Also converts values to other types if specified.
         * @param message FeedbackRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.FeedbackRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FeedbackRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a FeedbackItemRes. */
    interface IFeedbackItemRes {

        /** FeedbackItemRes uf_id */
        uf_id?: (number|Long|null);

        /** FeedbackItemRes uf_content */
        uf_content?: (string|null);

        /** FeedbackItemRes uf_status */
        uf_status?: (number|null);

        /** FeedbackItemRes uf_read */
        uf_read?: (number|null);

        /** FeedbackItemRes uf_reply */
        uf_reply?: (string|null);

        /** FeedbackItemRes reply_time */
        reply_time?: (number|Long|null);

        /** FeedbackItemRes create_time */
        create_time?: (number|Long|null);
    }

    /** Represents a FeedbackItemRes. */
    class FeedbackItemRes implements IFeedbackItemRes {

        /**
         * Constructs a new FeedbackItemRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IFeedbackItemRes);

        /** FeedbackItemRes uf_id. */
        public uf_id: (number|Long);

        /** FeedbackItemRes uf_content. */
        public uf_content: string;

        /** FeedbackItemRes uf_status. */
        public uf_status: number;

        /** FeedbackItemRes uf_read. */
        public uf_read: number;

        /** FeedbackItemRes uf_reply. */
        public uf_reply: string;

        /** FeedbackItemRes reply_time. */
        public reply_time: (number|Long);

        /** FeedbackItemRes create_time. */
        public create_time: (number|Long);

        /**
         * Creates a new FeedbackItemRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns FeedbackItemRes instance
         */
        public static create(properties?: Lobby.IFeedbackItemRes): Lobby.FeedbackItemRes;

        /**
         * Encodes the specified FeedbackItemRes message. Does not implicitly {@link Lobby.FeedbackItemRes.verify|verify} messages.
         * @param message FeedbackItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IFeedbackItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified FeedbackItemRes message, length delimited. Does not implicitly {@link Lobby.FeedbackItemRes.verify|verify} messages.
         * @param message FeedbackItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IFeedbackItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a FeedbackItemRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns FeedbackItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.FeedbackItemRes;

        /**
         * Decodes a FeedbackItemRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns FeedbackItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.FeedbackItemRes;

        /**
         * Verifies a FeedbackItemRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a FeedbackItemRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns FeedbackItemRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.FeedbackItemRes;

        /**
         * Creates a plain object from a FeedbackItemRes message. Also converts values to other types if specified.
         * @param message FeedbackItemRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.FeedbackItemRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this FeedbackItemRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RankReq. */
    interface IRankReq {

        /** RankReq handle_type */
        handle_type?: (number|null);
    }

    /** Represents a RankReq. */
    class RankReq implements IRankReq {

        /**
         * Constructs a new RankReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IRankReq);

        /** RankReq handle_type. */
        public handle_type: number;

        /**
         * Creates a new RankReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RankReq instance
         */
        public static create(properties?: Lobby.IRankReq): Lobby.RankReq;

        /**
         * Encodes the specified RankReq message. Does not implicitly {@link Lobby.RankReq.verify|verify} messages.
         * @param message RankReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IRankReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RankReq message, length delimited. Does not implicitly {@link Lobby.RankReq.verify|verify} messages.
         * @param message RankReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IRankReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RankReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RankReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.RankReq;

        /**
         * Decodes a RankReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RankReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.RankReq;

        /**
         * Verifies a RankReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RankReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RankReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.RankReq;

        /**
         * Creates a plain object from a RankReq message. Also converts values to other types if specified.
         * @param message RankReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.RankReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RankReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RankRes. */
    interface IRankRes {

        /** RankRes handle_type */
        handle_type?: (number|null);

        /** RankRes rank_list */
        rank_list?: (Lobby.IRankItemRes[]|null);

        /** RankRes self_item */
        self_item?: (Lobby.IRankItemRes|null);

        /** RankRes rank_num */
        rank_num?: (number|Long|null);
    }

    /** Represents a RankRes. */
    class RankRes implements IRankRes {

        /**
         * Constructs a new RankRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IRankRes);

        /** RankRes handle_type. */
        public handle_type: number;

        /** RankRes rank_list. */
        public rank_list: Lobby.IRankItemRes[];

        /** RankRes self_item. */
        public self_item?: (Lobby.IRankItemRes|null);

        /** RankRes rank_num. */
        public rank_num: (number|Long);

        /**
         * Creates a new RankRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RankRes instance
         */
        public static create(properties?: Lobby.IRankRes): Lobby.RankRes;

        /**
         * Encodes the specified RankRes message. Does not implicitly {@link Lobby.RankRes.verify|verify} messages.
         * @param message RankRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IRankRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RankRes message, length delimited. Does not implicitly {@link Lobby.RankRes.verify|verify} messages.
         * @param message RankRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IRankRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RankRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RankRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.RankRes;

        /**
         * Decodes a RankRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RankRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.RankRes;

        /**
         * Verifies a RankRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RankRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RankRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.RankRes;

        /**
         * Creates a plain object from a RankRes message. Also converts values to other types if specified.
         * @param message RankRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.RankRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RankRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RankItemRes. */
    interface IRankItemRes {

        /** RankItemRes head_img_url */
        head_img_url?: (string|null);

        /** RankItemRes nick_name */
        nick_name?: (string|null);

        /** RankItemRes user_id */
        user_id?: (number|Long|null);

        /** RankItemRes dan */
        dan?: (number|null);

        /** RankItemRes score */
        score?: (number|Long|null);

        /** RankItemRes skin_head */
        skin_head?: (number|null);
    }

    /** Represents a RankItemRes. */
    class RankItemRes implements IRankItemRes {

        /**
         * Constructs a new RankItemRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IRankItemRes);

        /** RankItemRes head_img_url. */
        public head_img_url: string;

        /** RankItemRes nick_name. */
        public nick_name: string;

        /** RankItemRes user_id. */
        public user_id: (number|Long);

        /** RankItemRes dan. */
        public dan: number;

        /** RankItemRes score. */
        public score: (number|Long);

        /** RankItemRes skin_head. */
        public skin_head: number;

        /**
         * Creates a new RankItemRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RankItemRes instance
         */
        public static create(properties?: Lobby.IRankItemRes): Lobby.RankItemRes;

        /**
         * Encodes the specified RankItemRes message. Does not implicitly {@link Lobby.RankItemRes.verify|verify} messages.
         * @param message RankItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IRankItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RankItemRes message, length delimited. Does not implicitly {@link Lobby.RankItemRes.verify|verify} messages.
         * @param message RankItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IRankItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RankItemRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RankItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.RankItemRes;

        /**
         * Decodes a RankItemRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RankItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.RankItemRes;

        /**
         * Verifies a RankItemRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RankItemRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RankItemRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.RankItemRes;

        /**
         * Creates a plain object from a RankItemRes message. Also converts values to other types if specified.
         * @param message RankItemRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.RankItemRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RankItemRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MailReq. */
    interface IMailReq {

        /** MailReq handle_type */
        handle_type?: (number|null);

        /** MailReq handle_value */
        handle_value?: (number|Long|null);
    }

    /** Represents a MailReq. */
    class MailReq implements IMailReq {

        /**
         * Constructs a new MailReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IMailReq);

        /** MailReq handle_type. */
        public handle_type: number;

        /** MailReq handle_value. */
        public handle_value: (number|Long);

        /**
         * Creates a new MailReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MailReq instance
         */
        public static create(properties?: Lobby.IMailReq): Lobby.MailReq;

        /**
         * Encodes the specified MailReq message. Does not implicitly {@link Lobby.MailReq.verify|verify} messages.
         * @param message MailReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IMailReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MailReq message, length delimited. Does not implicitly {@link Lobby.MailReq.verify|verify} messages.
         * @param message MailReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IMailReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MailReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.MailReq;

        /**
         * Decodes a MailReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.MailReq;

        /**
         * Verifies a MailReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MailReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MailReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.MailReq;

        /**
         * Creates a plain object from a MailReq message. Also converts values to other types if specified.
         * @param message MailReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.MailReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MailReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MailRes. */
    interface IMailRes {

        /** MailRes handle_type */
        handle_type?: (number|null);

        /** MailRes handle_value */
        handle_value?: (number|Long|null);

        /** MailRes mail_info */
        mail_info?: (Lobby.IMailItemRes|null);

        /** MailRes mail_list */
        mail_list?: (Lobby.IMailItemRes[]|null);
    }

    /** Represents a MailRes. */
    class MailRes implements IMailRes {

        /**
         * Constructs a new MailRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IMailRes);

        /** MailRes handle_type. */
        public handle_type: number;

        /** MailRes handle_value. */
        public handle_value: (number|Long);

        /** MailRes mail_info. */
        public mail_info?: (Lobby.IMailItemRes|null);

        /** MailRes mail_list. */
        public mail_list: Lobby.IMailItemRes[];

        /**
         * Creates a new MailRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MailRes instance
         */
        public static create(properties?: Lobby.IMailRes): Lobby.MailRes;

        /**
         * Encodes the specified MailRes message. Does not implicitly {@link Lobby.MailRes.verify|verify} messages.
         * @param message MailRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IMailRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MailRes message, length delimited. Does not implicitly {@link Lobby.MailRes.verify|verify} messages.
         * @param message MailRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IMailRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MailRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.MailRes;

        /**
         * Decodes a MailRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.MailRes;

        /**
         * Verifies a MailRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MailRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MailRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.MailRes;

        /**
         * Creates a plain object from a MailRes message. Also converts values to other types if specified.
         * @param message MailRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.MailRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MailRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MailItemRes. */
    interface IMailItemRes {

        /** MailItemRes um_id */
        um_id?: (number|Long|null);

        /** MailItemRes mail_type */
        mail_type?: (number|null);

        /** MailItemRes title */
        title?: (string|null);

        /** MailItemRes mail_state */
        mail_state?: (number|null);

        /** MailItemRes context */
        context?: (string|null);

        /** MailItemRes coin_a */
        coin_a?: (number|null);

        /** MailItemRes coin_b */
        coin_b?: (number|null);

        /** MailItemRes coin_c */
        coin_c?: (number|null);

        /** MailItemRes create_time */
        create_time?: (number|Long|null);
    }

    /** Represents a MailItemRes. */
    class MailItemRes implements IMailItemRes {

        /**
         * Constructs a new MailItemRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IMailItemRes);

        /** MailItemRes um_id. */
        public um_id: (number|Long);

        /** MailItemRes mail_type. */
        public mail_type: number;

        /** MailItemRes title. */
        public title: string;

        /** MailItemRes mail_state. */
        public mail_state: number;

        /** MailItemRes context. */
        public context: string;

        /** MailItemRes coin_a. */
        public coin_a: number;

        /** MailItemRes coin_b. */
        public coin_b: number;

        /** MailItemRes coin_c. */
        public coin_c: number;

        /** MailItemRes create_time. */
        public create_time: (number|Long);

        /**
         * Creates a new MailItemRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MailItemRes instance
         */
        public static create(properties?: Lobby.IMailItemRes): Lobby.MailItemRes;

        /**
         * Encodes the specified MailItemRes message. Does not implicitly {@link Lobby.MailItemRes.verify|verify} messages.
         * @param message MailItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IMailItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MailItemRes message, length delimited. Does not implicitly {@link Lobby.MailItemRes.verify|verify} messages.
         * @param message MailItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IMailItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MailItemRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MailItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.MailItemRes;

        /**
         * Decodes a MailItemRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MailItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.MailItemRes;

        /**
         * Verifies a MailItemRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MailItemRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MailItemRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.MailItemRes;

        /**
         * Creates a plain object from a MailItemRes message. Also converts values to other types if specified.
         * @param message MailItemRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.MailItemRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MailItemRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserGameDataReq. */
    interface IUserGameDataReq {
    }

    /** Represents a UserGameDataReq. */
    class UserGameDataReq implements IUserGameDataReq {

        /**
         * Constructs a new UserGameDataReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserGameDataReq);

        /**
         * Creates a new UserGameDataReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserGameDataReq instance
         */
        public static create(properties?: Lobby.IUserGameDataReq): Lobby.UserGameDataReq;

        /**
         * Encodes the specified UserGameDataReq message. Does not implicitly {@link Lobby.UserGameDataReq.verify|verify} messages.
         * @param message UserGameDataReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserGameDataReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserGameDataReq message, length delimited. Does not implicitly {@link Lobby.UserGameDataReq.verify|verify} messages.
         * @param message UserGameDataReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserGameDataReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserGameDataReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserGameDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserGameDataReq;

        /**
         * Decodes a UserGameDataReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserGameDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserGameDataReq;

        /**
         * Verifies a UserGameDataReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserGameDataReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserGameDataReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserGameDataReq;

        /**
         * Creates a plain object from a UserGameDataReq message. Also converts values to other types if specified.
         * @param message UserGameDataReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserGameDataReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserGameDataReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserGameDataRes. */
    interface IUserGameDataRes {

        /** UserGameDataRes cur_dan */
        cur_dan?: (number|null);

        /** UserGameDataRes cur_star */
        cur_star?: (number|null);

        /** UserGameDataRes max_dan */
        max_dan?: (number|null);

        /** UserGameDataRes max_star */
        max_star?: (number|null);

        /** UserGameDataRes play_count */
        play_count?: (number|null);

        /** UserGameDataRes victory_count */
        victory_count?: (number|null);

        /** UserGameDataRes spring_count */
        spring_count?: (number|null);

        /** UserGameDataRes bomb_count */
        bomb_count?: (number|null);

        /** UserGameDataRes max_multiple */
        max_multiple?: (number|null);

        /** UserGameDataRes max_victory */
        max_victory?: (number|null);

        /** UserGameDataRes victory_rate */
        victory_rate?: (number|null);
    }

    /** Represents a UserGameDataRes. */
    class UserGameDataRes implements IUserGameDataRes {

        /**
         * Constructs a new UserGameDataRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserGameDataRes);

        /** UserGameDataRes cur_dan. */
        public cur_dan: number;

        /** UserGameDataRes cur_star. */
        public cur_star: number;

        /** UserGameDataRes max_dan. */
        public max_dan: number;

        /** UserGameDataRes max_star. */
        public max_star: number;

        /** UserGameDataRes play_count. */
        public play_count: number;

        /** UserGameDataRes victory_count. */
        public victory_count: number;

        /** UserGameDataRes spring_count. */
        public spring_count: number;

        /** UserGameDataRes bomb_count. */
        public bomb_count: number;

        /** UserGameDataRes max_multiple. */
        public max_multiple: number;

        /** UserGameDataRes max_victory. */
        public max_victory: number;

        /** UserGameDataRes victory_rate. */
        public victory_rate: number;

        /**
         * Creates a new UserGameDataRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserGameDataRes instance
         */
        public static create(properties?: Lobby.IUserGameDataRes): Lobby.UserGameDataRes;

        /**
         * Encodes the specified UserGameDataRes message. Does not implicitly {@link Lobby.UserGameDataRes.verify|verify} messages.
         * @param message UserGameDataRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserGameDataRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserGameDataRes message, length delimited. Does not implicitly {@link Lobby.UserGameDataRes.verify|verify} messages.
         * @param message UserGameDataRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserGameDataRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserGameDataRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserGameDataRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserGameDataRes;

        /**
         * Decodes a UserGameDataRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserGameDataRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserGameDataRes;

        /**
         * Verifies a UserGameDataRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserGameDataRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserGameDataRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserGameDataRes;

        /**
         * Creates a plain object from a UserGameDataRes message. Also converts values to other types if specified.
         * @param message UserGameDataRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserGameDataRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserGameDataRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SkinReq. */
    interface ISkinReq {

        /** SkinReq handle_type */
        handle_type?: (number|null);

        /** SkinReq handle_value */
        handle_value?: (number|Long|null);
    }

    /** Represents a SkinReq. */
    class SkinReq implements ISkinReq {

        /**
         * Constructs a new SkinReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.ISkinReq);

        /** SkinReq handle_type. */
        public handle_type: number;

        /** SkinReq handle_value. */
        public handle_value: (number|Long);

        /**
         * Creates a new SkinReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SkinReq instance
         */
        public static create(properties?: Lobby.ISkinReq): Lobby.SkinReq;

        /**
         * Encodes the specified SkinReq message. Does not implicitly {@link Lobby.SkinReq.verify|verify} messages.
         * @param message SkinReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.ISkinReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SkinReq message, length delimited. Does not implicitly {@link Lobby.SkinReq.verify|verify} messages.
         * @param message SkinReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.ISkinReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SkinReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SkinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.SkinReq;

        /**
         * Decodes a SkinReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SkinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.SkinReq;

        /**
         * Verifies a SkinReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SkinReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SkinReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.SkinReq;

        /**
         * Creates a plain object from a SkinReq message. Also converts values to other types if specified.
         * @param message SkinReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.SkinReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SkinReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SkinRes. */
    interface ISkinRes {

        /** SkinRes handle_type */
        handle_type?: (number|null);

        /** SkinRes handle_value */
        handle_value?: (number|Long|null);

        /** SkinRes code */
        code?: (number|null);

        /** SkinRes message */
        message?: (string|null);

        /** SkinRes touxiang_list */
        touxiang_list?: (Lobby.ISkinItemRes[]|null);

        /** SkinRes naozhong_list */
        naozhong_list?: (Lobby.ISkinItemRes[]|null);

        /** SkinRes qipao_list */
        qipao_list?: (Lobby.ISkinItemRes[]|null);
    }

    /** Represents a SkinRes. */
    class SkinRes implements ISkinRes {

        /**
         * Constructs a new SkinRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.ISkinRes);

        /** SkinRes handle_type. */
        public handle_type: number;

        /** SkinRes handle_value. */
        public handle_value: (number|Long);

        /** SkinRes code. */
        public code: number;

        /** SkinRes message. */
        public message: string;

        /** SkinRes touxiang_list. */
        public touxiang_list: Lobby.ISkinItemRes[];

        /** SkinRes naozhong_list. */
        public naozhong_list: Lobby.ISkinItemRes[];

        /** SkinRes qipao_list. */
        public qipao_list: Lobby.ISkinItemRes[];

        /**
         * Creates a new SkinRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SkinRes instance
         */
        public static create(properties?: Lobby.ISkinRes): Lobby.SkinRes;

        /**
         * Encodes the specified SkinRes message. Does not implicitly {@link Lobby.SkinRes.verify|verify} messages.
         * @param message SkinRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.ISkinRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SkinRes message, length delimited. Does not implicitly {@link Lobby.SkinRes.verify|verify} messages.
         * @param message SkinRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.ISkinRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SkinRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SkinRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.SkinRes;

        /**
         * Decodes a SkinRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SkinRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.SkinRes;

        /**
         * Verifies a SkinRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SkinRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SkinRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.SkinRes;

        /**
         * Creates a plain object from a SkinRes message. Also converts values to other types if specified.
         * @param message SkinRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.SkinRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SkinRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SkinItemRes. */
    interface ISkinItemRes {

        /** SkinItemRes us_id */
        us_id?: (number|Long|null);

        /** SkinItemRes skin_id */
        skin_id?: (number|null);

        /** SkinItemRes skin_type */
        skin_type?: (number|null);

        /** SkinItemRes expire_time */
        expire_time?: (number|Long|null);
    }

    /** Represents a SkinItemRes. */
    class SkinItemRes implements ISkinItemRes {

        /**
         * Constructs a new SkinItemRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.ISkinItemRes);

        /** SkinItemRes us_id. */
        public us_id: (number|Long);

        /** SkinItemRes skin_id. */
        public skin_id: number;

        /** SkinItemRes skin_type. */
        public skin_type: number;

        /** SkinItemRes expire_time. */
        public expire_time: (number|Long);

        /**
         * Creates a new SkinItemRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SkinItemRes instance
         */
        public static create(properties?: Lobby.ISkinItemRes): Lobby.SkinItemRes;

        /**
         * Encodes the specified SkinItemRes message. Does not implicitly {@link Lobby.SkinItemRes.verify|verify} messages.
         * @param message SkinItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.ISkinItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SkinItemRes message, length delimited. Does not implicitly {@link Lobby.SkinItemRes.verify|verify} messages.
         * @param message SkinItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.ISkinItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SkinItemRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SkinItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.SkinItemRes;

        /**
         * Decodes a SkinItemRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SkinItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.SkinItemRes;

        /**
         * Verifies a SkinItemRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SkinItemRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SkinItemRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.SkinItemRes;

        /**
         * Creates a plain object from a SkinItemRes message. Also converts values to other types if specified.
         * @param message SkinItemRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.SkinItemRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SkinItemRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SeasonReq. */
    interface ISeasonReq {

        /** SeasonReq handle_type */
        handle_type?: (number|null);

        /** SeasonReq handle_value */
        handle_value?: (number|Long|null);
    }

    /** Represents a SeasonReq. */
    class SeasonReq implements ISeasonReq {

        /**
         * Constructs a new SeasonReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.ISeasonReq);

        /** SeasonReq handle_type. */
        public handle_type: number;

        /** SeasonReq handle_value. */
        public handle_value: (number|Long);

        /**
         * Creates a new SeasonReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SeasonReq instance
         */
        public static create(properties?: Lobby.ISeasonReq): Lobby.SeasonReq;

        /**
         * Encodes the specified SeasonReq message. Does not implicitly {@link Lobby.SeasonReq.verify|verify} messages.
         * @param message SeasonReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.ISeasonReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SeasonReq message, length delimited. Does not implicitly {@link Lobby.SeasonReq.verify|verify} messages.
         * @param message SeasonReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.ISeasonReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SeasonReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SeasonReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.SeasonReq;

        /**
         * Decodes a SeasonReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SeasonReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.SeasonReq;

        /**
         * Verifies a SeasonReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SeasonReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SeasonReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.SeasonReq;

        /**
         * Creates a plain object from a SeasonReq message. Also converts values to other types if specified.
         * @param message SeasonReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.SeasonReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SeasonReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SeasonRes. */
    interface ISeasonRes {

        /** SeasonRes handle_type */
        handle_type?: (number|null);

        /** SeasonRes handle_value */
        handle_value?: (number|Long|null);

        /** SeasonRes season_list */
        season_list?: (Lobby.ISeasonItemRes[]|null);

        /** SeasonRes season_item */
        season_item?: (Lobby.ISeasonItemRes|null);

        /** SeasonRes last_season_item */
        last_season_item?: (Lobby.ISeasonItemRes|null);
    }

    /** Represents a SeasonRes. */
    class SeasonRes implements ISeasonRes {

        /**
         * Constructs a new SeasonRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.ISeasonRes);

        /** SeasonRes handle_type. */
        public handle_type: number;

        /** SeasonRes handle_value. */
        public handle_value: (number|Long);

        /** SeasonRes season_list. */
        public season_list: Lobby.ISeasonItemRes[];

        /** SeasonRes season_item. */
        public season_item?: (Lobby.ISeasonItemRes|null);

        /** SeasonRes last_season_item. */
        public last_season_item?: (Lobby.ISeasonItemRes|null);

        /**
         * Creates a new SeasonRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SeasonRes instance
         */
        public static create(properties?: Lobby.ISeasonRes): Lobby.SeasonRes;

        /**
         * Encodes the specified SeasonRes message. Does not implicitly {@link Lobby.SeasonRes.verify|verify} messages.
         * @param message SeasonRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.ISeasonRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SeasonRes message, length delimited. Does not implicitly {@link Lobby.SeasonRes.verify|verify} messages.
         * @param message SeasonRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.ISeasonRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SeasonRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SeasonRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.SeasonRes;

        /**
         * Decodes a SeasonRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SeasonRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.SeasonRes;

        /**
         * Verifies a SeasonRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SeasonRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SeasonRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.SeasonRes;

        /**
         * Creates a plain object from a SeasonRes message. Also converts values to other types if specified.
         * @param message SeasonRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.SeasonRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SeasonRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SeasonItemRes. */
    interface ISeasonItemRes {

        /** SeasonItemRes us_id */
        us_id?: (number|Long|null);

        /** SeasonItemRes season_name */
        season_name?: (string|null);

        /** SeasonItemRes season_dan */
        season_dan?: (number|null);

        /** SeasonItemRes season_star */
        season_star?: (number|null);

        /** SeasonItemRes play_count */
        play_count?: (number|null);

        /** SeasonItemRes victory_count */
        victory_count?: (number|null);

        /** SeasonItemRes victory_rate */
        victory_rate?: (number|null);

        /** SeasonItemRes continuous_victory */
        continuous_victory?: (number|null);

        /** SeasonItemRes season_start_time */
        season_start_time?: (number|Long|null);

        /** SeasonItemRes season_end_time */
        season_end_time?: (number|Long|null);

        /** SeasonItemRes reward_receive_state */
        reward_receive_state?: (number|null);
    }

    /** Represents a SeasonItemRes. */
    class SeasonItemRes implements ISeasonItemRes {

        /**
         * Constructs a new SeasonItemRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.ISeasonItemRes);

        /** SeasonItemRes us_id. */
        public us_id: (number|Long);

        /** SeasonItemRes season_name. */
        public season_name: string;

        /** SeasonItemRes season_dan. */
        public season_dan: number;

        /** SeasonItemRes season_star. */
        public season_star: number;

        /** SeasonItemRes play_count. */
        public play_count: number;

        /** SeasonItemRes victory_count. */
        public victory_count: number;

        /** SeasonItemRes victory_rate. */
        public victory_rate: number;

        /** SeasonItemRes continuous_victory. */
        public continuous_victory: number;

        /** SeasonItemRes season_start_time. */
        public season_start_time: (number|Long);

        /** SeasonItemRes season_end_time. */
        public season_end_time: (number|Long);

        /** SeasonItemRes reward_receive_state. */
        public reward_receive_state: number;

        /**
         * Creates a new SeasonItemRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SeasonItemRes instance
         */
        public static create(properties?: Lobby.ISeasonItemRes): Lobby.SeasonItemRes;

        /**
         * Encodes the specified SeasonItemRes message. Does not implicitly {@link Lobby.SeasonItemRes.verify|verify} messages.
         * @param message SeasonItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.ISeasonItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SeasonItemRes message, length delimited. Does not implicitly {@link Lobby.SeasonItemRes.verify|verify} messages.
         * @param message SeasonItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.ISeasonItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SeasonItemRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SeasonItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.SeasonItemRes;

        /**
         * Decodes a SeasonItemRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SeasonItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.SeasonItemRes;

        /**
         * Verifies a SeasonItemRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SeasonItemRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SeasonItemRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.SeasonItemRes;

        /**
         * Creates a plain object from a SeasonItemRes message. Also converts values to other types if specified.
         * @param message SeasonItemRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.SeasonItemRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SeasonItemRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserGameLogReq. */
    interface IUserGameLogReq {
    }

    /** Represents a UserGameLogReq. */
    class UserGameLogReq implements IUserGameLogReq {

        /**
         * Constructs a new UserGameLogReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserGameLogReq);

        /**
         * Creates a new UserGameLogReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserGameLogReq instance
         */
        public static create(properties?: Lobby.IUserGameLogReq): Lobby.UserGameLogReq;

        /**
         * Encodes the specified UserGameLogReq message. Does not implicitly {@link Lobby.UserGameLogReq.verify|verify} messages.
         * @param message UserGameLogReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserGameLogReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserGameLogReq message, length delimited. Does not implicitly {@link Lobby.UserGameLogReq.verify|verify} messages.
         * @param message UserGameLogReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserGameLogReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserGameLogReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserGameLogReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserGameLogReq;

        /**
         * Decodes a UserGameLogReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserGameLogReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserGameLogReq;

        /**
         * Verifies a UserGameLogReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserGameLogReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserGameLogReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserGameLogReq;

        /**
         * Creates a plain object from a UserGameLogReq message. Also converts values to other types if specified.
         * @param message UserGameLogReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserGameLogReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserGameLogReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserGameLogRes. */
    interface IUserGameLogRes {

        /** UserGameLogRes game_log_list */
        game_log_list?: (Lobby.IUserGameLogItemRes[]|null);
    }

    /** Represents a UserGameLogRes. */
    class UserGameLogRes implements IUserGameLogRes {

        /**
         * Constructs a new UserGameLogRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserGameLogRes);

        /** UserGameLogRes game_log_list. */
        public game_log_list: Lobby.IUserGameLogItemRes[];

        /**
         * Creates a new UserGameLogRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserGameLogRes instance
         */
        public static create(properties?: Lobby.IUserGameLogRes): Lobby.UserGameLogRes;

        /**
         * Encodes the specified UserGameLogRes message. Does not implicitly {@link Lobby.UserGameLogRes.verify|verify} messages.
         * @param message UserGameLogRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserGameLogRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserGameLogRes message, length delimited. Does not implicitly {@link Lobby.UserGameLogRes.verify|verify} messages.
         * @param message UserGameLogRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserGameLogRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserGameLogRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserGameLogRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserGameLogRes;

        /**
         * Decodes a UserGameLogRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserGameLogRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserGameLogRes;

        /**
         * Verifies a UserGameLogRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserGameLogRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserGameLogRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserGameLogRes;

        /**
         * Creates a plain object from a UserGameLogRes message. Also converts values to other types if specified.
         * @param message UserGameLogRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserGameLogRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserGameLogRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserGameLogItemRes. */
    interface IUserGameLogItemRes {

        /** UserGameLogItemRes user_type */
        user_type?: (number|null);

        /** UserGameLogItemRes game_result */
        game_result?: (number|null);

        /** UserGameLogItemRes coin */
        coin?: (number|null);

        /** UserGameLogItemRes multiple */
        multiple?: (number|null);

        /** UserGameLogItemRes game_name */
        game_name?: (string|null);

        /** UserGameLogItemRes create_time */
        create_time?: (number|Long|null);

        /** UserGameLogItemRes game_name_sub */
        game_name_sub?: (string|null);
    }

    /** Represents a UserGameLogItemRes. */
    class UserGameLogItemRes implements IUserGameLogItemRes {

        /**
         * Constructs a new UserGameLogItemRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserGameLogItemRes);

        /** UserGameLogItemRes user_type. */
        public user_type: number;

        /** UserGameLogItemRes game_result. */
        public game_result: number;

        /** UserGameLogItemRes coin. */
        public coin: number;

        /** UserGameLogItemRes multiple. */
        public multiple: number;

        /** UserGameLogItemRes game_name. */
        public game_name: string;

        /** UserGameLogItemRes create_time. */
        public create_time: (number|Long);

        /** UserGameLogItemRes game_name_sub. */
        public game_name_sub: string;

        /**
         * Creates a new UserGameLogItemRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserGameLogItemRes instance
         */
        public static create(properties?: Lobby.IUserGameLogItemRes): Lobby.UserGameLogItemRes;

        /**
         * Encodes the specified UserGameLogItemRes message. Does not implicitly {@link Lobby.UserGameLogItemRes.verify|verify} messages.
         * @param message UserGameLogItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserGameLogItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserGameLogItemRes message, length delimited. Does not implicitly {@link Lobby.UserGameLogItemRes.verify|verify} messages.
         * @param message UserGameLogItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserGameLogItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserGameLogItemRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserGameLogItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserGameLogItemRes;

        /**
         * Decodes a UserGameLogItemRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserGameLogItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserGameLogItemRes;

        /**
         * Verifies a UserGameLogItemRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserGameLogItemRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserGameLogItemRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserGameLogItemRes;

        /**
         * Creates a plain object from a UserGameLogItemRes message. Also converts values to other types if specified.
         * @param message UserGameLogItemRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserGameLogItemRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserGameLogItemRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VipReq. */
    interface IVipReq {

        /** VipReq handle_type */
        handle_type?: (number|null);

        /** VipReq handle_value */
        handle_value?: (number|null);
    }

    /** Represents a VipReq. */
    class VipReq implements IVipReq {

        /**
         * Constructs a new VipReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IVipReq);

        /** VipReq handle_type. */
        public handle_type: number;

        /** VipReq handle_value. */
        public handle_value: number;

        /**
         * Creates a new VipReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VipReq instance
         */
        public static create(properties?: Lobby.IVipReq): Lobby.VipReq;

        /**
         * Encodes the specified VipReq message. Does not implicitly {@link Lobby.VipReq.verify|verify} messages.
         * @param message VipReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IVipReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VipReq message, length delimited. Does not implicitly {@link Lobby.VipReq.verify|verify} messages.
         * @param message VipReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IVipReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VipReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VipReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.VipReq;

        /**
         * Decodes a VipReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VipReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.VipReq;

        /**
         * Verifies a VipReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VipReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VipReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.VipReq;

        /**
         * Creates a plain object from a VipReq message. Also converts values to other types if specified.
         * @param message VipReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.VipReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VipReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VipRes. */
    interface IVipRes {

        /** VipRes handle_type */
        handle_type?: (number|null);

        /** VipRes handle_value */
        handle_value?: (number|null);

        /** VipRes first_reward_level_str */
        first_reward_level_str?: (string|null);

        /** VipRes day_reward_state */
        day_reward_state?: (number|null);
    }

    /** Represents a VipRes. */
    class VipRes implements IVipRes {

        /**
         * Constructs a new VipRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IVipRes);

        /** VipRes handle_type. */
        public handle_type: number;

        /** VipRes handle_value. */
        public handle_value: number;

        /** VipRes first_reward_level_str. */
        public first_reward_level_str: string;

        /** VipRes day_reward_state. */
        public day_reward_state: number;

        /**
         * Creates a new VipRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VipRes instance
         */
        public static create(properties?: Lobby.IVipRes): Lobby.VipRes;

        /**
         * Encodes the specified VipRes message. Does not implicitly {@link Lobby.VipRes.verify|verify} messages.
         * @param message VipRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IVipRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VipRes message, length delimited. Does not implicitly {@link Lobby.VipRes.verify|verify} messages.
         * @param message VipRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IVipRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VipRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VipRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.VipRes;

        /**
         * Decodes a VipRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VipRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.VipRes;

        /**
         * Verifies a VipRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VipRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VipRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.VipRes;

        /**
         * Creates a plain object from a VipRes message. Also converts values to other types if specified.
         * @param message VipRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.VipRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VipRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserRealReq. */
    interface IUserRealReq {

        /** UserRealReq handle_type */
        handle_type?: (number|null);

        /** UserRealReq handle_value_str */
        handle_value_str?: (string|null);
    }

    /** Represents a UserRealReq. */
    class UserRealReq implements IUserRealReq {

        /**
         * Constructs a new UserRealReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserRealReq);

        /** UserRealReq handle_type. */
        public handle_type: number;

        /** UserRealReq handle_value_str. */
        public handle_value_str: string;

        /**
         * Creates a new UserRealReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserRealReq instance
         */
        public static create(properties?: Lobby.IUserRealReq): Lobby.UserRealReq;

        /**
         * Encodes the specified UserRealReq message. Does not implicitly {@link Lobby.UserRealReq.verify|verify} messages.
         * @param message UserRealReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserRealReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserRealReq message, length delimited. Does not implicitly {@link Lobby.UserRealReq.verify|verify} messages.
         * @param message UserRealReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserRealReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserRealReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserRealReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserRealReq;

        /**
         * Decodes a UserRealReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserRealReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserRealReq;

        /**
         * Verifies a UserRealReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserRealReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserRealReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserRealReq;

        /**
         * Creates a plain object from a UserRealReq message. Also converts values to other types if specified.
         * @param message UserRealReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserRealReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserRealReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserRealRes. */
    interface IUserRealRes {

        /** UserRealRes handle_type */
        handle_type?: (number|null);

        /** UserRealRes code */
        code?: (number|null);

        /** UserRealRes message */
        message?: (string|null);
    }

    /** Represents a UserRealRes. */
    class UserRealRes implements IUserRealRes {

        /**
         * Constructs a new UserRealRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUserRealRes);

        /** UserRealRes handle_type. */
        public handle_type: number;

        /** UserRealRes code. */
        public code: number;

        /** UserRealRes message. */
        public message: string;

        /**
         * Creates a new UserRealRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserRealRes instance
         */
        public static create(properties?: Lobby.IUserRealRes): Lobby.UserRealRes;

        /**
         * Encodes the specified UserRealRes message. Does not implicitly {@link Lobby.UserRealRes.verify|verify} messages.
         * @param message UserRealRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUserRealRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserRealRes message, length delimited. Does not implicitly {@link Lobby.UserRealRes.verify|verify} messages.
         * @param message UserRealRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUserRealRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserRealRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserRealRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UserRealRes;

        /**
         * Decodes a UserRealRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserRealRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UserRealRes;

        /**
         * Verifies a UserRealRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserRealRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserRealRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UserRealRes;

        /**
         * Creates a plain object from a UserRealRes message. Also converts values to other types if specified.
         * @param message UserRealRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UserRealRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserRealRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ActiveReq. */
    interface IActiveReq {

        /** ActiveReq handle_type */
        handle_type?: (number|null);

        /** ActiveReq active_type */
        active_type?: (number|null);

        /** ActiveReq handle_value */
        handle_value?: (string|null);
    }

    /** Represents an ActiveReq. */
    class ActiveReq implements IActiveReq {

        /**
         * Constructs a new ActiveReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IActiveReq);

        /** ActiveReq handle_type. */
        public handle_type: number;

        /** ActiveReq active_type. */
        public active_type: number;

        /** ActiveReq handle_value. */
        public handle_value: string;

        /**
         * Creates a new ActiveReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActiveReq instance
         */
        public static create(properties?: Lobby.IActiveReq): Lobby.ActiveReq;

        /**
         * Encodes the specified ActiveReq message. Does not implicitly {@link Lobby.ActiveReq.verify|verify} messages.
         * @param message ActiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IActiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActiveReq message, length delimited. Does not implicitly {@link Lobby.ActiveReq.verify|verify} messages.
         * @param message ActiveReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IActiveReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActiveReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.ActiveReq;

        /**
         * Decodes an ActiveReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.ActiveReq;

        /**
         * Verifies an ActiveReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ActiveReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ActiveReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.ActiveReq;

        /**
         * Creates a plain object from an ActiveReq message. Also converts values to other types if specified.
         * @param message ActiveReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.ActiveReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ActiveReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ActiveRes. */
    interface IActiveRes {

        /** ActiveRes handle_type */
        handle_type?: (number|null);

        /** ActiveRes active_type */
        active_type?: (number|null);

        /** ActiveRes handle_value */
        handle_value?: (string|null);

        /** ActiveRes handle_value_json_res */
        handle_value_json_res?: (string|null);
    }

    /** Represents an ActiveRes. */
    class ActiveRes implements IActiveRes {

        /**
         * Constructs a new ActiveRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IActiveRes);

        /** ActiveRes handle_type. */
        public handle_type: number;

        /** ActiveRes active_type. */
        public active_type: number;

        /** ActiveRes handle_value. */
        public handle_value: string;

        /** ActiveRes handle_value_json_res. */
        public handle_value_json_res: string;

        /**
         * Creates a new ActiveRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActiveRes instance
         */
        public static create(properties?: Lobby.IActiveRes): Lobby.ActiveRes;

        /**
         * Encodes the specified ActiveRes message. Does not implicitly {@link Lobby.ActiveRes.verify|verify} messages.
         * @param message ActiveRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IActiveRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActiveRes message, length delimited. Does not implicitly {@link Lobby.ActiveRes.verify|verify} messages.
         * @param message ActiveRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IActiveRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActiveRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActiveRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.ActiveRes;

        /**
         * Decodes an ActiveRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActiveRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.ActiveRes;

        /**
         * Verifies an ActiveRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ActiveRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ActiveRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.ActiveRes;

        /**
         * Creates a plain object from an ActiveRes message. Also converts values to other types if specified.
         * @param message ActiveRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.ActiveRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ActiveRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UpdateUserReq. */
    interface IUpdateUserReq {

        /** UpdateUserReq handle_type */
        handle_type?: (number|null);

        /** UpdateUserReq handle_value */
        handle_value?: (string|null);
    }

    /** Represents an UpdateUserReq. */
    class UpdateUserReq implements IUpdateUserReq {

        /**
         * Constructs a new UpdateUserReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUpdateUserReq);

        /** UpdateUserReq handle_type. */
        public handle_type: number;

        /** UpdateUserReq handle_value. */
        public handle_value: string;

        /**
         * Creates a new UpdateUserReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateUserReq instance
         */
        public static create(properties?: Lobby.IUpdateUserReq): Lobby.UpdateUserReq;

        /**
         * Encodes the specified UpdateUserReq message. Does not implicitly {@link Lobby.UpdateUserReq.verify|verify} messages.
         * @param message UpdateUserReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUpdateUserReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateUserReq message, length delimited. Does not implicitly {@link Lobby.UpdateUserReq.verify|verify} messages.
         * @param message UpdateUserReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUpdateUserReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateUserReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateUserReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UpdateUserReq;

        /**
         * Decodes an UpdateUserReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateUserReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UpdateUserReq;

        /**
         * Verifies an UpdateUserReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateUserReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateUserReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UpdateUserReq;

        /**
         * Creates a plain object from an UpdateUserReq message. Also converts values to other types if specified.
         * @param message UpdateUserReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UpdateUserReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateUserReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an UpdateUserRes. */
    interface IUpdateUserRes {

        /** UpdateUserRes handle_type */
        handle_type?: (number|null);

        /** UpdateUserRes show_json */
        show_json?: (string|null);

        /** UpdateUserRes user_info */
        user_info?: (Lobby.IUserInfoRes|null);

        /** UpdateUserRes user_other_info */
        user_other_info?: (Lobby.IUserOtherInfoRes|null);

        /** UpdateUserRes user_use_prop_info */
        user_use_prop_info?: (Lobby.IUserUsePropRes|null);

        /** UpdateUserRes reason_type */
        reason_type?: (string|null);
    }

    /** Represents an UpdateUserRes. */
    class UpdateUserRes implements IUpdateUserRes {

        /**
         * Constructs a new UpdateUserRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IUpdateUserRes);

        /** UpdateUserRes handle_type. */
        public handle_type: number;

        /** UpdateUserRes show_json. */
        public show_json: string;

        /** UpdateUserRes user_info. */
        public user_info?: (Lobby.IUserInfoRes|null);

        /** UpdateUserRes user_other_info. */
        public user_other_info?: (Lobby.IUserOtherInfoRes|null);

        /** UpdateUserRes user_use_prop_info. */
        public user_use_prop_info?: (Lobby.IUserUsePropRes|null);

        /** UpdateUserRes reason_type. */
        public reason_type: string;

        /**
         * Creates a new UpdateUserRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UpdateUserRes instance
         */
        public static create(properties?: Lobby.IUpdateUserRes): Lobby.UpdateUserRes;

        /**
         * Encodes the specified UpdateUserRes message. Does not implicitly {@link Lobby.UpdateUserRes.verify|verify} messages.
         * @param message UpdateUserRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IUpdateUserRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UpdateUserRes message, length delimited. Does not implicitly {@link Lobby.UpdateUserRes.verify|verify} messages.
         * @param message UpdateUserRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IUpdateUserRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an UpdateUserRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UpdateUserRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.UpdateUserRes;

        /**
         * Decodes an UpdateUserRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UpdateUserRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.UpdateUserRes;

        /**
         * Verifies an UpdateUserRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an UpdateUserRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UpdateUserRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.UpdateUserRes;

        /**
         * Creates a plain object from an UpdateUserRes message. Also converts values to other types if specified.
         * @param message UpdateUserRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.UpdateUserRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UpdateUserRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HeadImgReq. */
    interface IHeadImgReq {
    }

    /** Represents a HeadImgReq. */
    class HeadImgReq implements IHeadImgReq {

        /**
         * Constructs a new HeadImgReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IHeadImgReq);

        /**
         * Creates a new HeadImgReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeadImgReq instance
         */
        public static create(properties?: Lobby.IHeadImgReq): Lobby.HeadImgReq;

        /**
         * Encodes the specified HeadImgReq message. Does not implicitly {@link Lobby.HeadImgReq.verify|verify} messages.
         * @param message HeadImgReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IHeadImgReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeadImgReq message, length delimited. Does not implicitly {@link Lobby.HeadImgReq.verify|verify} messages.
         * @param message HeadImgReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IHeadImgReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeadImgReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeadImgReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.HeadImgReq;

        /**
         * Decodes a HeadImgReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeadImgReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.HeadImgReq;

        /**
         * Verifies a HeadImgReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeadImgReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeadImgReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.HeadImgReq;

        /**
         * Creates a plain object from a HeadImgReq message. Also converts values to other types if specified.
         * @param message HeadImgReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.HeadImgReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeadImgReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HeadImgRes. */
    interface IHeadImgRes {

        /** HeadImgRes head_img_str */
        head_img_str?: (string[]|null);
    }

    /** Represents a HeadImgRes. */
    class HeadImgRes implements IHeadImgRes {

        /**
         * Constructs a new HeadImgRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IHeadImgRes);

        /** HeadImgRes head_img_str. */
        public head_img_str: string[];

        /**
         * Creates a new HeadImgRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeadImgRes instance
         */
        public static create(properties?: Lobby.IHeadImgRes): Lobby.HeadImgRes;

        /**
         * Encodes the specified HeadImgRes message. Does not implicitly {@link Lobby.HeadImgRes.verify|verify} messages.
         * @param message HeadImgRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IHeadImgRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeadImgRes message, length delimited. Does not implicitly {@link Lobby.HeadImgRes.verify|verify} messages.
         * @param message HeadImgRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IHeadImgRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeadImgRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeadImgRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.HeadImgRes;

        /**
         * Decodes a HeadImgRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeadImgRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.HeadImgRes;

        /**
         * Verifies a HeadImgRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeadImgRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeadImgRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.HeadImgRes;

        /**
         * Creates a plain object from a HeadImgRes message. Also converts values to other types if specified.
         * @param message HeadImgRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.HeadImgRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeadImgRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HeartBeatReq. */
    interface IHeartBeatReq {

        /** HeartBeatReq req_time */
        req_time?: (number|Long|null);
    }

    /** Represents a HeartBeatReq. */
    class HeartBeatReq implements IHeartBeatReq {

        /**
         * Constructs a new HeartBeatReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IHeartBeatReq);

        /** HeartBeatReq req_time. */
        public req_time: (number|Long);

        /**
         * Creates a new HeartBeatReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartBeatReq instance
         */
        public static create(properties?: Lobby.IHeartBeatReq): Lobby.HeartBeatReq;

        /**
         * Encodes the specified HeartBeatReq message. Does not implicitly {@link Lobby.HeartBeatReq.verify|verify} messages.
         * @param message HeartBeatReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IHeartBeatReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartBeatReq message, length delimited. Does not implicitly {@link Lobby.HeartBeatReq.verify|verify} messages.
         * @param message HeartBeatReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IHeartBeatReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartBeatReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartBeatReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.HeartBeatReq;

        /**
         * Decodes a HeartBeatReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartBeatReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.HeartBeatReq;

        /**
         * Verifies a HeartBeatReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeartBeatReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeartBeatReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.HeartBeatReq;

        /**
         * Creates a plain object from a HeartBeatReq message. Also converts values to other types if specified.
         * @param message HeartBeatReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.HeartBeatReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeartBeatReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HeartBeatRes. */
    interface IHeartBeatRes {

        /** HeartBeatRes req_time */
        req_time?: (number|Long|null);

        /** HeartBeatRes server_time */
        server_time?: (number|Long|null);
    }

    /** Represents a HeartBeatRes. */
    class HeartBeatRes implements IHeartBeatRes {

        /**
         * Constructs a new HeartBeatRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IHeartBeatRes);

        /** HeartBeatRes req_time. */
        public req_time: (number|Long);

        /** HeartBeatRes server_time. */
        public server_time: (number|Long);

        /**
         * Creates a new HeartBeatRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartBeatRes instance
         */
        public static create(properties?: Lobby.IHeartBeatRes): Lobby.HeartBeatRes;

        /**
         * Encodes the specified HeartBeatRes message. Does not implicitly {@link Lobby.HeartBeatRes.verify|verify} messages.
         * @param message HeartBeatRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IHeartBeatRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartBeatRes message, length delimited. Does not implicitly {@link Lobby.HeartBeatRes.verify|verify} messages.
         * @param message HeartBeatRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IHeartBeatRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartBeatRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartBeatRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.HeartBeatRes;

        /**
         * Decodes a HeartBeatRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartBeatRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.HeartBeatRes;

        /**
         * Verifies a HeartBeatRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeartBeatRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeartBeatRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.HeartBeatRes;

        /**
         * Creates a plain object from a HeartBeatRes message. Also converts values to other types if specified.
         * @param message HeartBeatRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.HeartBeatRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeartBeatRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InviteReq. */
    interface IInviteReq {

        /** InviteReq handle_type */
        handle_type?: (number|null);

        /** InviteReq handle_value */
        handle_value?: (number|Long|null);

        /** InviteReq reward_id */
        reward_id?: (number|null);
    }

    /** Represents an InviteReq. */
    class InviteReq implements IInviteReq {

        /**
         * Constructs a new InviteReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IInviteReq);

        /** InviteReq handle_type. */
        public handle_type: number;

        /** InviteReq handle_value. */
        public handle_value: (number|Long);

        /** InviteReq reward_id. */
        public reward_id: number;

        /**
         * Creates a new InviteReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InviteReq instance
         */
        public static create(properties?: Lobby.IInviteReq): Lobby.InviteReq;

        /**
         * Encodes the specified InviteReq message. Does not implicitly {@link Lobby.InviteReq.verify|verify} messages.
         * @param message InviteReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IInviteReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InviteReq message, length delimited. Does not implicitly {@link Lobby.InviteReq.verify|verify} messages.
         * @param message InviteReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IInviteReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InviteReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InviteReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.InviteReq;

        /**
         * Decodes an InviteReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InviteReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.InviteReq;

        /**
         * Verifies an InviteReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InviteReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InviteReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.InviteReq;

        /**
         * Creates a plain object from an InviteReq message. Also converts values to other types if specified.
         * @param message InviteReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.InviteReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InviteReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InviteRes. */
    interface IInviteRes {

        /** InviteRes handle_type */
        handle_type?: (number|null);

        /** InviteRes handle_value */
        handle_value?: (number|Long|null);

        /** InviteRes reward_id */
        reward_id?: (number|null);

        /** InviteRes invite_item_list */
        invite_item_list?: (Lobby.IInviteItemRes[]|null);

        /** InviteRes invite_item */
        invite_item?: (Lobby.IInviteItemRes|null);
    }

    /** Represents an InviteRes. */
    class InviteRes implements IInviteRes {

        /**
         * Constructs a new InviteRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IInviteRes);

        /** InviteRes handle_type. */
        public handle_type: number;

        /** InviteRes handle_value. */
        public handle_value: (number|Long);

        /** InviteRes reward_id. */
        public reward_id: number;

        /** InviteRes invite_item_list. */
        public invite_item_list: Lobby.IInviteItemRes[];

        /** InviteRes invite_item. */
        public invite_item?: (Lobby.IInviteItemRes|null);

        /**
         * Creates a new InviteRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InviteRes instance
         */
        public static create(properties?: Lobby.IInviteRes): Lobby.InviteRes;

        /**
         * Encodes the specified InviteRes message. Does not implicitly {@link Lobby.InviteRes.verify|verify} messages.
         * @param message InviteRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IInviteRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InviteRes message, length delimited. Does not implicitly {@link Lobby.InviteRes.verify|verify} messages.
         * @param message InviteRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IInviteRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InviteRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InviteRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.InviteRes;

        /**
         * Decodes an InviteRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InviteRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.InviteRes;

        /**
         * Verifies an InviteRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InviteRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InviteRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.InviteRes;

        /**
         * Creates a plain object from an InviteRes message. Also converts values to other types if specified.
         * @param message InviteRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.InviteRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InviteRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InviteItemRes. */
    interface IInviteItemRes {

        /** InviteItemRes ui_id */
        ui_id?: (number|Long|null);

        /** InviteItemRes head_img_url */
        head_img_url?: (string|null);

        /** InviteItemRes reward_one */
        reward_one?: (number|null);

        /** InviteItemRes reward_two */
        reward_two?: (number|null);

        /** InviteItemRes reward_three */
        reward_three?: (number|null);

        /** InviteItemRes reward_four */
        reward_four?: (number|null);
    }

    /** Represents an InviteItemRes. */
    class InviteItemRes implements IInviteItemRes {

        /**
         * Constructs a new InviteItemRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IInviteItemRes);

        /** InviteItemRes ui_id. */
        public ui_id: (number|Long);

        /** InviteItemRes head_img_url. */
        public head_img_url: string;

        /** InviteItemRes reward_one. */
        public reward_one: number;

        /** InviteItemRes reward_two. */
        public reward_two: number;

        /** InviteItemRes reward_three. */
        public reward_three: number;

        /** InviteItemRes reward_four. */
        public reward_four: number;

        /**
         * Creates a new InviteItemRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InviteItemRes instance
         */
        public static create(properties?: Lobby.IInviteItemRes): Lobby.InviteItemRes;

        /**
         * Encodes the specified InviteItemRes message. Does not implicitly {@link Lobby.InviteItemRes.verify|verify} messages.
         * @param message InviteItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IInviteItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InviteItemRes message, length delimited. Does not implicitly {@link Lobby.InviteItemRes.verify|verify} messages.
         * @param message InviteItemRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IInviteItemRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InviteItemRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InviteItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.InviteItemRes;

        /**
         * Decodes an InviteItemRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InviteItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.InviteItemRes;

        /**
         * Verifies an InviteItemRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InviteItemRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InviteItemRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.InviteItemRes;

        /**
         * Creates a plain object from an InviteItemRes message. Also converts values to other types if specified.
         * @param message InviteItemRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.InviteItemRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InviteItemRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AdReq. */
    interface IAdReq {
    }

    /** Represents an AdReq. */
    class AdReq implements IAdReq {

        /**
         * Constructs a new AdReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IAdReq);

        /**
         * Creates a new AdReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AdReq instance
         */
        public static create(properties?: Lobby.IAdReq): Lobby.AdReq;

        /**
         * Encodes the specified AdReq message. Does not implicitly {@link Lobby.AdReq.verify|verify} messages.
         * @param message AdReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IAdReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AdReq message, length delimited. Does not implicitly {@link Lobby.AdReq.verify|verify} messages.
         * @param message AdReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IAdReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AdReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AdReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.AdReq;

        /**
         * Decodes an AdReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AdReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.AdReq;

        /**
         * Verifies an AdReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AdReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AdReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.AdReq;

        /**
         * Creates a plain object from an AdReq message. Also converts values to other types if specified.
         * @param message AdReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.AdReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AdReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AdRes. */
    interface IAdRes {

        /** AdRes ad_id */
        ad_id?: (string|null);
    }

    /** Represents an AdRes. */
    class AdRes implements IAdRes {

        /**
         * Constructs a new AdRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IAdRes);

        /** AdRes ad_id. */
        public ad_id: string;

        /**
         * Creates a new AdRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AdRes instance
         */
        public static create(properties?: Lobby.IAdRes): Lobby.AdRes;

        /**
         * Encodes the specified AdRes message. Does not implicitly {@link Lobby.AdRes.verify|verify} messages.
         * @param message AdRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IAdRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AdRes message, length delimited. Does not implicitly {@link Lobby.AdRes.verify|verify} messages.
         * @param message AdRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IAdRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AdRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AdRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.AdRes;

        /**
         * Decodes an AdRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AdRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.AdRes;

        /**
         * Verifies an AdRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AdRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AdRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.AdRes;

        /**
         * Creates a plain object from an AdRes message. Also converts values to other types if specified.
         * @param message AdRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.AdRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AdRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnterDdzGoldGameReq. */
    interface IEnterDdzGoldGameReq {

        /** EnterDdzGoldGameReq gwc_id */
        gwc_id?: (number|null);

        /** EnterDdzGoldGameReq ddz_start_param */
        ddz_start_param?: (Lobby.IEnterDdzGoldParam|null);
    }

    /** Represents an EnterDdzGoldGameReq. */
    class EnterDdzGoldGameReq implements IEnterDdzGoldGameReq {

        /**
         * Constructs a new EnterDdzGoldGameReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IEnterDdzGoldGameReq);

        /** EnterDdzGoldGameReq gwc_id. */
        public gwc_id: number;

        /** EnterDdzGoldGameReq ddz_start_param. */
        public ddz_start_param?: (Lobby.IEnterDdzGoldParam|null);

        /**
         * Creates a new EnterDdzGoldGameReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterDdzGoldGameReq instance
         */
        public static create(properties?: Lobby.IEnterDdzGoldGameReq): Lobby.EnterDdzGoldGameReq;

        /**
         * Encodes the specified EnterDdzGoldGameReq message. Does not implicitly {@link Lobby.EnterDdzGoldGameReq.verify|verify} messages.
         * @param message EnterDdzGoldGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IEnterDdzGoldGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnterDdzGoldGameReq message, length delimited. Does not implicitly {@link Lobby.EnterDdzGoldGameReq.verify|verify} messages.
         * @param message EnterDdzGoldGameReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IEnterDdzGoldGameReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnterDdzGoldGameReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterDdzGoldGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.EnterDdzGoldGameReq;

        /**
         * Decodes an EnterDdzGoldGameReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterDdzGoldGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.EnterDdzGoldGameReq;

        /**
         * Verifies an EnterDdzGoldGameReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnterDdzGoldGameReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnterDdzGoldGameReq
         */
        public static fromObject(object: { [k: string]: any }): Lobby.EnterDdzGoldGameReq;

        /**
         * Creates a plain object from an EnterDdzGoldGameReq message. Also converts values to other types if specified.
         * @param message EnterDdzGoldGameReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.EnterDdzGoldGameReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnterDdzGoldGameReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnterDdzGoldGameRes. */
    interface IEnterDdzGoldGameRes {

        /** EnterDdzGoldGameRes gwc_id */
        gwc_id?: (number|null);

        /** EnterDdzGoldGameRes ddz_start_param */
        ddz_start_param?: (Lobby.IEnterDdzGoldParam|null);

        /** EnterDdzGoldGameRes code */
        code?: (number|null);

        /** EnterDdzGoldGameRes message */
        message?: (string|null);
    }

    /** Represents an EnterDdzGoldGameRes. */
    class EnterDdzGoldGameRes implements IEnterDdzGoldGameRes {

        /**
         * Constructs a new EnterDdzGoldGameRes.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IEnterDdzGoldGameRes);

        /** EnterDdzGoldGameRes gwc_id. */
        public gwc_id: number;

        /** EnterDdzGoldGameRes ddz_start_param. */
        public ddz_start_param?: (Lobby.IEnterDdzGoldParam|null);

        /** EnterDdzGoldGameRes code. */
        public code: number;

        /** EnterDdzGoldGameRes message. */
        public message: string;

        /**
         * Creates a new EnterDdzGoldGameRes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterDdzGoldGameRes instance
         */
        public static create(properties?: Lobby.IEnterDdzGoldGameRes): Lobby.EnterDdzGoldGameRes;

        /**
         * Encodes the specified EnterDdzGoldGameRes message. Does not implicitly {@link Lobby.EnterDdzGoldGameRes.verify|verify} messages.
         * @param message EnterDdzGoldGameRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IEnterDdzGoldGameRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnterDdzGoldGameRes message, length delimited. Does not implicitly {@link Lobby.EnterDdzGoldGameRes.verify|verify} messages.
         * @param message EnterDdzGoldGameRes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IEnterDdzGoldGameRes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnterDdzGoldGameRes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterDdzGoldGameRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.EnterDdzGoldGameRes;

        /**
         * Decodes an EnterDdzGoldGameRes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterDdzGoldGameRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.EnterDdzGoldGameRes;

        /**
         * Verifies an EnterDdzGoldGameRes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnterDdzGoldGameRes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnterDdzGoldGameRes
         */
        public static fromObject(object: { [k: string]: any }): Lobby.EnterDdzGoldGameRes;

        /**
         * Creates a plain object from an EnterDdzGoldGameRes message. Also converts values to other types if specified.
         * @param message EnterDdzGoldGameRes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.EnterDdzGoldGameRes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnterDdzGoldGameRes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EnterDdzGoldParam. */
    interface IEnterDdzGoldParam {

        /** EnterDdzGoldParam change_room */
        change_room?: (boolean|null);

        /** EnterDdzGoldParam room_unique_id */
        room_unique_id?: (string|null);

        /** EnterDdzGoldParam ming_pk */
        ming_pk?: (boolean|null);

        /** EnterDdzGoldParam prop_jiaxinka */
        prop_jiaxinka?: (boolean|null);

        /** EnterDdzGoldParam prop_jiaxinka_ad_id */
        prop_jiaxinka_ad_id?: (string|null);

        /** EnterDdzGoldParam prop_chakandipai */
        prop_chakandipai?: (boolean|null);

        /** EnterDdzGoldParam prop_chakandipai_ad_id */
        prop_chakandipai_ad_id?: (string|null);
    }

    /** Represents an EnterDdzGoldParam. */
    class EnterDdzGoldParam implements IEnterDdzGoldParam {

        /**
         * Constructs a new EnterDdzGoldParam.
         * @param [properties] Properties to set
         */
        constructor(properties?: Lobby.IEnterDdzGoldParam);

        /** EnterDdzGoldParam change_room. */
        public change_room: boolean;

        /** EnterDdzGoldParam room_unique_id. */
        public room_unique_id: string;

        /** EnterDdzGoldParam ming_pk. */
        public ming_pk: boolean;

        /** EnterDdzGoldParam prop_jiaxinka. */
        public prop_jiaxinka: boolean;

        /** EnterDdzGoldParam prop_jiaxinka_ad_id. */
        public prop_jiaxinka_ad_id: string;

        /** EnterDdzGoldParam prop_chakandipai. */
        public prop_chakandipai: boolean;

        /** EnterDdzGoldParam prop_chakandipai_ad_id. */
        public prop_chakandipai_ad_id: string;

        /**
         * Creates a new EnterDdzGoldParam instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EnterDdzGoldParam instance
         */
        public static create(properties?: Lobby.IEnterDdzGoldParam): Lobby.EnterDdzGoldParam;

        /**
         * Encodes the specified EnterDdzGoldParam message. Does not implicitly {@link Lobby.EnterDdzGoldParam.verify|verify} messages.
         * @param message EnterDdzGoldParam message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: Lobby.IEnterDdzGoldParam, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EnterDdzGoldParam message, length delimited. Does not implicitly {@link Lobby.EnterDdzGoldParam.verify|verify} messages.
         * @param message EnterDdzGoldParam message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: Lobby.IEnterDdzGoldParam, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EnterDdzGoldParam message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EnterDdzGoldParam
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): Lobby.EnterDdzGoldParam;

        /**
         * Decodes an EnterDdzGoldParam message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EnterDdzGoldParam
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): Lobby.EnterDdzGoldParam;

        /**
         * Verifies an EnterDdzGoldParam message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EnterDdzGoldParam message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EnterDdzGoldParam
         */
        public static fromObject(object: { [k: string]: any }): Lobby.EnterDdzGoldParam;

        /**
         * Creates a plain object from an EnterDdzGoldParam message. Also converts values to other types if specified.
         * @param message EnterDdzGoldParam
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: Lobby.EnterDdzGoldParam, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EnterDdzGoldParam to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
