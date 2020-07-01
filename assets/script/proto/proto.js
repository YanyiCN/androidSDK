/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.Lobby = (function() {

    /**
     * Namespace Lobby.
     * @exports Lobby
     * @namespace
     */
    var Lobby = {};

    Lobby.BaseMsg = (function() {

        /**
         * Properties of a BaseMsg.
         * @memberof Lobby
         * @interface IBaseMsg
         * @property {number|null} [type] BaseMsg type
         * @property {number|null} [mid] BaseMsg mid
         * @property {number|Long|null} [req_id] BaseMsg req_id
         * @property {string|null} [server_id] BaseMsg server_id
         * @property {Uint8Array|null} [data] BaseMsg data
         */

        /**
         * Constructs a new BaseMsg.
         * @memberof Lobby
         * @classdesc Represents a BaseMsg.
         * @implements IBaseMsg
         * @constructor
         * @param {Lobby.IBaseMsg=} [properties] Properties to set
         */
        function BaseMsg(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * BaseMsg type.
         * @member {number} type
         * @memberof Lobby.BaseMsg
         * @instance
         */
        BaseMsg.prototype.type = 0;

        /**
         * BaseMsg mid.
         * @member {number} mid
         * @memberof Lobby.BaseMsg
         * @instance
         */
        BaseMsg.prototype.mid = 0;

        /**
         * BaseMsg req_id.
         * @member {number|Long} req_id
         * @memberof Lobby.BaseMsg
         * @instance
         */
        BaseMsg.prototype.req_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * BaseMsg server_id.
         * @member {string} server_id
         * @memberof Lobby.BaseMsg
         * @instance
         */
        BaseMsg.prototype.server_id = "";

        /**
         * BaseMsg data.
         * @member {Uint8Array} data
         * @memberof Lobby.BaseMsg
         * @instance
         */
        BaseMsg.prototype.data = $util.newBuffer([]);

        /**
         * Creates a new BaseMsg instance using the specified properties.
         * @function create
         * @memberof Lobby.BaseMsg
         * @static
         * @param {Lobby.IBaseMsg=} [properties] Properties to set
         * @returns {Lobby.BaseMsg} BaseMsg instance
         */
        BaseMsg.create = function create(properties) {
            return new BaseMsg(properties);
        };

        /**
         * Encodes the specified BaseMsg message. Does not implicitly {@link Lobby.BaseMsg.verify|verify} messages.
         * @function encode
         * @memberof Lobby.BaseMsg
         * @static
         * @param {Lobby.IBaseMsg} message BaseMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BaseMsg.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && message.hasOwnProperty("type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.type);
            if (message.mid != null && message.hasOwnProperty("mid"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.mid);
            if (message.req_id != null && message.hasOwnProperty("req_id"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.req_id);
            if (message.server_id != null && message.hasOwnProperty("server_id"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.server_id);
            if (message.data != null && message.hasOwnProperty("data"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.data);
            return writer;
        };

        /**
         * Encodes the specified BaseMsg message, length delimited. Does not implicitly {@link Lobby.BaseMsg.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.BaseMsg
         * @static
         * @param {Lobby.IBaseMsg} message BaseMsg message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        BaseMsg.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a BaseMsg message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.BaseMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.BaseMsg} BaseMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BaseMsg.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.BaseMsg();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.type = reader.int32();
                    break;
                case 2:
                    message.mid = reader.int32();
                    break;
                case 3:
                    message.req_id = reader.int64();
                    break;
                case 4:
                    message.server_id = reader.string();
                    break;
                case 5:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a BaseMsg message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.BaseMsg
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.BaseMsg} BaseMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        BaseMsg.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a BaseMsg message.
         * @function verify
         * @memberof Lobby.BaseMsg
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        BaseMsg.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isInteger(message.type))
                    return "type: integer expected";
            if (message.mid != null && message.hasOwnProperty("mid"))
                if (!$util.isInteger(message.mid))
                    return "mid: integer expected";
            if (message.req_id != null && message.hasOwnProperty("req_id"))
                if (!$util.isInteger(message.req_id) && !(message.req_id && $util.isInteger(message.req_id.low) && $util.isInteger(message.req_id.high)))
                    return "req_id: integer|Long expected";
            if (message.server_id != null && message.hasOwnProperty("server_id"))
                if (!$util.isString(message.server_id))
                    return "server_id: string expected";
            if (message.data != null && message.hasOwnProperty("data"))
                if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                    return "data: buffer expected";
            return null;
        };

        /**
         * Creates a BaseMsg message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.BaseMsg
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.BaseMsg} BaseMsg
         */
        BaseMsg.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.BaseMsg)
                return object;
            var message = new $root.Lobby.BaseMsg();
            if (object.type != null)
                message.type = object.type | 0;
            if (object.mid != null)
                message.mid = object.mid | 0;
            if (object.req_id != null)
                if ($util.Long)
                    (message.req_id = $util.Long.fromValue(object.req_id)).unsigned = false;
                else if (typeof object.req_id === "string")
                    message.req_id = parseInt(object.req_id, 10);
                else if (typeof object.req_id === "number")
                    message.req_id = object.req_id;
                else if (typeof object.req_id === "object")
                    message.req_id = new $util.LongBits(object.req_id.low >>> 0, object.req_id.high >>> 0).toNumber();
            if (object.server_id != null)
                message.server_id = String(object.server_id);
            if (object.data != null)
                if (typeof object.data === "string")
                    $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                else if (object.data.length)
                    message.data = object.data;
            return message;
        };

        /**
         * Creates a plain object from a BaseMsg message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.BaseMsg
         * @static
         * @param {Lobby.BaseMsg} message BaseMsg
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        BaseMsg.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.type = 0;
                object.mid = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.req_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.req_id = options.longs === String ? "0" : 0;
                object.server_id = "";
                if (options.bytes === String)
                    object.data = "";
                else {
                    object.data = [];
                    if (options.bytes !== Array)
                        object.data = $util.newBuffer(object.data);
                }
            }
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            if (message.mid != null && message.hasOwnProperty("mid"))
                object.mid = message.mid;
            if (message.req_id != null && message.hasOwnProperty("req_id"))
                if (typeof message.req_id === "number")
                    object.req_id = options.longs === String ? String(message.req_id) : message.req_id;
                else
                    object.req_id = options.longs === String ? $util.Long.prototype.toString.call(message.req_id) : options.longs === Number ? new $util.LongBits(message.req_id.low >>> 0, message.req_id.high >>> 0).toNumber() : message.req_id;
            if (message.server_id != null && message.hasOwnProperty("server_id"))
                object.server_id = message.server_id;
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
        };

        /**
         * Converts this BaseMsg to JSON.
         * @function toJSON
         * @memberof Lobby.BaseMsg
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        BaseMsg.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return BaseMsg;
    })();

    Lobby.ServerErrorRes = (function() {

        /**
         * Properties of a ServerErrorRes.
         * @memberof Lobby
         * @interface IServerErrorRes
         * @property {number|Long|null} [req_id] ServerErrorRes req_id
         * @property {string|null} [error_msg] ServerErrorRes error_msg
         * @property {number|null} [error_code] ServerErrorRes error_code
         * @property {string|null} [error_msg_ext] ServerErrorRes error_msg_ext
         */

        /**
         * Constructs a new ServerErrorRes.
         * @memberof Lobby
         * @classdesc Represents a ServerErrorRes.
         * @implements IServerErrorRes
         * @constructor
         * @param {Lobby.IServerErrorRes=} [properties] Properties to set
         */
        function ServerErrorRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ServerErrorRes req_id.
         * @member {number|Long} req_id
         * @memberof Lobby.ServerErrorRes
         * @instance
         */
        ServerErrorRes.prototype.req_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ServerErrorRes error_msg.
         * @member {string} error_msg
         * @memberof Lobby.ServerErrorRes
         * @instance
         */
        ServerErrorRes.prototype.error_msg = "";

        /**
         * ServerErrorRes error_code.
         * @member {number} error_code
         * @memberof Lobby.ServerErrorRes
         * @instance
         */
        ServerErrorRes.prototype.error_code = 0;

        /**
         * ServerErrorRes error_msg_ext.
         * @member {string} error_msg_ext
         * @memberof Lobby.ServerErrorRes
         * @instance
         */
        ServerErrorRes.prototype.error_msg_ext = "";

        /**
         * Creates a new ServerErrorRes instance using the specified properties.
         * @function create
         * @memberof Lobby.ServerErrorRes
         * @static
         * @param {Lobby.IServerErrorRes=} [properties] Properties to set
         * @returns {Lobby.ServerErrorRes} ServerErrorRes instance
         */
        ServerErrorRes.create = function create(properties) {
            return new ServerErrorRes(properties);
        };

        /**
         * Encodes the specified ServerErrorRes message. Does not implicitly {@link Lobby.ServerErrorRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.ServerErrorRes
         * @static
         * @param {Lobby.IServerErrorRes} message ServerErrorRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerErrorRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.req_id != null && message.hasOwnProperty("req_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.req_id);
            if (message.error_msg != null && message.hasOwnProperty("error_msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.error_msg);
            if (message.error_code != null && message.hasOwnProperty("error_code"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.error_code);
            if (message.error_msg_ext != null && message.hasOwnProperty("error_msg_ext"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.error_msg_ext);
            return writer;
        };

        /**
         * Encodes the specified ServerErrorRes message, length delimited. Does not implicitly {@link Lobby.ServerErrorRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.ServerErrorRes
         * @static
         * @param {Lobby.IServerErrorRes} message ServerErrorRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ServerErrorRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ServerErrorRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.ServerErrorRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.ServerErrorRes} ServerErrorRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerErrorRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.ServerErrorRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.req_id = reader.int64();
                    break;
                case 2:
                    message.error_msg = reader.string();
                    break;
                case 3:
                    message.error_code = reader.int32();
                    break;
                case 4:
                    message.error_msg_ext = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ServerErrorRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.ServerErrorRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.ServerErrorRes} ServerErrorRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ServerErrorRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ServerErrorRes message.
         * @function verify
         * @memberof Lobby.ServerErrorRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ServerErrorRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.req_id != null && message.hasOwnProperty("req_id"))
                if (!$util.isInteger(message.req_id) && !(message.req_id && $util.isInteger(message.req_id.low) && $util.isInteger(message.req_id.high)))
                    return "req_id: integer|Long expected";
            if (message.error_msg != null && message.hasOwnProperty("error_msg"))
                if (!$util.isString(message.error_msg))
                    return "error_msg: string expected";
            if (message.error_code != null && message.hasOwnProperty("error_code"))
                if (!$util.isInteger(message.error_code))
                    return "error_code: integer expected";
            if (message.error_msg_ext != null && message.hasOwnProperty("error_msg_ext"))
                if (!$util.isString(message.error_msg_ext))
                    return "error_msg_ext: string expected";
            return null;
        };

        /**
         * Creates a ServerErrorRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.ServerErrorRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.ServerErrorRes} ServerErrorRes
         */
        ServerErrorRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.ServerErrorRes)
                return object;
            var message = new $root.Lobby.ServerErrorRes();
            if (object.req_id != null)
                if ($util.Long)
                    (message.req_id = $util.Long.fromValue(object.req_id)).unsigned = false;
                else if (typeof object.req_id === "string")
                    message.req_id = parseInt(object.req_id, 10);
                else if (typeof object.req_id === "number")
                    message.req_id = object.req_id;
                else if (typeof object.req_id === "object")
                    message.req_id = new $util.LongBits(object.req_id.low >>> 0, object.req_id.high >>> 0).toNumber();
            if (object.error_msg != null)
                message.error_msg = String(object.error_msg);
            if (object.error_code != null)
                message.error_code = object.error_code | 0;
            if (object.error_msg_ext != null)
                message.error_msg_ext = String(object.error_msg_ext);
            return message;
        };

        /**
         * Creates a plain object from a ServerErrorRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.ServerErrorRes
         * @static
         * @param {Lobby.ServerErrorRes} message ServerErrorRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ServerErrorRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.req_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.req_id = options.longs === String ? "0" : 0;
                object.error_msg = "";
                object.error_code = 0;
                object.error_msg_ext = "";
            }
            if (message.req_id != null && message.hasOwnProperty("req_id"))
                if (typeof message.req_id === "number")
                    object.req_id = options.longs === String ? String(message.req_id) : message.req_id;
                else
                    object.req_id = options.longs === String ? $util.Long.prototype.toString.call(message.req_id) : options.longs === Number ? new $util.LongBits(message.req_id.low >>> 0, message.req_id.high >>> 0).toNumber() : message.req_id;
            if (message.error_msg != null && message.hasOwnProperty("error_msg"))
                object.error_msg = message.error_msg;
            if (message.error_code != null && message.hasOwnProperty("error_code"))
                object.error_code = message.error_code;
            if (message.error_msg_ext != null && message.hasOwnProperty("error_msg_ext"))
                object.error_msg_ext = message.error_msg_ext;
            return object;
        };

        /**
         * Converts this ServerErrorRes to JSON.
         * @function toJSON
         * @memberof Lobby.ServerErrorRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ServerErrorRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ServerErrorRes;
    })();

    Lobby.PageObj = (function() {

        /**
         * Properties of a PageObj.
         * @memberof Lobby
         * @interface IPageObj
         * @property {number|null} [cur_pg] PageObj cur_pg
         * @property {number|null} [tot_pg] PageObj tot_pg
         * @property {number|null} [show_row] PageObj show_row
         * @property {number|null} [tot_row] PageObj tot_row
         * @property {string|null} [req_order] PageObj req_order
         */

        /**
         * Constructs a new PageObj.
         * @memberof Lobby
         * @classdesc Represents a PageObj.
         * @implements IPageObj
         * @constructor
         * @param {Lobby.IPageObj=} [properties] Properties to set
         */
        function PageObj(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PageObj cur_pg.
         * @member {number} cur_pg
         * @memberof Lobby.PageObj
         * @instance
         */
        PageObj.prototype.cur_pg = 0;

        /**
         * PageObj tot_pg.
         * @member {number} tot_pg
         * @memberof Lobby.PageObj
         * @instance
         */
        PageObj.prototype.tot_pg = 0;

        /**
         * PageObj show_row.
         * @member {number} show_row
         * @memberof Lobby.PageObj
         * @instance
         */
        PageObj.prototype.show_row = 0;

        /**
         * PageObj tot_row.
         * @member {number} tot_row
         * @memberof Lobby.PageObj
         * @instance
         */
        PageObj.prototype.tot_row = 0;

        /**
         * PageObj req_order.
         * @member {string} req_order
         * @memberof Lobby.PageObj
         * @instance
         */
        PageObj.prototype.req_order = "";

        /**
         * Creates a new PageObj instance using the specified properties.
         * @function create
         * @memberof Lobby.PageObj
         * @static
         * @param {Lobby.IPageObj=} [properties] Properties to set
         * @returns {Lobby.PageObj} PageObj instance
         */
        PageObj.create = function create(properties) {
            return new PageObj(properties);
        };

        /**
         * Encodes the specified PageObj message. Does not implicitly {@link Lobby.PageObj.verify|verify} messages.
         * @function encode
         * @memberof Lobby.PageObj
         * @static
         * @param {Lobby.IPageObj} message PageObj message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PageObj.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cur_pg != null && message.hasOwnProperty("cur_pg"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.cur_pg);
            if (message.tot_pg != null && message.hasOwnProperty("tot_pg"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.tot_pg);
            if (message.show_row != null && message.hasOwnProperty("show_row"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.show_row);
            if (message.tot_row != null && message.hasOwnProperty("tot_row"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.tot_row);
            if (message.req_order != null && message.hasOwnProperty("req_order"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.req_order);
            return writer;
        };

        /**
         * Encodes the specified PageObj message, length delimited. Does not implicitly {@link Lobby.PageObj.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.PageObj
         * @static
         * @param {Lobby.IPageObj} message PageObj message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PageObj.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PageObj message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.PageObj
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.PageObj} PageObj
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PageObj.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.PageObj();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.cur_pg = reader.int32();
                    break;
                case 2:
                    message.tot_pg = reader.int32();
                    break;
                case 3:
                    message.show_row = reader.int32();
                    break;
                case 4:
                    message.tot_row = reader.int32();
                    break;
                case 5:
                    message.req_order = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PageObj message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.PageObj
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.PageObj} PageObj
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PageObj.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PageObj message.
         * @function verify
         * @memberof Lobby.PageObj
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PageObj.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cur_pg != null && message.hasOwnProperty("cur_pg"))
                if (!$util.isInteger(message.cur_pg))
                    return "cur_pg: integer expected";
            if (message.tot_pg != null && message.hasOwnProperty("tot_pg"))
                if (!$util.isInteger(message.tot_pg))
                    return "tot_pg: integer expected";
            if (message.show_row != null && message.hasOwnProperty("show_row"))
                if (!$util.isInteger(message.show_row))
                    return "show_row: integer expected";
            if (message.tot_row != null && message.hasOwnProperty("tot_row"))
                if (!$util.isInteger(message.tot_row))
                    return "tot_row: integer expected";
            if (message.req_order != null && message.hasOwnProperty("req_order"))
                if (!$util.isString(message.req_order))
                    return "req_order: string expected";
            return null;
        };

        /**
         * Creates a PageObj message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.PageObj
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.PageObj} PageObj
         */
        PageObj.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.PageObj)
                return object;
            var message = new $root.Lobby.PageObj();
            if (object.cur_pg != null)
                message.cur_pg = object.cur_pg | 0;
            if (object.tot_pg != null)
                message.tot_pg = object.tot_pg | 0;
            if (object.show_row != null)
                message.show_row = object.show_row | 0;
            if (object.tot_row != null)
                message.tot_row = object.tot_row | 0;
            if (object.req_order != null)
                message.req_order = String(object.req_order);
            return message;
        };

        /**
         * Creates a plain object from a PageObj message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.PageObj
         * @static
         * @param {Lobby.PageObj} message PageObj
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PageObj.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.cur_pg = 0;
                object.tot_pg = 0;
                object.show_row = 0;
                object.tot_row = 0;
                object.req_order = "";
            }
            if (message.cur_pg != null && message.hasOwnProperty("cur_pg"))
                object.cur_pg = message.cur_pg;
            if (message.tot_pg != null && message.hasOwnProperty("tot_pg"))
                object.tot_pg = message.tot_pg;
            if (message.show_row != null && message.hasOwnProperty("show_row"))
                object.show_row = message.show_row;
            if (message.tot_row != null && message.hasOwnProperty("tot_row"))
                object.tot_row = message.tot_row;
            if (message.req_order != null && message.hasOwnProperty("req_order"))
                object.req_order = message.req_order;
            return object;
        };

        /**
         * Converts this PageObj to JSON.
         * @function toJSON
         * @memberof Lobby.PageObj
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PageObj.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PageObj;
    })();

    Lobby.LoginReq = (function() {

        /**
         * Properties of a LoginReq.
         * @memberof Lobby
         * @interface ILoginReq
         * @property {number|null} [login_type] LoginReq login_type
         * @property {string|null} [account_params] LoginReq account_params
         * @property {Lobby.IClientInfo|null} [client_info] LoginReq client_info
         */

        /**
         * Constructs a new LoginReq.
         * @memberof Lobby
         * @classdesc Represents a LoginReq.
         * @implements ILoginReq
         * @constructor
         * @param {Lobby.ILoginReq=} [properties] Properties to set
         */
        function LoginReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginReq login_type.
         * @member {number} login_type
         * @memberof Lobby.LoginReq
         * @instance
         */
        LoginReq.prototype.login_type = 0;

        /**
         * LoginReq account_params.
         * @member {string} account_params
         * @memberof Lobby.LoginReq
         * @instance
         */
        LoginReq.prototype.account_params = "";

        /**
         * LoginReq client_info.
         * @member {Lobby.IClientInfo|null|undefined} client_info
         * @memberof Lobby.LoginReq
         * @instance
         */
        LoginReq.prototype.client_info = null;

        /**
         * Creates a new LoginReq instance using the specified properties.
         * @function create
         * @memberof Lobby.LoginReq
         * @static
         * @param {Lobby.ILoginReq=} [properties] Properties to set
         * @returns {Lobby.LoginReq} LoginReq instance
         */
        LoginReq.create = function create(properties) {
            return new LoginReq(properties);
        };

        /**
         * Encodes the specified LoginReq message. Does not implicitly {@link Lobby.LoginReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.LoginReq
         * @static
         * @param {Lobby.ILoginReq} message LoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.login_type != null && message.hasOwnProperty("login_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.login_type);
            if (message.account_params != null && message.hasOwnProperty("account_params"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.account_params);
            if (message.client_info != null && message.hasOwnProperty("client_info"))
                $root.Lobby.ClientInfo.encode(message.client_info, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified LoginReq message, length delimited. Does not implicitly {@link Lobby.LoginReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.LoginReq
         * @static
         * @param {Lobby.ILoginReq} message LoginReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.LoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.LoginReq} LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.LoginReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.login_type = reader.int32();
                    break;
                case 2:
                    message.account_params = reader.string();
                    break;
                case 3:
                    message.client_info = $root.Lobby.ClientInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.LoginReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.LoginReq} LoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginReq message.
         * @function verify
         * @memberof Lobby.LoginReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.login_type != null && message.hasOwnProperty("login_type"))
                if (!$util.isInteger(message.login_type))
                    return "login_type: integer expected";
            if (message.account_params != null && message.hasOwnProperty("account_params"))
                if (!$util.isString(message.account_params))
                    return "account_params: string expected";
            if (message.client_info != null && message.hasOwnProperty("client_info")) {
                var error = $root.Lobby.ClientInfo.verify(message.client_info);
                if (error)
                    return "client_info." + error;
            }
            return null;
        };

        /**
         * Creates a LoginReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.LoginReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.LoginReq} LoginReq
         */
        LoginReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.LoginReq)
                return object;
            var message = new $root.Lobby.LoginReq();
            if (object.login_type != null)
                message.login_type = object.login_type | 0;
            if (object.account_params != null)
                message.account_params = String(object.account_params);
            if (object.client_info != null) {
                if (typeof object.client_info !== "object")
                    throw TypeError(".Lobby.LoginReq.client_info: object expected");
                message.client_info = $root.Lobby.ClientInfo.fromObject(object.client_info);
            }
            return message;
        };

        /**
         * Creates a plain object from a LoginReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.LoginReq
         * @static
         * @param {Lobby.LoginReq} message LoginReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.login_type = 0;
                object.account_params = "";
                object.client_info = null;
            }
            if (message.login_type != null && message.hasOwnProperty("login_type"))
                object.login_type = message.login_type;
            if (message.account_params != null && message.hasOwnProperty("account_params"))
                object.account_params = message.account_params;
            if (message.client_info != null && message.hasOwnProperty("client_info"))
                object.client_info = $root.Lobby.ClientInfo.toObject(message.client_info, options);
            return object;
        };

        /**
         * Converts this LoginReq to JSON.
         * @function toJSON
         * @memberof Lobby.LoginReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginReq;
    })();

    Lobby.LoginRes = (function() {

        /**
         * Properties of a LoginRes.
         * @memberof Lobby
         * @interface ILoginRes
         * @property {number|null} [code] LoginRes code
         * @property {string|null} [message] LoginRes message
         * @property {Lobby.IUserInfoRes|null} [user_info] LoginRes user_info
         * @property {Lobby.IUserOtherInfoRes|null} [user_other_info] LoginRes user_other_info
         * @property {Lobby.IUserUsePropRes|null} [user_use_prop_info] LoginRes user_use_prop_info
         * @property {string|null} [address] LoginRes address
         */

        /**
         * Constructs a new LoginRes.
         * @memberof Lobby
         * @classdesc Represents a LoginRes.
         * @implements ILoginRes
         * @constructor
         * @param {Lobby.ILoginRes=} [properties] Properties to set
         */
        function LoginRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * LoginRes code.
         * @member {number} code
         * @memberof Lobby.LoginRes
         * @instance
         */
        LoginRes.prototype.code = 0;

        /**
         * LoginRes message.
         * @member {string} message
         * @memberof Lobby.LoginRes
         * @instance
         */
        LoginRes.prototype.message = "";

        /**
         * LoginRes user_info.
         * @member {Lobby.IUserInfoRes|null|undefined} user_info
         * @memberof Lobby.LoginRes
         * @instance
         */
        LoginRes.prototype.user_info = null;

        /**
         * LoginRes user_other_info.
         * @member {Lobby.IUserOtherInfoRes|null|undefined} user_other_info
         * @memberof Lobby.LoginRes
         * @instance
         */
        LoginRes.prototype.user_other_info = null;

        /**
         * LoginRes user_use_prop_info.
         * @member {Lobby.IUserUsePropRes|null|undefined} user_use_prop_info
         * @memberof Lobby.LoginRes
         * @instance
         */
        LoginRes.prototype.user_use_prop_info = null;

        /**
         * LoginRes address.
         * @member {string} address
         * @memberof Lobby.LoginRes
         * @instance
         */
        LoginRes.prototype.address = "";

        /**
         * Creates a new LoginRes instance using the specified properties.
         * @function create
         * @memberof Lobby.LoginRes
         * @static
         * @param {Lobby.ILoginRes=} [properties] Properties to set
         * @returns {Lobby.LoginRes} LoginRes instance
         */
        LoginRes.create = function create(properties) {
            return new LoginRes(properties);
        };

        /**
         * Encodes the specified LoginRes message. Does not implicitly {@link Lobby.LoginRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.LoginRes
         * @static
         * @param {Lobby.ILoginRes} message LoginRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.user_info != null && message.hasOwnProperty("user_info"))
                $root.Lobby.UserInfoRes.encode(message.user_info, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.user_other_info != null && message.hasOwnProperty("user_other_info"))
                $root.Lobby.UserOtherInfoRes.encode(message.user_other_info, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.user_use_prop_info != null && message.hasOwnProperty("user_use_prop_info"))
                $root.Lobby.UserUsePropRes.encode(message.user_use_prop_info, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.address != null && message.hasOwnProperty("address"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.address);
            return writer;
        };

        /**
         * Encodes the specified LoginRes message, length delimited. Does not implicitly {@link Lobby.LoginRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.LoginRes
         * @static
         * @param {Lobby.ILoginRes} message LoginRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        LoginRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a LoginRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.LoginRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.LoginRes} LoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.LoginRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.message = reader.string();
                    break;
                case 3:
                    message.user_info = $root.Lobby.UserInfoRes.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.user_other_info = $root.Lobby.UserOtherInfoRes.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.user_use_prop_info = $root.Lobby.UserUsePropRes.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.address = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a LoginRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.LoginRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.LoginRes} LoginRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        LoginRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a LoginRes message.
         * @function verify
         * @memberof Lobby.LoginRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        LoginRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.user_info != null && message.hasOwnProperty("user_info")) {
                var error = $root.Lobby.UserInfoRes.verify(message.user_info);
                if (error)
                    return "user_info." + error;
            }
            if (message.user_other_info != null && message.hasOwnProperty("user_other_info")) {
                var error = $root.Lobby.UserOtherInfoRes.verify(message.user_other_info);
                if (error)
                    return "user_other_info." + error;
            }
            if (message.user_use_prop_info != null && message.hasOwnProperty("user_use_prop_info")) {
                var error = $root.Lobby.UserUsePropRes.verify(message.user_use_prop_info);
                if (error)
                    return "user_use_prop_info." + error;
            }
            if (message.address != null && message.hasOwnProperty("address"))
                if (!$util.isString(message.address))
                    return "address: string expected";
            return null;
        };

        /**
         * Creates a LoginRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.LoginRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.LoginRes} LoginRes
         */
        LoginRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.LoginRes)
                return object;
            var message = new $root.Lobby.LoginRes();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.message != null)
                message.message = String(object.message);
            if (object.user_info != null) {
                if (typeof object.user_info !== "object")
                    throw TypeError(".Lobby.LoginRes.user_info: object expected");
                message.user_info = $root.Lobby.UserInfoRes.fromObject(object.user_info);
            }
            if (object.user_other_info != null) {
                if (typeof object.user_other_info !== "object")
                    throw TypeError(".Lobby.LoginRes.user_other_info: object expected");
                message.user_other_info = $root.Lobby.UserOtherInfoRes.fromObject(object.user_other_info);
            }
            if (object.user_use_prop_info != null) {
                if (typeof object.user_use_prop_info !== "object")
                    throw TypeError(".Lobby.LoginRes.user_use_prop_info: object expected");
                message.user_use_prop_info = $root.Lobby.UserUsePropRes.fromObject(object.user_use_prop_info);
            }
            if (object.address != null)
                message.address = String(object.address);
            return message;
        };

        /**
         * Creates a plain object from a LoginRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.LoginRes
         * @static
         * @param {Lobby.LoginRes} message LoginRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        LoginRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.message = "";
                object.user_info = null;
                object.user_other_info = null;
                object.user_use_prop_info = null;
                object.address = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.user_info != null && message.hasOwnProperty("user_info"))
                object.user_info = $root.Lobby.UserInfoRes.toObject(message.user_info, options);
            if (message.user_other_info != null && message.hasOwnProperty("user_other_info"))
                object.user_other_info = $root.Lobby.UserOtherInfoRes.toObject(message.user_other_info, options);
            if (message.user_use_prop_info != null && message.hasOwnProperty("user_use_prop_info"))
                object.user_use_prop_info = $root.Lobby.UserUsePropRes.toObject(message.user_use_prop_info, options);
            if (message.address != null && message.hasOwnProperty("address"))
                object.address = message.address;
            return object;
        };

        /**
         * Converts this LoginRes to JSON.
         * @function toJSON
         * @memberof Lobby.LoginRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        LoginRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return LoginRes;
    })();

    Lobby.ReConnectionReq = (function() {

        /**
         * Properties of a ReConnectionReq.
         * @memberof Lobby
         * @interface IReConnectionReq
         * @property {string|null} [token] ReConnectionReq token
         * @property {number|Long|null} [uid] ReConnectionReq uid
         * @property {Lobby.IClientInfo|null} [client_info] ReConnectionReq client_info
         */

        /**
         * Constructs a new ReConnectionReq.
         * @memberof Lobby
         * @classdesc Represents a ReConnectionReq.
         * @implements IReConnectionReq
         * @constructor
         * @param {Lobby.IReConnectionReq=} [properties] Properties to set
         */
        function ReConnectionReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReConnectionReq token.
         * @member {string} token
         * @memberof Lobby.ReConnectionReq
         * @instance
         */
        ReConnectionReq.prototype.token = "";

        /**
         * ReConnectionReq uid.
         * @member {number|Long} uid
         * @memberof Lobby.ReConnectionReq
         * @instance
         */
        ReConnectionReq.prototype.uid = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * ReConnectionReq client_info.
         * @member {Lobby.IClientInfo|null|undefined} client_info
         * @memberof Lobby.ReConnectionReq
         * @instance
         */
        ReConnectionReq.prototype.client_info = null;

        /**
         * Creates a new ReConnectionReq instance using the specified properties.
         * @function create
         * @memberof Lobby.ReConnectionReq
         * @static
         * @param {Lobby.IReConnectionReq=} [properties] Properties to set
         * @returns {Lobby.ReConnectionReq} ReConnectionReq instance
         */
        ReConnectionReq.create = function create(properties) {
            return new ReConnectionReq(properties);
        };

        /**
         * Encodes the specified ReConnectionReq message. Does not implicitly {@link Lobby.ReConnectionReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.ReConnectionReq
         * @static
         * @param {Lobby.IReConnectionReq} message ReConnectionReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReConnectionReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.token != null && message.hasOwnProperty("token"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.token);
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.uid);
            if (message.client_info != null && message.hasOwnProperty("client_info"))
                $root.Lobby.ClientInfo.encode(message.client_info, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ReConnectionReq message, length delimited. Does not implicitly {@link Lobby.ReConnectionReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.ReConnectionReq
         * @static
         * @param {Lobby.IReConnectionReq} message ReConnectionReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReConnectionReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReConnectionReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.ReConnectionReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.ReConnectionReq} ReConnectionReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReConnectionReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.ReConnectionReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.token = reader.string();
                    break;
                case 2:
                    message.uid = reader.int64();
                    break;
                case 3:
                    message.client_info = $root.Lobby.ClientInfo.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReConnectionReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.ReConnectionReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.ReConnectionReq} ReConnectionReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReConnectionReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReConnectionReq message.
         * @function verify
         * @memberof Lobby.ReConnectionReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReConnectionReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid) && !(message.uid && $util.isInteger(message.uid.low) && $util.isInteger(message.uid.high)))
                    return "uid: integer|Long expected";
            if (message.client_info != null && message.hasOwnProperty("client_info")) {
                var error = $root.Lobby.ClientInfo.verify(message.client_info);
                if (error)
                    return "client_info." + error;
            }
            return null;
        };

        /**
         * Creates a ReConnectionReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.ReConnectionReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.ReConnectionReq} ReConnectionReq
         */
        ReConnectionReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.ReConnectionReq)
                return object;
            var message = new $root.Lobby.ReConnectionReq();
            if (object.token != null)
                message.token = String(object.token);
            if (object.uid != null)
                if ($util.Long)
                    (message.uid = $util.Long.fromValue(object.uid)).unsigned = false;
                else if (typeof object.uid === "string")
                    message.uid = parseInt(object.uid, 10);
                else if (typeof object.uid === "number")
                    message.uid = object.uid;
                else if (typeof object.uid === "object")
                    message.uid = new $util.LongBits(object.uid.low >>> 0, object.uid.high >>> 0).toNumber();
            if (object.client_info != null) {
                if (typeof object.client_info !== "object")
                    throw TypeError(".Lobby.ReConnectionReq.client_info: object expected");
                message.client_info = $root.Lobby.ClientInfo.fromObject(object.client_info);
            }
            return message;
        };

        /**
         * Creates a plain object from a ReConnectionReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.ReConnectionReq
         * @static
         * @param {Lobby.ReConnectionReq} message ReConnectionReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReConnectionReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.token = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.uid = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.uid = options.longs === String ? "0" : 0;
                object.client_info = null;
            }
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (typeof message.uid === "number")
                    object.uid = options.longs === String ? String(message.uid) : message.uid;
                else
                    object.uid = options.longs === String ? $util.Long.prototype.toString.call(message.uid) : options.longs === Number ? new $util.LongBits(message.uid.low >>> 0, message.uid.high >>> 0).toNumber() : message.uid;
            if (message.client_info != null && message.hasOwnProperty("client_info"))
                object.client_info = $root.Lobby.ClientInfo.toObject(message.client_info, options);
            return object;
        };

        /**
         * Converts this ReConnectionReq to JSON.
         * @function toJSON
         * @memberof Lobby.ReConnectionReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReConnectionReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReConnectionReq;
    })();

    Lobby.ReConnectionRes = (function() {

        /**
         * Properties of a ReConnectionRes.
         * @memberof Lobby
         * @interface IReConnectionRes
         * @property {number|null} [code] ReConnectionRes code
         * @property {string|null} [message] ReConnectionRes message
         * @property {Lobby.IUserInfoRes|null} [user_info] ReConnectionRes user_info
         * @property {Lobby.IUserOtherInfoRes|null} [user_other_info] ReConnectionRes user_other_info
         * @property {Lobby.IUserUsePropRes|null} [user_use_prop_info] ReConnectionRes user_use_prop_info
         * @property {string|null} [address] ReConnectionRes address
         */

        /**
         * Constructs a new ReConnectionRes.
         * @memberof Lobby
         * @classdesc Represents a ReConnectionRes.
         * @implements IReConnectionRes
         * @constructor
         * @param {Lobby.IReConnectionRes=} [properties] Properties to set
         */
        function ReConnectionRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ReConnectionRes code.
         * @member {number} code
         * @memberof Lobby.ReConnectionRes
         * @instance
         */
        ReConnectionRes.prototype.code = 0;

        /**
         * ReConnectionRes message.
         * @member {string} message
         * @memberof Lobby.ReConnectionRes
         * @instance
         */
        ReConnectionRes.prototype.message = "";

        /**
         * ReConnectionRes user_info.
         * @member {Lobby.IUserInfoRes|null|undefined} user_info
         * @memberof Lobby.ReConnectionRes
         * @instance
         */
        ReConnectionRes.prototype.user_info = null;

        /**
         * ReConnectionRes user_other_info.
         * @member {Lobby.IUserOtherInfoRes|null|undefined} user_other_info
         * @memberof Lobby.ReConnectionRes
         * @instance
         */
        ReConnectionRes.prototype.user_other_info = null;

        /**
         * ReConnectionRes user_use_prop_info.
         * @member {Lobby.IUserUsePropRes|null|undefined} user_use_prop_info
         * @memberof Lobby.ReConnectionRes
         * @instance
         */
        ReConnectionRes.prototype.user_use_prop_info = null;

        /**
         * ReConnectionRes address.
         * @member {string} address
         * @memberof Lobby.ReConnectionRes
         * @instance
         */
        ReConnectionRes.prototype.address = "";

        /**
         * Creates a new ReConnectionRes instance using the specified properties.
         * @function create
         * @memberof Lobby.ReConnectionRes
         * @static
         * @param {Lobby.IReConnectionRes=} [properties] Properties to set
         * @returns {Lobby.ReConnectionRes} ReConnectionRes instance
         */
        ReConnectionRes.create = function create(properties) {
            return new ReConnectionRes(properties);
        };

        /**
         * Encodes the specified ReConnectionRes message. Does not implicitly {@link Lobby.ReConnectionRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.ReConnectionRes
         * @static
         * @param {Lobby.IReConnectionRes} message ReConnectionRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReConnectionRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.user_info != null && message.hasOwnProperty("user_info"))
                $root.Lobby.UserInfoRes.encode(message.user_info, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.user_other_info != null && message.hasOwnProperty("user_other_info"))
                $root.Lobby.UserOtherInfoRes.encode(message.user_other_info, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.user_use_prop_info != null && message.hasOwnProperty("user_use_prop_info"))
                $root.Lobby.UserUsePropRes.encode(message.user_use_prop_info, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.address != null && message.hasOwnProperty("address"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.address);
            return writer;
        };

        /**
         * Encodes the specified ReConnectionRes message, length delimited. Does not implicitly {@link Lobby.ReConnectionRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.ReConnectionRes
         * @static
         * @param {Lobby.IReConnectionRes} message ReConnectionRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ReConnectionRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ReConnectionRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.ReConnectionRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.ReConnectionRes} ReConnectionRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReConnectionRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.ReConnectionRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.message = reader.string();
                    break;
                case 3:
                    message.user_info = $root.Lobby.UserInfoRes.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.user_other_info = $root.Lobby.UserOtherInfoRes.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.user_use_prop_info = $root.Lobby.UserUsePropRes.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.address = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ReConnectionRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.ReConnectionRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.ReConnectionRes} ReConnectionRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ReConnectionRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ReConnectionRes message.
         * @function verify
         * @memberof Lobby.ReConnectionRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ReConnectionRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.user_info != null && message.hasOwnProperty("user_info")) {
                var error = $root.Lobby.UserInfoRes.verify(message.user_info);
                if (error)
                    return "user_info." + error;
            }
            if (message.user_other_info != null && message.hasOwnProperty("user_other_info")) {
                var error = $root.Lobby.UserOtherInfoRes.verify(message.user_other_info);
                if (error)
                    return "user_other_info." + error;
            }
            if (message.user_use_prop_info != null && message.hasOwnProperty("user_use_prop_info")) {
                var error = $root.Lobby.UserUsePropRes.verify(message.user_use_prop_info);
                if (error)
                    return "user_use_prop_info." + error;
            }
            if (message.address != null && message.hasOwnProperty("address"))
                if (!$util.isString(message.address))
                    return "address: string expected";
            return null;
        };

        /**
         * Creates a ReConnectionRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.ReConnectionRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.ReConnectionRes} ReConnectionRes
         */
        ReConnectionRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.ReConnectionRes)
                return object;
            var message = new $root.Lobby.ReConnectionRes();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.message != null)
                message.message = String(object.message);
            if (object.user_info != null) {
                if (typeof object.user_info !== "object")
                    throw TypeError(".Lobby.ReConnectionRes.user_info: object expected");
                message.user_info = $root.Lobby.UserInfoRes.fromObject(object.user_info);
            }
            if (object.user_other_info != null) {
                if (typeof object.user_other_info !== "object")
                    throw TypeError(".Lobby.ReConnectionRes.user_other_info: object expected");
                message.user_other_info = $root.Lobby.UserOtherInfoRes.fromObject(object.user_other_info);
            }
            if (object.user_use_prop_info != null) {
                if (typeof object.user_use_prop_info !== "object")
                    throw TypeError(".Lobby.ReConnectionRes.user_use_prop_info: object expected");
                message.user_use_prop_info = $root.Lobby.UserUsePropRes.fromObject(object.user_use_prop_info);
            }
            if (object.address != null)
                message.address = String(object.address);
            return message;
        };

        /**
         * Creates a plain object from a ReConnectionRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.ReConnectionRes
         * @static
         * @param {Lobby.ReConnectionRes} message ReConnectionRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ReConnectionRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.message = "";
                object.user_info = null;
                object.user_other_info = null;
                object.user_use_prop_info = null;
                object.address = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.user_info != null && message.hasOwnProperty("user_info"))
                object.user_info = $root.Lobby.UserInfoRes.toObject(message.user_info, options);
            if (message.user_other_info != null && message.hasOwnProperty("user_other_info"))
                object.user_other_info = $root.Lobby.UserOtherInfoRes.toObject(message.user_other_info, options);
            if (message.user_use_prop_info != null && message.hasOwnProperty("user_use_prop_info"))
                object.user_use_prop_info = $root.Lobby.UserUsePropRes.toObject(message.user_use_prop_info, options);
            if (message.address != null && message.hasOwnProperty("address"))
                object.address = message.address;
            return object;
        };

        /**
         * Converts this ReConnectionRes to JSON.
         * @function toJSON
         * @memberof Lobby.ReConnectionRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ReConnectionRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ReConnectionRes;
    })();

    Lobby.ClientInfo = (function() {

        /**
         * Properties of a ClientInfo.
         * @memberof Lobby
         * @interface IClientInfo
         * @property {string|null} [gps_loc] ClientInfo gps_loc
         * @property {string|null} [version] ClientInfo version
         * @property {number|null} [device_type] ClientInfo device_type
         * @property {number|null} [client_type] ClientInfo client_type
         * @property {string|null} [channel] ClientInfo channel
         */

        /**
         * Constructs a new ClientInfo.
         * @memberof Lobby
         * @classdesc Represents a ClientInfo.
         * @implements IClientInfo
         * @constructor
         * @param {Lobby.IClientInfo=} [properties] Properties to set
         */
        function ClientInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ClientInfo gps_loc.
         * @member {string} gps_loc
         * @memberof Lobby.ClientInfo
         * @instance
         */
        ClientInfo.prototype.gps_loc = "";

        /**
         * ClientInfo version.
         * @member {string} version
         * @memberof Lobby.ClientInfo
         * @instance
         */
        ClientInfo.prototype.version = "";

        /**
         * ClientInfo device_type.
         * @member {number} device_type
         * @memberof Lobby.ClientInfo
         * @instance
         */
        ClientInfo.prototype.device_type = 0;

        /**
         * ClientInfo client_type.
         * @member {number} client_type
         * @memberof Lobby.ClientInfo
         * @instance
         */
        ClientInfo.prototype.client_type = 0;

        /**
         * ClientInfo channel.
         * @member {string} channel
         * @memberof Lobby.ClientInfo
         * @instance
         */
        ClientInfo.prototype.channel = "";

        /**
         * Creates a new ClientInfo instance using the specified properties.
         * @function create
         * @memberof Lobby.ClientInfo
         * @static
         * @param {Lobby.IClientInfo=} [properties] Properties to set
         * @returns {Lobby.ClientInfo} ClientInfo instance
         */
        ClientInfo.create = function create(properties) {
            return new ClientInfo(properties);
        };

        /**
         * Encodes the specified ClientInfo message. Does not implicitly {@link Lobby.ClientInfo.verify|verify} messages.
         * @function encode
         * @memberof Lobby.ClientInfo
         * @static
         * @param {Lobby.IClientInfo} message ClientInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gps_loc != null && message.hasOwnProperty("gps_loc"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.gps_loc);
            if (message.version != null && message.hasOwnProperty("version"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.version);
            if (message.device_type != null && message.hasOwnProperty("device_type"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.device_type);
            if (message.client_type != null && message.hasOwnProperty("client_type"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.client_type);
            if (message.channel != null && message.hasOwnProperty("channel"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.channel);
            return writer;
        };

        /**
         * Encodes the specified ClientInfo message, length delimited. Does not implicitly {@link Lobby.ClientInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.ClientInfo
         * @static
         * @param {Lobby.IClientInfo} message ClientInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ClientInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ClientInfo message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.ClientInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.ClientInfo} ClientInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.ClientInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gps_loc = reader.string();
                    break;
                case 2:
                    message.version = reader.string();
                    break;
                case 3:
                    message.device_type = reader.int32();
                    break;
                case 4:
                    message.client_type = reader.int32();
                    break;
                case 5:
                    message.channel = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ClientInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.ClientInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.ClientInfo} ClientInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ClientInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ClientInfo message.
         * @function verify
         * @memberof Lobby.ClientInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ClientInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gps_loc != null && message.hasOwnProperty("gps_loc"))
                if (!$util.isString(message.gps_loc))
                    return "gps_loc: string expected";
            if (message.version != null && message.hasOwnProperty("version"))
                if (!$util.isString(message.version))
                    return "version: string expected";
            if (message.device_type != null && message.hasOwnProperty("device_type"))
                if (!$util.isInteger(message.device_type))
                    return "device_type: integer expected";
            if (message.client_type != null && message.hasOwnProperty("client_type"))
                if (!$util.isInteger(message.client_type))
                    return "client_type: integer expected";
            if (message.channel != null && message.hasOwnProperty("channel"))
                if (!$util.isString(message.channel))
                    return "channel: string expected";
            return null;
        };

        /**
         * Creates a ClientInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.ClientInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.ClientInfo} ClientInfo
         */
        ClientInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.ClientInfo)
                return object;
            var message = new $root.Lobby.ClientInfo();
            if (object.gps_loc != null)
                message.gps_loc = String(object.gps_loc);
            if (object.version != null)
                message.version = String(object.version);
            if (object.device_type != null)
                message.device_type = object.device_type | 0;
            if (object.client_type != null)
                message.client_type = object.client_type | 0;
            if (object.channel != null)
                message.channel = String(object.channel);
            return message;
        };

        /**
         * Creates a plain object from a ClientInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.ClientInfo
         * @static
         * @param {Lobby.ClientInfo} message ClientInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ClientInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gps_loc = "";
                object.version = "";
                object.device_type = 0;
                object.client_type = 0;
                object.channel = "";
            }
            if (message.gps_loc != null && message.hasOwnProperty("gps_loc"))
                object.gps_loc = message.gps_loc;
            if (message.version != null && message.hasOwnProperty("version"))
                object.version = message.version;
            if (message.device_type != null && message.hasOwnProperty("device_type"))
                object.device_type = message.device_type;
            if (message.client_type != null && message.hasOwnProperty("client_type"))
                object.client_type = message.client_type;
            if (message.channel != null && message.hasOwnProperty("channel"))
                object.channel = message.channel;
            return object;
        };

        /**
         * Converts this ClientInfo to JSON.
         * @function toJSON
         * @memberof Lobby.ClientInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ClientInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ClientInfo;
    })();

    Lobby.UserInfoRes = (function() {

        /**
         * Properties of a UserInfoRes.
         * @memberof Lobby
         * @interface IUserInfoRes
         * @property {number|Long|null} [user_id] UserInfoRes user_id
         * @property {string|null} [login_token] UserInfoRes login_token
         * @property {string|null} [nick_name] UserInfoRes nick_name
         * @property {string|null} [head_img_url] UserInfoRes head_img_url
         * @property {number|null} [sex] UserInfoRes sex
         * @property {number|Long|null} [coin_a] UserInfoRes coin_a
         * @property {number|Long|null} [coin_b] UserInfoRes coin_b
         * @property {number|Long|null} [coin_c] UserInfoRes coin_c
         * @property {number|null} [level] UserInfoRes level
         * @property {number|Long|null} [exp] UserInfoRes exp
         * @property {number|null} [vip_level] UserInfoRes vip_level
         * @property {number|Long|null} [vip_exp] UserInfoRes vip_exp
         * @property {number|null} [title_id] UserInfoRes title_id
         * @property {string|null} [cur_game_server_id] UserInfoRes cur_game_server_id
         * @property {string|null} [cur_room_unique_id] UserInfoRes cur_room_unique_id
         */

        /**
         * Constructs a new UserInfoRes.
         * @memberof Lobby
         * @classdesc Represents a UserInfoRes.
         * @implements IUserInfoRes
         * @constructor
         * @param {Lobby.IUserInfoRes=} [properties] Properties to set
         */
        function UserInfoRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserInfoRes user_id.
         * @member {number|Long} user_id
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.user_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserInfoRes login_token.
         * @member {string} login_token
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.login_token = "";

        /**
         * UserInfoRes nick_name.
         * @member {string} nick_name
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.nick_name = "";

        /**
         * UserInfoRes head_img_url.
         * @member {string} head_img_url
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.head_img_url = "";

        /**
         * UserInfoRes sex.
         * @member {number} sex
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.sex = 0;

        /**
         * UserInfoRes coin_a.
         * @member {number|Long} coin_a
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.coin_a = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserInfoRes coin_b.
         * @member {number|Long} coin_b
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.coin_b = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserInfoRes coin_c.
         * @member {number|Long} coin_c
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.coin_c = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserInfoRes level.
         * @member {number} level
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.level = 0;

        /**
         * UserInfoRes exp.
         * @member {number|Long} exp
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.exp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserInfoRes vip_level.
         * @member {number} vip_level
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.vip_level = 0;

        /**
         * UserInfoRes vip_exp.
         * @member {number|Long} vip_exp
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.vip_exp = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserInfoRes title_id.
         * @member {number} title_id
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.title_id = 0;

        /**
         * UserInfoRes cur_game_server_id.
         * @member {string} cur_game_server_id
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.cur_game_server_id = "";

        /**
         * UserInfoRes cur_room_unique_id.
         * @member {string} cur_room_unique_id
         * @memberof Lobby.UserInfoRes
         * @instance
         */
        UserInfoRes.prototype.cur_room_unique_id = "";

        /**
         * Creates a new UserInfoRes instance using the specified properties.
         * @function create
         * @memberof Lobby.UserInfoRes
         * @static
         * @param {Lobby.IUserInfoRes=} [properties] Properties to set
         * @returns {Lobby.UserInfoRes} UserInfoRes instance
         */
        UserInfoRes.create = function create(properties) {
            return new UserInfoRes(properties);
        };

        /**
         * Encodes the specified UserInfoRes message. Does not implicitly {@link Lobby.UserInfoRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserInfoRes
         * @static
         * @param {Lobby.IUserInfoRes} message UserInfoRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfoRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.user_id != null && message.hasOwnProperty("user_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.user_id);
            if (message.login_token != null && message.hasOwnProperty("login_token"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.login_token);
            if (message.nick_name != null && message.hasOwnProperty("nick_name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.nick_name);
            if (message.head_img_url != null && message.hasOwnProperty("head_img_url"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.head_img_url);
            if (message.sex != null && message.hasOwnProperty("sex"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.sex);
            if (message.coin_a != null && message.hasOwnProperty("coin_a"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.coin_a);
            if (message.coin_b != null && message.hasOwnProperty("coin_b"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.coin_b);
            if (message.coin_c != null && message.hasOwnProperty("coin_c"))
                writer.uint32(/* id 8, wireType 0 =*/64).int64(message.coin_c);
            if (message.level != null && message.hasOwnProperty("level"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.level);
            if (message.exp != null && message.hasOwnProperty("exp"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.exp);
            if (message.vip_level != null && message.hasOwnProperty("vip_level"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.vip_level);
            if (message.vip_exp != null && message.hasOwnProperty("vip_exp"))
                writer.uint32(/* id 12, wireType 0 =*/96).int64(message.vip_exp);
            if (message.title_id != null && message.hasOwnProperty("title_id"))
                writer.uint32(/* id 13, wireType 0 =*/104).int32(message.title_id);
            if (message.cur_game_server_id != null && message.hasOwnProperty("cur_game_server_id"))
                writer.uint32(/* id 14, wireType 2 =*/114).string(message.cur_game_server_id);
            if (message.cur_room_unique_id != null && message.hasOwnProperty("cur_room_unique_id"))
                writer.uint32(/* id 15, wireType 2 =*/122).string(message.cur_room_unique_id);
            return writer;
        };

        /**
         * Encodes the specified UserInfoRes message, length delimited. Does not implicitly {@link Lobby.UserInfoRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserInfoRes
         * @static
         * @param {Lobby.IUserInfoRes} message UserInfoRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserInfoRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserInfoRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserInfoRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserInfoRes} UserInfoRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfoRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserInfoRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.user_id = reader.int64();
                    break;
                case 2:
                    message.login_token = reader.string();
                    break;
                case 3:
                    message.nick_name = reader.string();
                    break;
                case 4:
                    message.head_img_url = reader.string();
                    break;
                case 5:
                    message.sex = reader.int32();
                    break;
                case 6:
                    message.coin_a = reader.int64();
                    break;
                case 7:
                    message.coin_b = reader.int64();
                    break;
                case 8:
                    message.coin_c = reader.int64();
                    break;
                case 9:
                    message.level = reader.int32();
                    break;
                case 10:
                    message.exp = reader.int64();
                    break;
                case 11:
                    message.vip_level = reader.int32();
                    break;
                case 12:
                    message.vip_exp = reader.int64();
                    break;
                case 13:
                    message.title_id = reader.int32();
                    break;
                case 14:
                    message.cur_game_server_id = reader.string();
                    break;
                case 15:
                    message.cur_room_unique_id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserInfoRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserInfoRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserInfoRes} UserInfoRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserInfoRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserInfoRes message.
         * @function verify
         * @memberof Lobby.UserInfoRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserInfoRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.user_id != null && message.hasOwnProperty("user_id"))
                if (!$util.isInteger(message.user_id) && !(message.user_id && $util.isInteger(message.user_id.low) && $util.isInteger(message.user_id.high)))
                    return "user_id: integer|Long expected";
            if (message.login_token != null && message.hasOwnProperty("login_token"))
                if (!$util.isString(message.login_token))
                    return "login_token: string expected";
            if (message.nick_name != null && message.hasOwnProperty("nick_name"))
                if (!$util.isString(message.nick_name))
                    return "nick_name: string expected";
            if (message.head_img_url != null && message.hasOwnProperty("head_img_url"))
                if (!$util.isString(message.head_img_url))
                    return "head_img_url: string expected";
            if (message.sex != null && message.hasOwnProperty("sex"))
                if (!$util.isInteger(message.sex))
                    return "sex: integer expected";
            if (message.coin_a != null && message.hasOwnProperty("coin_a"))
                if (!$util.isInteger(message.coin_a) && !(message.coin_a && $util.isInteger(message.coin_a.low) && $util.isInteger(message.coin_a.high)))
                    return "coin_a: integer|Long expected";
            if (message.coin_b != null && message.hasOwnProperty("coin_b"))
                if (!$util.isInteger(message.coin_b) && !(message.coin_b && $util.isInteger(message.coin_b.low) && $util.isInteger(message.coin_b.high)))
                    return "coin_b: integer|Long expected";
            if (message.coin_c != null && message.hasOwnProperty("coin_c"))
                if (!$util.isInteger(message.coin_c) && !(message.coin_c && $util.isInteger(message.coin_c.low) && $util.isInteger(message.coin_c.high)))
                    return "coin_c: integer|Long expected";
            if (message.level != null && message.hasOwnProperty("level"))
                if (!$util.isInteger(message.level))
                    return "level: integer expected";
            if (message.exp != null && message.hasOwnProperty("exp"))
                if (!$util.isInteger(message.exp) && !(message.exp && $util.isInteger(message.exp.low) && $util.isInteger(message.exp.high)))
                    return "exp: integer|Long expected";
            if (message.vip_level != null && message.hasOwnProperty("vip_level"))
                if (!$util.isInteger(message.vip_level))
                    return "vip_level: integer expected";
            if (message.vip_exp != null && message.hasOwnProperty("vip_exp"))
                if (!$util.isInteger(message.vip_exp) && !(message.vip_exp && $util.isInteger(message.vip_exp.low) && $util.isInteger(message.vip_exp.high)))
                    return "vip_exp: integer|Long expected";
            if (message.title_id != null && message.hasOwnProperty("title_id"))
                if (!$util.isInteger(message.title_id))
                    return "title_id: integer expected";
            if (message.cur_game_server_id != null && message.hasOwnProperty("cur_game_server_id"))
                if (!$util.isString(message.cur_game_server_id))
                    return "cur_game_server_id: string expected";
            if (message.cur_room_unique_id != null && message.hasOwnProperty("cur_room_unique_id"))
                if (!$util.isString(message.cur_room_unique_id))
                    return "cur_room_unique_id: string expected";
            return null;
        };

        /**
         * Creates a UserInfoRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserInfoRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserInfoRes} UserInfoRes
         */
        UserInfoRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserInfoRes)
                return object;
            var message = new $root.Lobby.UserInfoRes();
            if (object.user_id != null)
                if ($util.Long)
                    (message.user_id = $util.Long.fromValue(object.user_id)).unsigned = false;
                else if (typeof object.user_id === "string")
                    message.user_id = parseInt(object.user_id, 10);
                else if (typeof object.user_id === "number")
                    message.user_id = object.user_id;
                else if (typeof object.user_id === "object")
                    message.user_id = new $util.LongBits(object.user_id.low >>> 0, object.user_id.high >>> 0).toNumber();
            if (object.login_token != null)
                message.login_token = String(object.login_token);
            if (object.nick_name != null)
                message.nick_name = String(object.nick_name);
            if (object.head_img_url != null)
                message.head_img_url = String(object.head_img_url);
            if (object.sex != null)
                message.sex = object.sex | 0;
            if (object.coin_a != null)
                if ($util.Long)
                    (message.coin_a = $util.Long.fromValue(object.coin_a)).unsigned = false;
                else if (typeof object.coin_a === "string")
                    message.coin_a = parseInt(object.coin_a, 10);
                else if (typeof object.coin_a === "number")
                    message.coin_a = object.coin_a;
                else if (typeof object.coin_a === "object")
                    message.coin_a = new $util.LongBits(object.coin_a.low >>> 0, object.coin_a.high >>> 0).toNumber();
            if (object.coin_b != null)
                if ($util.Long)
                    (message.coin_b = $util.Long.fromValue(object.coin_b)).unsigned = false;
                else if (typeof object.coin_b === "string")
                    message.coin_b = parseInt(object.coin_b, 10);
                else if (typeof object.coin_b === "number")
                    message.coin_b = object.coin_b;
                else if (typeof object.coin_b === "object")
                    message.coin_b = new $util.LongBits(object.coin_b.low >>> 0, object.coin_b.high >>> 0).toNumber();
            if (object.coin_c != null)
                if ($util.Long)
                    (message.coin_c = $util.Long.fromValue(object.coin_c)).unsigned = false;
                else if (typeof object.coin_c === "string")
                    message.coin_c = parseInt(object.coin_c, 10);
                else if (typeof object.coin_c === "number")
                    message.coin_c = object.coin_c;
                else if (typeof object.coin_c === "object")
                    message.coin_c = new $util.LongBits(object.coin_c.low >>> 0, object.coin_c.high >>> 0).toNumber();
            if (object.level != null)
                message.level = object.level | 0;
            if (object.exp != null)
                if ($util.Long)
                    (message.exp = $util.Long.fromValue(object.exp)).unsigned = false;
                else if (typeof object.exp === "string")
                    message.exp = parseInt(object.exp, 10);
                else if (typeof object.exp === "number")
                    message.exp = object.exp;
                else if (typeof object.exp === "object")
                    message.exp = new $util.LongBits(object.exp.low >>> 0, object.exp.high >>> 0).toNumber();
            if (object.vip_level != null)
                message.vip_level = object.vip_level | 0;
            if (object.vip_exp != null)
                if ($util.Long)
                    (message.vip_exp = $util.Long.fromValue(object.vip_exp)).unsigned = false;
                else if (typeof object.vip_exp === "string")
                    message.vip_exp = parseInt(object.vip_exp, 10);
                else if (typeof object.vip_exp === "number")
                    message.vip_exp = object.vip_exp;
                else if (typeof object.vip_exp === "object")
                    message.vip_exp = new $util.LongBits(object.vip_exp.low >>> 0, object.vip_exp.high >>> 0).toNumber();
            if (object.title_id != null)
                message.title_id = object.title_id | 0;
            if (object.cur_game_server_id != null)
                message.cur_game_server_id = String(object.cur_game_server_id);
            if (object.cur_room_unique_id != null)
                message.cur_room_unique_id = String(object.cur_room_unique_id);
            return message;
        };

        /**
         * Creates a plain object from a UserInfoRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserInfoRes
         * @static
         * @param {Lobby.UserInfoRes} message UserInfoRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserInfoRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.user_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.user_id = options.longs === String ? "0" : 0;
                object.login_token = "";
                object.nick_name = "";
                object.head_img_url = "";
                object.sex = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.coin_a = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.coin_a = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.coin_b = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.coin_b = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.coin_c = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.coin_c = options.longs === String ? "0" : 0;
                object.level = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.exp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.exp = options.longs === String ? "0" : 0;
                object.vip_level = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.vip_exp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.vip_exp = options.longs === String ? "0" : 0;
                object.title_id = 0;
                object.cur_game_server_id = "";
                object.cur_room_unique_id = "";
            }
            if (message.user_id != null && message.hasOwnProperty("user_id"))
                if (typeof message.user_id === "number")
                    object.user_id = options.longs === String ? String(message.user_id) : message.user_id;
                else
                    object.user_id = options.longs === String ? $util.Long.prototype.toString.call(message.user_id) : options.longs === Number ? new $util.LongBits(message.user_id.low >>> 0, message.user_id.high >>> 0).toNumber() : message.user_id;
            if (message.login_token != null && message.hasOwnProperty("login_token"))
                object.login_token = message.login_token;
            if (message.nick_name != null && message.hasOwnProperty("nick_name"))
                object.nick_name = message.nick_name;
            if (message.head_img_url != null && message.hasOwnProperty("head_img_url"))
                object.head_img_url = message.head_img_url;
            if (message.sex != null && message.hasOwnProperty("sex"))
                object.sex = message.sex;
            if (message.coin_a != null && message.hasOwnProperty("coin_a"))
                if (typeof message.coin_a === "number")
                    object.coin_a = options.longs === String ? String(message.coin_a) : message.coin_a;
                else
                    object.coin_a = options.longs === String ? $util.Long.prototype.toString.call(message.coin_a) : options.longs === Number ? new $util.LongBits(message.coin_a.low >>> 0, message.coin_a.high >>> 0).toNumber() : message.coin_a;
            if (message.coin_b != null && message.hasOwnProperty("coin_b"))
                if (typeof message.coin_b === "number")
                    object.coin_b = options.longs === String ? String(message.coin_b) : message.coin_b;
                else
                    object.coin_b = options.longs === String ? $util.Long.prototype.toString.call(message.coin_b) : options.longs === Number ? new $util.LongBits(message.coin_b.low >>> 0, message.coin_b.high >>> 0).toNumber() : message.coin_b;
            if (message.coin_c != null && message.hasOwnProperty("coin_c"))
                if (typeof message.coin_c === "number")
                    object.coin_c = options.longs === String ? String(message.coin_c) : message.coin_c;
                else
                    object.coin_c = options.longs === String ? $util.Long.prototype.toString.call(message.coin_c) : options.longs === Number ? new $util.LongBits(message.coin_c.low >>> 0, message.coin_c.high >>> 0).toNumber() : message.coin_c;
            if (message.level != null && message.hasOwnProperty("level"))
                object.level = message.level;
            if (message.exp != null && message.hasOwnProperty("exp"))
                if (typeof message.exp === "number")
                    object.exp = options.longs === String ? String(message.exp) : message.exp;
                else
                    object.exp = options.longs === String ? $util.Long.prototype.toString.call(message.exp) : options.longs === Number ? new $util.LongBits(message.exp.low >>> 0, message.exp.high >>> 0).toNumber() : message.exp;
            if (message.vip_level != null && message.hasOwnProperty("vip_level"))
                object.vip_level = message.vip_level;
            if (message.vip_exp != null && message.hasOwnProperty("vip_exp"))
                if (typeof message.vip_exp === "number")
                    object.vip_exp = options.longs === String ? String(message.vip_exp) : message.vip_exp;
                else
                    object.vip_exp = options.longs === String ? $util.Long.prototype.toString.call(message.vip_exp) : options.longs === Number ? new $util.LongBits(message.vip_exp.low >>> 0, message.vip_exp.high >>> 0).toNumber() : message.vip_exp;
            if (message.title_id != null && message.hasOwnProperty("title_id"))
                object.title_id = message.title_id;
            if (message.cur_game_server_id != null && message.hasOwnProperty("cur_game_server_id"))
                object.cur_game_server_id = message.cur_game_server_id;
            if (message.cur_room_unique_id != null && message.hasOwnProperty("cur_room_unique_id"))
                object.cur_room_unique_id = message.cur_room_unique_id;
            return object;
        };

        /**
         * Converts this UserInfoRes to JSON.
         * @function toJSON
         * @memberof Lobby.UserInfoRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserInfoRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserInfoRes;
    })();

    Lobby.UserOtherInfoRes = (function() {

        /**
         * Properties of a UserOtherInfoRes.
         * @memberof Lobby
         * @interface IUserOtherInfoRes
         * @property {string|null} [mobile] UserOtherInfoRes mobile
         * @property {number|Long|null} [mobile_bind_time] UserOtherInfoRes mobile_bind_time
         * @property {string|null} [id_card] UserOtherInfoRes id_card
         * @property {number|null} [modify_nick_name] UserOtherInfoRes modify_nick_name
         * @property {number|null} [first_tixian] UserOtherInfoRes first_tixian
         * @property {Array.<number>|null} [titles] UserOtherInfoRes titles
         */

        /**
         * Constructs a new UserOtherInfoRes.
         * @memberof Lobby
         * @classdesc Represents a UserOtherInfoRes.
         * @implements IUserOtherInfoRes
         * @constructor
         * @param {Lobby.IUserOtherInfoRes=} [properties] Properties to set
         */
        function UserOtherInfoRes(properties) {
            this.titles = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserOtherInfoRes mobile.
         * @member {string} mobile
         * @memberof Lobby.UserOtherInfoRes
         * @instance
         */
        UserOtherInfoRes.prototype.mobile = "";

        /**
         * UserOtherInfoRes mobile_bind_time.
         * @member {number|Long} mobile_bind_time
         * @memberof Lobby.UserOtherInfoRes
         * @instance
         */
        UserOtherInfoRes.prototype.mobile_bind_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserOtherInfoRes id_card.
         * @member {string} id_card
         * @memberof Lobby.UserOtherInfoRes
         * @instance
         */
        UserOtherInfoRes.prototype.id_card = "";

        /**
         * UserOtherInfoRes modify_nick_name.
         * @member {number} modify_nick_name
         * @memberof Lobby.UserOtherInfoRes
         * @instance
         */
        UserOtherInfoRes.prototype.modify_nick_name = 0;

        /**
         * UserOtherInfoRes first_tixian.
         * @member {number} first_tixian
         * @memberof Lobby.UserOtherInfoRes
         * @instance
         */
        UserOtherInfoRes.prototype.first_tixian = 0;

        /**
         * UserOtherInfoRes titles.
         * @member {Array.<number>} titles
         * @memberof Lobby.UserOtherInfoRes
         * @instance
         */
        UserOtherInfoRes.prototype.titles = $util.emptyArray;

        /**
         * Creates a new UserOtherInfoRes instance using the specified properties.
         * @function create
         * @memberof Lobby.UserOtherInfoRes
         * @static
         * @param {Lobby.IUserOtherInfoRes=} [properties] Properties to set
         * @returns {Lobby.UserOtherInfoRes} UserOtherInfoRes instance
         */
        UserOtherInfoRes.create = function create(properties) {
            return new UserOtherInfoRes(properties);
        };

        /**
         * Encodes the specified UserOtherInfoRes message. Does not implicitly {@link Lobby.UserOtherInfoRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserOtherInfoRes
         * @static
         * @param {Lobby.IUserOtherInfoRes} message UserOtherInfoRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserOtherInfoRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.mobile != null && message.hasOwnProperty("mobile"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.mobile);
            if (message.mobile_bind_time != null && message.hasOwnProperty("mobile_bind_time"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.mobile_bind_time);
            if (message.id_card != null && message.hasOwnProperty("id_card"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.id_card);
            if (message.modify_nick_name != null && message.hasOwnProperty("modify_nick_name"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.modify_nick_name);
            if (message.first_tixian != null && message.hasOwnProperty("first_tixian"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.first_tixian);
            if (message.titles != null && message.titles.length) {
                writer.uint32(/* id 6, wireType 2 =*/50).fork();
                for (var i = 0; i < message.titles.length; ++i)
                    writer.int32(message.titles[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified UserOtherInfoRes message, length delimited. Does not implicitly {@link Lobby.UserOtherInfoRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserOtherInfoRes
         * @static
         * @param {Lobby.IUserOtherInfoRes} message UserOtherInfoRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserOtherInfoRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserOtherInfoRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserOtherInfoRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserOtherInfoRes} UserOtherInfoRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserOtherInfoRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserOtherInfoRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.mobile = reader.string();
                    break;
                case 2:
                    message.mobile_bind_time = reader.int64();
                    break;
                case 3:
                    message.id_card = reader.string();
                    break;
                case 4:
                    message.modify_nick_name = reader.int32();
                    break;
                case 5:
                    message.first_tixian = reader.int32();
                    break;
                case 6:
                    if (!(message.titles && message.titles.length))
                        message.titles = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.titles.push(reader.int32());
                    } else
                        message.titles.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserOtherInfoRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserOtherInfoRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserOtherInfoRes} UserOtherInfoRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserOtherInfoRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserOtherInfoRes message.
         * @function verify
         * @memberof Lobby.UserOtherInfoRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserOtherInfoRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.mobile != null && message.hasOwnProperty("mobile"))
                if (!$util.isString(message.mobile))
                    return "mobile: string expected";
            if (message.mobile_bind_time != null && message.hasOwnProperty("mobile_bind_time"))
                if (!$util.isInteger(message.mobile_bind_time) && !(message.mobile_bind_time && $util.isInteger(message.mobile_bind_time.low) && $util.isInteger(message.mobile_bind_time.high)))
                    return "mobile_bind_time: integer|Long expected";
            if (message.id_card != null && message.hasOwnProperty("id_card"))
                if (!$util.isString(message.id_card))
                    return "id_card: string expected";
            if (message.modify_nick_name != null && message.hasOwnProperty("modify_nick_name"))
                if (!$util.isInteger(message.modify_nick_name))
                    return "modify_nick_name: integer expected";
            if (message.first_tixian != null && message.hasOwnProperty("first_tixian"))
                if (!$util.isInteger(message.first_tixian))
                    return "first_tixian: integer expected";
            if (message.titles != null && message.hasOwnProperty("titles")) {
                if (!Array.isArray(message.titles))
                    return "titles: array expected";
                for (var i = 0; i < message.titles.length; ++i)
                    if (!$util.isInteger(message.titles[i]))
                        return "titles: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a UserOtherInfoRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserOtherInfoRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserOtherInfoRes} UserOtherInfoRes
         */
        UserOtherInfoRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserOtherInfoRes)
                return object;
            var message = new $root.Lobby.UserOtherInfoRes();
            if (object.mobile != null)
                message.mobile = String(object.mobile);
            if (object.mobile_bind_time != null)
                if ($util.Long)
                    (message.mobile_bind_time = $util.Long.fromValue(object.mobile_bind_time)).unsigned = false;
                else if (typeof object.mobile_bind_time === "string")
                    message.mobile_bind_time = parseInt(object.mobile_bind_time, 10);
                else if (typeof object.mobile_bind_time === "number")
                    message.mobile_bind_time = object.mobile_bind_time;
                else if (typeof object.mobile_bind_time === "object")
                    message.mobile_bind_time = new $util.LongBits(object.mobile_bind_time.low >>> 0, object.mobile_bind_time.high >>> 0).toNumber();
            if (object.id_card != null)
                message.id_card = String(object.id_card);
            if (object.modify_nick_name != null)
                message.modify_nick_name = object.modify_nick_name | 0;
            if (object.first_tixian != null)
                message.first_tixian = object.first_tixian | 0;
            if (object.titles) {
                if (!Array.isArray(object.titles))
                    throw TypeError(".Lobby.UserOtherInfoRes.titles: array expected");
                message.titles = [];
                for (var i = 0; i < object.titles.length; ++i)
                    message.titles[i] = object.titles[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a UserOtherInfoRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserOtherInfoRes
         * @static
         * @param {Lobby.UserOtherInfoRes} message UserOtherInfoRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserOtherInfoRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.titles = [];
            if (options.defaults) {
                object.mobile = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.mobile_bind_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.mobile_bind_time = options.longs === String ? "0" : 0;
                object.id_card = "";
                object.modify_nick_name = 0;
                object.first_tixian = 0;
            }
            if (message.mobile != null && message.hasOwnProperty("mobile"))
                object.mobile = message.mobile;
            if (message.mobile_bind_time != null && message.hasOwnProperty("mobile_bind_time"))
                if (typeof message.mobile_bind_time === "number")
                    object.mobile_bind_time = options.longs === String ? String(message.mobile_bind_time) : message.mobile_bind_time;
                else
                    object.mobile_bind_time = options.longs === String ? $util.Long.prototype.toString.call(message.mobile_bind_time) : options.longs === Number ? new $util.LongBits(message.mobile_bind_time.low >>> 0, message.mobile_bind_time.high >>> 0).toNumber() : message.mobile_bind_time;
            if (message.id_card != null && message.hasOwnProperty("id_card"))
                object.id_card = message.id_card;
            if (message.modify_nick_name != null && message.hasOwnProperty("modify_nick_name"))
                object.modify_nick_name = message.modify_nick_name;
            if (message.first_tixian != null && message.hasOwnProperty("first_tixian"))
                object.first_tixian = message.first_tixian;
            if (message.titles && message.titles.length) {
                object.titles = [];
                for (var j = 0; j < message.titles.length; ++j)
                    object.titles[j] = message.titles[j];
            }
            return object;
        };

        /**
         * Converts this UserOtherInfoRes to JSON.
         * @function toJSON
         * @memberof Lobby.UserOtherInfoRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserOtherInfoRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserOtherInfoRes;
    })();

    Lobby.UserUsePropRes = (function() {

        /**
         * Properties of a UserUsePropRes.
         * @memberof Lobby
         * @interface IUserUsePropRes
         * @property {string|null} [head_skin_json] UserUsePropRes head_skin_json
         * @property {string|null} [clock_skin_json] UserUsePropRes clock_skin_json
         * @property {string|null} [bubble_skin_json] UserUsePropRes bubble_skin_json
         * @property {string|null} [prop_json] UserUsePropRes prop_json
         */

        /**
         * Constructs a new UserUsePropRes.
         * @memberof Lobby
         * @classdesc Represents a UserUsePropRes.
         * @implements IUserUsePropRes
         * @constructor
         * @param {Lobby.IUserUsePropRes=} [properties] Properties to set
         */
        function UserUsePropRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserUsePropRes head_skin_json.
         * @member {string} head_skin_json
         * @memberof Lobby.UserUsePropRes
         * @instance
         */
        UserUsePropRes.prototype.head_skin_json = "";

        /**
         * UserUsePropRes clock_skin_json.
         * @member {string} clock_skin_json
         * @memberof Lobby.UserUsePropRes
         * @instance
         */
        UserUsePropRes.prototype.clock_skin_json = "";

        /**
         * UserUsePropRes bubble_skin_json.
         * @member {string} bubble_skin_json
         * @memberof Lobby.UserUsePropRes
         * @instance
         */
        UserUsePropRes.prototype.bubble_skin_json = "";

        /**
         * UserUsePropRes prop_json.
         * @member {string} prop_json
         * @memberof Lobby.UserUsePropRes
         * @instance
         */
        UserUsePropRes.prototype.prop_json = "";

        /**
         * Creates a new UserUsePropRes instance using the specified properties.
         * @function create
         * @memberof Lobby.UserUsePropRes
         * @static
         * @param {Lobby.IUserUsePropRes=} [properties] Properties to set
         * @returns {Lobby.UserUsePropRes} UserUsePropRes instance
         */
        UserUsePropRes.create = function create(properties) {
            return new UserUsePropRes(properties);
        };

        /**
         * Encodes the specified UserUsePropRes message. Does not implicitly {@link Lobby.UserUsePropRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserUsePropRes
         * @static
         * @param {Lobby.IUserUsePropRes} message UserUsePropRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserUsePropRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.head_skin_json != null && message.hasOwnProperty("head_skin_json"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.head_skin_json);
            if (message.clock_skin_json != null && message.hasOwnProperty("clock_skin_json"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.clock_skin_json);
            if (message.bubble_skin_json != null && message.hasOwnProperty("bubble_skin_json"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.bubble_skin_json);
            if (message.prop_json != null && message.hasOwnProperty("prop_json"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.prop_json);
            return writer;
        };

        /**
         * Encodes the specified UserUsePropRes message, length delimited. Does not implicitly {@link Lobby.UserUsePropRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserUsePropRes
         * @static
         * @param {Lobby.IUserUsePropRes} message UserUsePropRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserUsePropRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserUsePropRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserUsePropRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserUsePropRes} UserUsePropRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserUsePropRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserUsePropRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.head_skin_json = reader.string();
                    break;
                case 2:
                    message.clock_skin_json = reader.string();
                    break;
                case 3:
                    message.bubble_skin_json = reader.string();
                    break;
                case 4:
                    message.prop_json = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserUsePropRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserUsePropRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserUsePropRes} UserUsePropRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserUsePropRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserUsePropRes message.
         * @function verify
         * @memberof Lobby.UserUsePropRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserUsePropRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.head_skin_json != null && message.hasOwnProperty("head_skin_json"))
                if (!$util.isString(message.head_skin_json))
                    return "head_skin_json: string expected";
            if (message.clock_skin_json != null && message.hasOwnProperty("clock_skin_json"))
                if (!$util.isString(message.clock_skin_json))
                    return "clock_skin_json: string expected";
            if (message.bubble_skin_json != null && message.hasOwnProperty("bubble_skin_json"))
                if (!$util.isString(message.bubble_skin_json))
                    return "bubble_skin_json: string expected";
            if (message.prop_json != null && message.hasOwnProperty("prop_json"))
                if (!$util.isString(message.prop_json))
                    return "prop_json: string expected";
            return null;
        };

        /**
         * Creates a UserUsePropRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserUsePropRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserUsePropRes} UserUsePropRes
         */
        UserUsePropRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserUsePropRes)
                return object;
            var message = new $root.Lobby.UserUsePropRes();
            if (object.head_skin_json != null)
                message.head_skin_json = String(object.head_skin_json);
            if (object.clock_skin_json != null)
                message.clock_skin_json = String(object.clock_skin_json);
            if (object.bubble_skin_json != null)
                message.bubble_skin_json = String(object.bubble_skin_json);
            if (object.prop_json != null)
                message.prop_json = String(object.prop_json);
            return message;
        };

        /**
         * Creates a plain object from a UserUsePropRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserUsePropRes
         * @static
         * @param {Lobby.UserUsePropRes} message UserUsePropRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserUsePropRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.head_skin_json = "";
                object.clock_skin_json = "";
                object.bubble_skin_json = "";
                object.prop_json = "";
            }
            if (message.head_skin_json != null && message.hasOwnProperty("head_skin_json"))
                object.head_skin_json = message.head_skin_json;
            if (message.clock_skin_json != null && message.hasOwnProperty("clock_skin_json"))
                object.clock_skin_json = message.clock_skin_json;
            if (message.bubble_skin_json != null && message.hasOwnProperty("bubble_skin_json"))
                object.bubble_skin_json = message.bubble_skin_json;
            if (message.prop_json != null && message.hasOwnProperty("prop_json"))
                object.prop_json = message.prop_json;
            return object;
        };

        /**
         * Converts this UserUsePropRes to JSON.
         * @function toJSON
         * @memberof Lobby.UserUsePropRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserUsePropRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserUsePropRes;
    })();

    Lobby.VerificationCodeReq = (function() {

        /**
         * Properties of a VerificationCodeReq.
         * @memberof Lobby
         * @interface IVerificationCodeReq
         * @property {number|null} [handle_type] VerificationCodeReq handle_type
         * @property {string|null} [phone] VerificationCodeReq phone
         */

        /**
         * Constructs a new VerificationCodeReq.
         * @memberof Lobby
         * @classdesc Represents a VerificationCodeReq.
         * @implements IVerificationCodeReq
         * @constructor
         * @param {Lobby.IVerificationCodeReq=} [properties] Properties to set
         */
        function VerificationCodeReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VerificationCodeReq handle_type.
         * @member {number} handle_type
         * @memberof Lobby.VerificationCodeReq
         * @instance
         */
        VerificationCodeReq.prototype.handle_type = 0;

        /**
         * VerificationCodeReq phone.
         * @member {string} phone
         * @memberof Lobby.VerificationCodeReq
         * @instance
         */
        VerificationCodeReq.prototype.phone = "";

        /**
         * Creates a new VerificationCodeReq instance using the specified properties.
         * @function create
         * @memberof Lobby.VerificationCodeReq
         * @static
         * @param {Lobby.IVerificationCodeReq=} [properties] Properties to set
         * @returns {Lobby.VerificationCodeReq} VerificationCodeReq instance
         */
        VerificationCodeReq.create = function create(properties) {
            return new VerificationCodeReq(properties);
        };

        /**
         * Encodes the specified VerificationCodeReq message. Does not implicitly {@link Lobby.VerificationCodeReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.VerificationCodeReq
         * @static
         * @param {Lobby.IVerificationCodeReq} message VerificationCodeReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VerificationCodeReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.phone != null && message.hasOwnProperty("phone"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.phone);
            return writer;
        };

        /**
         * Encodes the specified VerificationCodeReq message, length delimited. Does not implicitly {@link Lobby.VerificationCodeReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.VerificationCodeReq
         * @static
         * @param {Lobby.IVerificationCodeReq} message VerificationCodeReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VerificationCodeReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VerificationCodeReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.VerificationCodeReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.VerificationCodeReq} VerificationCodeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VerificationCodeReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.VerificationCodeReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.phone = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a VerificationCodeReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.VerificationCodeReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.VerificationCodeReq} VerificationCodeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VerificationCodeReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VerificationCodeReq message.
         * @function verify
         * @memberof Lobby.VerificationCodeReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VerificationCodeReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.phone != null && message.hasOwnProperty("phone"))
                if (!$util.isString(message.phone))
                    return "phone: string expected";
            return null;
        };

        /**
         * Creates a VerificationCodeReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.VerificationCodeReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.VerificationCodeReq} VerificationCodeReq
         */
        VerificationCodeReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.VerificationCodeReq)
                return object;
            var message = new $root.Lobby.VerificationCodeReq();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.phone != null)
                message.phone = String(object.phone);
            return message;
        };

        /**
         * Creates a plain object from a VerificationCodeReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.VerificationCodeReq
         * @static
         * @param {Lobby.VerificationCodeReq} message VerificationCodeReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VerificationCodeReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                object.phone = "";
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.phone != null && message.hasOwnProperty("phone"))
                object.phone = message.phone;
            return object;
        };

        /**
         * Converts this VerificationCodeReq to JSON.
         * @function toJSON
         * @memberof Lobby.VerificationCodeReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VerificationCodeReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return VerificationCodeReq;
    })();

    Lobby.VerificationCodeRes = (function() {

        /**
         * Properties of a VerificationCodeRes.
         * @memberof Lobby
         * @interface IVerificationCodeRes
         * @property {number|null} [handle_type] VerificationCodeRes handle_type
         * @property {number|null} [code] VerificationCodeRes code
         * @property {string|null} [message] VerificationCodeRes message
         */

        /**
         * Constructs a new VerificationCodeRes.
         * @memberof Lobby
         * @classdesc Represents a VerificationCodeRes.
         * @implements IVerificationCodeRes
         * @constructor
         * @param {Lobby.IVerificationCodeRes=} [properties] Properties to set
         */
        function VerificationCodeRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VerificationCodeRes handle_type.
         * @member {number} handle_type
         * @memberof Lobby.VerificationCodeRes
         * @instance
         */
        VerificationCodeRes.prototype.handle_type = 0;

        /**
         * VerificationCodeRes code.
         * @member {number} code
         * @memberof Lobby.VerificationCodeRes
         * @instance
         */
        VerificationCodeRes.prototype.code = 0;

        /**
         * VerificationCodeRes message.
         * @member {string} message
         * @memberof Lobby.VerificationCodeRes
         * @instance
         */
        VerificationCodeRes.prototype.message = "";

        /**
         * Creates a new VerificationCodeRes instance using the specified properties.
         * @function create
         * @memberof Lobby.VerificationCodeRes
         * @static
         * @param {Lobby.IVerificationCodeRes=} [properties] Properties to set
         * @returns {Lobby.VerificationCodeRes} VerificationCodeRes instance
         */
        VerificationCodeRes.create = function create(properties) {
            return new VerificationCodeRes(properties);
        };

        /**
         * Encodes the specified VerificationCodeRes message. Does not implicitly {@link Lobby.VerificationCodeRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.VerificationCodeRes
         * @static
         * @param {Lobby.IVerificationCodeRes} message VerificationCodeRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VerificationCodeRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified VerificationCodeRes message, length delimited. Does not implicitly {@link Lobby.VerificationCodeRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.VerificationCodeRes
         * @static
         * @param {Lobby.IVerificationCodeRes} message VerificationCodeRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VerificationCodeRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VerificationCodeRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.VerificationCodeRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.VerificationCodeRes} VerificationCodeRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VerificationCodeRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.VerificationCodeRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a VerificationCodeRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.VerificationCodeRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.VerificationCodeRes} VerificationCodeRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VerificationCodeRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VerificationCodeRes message.
         * @function verify
         * @memberof Lobby.VerificationCodeRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VerificationCodeRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates a VerificationCodeRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.VerificationCodeRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.VerificationCodeRes} VerificationCodeRes
         */
        VerificationCodeRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.VerificationCodeRes)
                return object;
            var message = new $root.Lobby.VerificationCodeRes();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.code != null)
                message.code = object.code | 0;
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a VerificationCodeRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.VerificationCodeRes
         * @static
         * @param {Lobby.VerificationCodeRes} message VerificationCodeRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VerificationCodeRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                object.code = 0;
                object.message = "";
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this VerificationCodeRes to JSON.
         * @function toJSON
         * @memberof Lobby.VerificationCodeRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VerificationCodeRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return VerificationCodeRes;
    })();

    Lobby.GameStaticConfigReq = (function() {

        /**
         * Properties of a GameStaticConfigReq.
         * @memberof Lobby
         * @interface IGameStaticConfigReq
         * @property {Array.<Lobby.IGameStaticConfigItem>|null} [config_list] GameStaticConfigReq config_list
         */

        /**
         * Constructs a new GameStaticConfigReq.
         * @memberof Lobby
         * @classdesc Represents a GameStaticConfigReq.
         * @implements IGameStaticConfigReq
         * @constructor
         * @param {Lobby.IGameStaticConfigReq=} [properties] Properties to set
         */
        function GameStaticConfigReq(properties) {
            this.config_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameStaticConfigReq config_list.
         * @member {Array.<Lobby.IGameStaticConfigItem>} config_list
         * @memberof Lobby.GameStaticConfigReq
         * @instance
         */
        GameStaticConfigReq.prototype.config_list = $util.emptyArray;

        /**
         * Creates a new GameStaticConfigReq instance using the specified properties.
         * @function create
         * @memberof Lobby.GameStaticConfigReq
         * @static
         * @param {Lobby.IGameStaticConfigReq=} [properties] Properties to set
         * @returns {Lobby.GameStaticConfigReq} GameStaticConfigReq instance
         */
        GameStaticConfigReq.create = function create(properties) {
            return new GameStaticConfigReq(properties);
        };

        /**
         * Encodes the specified GameStaticConfigReq message. Does not implicitly {@link Lobby.GameStaticConfigReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.GameStaticConfigReq
         * @static
         * @param {Lobby.IGameStaticConfigReq} message GameStaticConfigReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStaticConfigReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.config_list != null && message.config_list.length)
                for (var i = 0; i < message.config_list.length; ++i)
                    $root.Lobby.GameStaticConfigItem.encode(message.config_list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameStaticConfigReq message, length delimited. Does not implicitly {@link Lobby.GameStaticConfigReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.GameStaticConfigReq
         * @static
         * @param {Lobby.IGameStaticConfigReq} message GameStaticConfigReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStaticConfigReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStaticConfigReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.GameStaticConfigReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.GameStaticConfigReq} GameStaticConfigReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStaticConfigReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.GameStaticConfigReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.config_list && message.config_list.length))
                        message.config_list = [];
                    message.config_list.push($root.Lobby.GameStaticConfigItem.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameStaticConfigReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.GameStaticConfigReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.GameStaticConfigReq} GameStaticConfigReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStaticConfigReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStaticConfigReq message.
         * @function verify
         * @memberof Lobby.GameStaticConfigReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameStaticConfigReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.config_list != null && message.hasOwnProperty("config_list")) {
                if (!Array.isArray(message.config_list))
                    return "config_list: array expected";
                for (var i = 0; i < message.config_list.length; ++i) {
                    var error = $root.Lobby.GameStaticConfigItem.verify(message.config_list[i]);
                    if (error)
                        return "config_list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GameStaticConfigReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.GameStaticConfigReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.GameStaticConfigReq} GameStaticConfigReq
         */
        GameStaticConfigReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.GameStaticConfigReq)
                return object;
            var message = new $root.Lobby.GameStaticConfigReq();
            if (object.config_list) {
                if (!Array.isArray(object.config_list))
                    throw TypeError(".Lobby.GameStaticConfigReq.config_list: array expected");
                message.config_list = [];
                for (var i = 0; i < object.config_list.length; ++i) {
                    if (typeof object.config_list[i] !== "object")
                        throw TypeError(".Lobby.GameStaticConfigReq.config_list: object expected");
                    message.config_list[i] = $root.Lobby.GameStaticConfigItem.fromObject(object.config_list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GameStaticConfigReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.GameStaticConfigReq
         * @static
         * @param {Lobby.GameStaticConfigReq} message GameStaticConfigReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStaticConfigReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.config_list = [];
            if (message.config_list && message.config_list.length) {
                object.config_list = [];
                for (var j = 0; j < message.config_list.length; ++j)
                    object.config_list[j] = $root.Lobby.GameStaticConfigItem.toObject(message.config_list[j], options);
            }
            return object;
        };

        /**
         * Converts this GameStaticConfigReq to JSON.
         * @function toJSON
         * @memberof Lobby.GameStaticConfigReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStaticConfigReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameStaticConfigReq;
    })();

    Lobby.GameStaticConfigRes = (function() {

        /**
         * Properties of a GameStaticConfigRes.
         * @memberof Lobby
         * @interface IGameStaticConfigRes
         * @property {Array.<Lobby.IGameStaticConfigItem>|null} [config_list] GameStaticConfigRes config_list
         */

        /**
         * Constructs a new GameStaticConfigRes.
         * @memberof Lobby
         * @classdesc Represents a GameStaticConfigRes.
         * @implements IGameStaticConfigRes
         * @constructor
         * @param {Lobby.IGameStaticConfigRes=} [properties] Properties to set
         */
        function GameStaticConfigRes(properties) {
            this.config_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameStaticConfigRes config_list.
         * @member {Array.<Lobby.IGameStaticConfigItem>} config_list
         * @memberof Lobby.GameStaticConfigRes
         * @instance
         */
        GameStaticConfigRes.prototype.config_list = $util.emptyArray;

        /**
         * Creates a new GameStaticConfigRes instance using the specified properties.
         * @function create
         * @memberof Lobby.GameStaticConfigRes
         * @static
         * @param {Lobby.IGameStaticConfigRes=} [properties] Properties to set
         * @returns {Lobby.GameStaticConfigRes} GameStaticConfigRes instance
         */
        GameStaticConfigRes.create = function create(properties) {
            return new GameStaticConfigRes(properties);
        };

        /**
         * Encodes the specified GameStaticConfigRes message. Does not implicitly {@link Lobby.GameStaticConfigRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.GameStaticConfigRes
         * @static
         * @param {Lobby.IGameStaticConfigRes} message GameStaticConfigRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStaticConfigRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.config_list != null && message.config_list.length)
                for (var i = 0; i < message.config_list.length; ++i)
                    $root.Lobby.GameStaticConfigItem.encode(message.config_list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameStaticConfigRes message, length delimited. Does not implicitly {@link Lobby.GameStaticConfigRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.GameStaticConfigRes
         * @static
         * @param {Lobby.IGameStaticConfigRes} message GameStaticConfigRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStaticConfigRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStaticConfigRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.GameStaticConfigRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.GameStaticConfigRes} GameStaticConfigRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStaticConfigRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.GameStaticConfigRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.config_list && message.config_list.length))
                        message.config_list = [];
                    message.config_list.push($root.Lobby.GameStaticConfigItem.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameStaticConfigRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.GameStaticConfigRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.GameStaticConfigRes} GameStaticConfigRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStaticConfigRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStaticConfigRes message.
         * @function verify
         * @memberof Lobby.GameStaticConfigRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameStaticConfigRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.config_list != null && message.hasOwnProperty("config_list")) {
                if (!Array.isArray(message.config_list))
                    return "config_list: array expected";
                for (var i = 0; i < message.config_list.length; ++i) {
                    var error = $root.Lobby.GameStaticConfigItem.verify(message.config_list[i]);
                    if (error)
                        return "config_list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GameStaticConfigRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.GameStaticConfigRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.GameStaticConfigRes} GameStaticConfigRes
         */
        GameStaticConfigRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.GameStaticConfigRes)
                return object;
            var message = new $root.Lobby.GameStaticConfigRes();
            if (object.config_list) {
                if (!Array.isArray(object.config_list))
                    throw TypeError(".Lobby.GameStaticConfigRes.config_list: array expected");
                message.config_list = [];
                for (var i = 0; i < object.config_list.length; ++i) {
                    if (typeof object.config_list[i] !== "object")
                        throw TypeError(".Lobby.GameStaticConfigRes.config_list: object expected");
                    message.config_list[i] = $root.Lobby.GameStaticConfigItem.fromObject(object.config_list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GameStaticConfigRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.GameStaticConfigRes
         * @static
         * @param {Lobby.GameStaticConfigRes} message GameStaticConfigRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStaticConfigRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.config_list = [];
            if (message.config_list && message.config_list.length) {
                object.config_list = [];
                for (var j = 0; j < message.config_list.length; ++j)
                    object.config_list[j] = $root.Lobby.GameStaticConfigItem.toObject(message.config_list[j], options);
            }
            return object;
        };

        /**
         * Converts this GameStaticConfigRes to JSON.
         * @function toJSON
         * @memberof Lobby.GameStaticConfigRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStaticConfigRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameStaticConfigRes;
    })();

    Lobby.GameStaticConfigItem = (function() {

        /**
         * Properties of a GameStaticConfigItem.
         * @memberof Lobby
         * @interface IGameStaticConfigItem
         * @property {string|null} [config_type] GameStaticConfigItem config_type
         * @property {string|null} [config_md5] GameStaticConfigItem config_md5
         * @property {string|null} [config_str] GameStaticConfigItem config_str
         */

        /**
         * Constructs a new GameStaticConfigItem.
         * @memberof Lobby
         * @classdesc Represents a GameStaticConfigItem.
         * @implements IGameStaticConfigItem
         * @constructor
         * @param {Lobby.IGameStaticConfigItem=} [properties] Properties to set
         */
        function GameStaticConfigItem(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameStaticConfigItem config_type.
         * @member {string} config_type
         * @memberof Lobby.GameStaticConfigItem
         * @instance
         */
        GameStaticConfigItem.prototype.config_type = "";

        /**
         * GameStaticConfigItem config_md5.
         * @member {string} config_md5
         * @memberof Lobby.GameStaticConfigItem
         * @instance
         */
        GameStaticConfigItem.prototype.config_md5 = "";

        /**
         * GameStaticConfigItem config_str.
         * @member {string} config_str
         * @memberof Lobby.GameStaticConfigItem
         * @instance
         */
        GameStaticConfigItem.prototype.config_str = "";

        /**
         * Creates a new GameStaticConfigItem instance using the specified properties.
         * @function create
         * @memberof Lobby.GameStaticConfigItem
         * @static
         * @param {Lobby.IGameStaticConfigItem=} [properties] Properties to set
         * @returns {Lobby.GameStaticConfigItem} GameStaticConfigItem instance
         */
        GameStaticConfigItem.create = function create(properties) {
            return new GameStaticConfigItem(properties);
        };

        /**
         * Encodes the specified GameStaticConfigItem message. Does not implicitly {@link Lobby.GameStaticConfigItem.verify|verify} messages.
         * @function encode
         * @memberof Lobby.GameStaticConfigItem
         * @static
         * @param {Lobby.IGameStaticConfigItem} message GameStaticConfigItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStaticConfigItem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.config_type != null && message.hasOwnProperty("config_type"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.config_type);
            if (message.config_md5 != null && message.hasOwnProperty("config_md5"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.config_md5);
            if (message.config_str != null && message.hasOwnProperty("config_str"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.config_str);
            return writer;
        };

        /**
         * Encodes the specified GameStaticConfigItem message, length delimited. Does not implicitly {@link Lobby.GameStaticConfigItem.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.GameStaticConfigItem
         * @static
         * @param {Lobby.IGameStaticConfigItem} message GameStaticConfigItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameStaticConfigItem.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameStaticConfigItem message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.GameStaticConfigItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.GameStaticConfigItem} GameStaticConfigItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStaticConfigItem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.GameStaticConfigItem();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.config_type = reader.string();
                    break;
                case 2:
                    message.config_md5 = reader.string();
                    break;
                case 3:
                    message.config_str = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameStaticConfigItem message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.GameStaticConfigItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.GameStaticConfigItem} GameStaticConfigItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameStaticConfigItem.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameStaticConfigItem message.
         * @function verify
         * @memberof Lobby.GameStaticConfigItem
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameStaticConfigItem.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.config_type != null && message.hasOwnProperty("config_type"))
                if (!$util.isString(message.config_type))
                    return "config_type: string expected";
            if (message.config_md5 != null && message.hasOwnProperty("config_md5"))
                if (!$util.isString(message.config_md5))
                    return "config_md5: string expected";
            if (message.config_str != null && message.hasOwnProperty("config_str"))
                if (!$util.isString(message.config_str))
                    return "config_str: string expected";
            return null;
        };

        /**
         * Creates a GameStaticConfigItem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.GameStaticConfigItem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.GameStaticConfigItem} GameStaticConfigItem
         */
        GameStaticConfigItem.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.GameStaticConfigItem)
                return object;
            var message = new $root.Lobby.GameStaticConfigItem();
            if (object.config_type != null)
                message.config_type = String(object.config_type);
            if (object.config_md5 != null)
                message.config_md5 = String(object.config_md5);
            if (object.config_str != null)
                message.config_str = String(object.config_str);
            return message;
        };

        /**
         * Creates a plain object from a GameStaticConfigItem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.GameStaticConfigItem
         * @static
         * @param {Lobby.GameStaticConfigItem} message GameStaticConfigItem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameStaticConfigItem.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.config_type = "";
                object.config_md5 = "";
                object.config_str = "";
            }
            if (message.config_type != null && message.hasOwnProperty("config_type"))
                object.config_type = message.config_type;
            if (message.config_md5 != null && message.hasOwnProperty("config_md5"))
                object.config_md5 = message.config_md5;
            if (message.config_str != null && message.hasOwnProperty("config_str"))
                object.config_str = message.config_str;
            return object;
        };

        /**
         * Converts this GameStaticConfigItem to JSON.
         * @function toJSON
         * @memberof Lobby.GameStaticConfigItem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameStaticConfigItem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameStaticConfigItem;
    })();

    Lobby.UserDataReq = (function() {

        /**
         * Properties of a UserDataReq.
         * @memberof Lobby
         * @interface IUserDataReq
         * @property {Array.<number>|null} [config_type_list] UserDataReq config_type_list
         */

        /**
         * Constructs a new UserDataReq.
         * @memberof Lobby
         * @classdesc Represents a UserDataReq.
         * @implements IUserDataReq
         * @constructor
         * @param {Lobby.IUserDataReq=} [properties] Properties to set
         */
        function UserDataReq(properties) {
            this.config_type_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserDataReq config_type_list.
         * @member {Array.<number>} config_type_list
         * @memberof Lobby.UserDataReq
         * @instance
         */
        UserDataReq.prototype.config_type_list = $util.emptyArray;

        /**
         * Creates a new UserDataReq instance using the specified properties.
         * @function create
         * @memberof Lobby.UserDataReq
         * @static
         * @param {Lobby.IUserDataReq=} [properties] Properties to set
         * @returns {Lobby.UserDataReq} UserDataReq instance
         */
        UserDataReq.create = function create(properties) {
            return new UserDataReq(properties);
        };

        /**
         * Encodes the specified UserDataReq message. Does not implicitly {@link Lobby.UserDataReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserDataReq
         * @static
         * @param {Lobby.IUserDataReq} message UserDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserDataReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.config_type_list != null && message.config_type_list.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.config_type_list.length; ++i)
                    writer.int32(message.config_type_list[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified UserDataReq message, length delimited. Does not implicitly {@link Lobby.UserDataReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserDataReq
         * @static
         * @param {Lobby.IUserDataReq} message UserDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserDataReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserDataReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserDataReq} UserDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserDataReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserDataReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.config_type_list && message.config_type_list.length))
                        message.config_type_list = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.config_type_list.push(reader.int32());
                    } else
                        message.config_type_list.push(reader.int32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserDataReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserDataReq} UserDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserDataReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserDataReq message.
         * @function verify
         * @memberof Lobby.UserDataReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserDataReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.config_type_list != null && message.hasOwnProperty("config_type_list")) {
                if (!Array.isArray(message.config_type_list))
                    return "config_type_list: array expected";
                for (var i = 0; i < message.config_type_list.length; ++i)
                    if (!$util.isInteger(message.config_type_list[i]))
                        return "config_type_list: integer[] expected";
            }
            return null;
        };

        /**
         * Creates a UserDataReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserDataReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserDataReq} UserDataReq
         */
        UserDataReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserDataReq)
                return object;
            var message = new $root.Lobby.UserDataReq();
            if (object.config_type_list) {
                if (!Array.isArray(object.config_type_list))
                    throw TypeError(".Lobby.UserDataReq.config_type_list: array expected");
                message.config_type_list = [];
                for (var i = 0; i < object.config_type_list.length; ++i)
                    message.config_type_list[i] = object.config_type_list[i] | 0;
            }
            return message;
        };

        /**
         * Creates a plain object from a UserDataReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserDataReq
         * @static
         * @param {Lobby.UserDataReq} message UserDataReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserDataReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.config_type_list = [];
            if (message.config_type_list && message.config_type_list.length) {
                object.config_type_list = [];
                for (var j = 0; j < message.config_type_list.length; ++j)
                    object.config_type_list[j] = message.config_type_list[j];
            }
            return object;
        };

        /**
         * Converts this UserDataReq to JSON.
         * @function toJSON
         * @memberof Lobby.UserDataReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserDataReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserDataReq;
    })();

    Lobby.UserDataRes = (function() {

        /**
         * Properties of a UserDataRes.
         * @memberof Lobby
         * @interface IUserDataRes
         * @property {Array.<Lobby.IUserDataItem>|null} [config_list] UserDataRes config_list
         */

        /**
         * Constructs a new UserDataRes.
         * @memberof Lobby
         * @classdesc Represents a UserDataRes.
         * @implements IUserDataRes
         * @constructor
         * @param {Lobby.IUserDataRes=} [properties] Properties to set
         */
        function UserDataRes(properties) {
            this.config_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserDataRes config_list.
         * @member {Array.<Lobby.IUserDataItem>} config_list
         * @memberof Lobby.UserDataRes
         * @instance
         */
        UserDataRes.prototype.config_list = $util.emptyArray;

        /**
         * Creates a new UserDataRes instance using the specified properties.
         * @function create
         * @memberof Lobby.UserDataRes
         * @static
         * @param {Lobby.IUserDataRes=} [properties] Properties to set
         * @returns {Lobby.UserDataRes} UserDataRes instance
         */
        UserDataRes.create = function create(properties) {
            return new UserDataRes(properties);
        };

        /**
         * Encodes the specified UserDataRes message. Does not implicitly {@link Lobby.UserDataRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserDataRes
         * @static
         * @param {Lobby.IUserDataRes} message UserDataRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserDataRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.config_list != null && message.config_list.length)
                for (var i = 0; i < message.config_list.length; ++i)
                    $root.Lobby.UserDataItem.encode(message.config_list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserDataRes message, length delimited. Does not implicitly {@link Lobby.UserDataRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserDataRes
         * @static
         * @param {Lobby.IUserDataRes} message UserDataRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserDataRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserDataRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserDataRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserDataRes} UserDataRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserDataRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserDataRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.config_list && message.config_list.length))
                        message.config_list = [];
                    message.config_list.push($root.Lobby.UserDataItem.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserDataRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserDataRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserDataRes} UserDataRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserDataRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserDataRes message.
         * @function verify
         * @memberof Lobby.UserDataRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserDataRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.config_list != null && message.hasOwnProperty("config_list")) {
                if (!Array.isArray(message.config_list))
                    return "config_list: array expected";
                for (var i = 0; i < message.config_list.length; ++i) {
                    var error = $root.Lobby.UserDataItem.verify(message.config_list[i]);
                    if (error)
                        return "config_list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a UserDataRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserDataRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserDataRes} UserDataRes
         */
        UserDataRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserDataRes)
                return object;
            var message = new $root.Lobby.UserDataRes();
            if (object.config_list) {
                if (!Array.isArray(object.config_list))
                    throw TypeError(".Lobby.UserDataRes.config_list: array expected");
                message.config_list = [];
                for (var i = 0; i < object.config_list.length; ++i) {
                    if (typeof object.config_list[i] !== "object")
                        throw TypeError(".Lobby.UserDataRes.config_list: object expected");
                    message.config_list[i] = $root.Lobby.UserDataItem.fromObject(object.config_list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a UserDataRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserDataRes
         * @static
         * @param {Lobby.UserDataRes} message UserDataRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserDataRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.config_list = [];
            if (message.config_list && message.config_list.length) {
                object.config_list = [];
                for (var j = 0; j < message.config_list.length; ++j)
                    object.config_list[j] = $root.Lobby.UserDataItem.toObject(message.config_list[j], options);
            }
            return object;
        };

        /**
         * Converts this UserDataRes to JSON.
         * @function toJSON
         * @memberof Lobby.UserDataRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserDataRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserDataRes;
    })();

    Lobby.UserDataItem = (function() {

        /**
         * Properties of a UserDataItem.
         * @memberof Lobby
         * @interface IUserDataItem
         * @property {number|null} [config_type] UserDataItem config_type
         * @property {string|null} [config_json] UserDataItem config_json
         */

        /**
         * Constructs a new UserDataItem.
         * @memberof Lobby
         * @classdesc Represents a UserDataItem.
         * @implements IUserDataItem
         * @constructor
         * @param {Lobby.IUserDataItem=} [properties] Properties to set
         */
        function UserDataItem(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserDataItem config_type.
         * @member {number} config_type
         * @memberof Lobby.UserDataItem
         * @instance
         */
        UserDataItem.prototype.config_type = 0;

        /**
         * UserDataItem config_json.
         * @member {string} config_json
         * @memberof Lobby.UserDataItem
         * @instance
         */
        UserDataItem.prototype.config_json = "";

        /**
         * Creates a new UserDataItem instance using the specified properties.
         * @function create
         * @memberof Lobby.UserDataItem
         * @static
         * @param {Lobby.IUserDataItem=} [properties] Properties to set
         * @returns {Lobby.UserDataItem} UserDataItem instance
         */
        UserDataItem.create = function create(properties) {
            return new UserDataItem(properties);
        };

        /**
         * Encodes the specified UserDataItem message. Does not implicitly {@link Lobby.UserDataItem.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserDataItem
         * @static
         * @param {Lobby.IUserDataItem} message UserDataItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserDataItem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.config_type != null && message.hasOwnProperty("config_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.config_type);
            if (message.config_json != null && message.hasOwnProperty("config_json"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.config_json);
            return writer;
        };

        /**
         * Encodes the specified UserDataItem message, length delimited. Does not implicitly {@link Lobby.UserDataItem.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserDataItem
         * @static
         * @param {Lobby.IUserDataItem} message UserDataItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserDataItem.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserDataItem message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserDataItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserDataItem} UserDataItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserDataItem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserDataItem();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.config_type = reader.int32();
                    break;
                case 2:
                    message.config_json = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserDataItem message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserDataItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserDataItem} UserDataItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserDataItem.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserDataItem message.
         * @function verify
         * @memberof Lobby.UserDataItem
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserDataItem.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.config_type != null && message.hasOwnProperty("config_type"))
                if (!$util.isInteger(message.config_type))
                    return "config_type: integer expected";
            if (message.config_json != null && message.hasOwnProperty("config_json"))
                if (!$util.isString(message.config_json))
                    return "config_json: string expected";
            return null;
        };

        /**
         * Creates a UserDataItem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserDataItem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserDataItem} UserDataItem
         */
        UserDataItem.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserDataItem)
                return object;
            var message = new $root.Lobby.UserDataItem();
            if (object.config_type != null)
                message.config_type = object.config_type | 0;
            if (object.config_json != null)
                message.config_json = String(object.config_json);
            return message;
        };

        /**
         * Creates a plain object from a UserDataItem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserDataItem
         * @static
         * @param {Lobby.UserDataItem} message UserDataItem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserDataItem.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.config_type = 0;
                object.config_json = "";
            }
            if (message.config_type != null && message.hasOwnProperty("config_type"))
                object.config_type = message.config_type;
            if (message.config_json != null && message.hasOwnProperty("config_json"))
                object.config_json = message.config_json;
            return object;
        };

        /**
         * Converts this UserDataItem to JSON.
         * @function toJSON
         * @memberof Lobby.UserDataItem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserDataItem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserDataItem;
    })();

    Lobby.PackageReq = (function() {

        /**
         * Properties of a PackageReq.
         * @memberof Lobby
         * @interface IPackageReq
         * @property {number|null} [handle_type] PackageReq handle_type
         * @property {number|Long|null} [handle_value] PackageReq handle_value
         */

        /**
         * Constructs a new PackageReq.
         * @memberof Lobby
         * @classdesc Represents a PackageReq.
         * @implements IPackageReq
         * @constructor
         * @param {Lobby.IPackageReq=} [properties] Properties to set
         */
        function PackageReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PackageReq handle_type.
         * @member {number} handle_type
         * @memberof Lobby.PackageReq
         * @instance
         */
        PackageReq.prototype.handle_type = 0;

        /**
         * PackageReq handle_value.
         * @member {number|Long} handle_value
         * @memberof Lobby.PackageReq
         * @instance
         */
        PackageReq.prototype.handle_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new PackageReq instance using the specified properties.
         * @function create
         * @memberof Lobby.PackageReq
         * @static
         * @param {Lobby.IPackageReq=} [properties] Properties to set
         * @returns {Lobby.PackageReq} PackageReq instance
         */
        PackageReq.create = function create(properties) {
            return new PackageReq(properties);
        };

        /**
         * Encodes the specified PackageReq message. Does not implicitly {@link Lobby.PackageReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.PackageReq
         * @static
         * @param {Lobby.IPackageReq} message PackageReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.handle_value);
            return writer;
        };

        /**
         * Encodes the specified PackageReq message, length delimited. Does not implicitly {@link Lobby.PackageReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.PackageReq
         * @static
         * @param {Lobby.IPackageReq} message PackageReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.PackageReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.PackageReq} PackageReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.PackageReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.PackageReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.PackageReq} PackageReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageReq message.
         * @function verify
         * @memberof Lobby.PackageReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isInteger(message.handle_value) && !(message.handle_value && $util.isInteger(message.handle_value.low) && $util.isInteger(message.handle_value.high)))
                    return "handle_value: integer|Long expected";
            return null;
        };

        /**
         * Creates a PackageReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.PackageReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.PackageReq} PackageReq
         */
        PackageReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.PackageReq)
                return object;
            var message = new $root.Lobby.PackageReq();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                if ($util.Long)
                    (message.handle_value = $util.Long.fromValue(object.handle_value)).unsigned = false;
                else if (typeof object.handle_value === "string")
                    message.handle_value = parseInt(object.handle_value, 10);
                else if (typeof object.handle_value === "number")
                    message.handle_value = object.handle_value;
                else if (typeof object.handle_value === "object")
                    message.handle_value = new $util.LongBits(object.handle_value.low >>> 0, object.handle_value.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a PackageReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.PackageReq
         * @static
         * @param {Lobby.PackageReq} message PackageReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.handle_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.handle_value = options.longs === String ? "0" : 0;
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (typeof message.handle_value === "number")
                    object.handle_value = options.longs === String ? String(message.handle_value) : message.handle_value;
                else
                    object.handle_value = options.longs === String ? $util.Long.prototype.toString.call(message.handle_value) : options.longs === Number ? new $util.LongBits(message.handle_value.low >>> 0, message.handle_value.high >>> 0).toNumber() : message.handle_value;
            return object;
        };

        /**
         * Converts this PackageReq to JSON.
         * @function toJSON
         * @memberof Lobby.PackageReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageReq;
    })();

    Lobby.PackageRes = (function() {

        /**
         * Properties of a PackageRes.
         * @memberof Lobby
         * @interface IPackageRes
         * @property {number|null} [handle_type] PackageRes handle_type
         * @property {Lobby.IPackageItemRes|null} [package_item] PackageRes package_item
         * @property {Array.<Lobby.IPackageItemRes>|null} [package_list] PackageRes package_list
         */

        /**
         * Constructs a new PackageRes.
         * @memberof Lobby
         * @classdesc Represents a PackageRes.
         * @implements IPackageRes
         * @constructor
         * @param {Lobby.IPackageRes=} [properties] Properties to set
         */
        function PackageRes(properties) {
            this.package_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PackageRes handle_type.
         * @member {number} handle_type
         * @memberof Lobby.PackageRes
         * @instance
         */
        PackageRes.prototype.handle_type = 0;

        /**
         * PackageRes package_item.
         * @member {Lobby.IPackageItemRes|null|undefined} package_item
         * @memberof Lobby.PackageRes
         * @instance
         */
        PackageRes.prototype.package_item = null;

        /**
         * PackageRes package_list.
         * @member {Array.<Lobby.IPackageItemRes>} package_list
         * @memberof Lobby.PackageRes
         * @instance
         */
        PackageRes.prototype.package_list = $util.emptyArray;

        /**
         * Creates a new PackageRes instance using the specified properties.
         * @function create
         * @memberof Lobby.PackageRes
         * @static
         * @param {Lobby.IPackageRes=} [properties] Properties to set
         * @returns {Lobby.PackageRes} PackageRes instance
         */
        PackageRes.create = function create(properties) {
            return new PackageRes(properties);
        };

        /**
         * Encodes the specified PackageRes message. Does not implicitly {@link Lobby.PackageRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.PackageRes
         * @static
         * @param {Lobby.IPackageRes} message PackageRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.package_item != null && message.hasOwnProperty("package_item"))
                $root.Lobby.PackageItemRes.encode(message.package_item, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.package_list != null && message.package_list.length)
                for (var i = 0; i < message.package_list.length; ++i)
                    $root.Lobby.PackageItemRes.encode(message.package_list[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified PackageRes message, length delimited. Does not implicitly {@link Lobby.PackageRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.PackageRes
         * @static
         * @param {Lobby.IPackageRes} message PackageRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.PackageRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.PackageRes} PackageRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.PackageRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.package_item = $root.Lobby.PackageItemRes.decode(reader, reader.uint32());
                    break;
                case 3:
                    if (!(message.package_list && message.package_list.length))
                        message.package_list = [];
                    message.package_list.push($root.Lobby.PackageItemRes.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.PackageRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.PackageRes} PackageRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageRes message.
         * @function verify
         * @memberof Lobby.PackageRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.package_item != null && message.hasOwnProperty("package_item")) {
                var error = $root.Lobby.PackageItemRes.verify(message.package_item);
                if (error)
                    return "package_item." + error;
            }
            if (message.package_list != null && message.hasOwnProperty("package_list")) {
                if (!Array.isArray(message.package_list))
                    return "package_list: array expected";
                for (var i = 0; i < message.package_list.length; ++i) {
                    var error = $root.Lobby.PackageItemRes.verify(message.package_list[i]);
                    if (error)
                        return "package_list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a PackageRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.PackageRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.PackageRes} PackageRes
         */
        PackageRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.PackageRes)
                return object;
            var message = new $root.Lobby.PackageRes();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.package_item != null) {
                if (typeof object.package_item !== "object")
                    throw TypeError(".Lobby.PackageRes.package_item: object expected");
                message.package_item = $root.Lobby.PackageItemRes.fromObject(object.package_item);
            }
            if (object.package_list) {
                if (!Array.isArray(object.package_list))
                    throw TypeError(".Lobby.PackageRes.package_list: array expected");
                message.package_list = [];
                for (var i = 0; i < object.package_list.length; ++i) {
                    if (typeof object.package_list[i] !== "object")
                        throw TypeError(".Lobby.PackageRes.package_list: object expected");
                    message.package_list[i] = $root.Lobby.PackageItemRes.fromObject(object.package_list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a PackageRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.PackageRes
         * @static
         * @param {Lobby.PackageRes} message PackageRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.package_list = [];
            if (options.defaults) {
                object.handle_type = 0;
                object.package_item = null;
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.package_item != null && message.hasOwnProperty("package_item"))
                object.package_item = $root.Lobby.PackageItemRes.toObject(message.package_item, options);
            if (message.package_list && message.package_list.length) {
                object.package_list = [];
                for (var j = 0; j < message.package_list.length; ++j)
                    object.package_list[j] = $root.Lobby.PackageItemRes.toObject(message.package_list[j], options);
            }
            return object;
        };

        /**
         * Converts this PackageRes to JSON.
         * @function toJSON
         * @memberof Lobby.PackageRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageRes;
    })();

    Lobby.PackageItemRes = (function() {

        /**
         * Properties of a PackageItemRes.
         * @memberof Lobby
         * @interface IPackageItemRes
         * @property {number|Long|null} [up_id] PackageItemRes up_id
         * @property {number|null} [item_id] PackageItemRes item_id
         * @property {number|null} [item_num] PackageItemRes item_num
         */

        /**
         * Constructs a new PackageItemRes.
         * @memberof Lobby
         * @classdesc Represents a PackageItemRes.
         * @implements IPackageItemRes
         * @constructor
         * @param {Lobby.IPackageItemRes=} [properties] Properties to set
         */
        function PackageItemRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PackageItemRes up_id.
         * @member {number|Long} up_id
         * @memberof Lobby.PackageItemRes
         * @instance
         */
        PackageItemRes.prototype.up_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * PackageItemRes item_id.
         * @member {number} item_id
         * @memberof Lobby.PackageItemRes
         * @instance
         */
        PackageItemRes.prototype.item_id = 0;

        /**
         * PackageItemRes item_num.
         * @member {number} item_num
         * @memberof Lobby.PackageItemRes
         * @instance
         */
        PackageItemRes.prototype.item_num = 0;

        /**
         * Creates a new PackageItemRes instance using the specified properties.
         * @function create
         * @memberof Lobby.PackageItemRes
         * @static
         * @param {Lobby.IPackageItemRes=} [properties] Properties to set
         * @returns {Lobby.PackageItemRes} PackageItemRes instance
         */
        PackageItemRes.create = function create(properties) {
            return new PackageItemRes(properties);
        };

        /**
         * Encodes the specified PackageItemRes message. Does not implicitly {@link Lobby.PackageItemRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.PackageItemRes
         * @static
         * @param {Lobby.IPackageItemRes} message PackageItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageItemRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.up_id != null && message.hasOwnProperty("up_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.up_id);
            if (message.item_id != null && message.hasOwnProperty("item_id"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.item_id);
            if (message.item_num != null && message.hasOwnProperty("item_num"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.item_num);
            return writer;
        };

        /**
         * Encodes the specified PackageItemRes message, length delimited. Does not implicitly {@link Lobby.PackageItemRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.PackageItemRes
         * @static
         * @param {Lobby.IPackageItemRes} message PackageItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PackageItemRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PackageItemRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.PackageItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.PackageItemRes} PackageItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageItemRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.PackageItemRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.up_id = reader.int64();
                    break;
                case 2:
                    message.item_id = reader.int32();
                    break;
                case 3:
                    message.item_num = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PackageItemRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.PackageItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.PackageItemRes} PackageItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PackageItemRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PackageItemRes message.
         * @function verify
         * @memberof Lobby.PackageItemRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PackageItemRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.up_id != null && message.hasOwnProperty("up_id"))
                if (!$util.isInteger(message.up_id) && !(message.up_id && $util.isInteger(message.up_id.low) && $util.isInteger(message.up_id.high)))
                    return "up_id: integer|Long expected";
            if (message.item_id != null && message.hasOwnProperty("item_id"))
                if (!$util.isInteger(message.item_id))
                    return "item_id: integer expected";
            if (message.item_num != null && message.hasOwnProperty("item_num"))
                if (!$util.isInteger(message.item_num))
                    return "item_num: integer expected";
            return null;
        };

        /**
         * Creates a PackageItemRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.PackageItemRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.PackageItemRes} PackageItemRes
         */
        PackageItemRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.PackageItemRes)
                return object;
            var message = new $root.Lobby.PackageItemRes();
            if (object.up_id != null)
                if ($util.Long)
                    (message.up_id = $util.Long.fromValue(object.up_id)).unsigned = false;
                else if (typeof object.up_id === "string")
                    message.up_id = parseInt(object.up_id, 10);
                else if (typeof object.up_id === "number")
                    message.up_id = object.up_id;
                else if (typeof object.up_id === "object")
                    message.up_id = new $util.LongBits(object.up_id.low >>> 0, object.up_id.high >>> 0).toNumber();
            if (object.item_id != null)
                message.item_id = object.item_id | 0;
            if (object.item_num != null)
                message.item_num = object.item_num | 0;
            return message;
        };

        /**
         * Creates a plain object from a PackageItemRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.PackageItemRes
         * @static
         * @param {Lobby.PackageItemRes} message PackageItemRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PackageItemRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.up_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.up_id = options.longs === String ? "0" : 0;
                object.item_id = 0;
                object.item_num = 0;
            }
            if (message.up_id != null && message.hasOwnProperty("up_id"))
                if (typeof message.up_id === "number")
                    object.up_id = options.longs === String ? String(message.up_id) : message.up_id;
                else
                    object.up_id = options.longs === String ? $util.Long.prototype.toString.call(message.up_id) : options.longs === Number ? new $util.LongBits(message.up_id.low >>> 0, message.up_id.high >>> 0).toNumber() : message.up_id;
            if (message.item_id != null && message.hasOwnProperty("item_id"))
                object.item_id = message.item_id;
            if (message.item_num != null && message.hasOwnProperty("item_num"))
                object.item_num = message.item_num;
            return object;
        };

        /**
         * Converts this PackageItemRes to JSON.
         * @function toJSON
         * @memberof Lobby.PackageItemRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PackageItemRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PackageItemRes;
    })();

    Lobby.PayReq = (function() {

        /**
         * Properties of a PayReq.
         * @memberof Lobby
         * @interface IPayReq
         * @property {number|null} [item_id] PayReq item_id
         * @property {number|null} [item_type] PayReq item_type
         * @property {string|null} [item_name] PayReq item_name
         * @property {number|null} [pay_type] PayReq pay_type
         * @property {number|null} [config_id] PayReq config_id
         * @property {number|null} [pay_num] PayReq pay_num
         * @property {string|null} [other] PayReq other
         */

        /**
         * Constructs a new PayReq.
         * @memberof Lobby
         * @classdesc Represents a PayReq.
         * @implements IPayReq
         * @constructor
         * @param {Lobby.IPayReq=} [properties] Properties to set
         */
        function PayReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PayReq item_id.
         * @member {number} item_id
         * @memberof Lobby.PayReq
         * @instance
         */
        PayReq.prototype.item_id = 0;

        /**
         * PayReq item_type.
         * @member {number} item_type
         * @memberof Lobby.PayReq
         * @instance
         */
        PayReq.prototype.item_type = 0;

        /**
         * PayReq item_name.
         * @member {string} item_name
         * @memberof Lobby.PayReq
         * @instance
         */
        PayReq.prototype.item_name = "";

        /**
         * PayReq pay_type.
         * @member {number} pay_type
         * @memberof Lobby.PayReq
         * @instance
         */
        PayReq.prototype.pay_type = 0;

        /**
         * PayReq config_id.
         * @member {number} config_id
         * @memberof Lobby.PayReq
         * @instance
         */
        PayReq.prototype.config_id = 0;

        /**
         * PayReq pay_num.
         * @member {number} pay_num
         * @memberof Lobby.PayReq
         * @instance
         */
        PayReq.prototype.pay_num = 0;

        /**
         * PayReq other.
         * @member {string} other
         * @memberof Lobby.PayReq
         * @instance
         */
        PayReq.prototype.other = "";

        /**
         * Creates a new PayReq instance using the specified properties.
         * @function create
         * @memberof Lobby.PayReq
         * @static
         * @param {Lobby.IPayReq=} [properties] Properties to set
         * @returns {Lobby.PayReq} PayReq instance
         */
        PayReq.create = function create(properties) {
            return new PayReq(properties);
        };

        /**
         * Encodes the specified PayReq message. Does not implicitly {@link Lobby.PayReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.PayReq
         * @static
         * @param {Lobby.IPayReq} message PayReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PayReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.item_id != null && message.hasOwnProperty("item_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.item_id);
            if (message.item_type != null && message.hasOwnProperty("item_type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.item_type);
            if (message.item_name != null && message.hasOwnProperty("item_name"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.item_name);
            if (message.pay_type != null && message.hasOwnProperty("pay_type"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.pay_type);
            if (message.config_id != null && message.hasOwnProperty("config_id"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.config_id);
            if (message.pay_num != null && message.hasOwnProperty("pay_num"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.pay_num);
            if (message.other != null && message.hasOwnProperty("other"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.other);
            return writer;
        };

        /**
         * Encodes the specified PayReq message, length delimited. Does not implicitly {@link Lobby.PayReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.PayReq
         * @static
         * @param {Lobby.IPayReq} message PayReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PayReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PayReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.PayReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.PayReq} PayReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PayReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.PayReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.item_id = reader.int32();
                    break;
                case 2:
                    message.item_type = reader.int32();
                    break;
                case 3:
                    message.item_name = reader.string();
                    break;
                case 4:
                    message.pay_type = reader.int32();
                    break;
                case 5:
                    message.config_id = reader.int32();
                    break;
                case 6:
                    message.pay_num = reader.int32();
                    break;
                case 7:
                    message.other = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PayReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.PayReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.PayReq} PayReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PayReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PayReq message.
         * @function verify
         * @memberof Lobby.PayReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PayReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.item_id != null && message.hasOwnProperty("item_id"))
                if (!$util.isInteger(message.item_id))
                    return "item_id: integer expected";
            if (message.item_type != null && message.hasOwnProperty("item_type"))
                if (!$util.isInteger(message.item_type))
                    return "item_type: integer expected";
            if (message.item_name != null && message.hasOwnProperty("item_name"))
                if (!$util.isString(message.item_name))
                    return "item_name: string expected";
            if (message.pay_type != null && message.hasOwnProperty("pay_type"))
                if (!$util.isInteger(message.pay_type))
                    return "pay_type: integer expected";
            if (message.config_id != null && message.hasOwnProperty("config_id"))
                if (!$util.isInteger(message.config_id))
                    return "config_id: integer expected";
            if (message.pay_num != null && message.hasOwnProperty("pay_num"))
                if (!$util.isInteger(message.pay_num))
                    return "pay_num: integer expected";
            if (message.other != null && message.hasOwnProperty("other"))
                if (!$util.isString(message.other))
                    return "other: string expected";
            return null;
        };

        /**
         * Creates a PayReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.PayReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.PayReq} PayReq
         */
        PayReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.PayReq)
                return object;
            var message = new $root.Lobby.PayReq();
            if (object.item_id != null)
                message.item_id = object.item_id | 0;
            if (object.item_type != null)
                message.item_type = object.item_type | 0;
            if (object.item_name != null)
                message.item_name = String(object.item_name);
            if (object.pay_type != null)
                message.pay_type = object.pay_type | 0;
            if (object.config_id != null)
                message.config_id = object.config_id | 0;
            if (object.pay_num != null)
                message.pay_num = object.pay_num | 0;
            if (object.other != null)
                message.other = String(object.other);
            return message;
        };

        /**
         * Creates a plain object from a PayReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.PayReq
         * @static
         * @param {Lobby.PayReq} message PayReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PayReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.item_id = 0;
                object.item_type = 0;
                object.item_name = "";
                object.pay_type = 0;
                object.config_id = 0;
                object.pay_num = 0;
                object.other = "";
            }
            if (message.item_id != null && message.hasOwnProperty("item_id"))
                object.item_id = message.item_id;
            if (message.item_type != null && message.hasOwnProperty("item_type"))
                object.item_type = message.item_type;
            if (message.item_name != null && message.hasOwnProperty("item_name"))
                object.item_name = message.item_name;
            if (message.pay_type != null && message.hasOwnProperty("pay_type"))
                object.pay_type = message.pay_type;
            if (message.config_id != null && message.hasOwnProperty("config_id"))
                object.config_id = message.config_id;
            if (message.pay_num != null && message.hasOwnProperty("pay_num"))
                object.pay_num = message.pay_num;
            if (message.other != null && message.hasOwnProperty("other"))
                object.other = message.other;
            return object;
        };

        /**
         * Converts this PayReq to JSON.
         * @function toJSON
         * @memberof Lobby.PayReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PayReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PayReq;
    })();

    Lobby.PayRes = (function() {

        /**
         * Properties of a PayRes.
         * @memberof Lobby
         * @interface IPayRes
         * @property {number|null} [code] PayRes code
         * @property {string|null} [message] PayRes message
         * @property {number|null} [item_id] PayRes item_id
         * @property {number|null} [pay_type] PayRes pay_type
         * @property {string|null} [game_order_num] PayRes game_order_num
         * @property {string|null} [center_order_num] PayRes center_order_num
         * @property {string|null} [other_param] PayRes other_param
         * @property {number|null} [item_type] PayRes item_type
         * @property {number|null} [price_fen] PayRes price_fen
         */

        /**
         * Constructs a new PayRes.
         * @memberof Lobby
         * @classdesc Represents a PayRes.
         * @implements IPayRes
         * @constructor
         * @param {Lobby.IPayRes=} [properties] Properties to set
         */
        function PayRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PayRes code.
         * @member {number} code
         * @memberof Lobby.PayRes
         * @instance
         */
        PayRes.prototype.code = 0;

        /**
         * PayRes message.
         * @member {string} message
         * @memberof Lobby.PayRes
         * @instance
         */
        PayRes.prototype.message = "";

        /**
         * PayRes item_id.
         * @member {number} item_id
         * @memberof Lobby.PayRes
         * @instance
         */
        PayRes.prototype.item_id = 0;

        /**
         * PayRes pay_type.
         * @member {number} pay_type
         * @memberof Lobby.PayRes
         * @instance
         */
        PayRes.prototype.pay_type = 0;

        /**
         * PayRes game_order_num.
         * @member {string} game_order_num
         * @memberof Lobby.PayRes
         * @instance
         */
        PayRes.prototype.game_order_num = "";

        /**
         * PayRes center_order_num.
         * @member {string} center_order_num
         * @memberof Lobby.PayRes
         * @instance
         */
        PayRes.prototype.center_order_num = "";

        /**
         * PayRes other_param.
         * @member {string} other_param
         * @memberof Lobby.PayRes
         * @instance
         */
        PayRes.prototype.other_param = "";

        /**
         * PayRes item_type.
         * @member {number} item_type
         * @memberof Lobby.PayRes
         * @instance
         */
        PayRes.prototype.item_type = 0;

        /**
         * PayRes price_fen.
         * @member {number} price_fen
         * @memberof Lobby.PayRes
         * @instance
         */
        PayRes.prototype.price_fen = 0;

        /**
         * Creates a new PayRes instance using the specified properties.
         * @function create
         * @memberof Lobby.PayRes
         * @static
         * @param {Lobby.IPayRes=} [properties] Properties to set
         * @returns {Lobby.PayRes} PayRes instance
         */
        PayRes.create = function create(properties) {
            return new PayRes(properties);
        };

        /**
         * Encodes the specified PayRes message. Does not implicitly {@link Lobby.PayRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.PayRes
         * @static
         * @param {Lobby.IPayRes} message PayRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PayRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.message);
            if (message.item_id != null && message.hasOwnProperty("item_id"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.item_id);
            if (message.pay_type != null && message.hasOwnProperty("pay_type"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.pay_type);
            if (message.game_order_num != null && message.hasOwnProperty("game_order_num"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.game_order_num);
            if (message.center_order_num != null && message.hasOwnProperty("center_order_num"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.center_order_num);
            if (message.other_param != null && message.hasOwnProperty("other_param"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.other_param);
            if (message.item_type != null && message.hasOwnProperty("item_type"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.item_type);
            if (message.price_fen != null && message.hasOwnProperty("price_fen"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.price_fen);
            return writer;
        };

        /**
         * Encodes the specified PayRes message, length delimited. Does not implicitly {@link Lobby.PayRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.PayRes
         * @static
         * @param {Lobby.IPayRes} message PayRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PayRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PayRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.PayRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.PayRes} PayRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PayRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.PayRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.int32();
                    break;
                case 2:
                    message.message = reader.string();
                    break;
                case 3:
                    message.item_id = reader.int32();
                    break;
                case 4:
                    message.pay_type = reader.int32();
                    break;
                case 5:
                    message.game_order_num = reader.string();
                    break;
                case 6:
                    message.center_order_num = reader.string();
                    break;
                case 7:
                    message.other_param = reader.string();
                    break;
                case 8:
                    message.item_type = reader.int32();
                    break;
                case 9:
                    message.price_fen = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PayRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.PayRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.PayRes} PayRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PayRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PayRes message.
         * @function verify
         * @memberof Lobby.PayRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PayRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.item_id != null && message.hasOwnProperty("item_id"))
                if (!$util.isInteger(message.item_id))
                    return "item_id: integer expected";
            if (message.pay_type != null && message.hasOwnProperty("pay_type"))
                if (!$util.isInteger(message.pay_type))
                    return "pay_type: integer expected";
            if (message.game_order_num != null && message.hasOwnProperty("game_order_num"))
                if (!$util.isString(message.game_order_num))
                    return "game_order_num: string expected";
            if (message.center_order_num != null && message.hasOwnProperty("center_order_num"))
                if (!$util.isString(message.center_order_num))
                    return "center_order_num: string expected";
            if (message.other_param != null && message.hasOwnProperty("other_param"))
                if (!$util.isString(message.other_param))
                    return "other_param: string expected";
            if (message.item_type != null && message.hasOwnProperty("item_type"))
                if (!$util.isInteger(message.item_type))
                    return "item_type: integer expected";
            if (message.price_fen != null && message.hasOwnProperty("price_fen"))
                if (!$util.isInteger(message.price_fen))
                    return "price_fen: integer expected";
            return null;
        };

        /**
         * Creates a PayRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.PayRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.PayRes} PayRes
         */
        PayRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.PayRes)
                return object;
            var message = new $root.Lobby.PayRes();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.message != null)
                message.message = String(object.message);
            if (object.item_id != null)
                message.item_id = object.item_id | 0;
            if (object.pay_type != null)
                message.pay_type = object.pay_type | 0;
            if (object.game_order_num != null)
                message.game_order_num = String(object.game_order_num);
            if (object.center_order_num != null)
                message.center_order_num = String(object.center_order_num);
            if (object.other_param != null)
                message.other_param = String(object.other_param);
            if (object.item_type != null)
                message.item_type = object.item_type | 0;
            if (object.price_fen != null)
                message.price_fen = object.price_fen | 0;
            return message;
        };

        /**
         * Creates a plain object from a PayRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.PayRes
         * @static
         * @param {Lobby.PayRes} message PayRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PayRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.message = "";
                object.item_id = 0;
                object.pay_type = 0;
                object.game_order_num = "";
                object.center_order_num = "";
                object.other_param = "";
                object.item_type = 0;
                object.price_fen = 0;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.item_id != null && message.hasOwnProperty("item_id"))
                object.item_id = message.item_id;
            if (message.pay_type != null && message.hasOwnProperty("pay_type"))
                object.pay_type = message.pay_type;
            if (message.game_order_num != null && message.hasOwnProperty("game_order_num"))
                object.game_order_num = message.game_order_num;
            if (message.center_order_num != null && message.hasOwnProperty("center_order_num"))
                object.center_order_num = message.center_order_num;
            if (message.other_param != null && message.hasOwnProperty("other_param"))
                object.other_param = message.other_param;
            if (message.item_type != null && message.hasOwnProperty("item_type"))
                object.item_type = message.item_type;
            if (message.price_fen != null && message.hasOwnProperty("price_fen"))
                object.price_fen = message.price_fen;
            return object;
        };

        /**
         * Converts this PayRes to JSON.
         * @function toJSON
         * @memberof Lobby.PayRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PayRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return PayRes;
    })();

    Lobby.FeedbackReq = (function() {

        /**
         * Properties of a FeedbackReq.
         * @memberof Lobby
         * @interface IFeedbackReq
         * @property {number|null} [handle_type] FeedbackReq handle_type
         * @property {number|Long|null} [handle_value] FeedbackReq handle_value
         * @property {string|null} [handle_value_str] FeedbackReq handle_value_str
         */

        /**
         * Constructs a new FeedbackReq.
         * @memberof Lobby
         * @classdesc Represents a FeedbackReq.
         * @implements IFeedbackReq
         * @constructor
         * @param {Lobby.IFeedbackReq=} [properties] Properties to set
         */
        function FeedbackReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FeedbackReq handle_type.
         * @member {number} handle_type
         * @memberof Lobby.FeedbackReq
         * @instance
         */
        FeedbackReq.prototype.handle_type = 0;

        /**
         * FeedbackReq handle_value.
         * @member {number|Long} handle_value
         * @memberof Lobby.FeedbackReq
         * @instance
         */
        FeedbackReq.prototype.handle_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * FeedbackReq handle_value_str.
         * @member {string} handle_value_str
         * @memberof Lobby.FeedbackReq
         * @instance
         */
        FeedbackReq.prototype.handle_value_str = "";

        /**
         * Creates a new FeedbackReq instance using the specified properties.
         * @function create
         * @memberof Lobby.FeedbackReq
         * @static
         * @param {Lobby.IFeedbackReq=} [properties] Properties to set
         * @returns {Lobby.FeedbackReq} FeedbackReq instance
         */
        FeedbackReq.create = function create(properties) {
            return new FeedbackReq(properties);
        };

        /**
         * Encodes the specified FeedbackReq message. Does not implicitly {@link Lobby.FeedbackReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.FeedbackReq
         * @static
         * @param {Lobby.IFeedbackReq} message FeedbackReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FeedbackReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.handle_value);
            if (message.handle_value_str != null && message.hasOwnProperty("handle_value_str"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.handle_value_str);
            return writer;
        };

        /**
         * Encodes the specified FeedbackReq message, length delimited. Does not implicitly {@link Lobby.FeedbackReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.FeedbackReq
         * @static
         * @param {Lobby.IFeedbackReq} message FeedbackReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FeedbackReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FeedbackReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.FeedbackReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.FeedbackReq} FeedbackReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FeedbackReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.FeedbackReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.int64();
                    break;
                case 3:
                    message.handle_value_str = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FeedbackReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.FeedbackReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.FeedbackReq} FeedbackReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FeedbackReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FeedbackReq message.
         * @function verify
         * @memberof Lobby.FeedbackReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FeedbackReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isInteger(message.handle_value) && !(message.handle_value && $util.isInteger(message.handle_value.low) && $util.isInteger(message.handle_value.high)))
                    return "handle_value: integer|Long expected";
            if (message.handle_value_str != null && message.hasOwnProperty("handle_value_str"))
                if (!$util.isString(message.handle_value_str))
                    return "handle_value_str: string expected";
            return null;
        };

        /**
         * Creates a FeedbackReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.FeedbackReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.FeedbackReq} FeedbackReq
         */
        FeedbackReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.FeedbackReq)
                return object;
            var message = new $root.Lobby.FeedbackReq();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                if ($util.Long)
                    (message.handle_value = $util.Long.fromValue(object.handle_value)).unsigned = false;
                else if (typeof object.handle_value === "string")
                    message.handle_value = parseInt(object.handle_value, 10);
                else if (typeof object.handle_value === "number")
                    message.handle_value = object.handle_value;
                else if (typeof object.handle_value === "object")
                    message.handle_value = new $util.LongBits(object.handle_value.low >>> 0, object.handle_value.high >>> 0).toNumber();
            if (object.handle_value_str != null)
                message.handle_value_str = String(object.handle_value_str);
            return message;
        };

        /**
         * Creates a plain object from a FeedbackReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.FeedbackReq
         * @static
         * @param {Lobby.FeedbackReq} message FeedbackReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FeedbackReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.handle_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.handle_value = options.longs === String ? "0" : 0;
                object.handle_value_str = "";
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (typeof message.handle_value === "number")
                    object.handle_value = options.longs === String ? String(message.handle_value) : message.handle_value;
                else
                    object.handle_value = options.longs === String ? $util.Long.prototype.toString.call(message.handle_value) : options.longs === Number ? new $util.LongBits(message.handle_value.low >>> 0, message.handle_value.high >>> 0).toNumber() : message.handle_value;
            if (message.handle_value_str != null && message.hasOwnProperty("handle_value_str"))
                object.handle_value_str = message.handle_value_str;
            return object;
        };

        /**
         * Converts this FeedbackReq to JSON.
         * @function toJSON
         * @memberof Lobby.FeedbackReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FeedbackReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return FeedbackReq;
    })();

    Lobby.FeedbackRes = (function() {

        /**
         * Properties of a FeedbackRes.
         * @memberof Lobby
         * @interface IFeedbackRes
         * @property {number|null} [handle_type] FeedbackRes handle_type
         * @property {number|null} [code] FeedbackRes code
         * @property {string|null} [message] FeedbackRes message
         * @property {Array.<Lobby.IFeedbackItemRes>|null} [feedback_list] FeedbackRes feedback_list
         */

        /**
         * Constructs a new FeedbackRes.
         * @memberof Lobby
         * @classdesc Represents a FeedbackRes.
         * @implements IFeedbackRes
         * @constructor
         * @param {Lobby.IFeedbackRes=} [properties] Properties to set
         */
        function FeedbackRes(properties) {
            this.feedback_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FeedbackRes handle_type.
         * @member {number} handle_type
         * @memberof Lobby.FeedbackRes
         * @instance
         */
        FeedbackRes.prototype.handle_type = 0;

        /**
         * FeedbackRes code.
         * @member {number} code
         * @memberof Lobby.FeedbackRes
         * @instance
         */
        FeedbackRes.prototype.code = 0;

        /**
         * FeedbackRes message.
         * @member {string} message
         * @memberof Lobby.FeedbackRes
         * @instance
         */
        FeedbackRes.prototype.message = "";

        /**
         * FeedbackRes feedback_list.
         * @member {Array.<Lobby.IFeedbackItemRes>} feedback_list
         * @memberof Lobby.FeedbackRes
         * @instance
         */
        FeedbackRes.prototype.feedback_list = $util.emptyArray;

        /**
         * Creates a new FeedbackRes instance using the specified properties.
         * @function create
         * @memberof Lobby.FeedbackRes
         * @static
         * @param {Lobby.IFeedbackRes=} [properties] Properties to set
         * @returns {Lobby.FeedbackRes} FeedbackRes instance
         */
        FeedbackRes.create = function create(properties) {
            return new FeedbackRes(properties);
        };

        /**
         * Encodes the specified FeedbackRes message. Does not implicitly {@link Lobby.FeedbackRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.FeedbackRes
         * @static
         * @param {Lobby.IFeedbackRes} message FeedbackRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FeedbackRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            if (message.feedback_list != null && message.feedback_list.length)
                for (var i = 0; i < message.feedback_list.length; ++i)
                    $root.Lobby.FeedbackItemRes.encode(message.feedback_list[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified FeedbackRes message, length delimited. Does not implicitly {@link Lobby.FeedbackRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.FeedbackRes
         * @static
         * @param {Lobby.IFeedbackRes} message FeedbackRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FeedbackRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FeedbackRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.FeedbackRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.FeedbackRes} FeedbackRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FeedbackRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.FeedbackRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.message = reader.string();
                    break;
                case 4:
                    if (!(message.feedback_list && message.feedback_list.length))
                        message.feedback_list = [];
                    message.feedback_list.push($root.Lobby.FeedbackItemRes.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FeedbackRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.FeedbackRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.FeedbackRes} FeedbackRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FeedbackRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FeedbackRes message.
         * @function verify
         * @memberof Lobby.FeedbackRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FeedbackRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.feedback_list != null && message.hasOwnProperty("feedback_list")) {
                if (!Array.isArray(message.feedback_list))
                    return "feedback_list: array expected";
                for (var i = 0; i < message.feedback_list.length; ++i) {
                    var error = $root.Lobby.FeedbackItemRes.verify(message.feedback_list[i]);
                    if (error)
                        return "feedback_list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a FeedbackRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.FeedbackRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.FeedbackRes} FeedbackRes
         */
        FeedbackRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.FeedbackRes)
                return object;
            var message = new $root.Lobby.FeedbackRes();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.code != null)
                message.code = object.code | 0;
            if (object.message != null)
                message.message = String(object.message);
            if (object.feedback_list) {
                if (!Array.isArray(object.feedback_list))
                    throw TypeError(".Lobby.FeedbackRes.feedback_list: array expected");
                message.feedback_list = [];
                for (var i = 0; i < object.feedback_list.length; ++i) {
                    if (typeof object.feedback_list[i] !== "object")
                        throw TypeError(".Lobby.FeedbackRes.feedback_list: object expected");
                    message.feedback_list[i] = $root.Lobby.FeedbackItemRes.fromObject(object.feedback_list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a FeedbackRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.FeedbackRes
         * @static
         * @param {Lobby.FeedbackRes} message FeedbackRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FeedbackRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.feedback_list = [];
            if (options.defaults) {
                object.handle_type = 0;
                object.code = 0;
                object.message = "";
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.feedback_list && message.feedback_list.length) {
                object.feedback_list = [];
                for (var j = 0; j < message.feedback_list.length; ++j)
                    object.feedback_list[j] = $root.Lobby.FeedbackItemRes.toObject(message.feedback_list[j], options);
            }
            return object;
        };

        /**
         * Converts this FeedbackRes to JSON.
         * @function toJSON
         * @memberof Lobby.FeedbackRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FeedbackRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return FeedbackRes;
    })();

    Lobby.FeedbackItemRes = (function() {

        /**
         * Properties of a FeedbackItemRes.
         * @memberof Lobby
         * @interface IFeedbackItemRes
         * @property {number|Long|null} [uf_id] FeedbackItemRes uf_id
         * @property {string|null} [uf_content] FeedbackItemRes uf_content
         * @property {number|null} [uf_status] FeedbackItemRes uf_status
         * @property {number|null} [uf_read] FeedbackItemRes uf_read
         * @property {string|null} [uf_reply] FeedbackItemRes uf_reply
         * @property {number|Long|null} [reply_time] FeedbackItemRes reply_time
         * @property {number|Long|null} [create_time] FeedbackItemRes create_time
         */

        /**
         * Constructs a new FeedbackItemRes.
         * @memberof Lobby
         * @classdesc Represents a FeedbackItemRes.
         * @implements IFeedbackItemRes
         * @constructor
         * @param {Lobby.IFeedbackItemRes=} [properties] Properties to set
         */
        function FeedbackItemRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * FeedbackItemRes uf_id.
         * @member {number|Long} uf_id
         * @memberof Lobby.FeedbackItemRes
         * @instance
         */
        FeedbackItemRes.prototype.uf_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * FeedbackItemRes uf_content.
         * @member {string} uf_content
         * @memberof Lobby.FeedbackItemRes
         * @instance
         */
        FeedbackItemRes.prototype.uf_content = "";

        /**
         * FeedbackItemRes uf_status.
         * @member {number} uf_status
         * @memberof Lobby.FeedbackItemRes
         * @instance
         */
        FeedbackItemRes.prototype.uf_status = 0;

        /**
         * FeedbackItemRes uf_read.
         * @member {number} uf_read
         * @memberof Lobby.FeedbackItemRes
         * @instance
         */
        FeedbackItemRes.prototype.uf_read = 0;

        /**
         * FeedbackItemRes uf_reply.
         * @member {string} uf_reply
         * @memberof Lobby.FeedbackItemRes
         * @instance
         */
        FeedbackItemRes.prototype.uf_reply = "";

        /**
         * FeedbackItemRes reply_time.
         * @member {number|Long} reply_time
         * @memberof Lobby.FeedbackItemRes
         * @instance
         */
        FeedbackItemRes.prototype.reply_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * FeedbackItemRes create_time.
         * @member {number|Long} create_time
         * @memberof Lobby.FeedbackItemRes
         * @instance
         */
        FeedbackItemRes.prototype.create_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new FeedbackItemRes instance using the specified properties.
         * @function create
         * @memberof Lobby.FeedbackItemRes
         * @static
         * @param {Lobby.IFeedbackItemRes=} [properties] Properties to set
         * @returns {Lobby.FeedbackItemRes} FeedbackItemRes instance
         */
        FeedbackItemRes.create = function create(properties) {
            return new FeedbackItemRes(properties);
        };

        /**
         * Encodes the specified FeedbackItemRes message. Does not implicitly {@link Lobby.FeedbackItemRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.FeedbackItemRes
         * @static
         * @param {Lobby.IFeedbackItemRes} message FeedbackItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FeedbackItemRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uf_id != null && message.hasOwnProperty("uf_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.uf_id);
            if (message.uf_content != null && message.hasOwnProperty("uf_content"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.uf_content);
            if (message.uf_status != null && message.hasOwnProperty("uf_status"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.uf_status);
            if (message.uf_read != null && message.hasOwnProperty("uf_read"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.uf_read);
            if (message.uf_reply != null && message.hasOwnProperty("uf_reply"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.uf_reply);
            if (message.reply_time != null && message.hasOwnProperty("reply_time"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.reply_time);
            if (message.create_time != null && message.hasOwnProperty("create_time"))
                writer.uint32(/* id 7, wireType 0 =*/56).int64(message.create_time);
            return writer;
        };

        /**
         * Encodes the specified FeedbackItemRes message, length delimited. Does not implicitly {@link Lobby.FeedbackItemRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.FeedbackItemRes
         * @static
         * @param {Lobby.IFeedbackItemRes} message FeedbackItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        FeedbackItemRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a FeedbackItemRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.FeedbackItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.FeedbackItemRes} FeedbackItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FeedbackItemRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.FeedbackItemRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.uf_id = reader.int64();
                    break;
                case 2:
                    message.uf_content = reader.string();
                    break;
                case 3:
                    message.uf_status = reader.int32();
                    break;
                case 4:
                    message.uf_read = reader.int32();
                    break;
                case 5:
                    message.uf_reply = reader.string();
                    break;
                case 6:
                    message.reply_time = reader.int64();
                    break;
                case 7:
                    message.create_time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a FeedbackItemRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.FeedbackItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.FeedbackItemRes} FeedbackItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        FeedbackItemRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a FeedbackItemRes message.
         * @function verify
         * @memberof Lobby.FeedbackItemRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        FeedbackItemRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uf_id != null && message.hasOwnProperty("uf_id"))
                if (!$util.isInteger(message.uf_id) && !(message.uf_id && $util.isInteger(message.uf_id.low) && $util.isInteger(message.uf_id.high)))
                    return "uf_id: integer|Long expected";
            if (message.uf_content != null && message.hasOwnProperty("uf_content"))
                if (!$util.isString(message.uf_content))
                    return "uf_content: string expected";
            if (message.uf_status != null && message.hasOwnProperty("uf_status"))
                if (!$util.isInteger(message.uf_status))
                    return "uf_status: integer expected";
            if (message.uf_read != null && message.hasOwnProperty("uf_read"))
                if (!$util.isInteger(message.uf_read))
                    return "uf_read: integer expected";
            if (message.uf_reply != null && message.hasOwnProperty("uf_reply"))
                if (!$util.isString(message.uf_reply))
                    return "uf_reply: string expected";
            if (message.reply_time != null && message.hasOwnProperty("reply_time"))
                if (!$util.isInteger(message.reply_time) && !(message.reply_time && $util.isInteger(message.reply_time.low) && $util.isInteger(message.reply_time.high)))
                    return "reply_time: integer|Long expected";
            if (message.create_time != null && message.hasOwnProperty("create_time"))
                if (!$util.isInteger(message.create_time) && !(message.create_time && $util.isInteger(message.create_time.low) && $util.isInteger(message.create_time.high)))
                    return "create_time: integer|Long expected";
            return null;
        };

        /**
         * Creates a FeedbackItemRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.FeedbackItemRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.FeedbackItemRes} FeedbackItemRes
         */
        FeedbackItemRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.FeedbackItemRes)
                return object;
            var message = new $root.Lobby.FeedbackItemRes();
            if (object.uf_id != null)
                if ($util.Long)
                    (message.uf_id = $util.Long.fromValue(object.uf_id)).unsigned = false;
                else if (typeof object.uf_id === "string")
                    message.uf_id = parseInt(object.uf_id, 10);
                else if (typeof object.uf_id === "number")
                    message.uf_id = object.uf_id;
                else if (typeof object.uf_id === "object")
                    message.uf_id = new $util.LongBits(object.uf_id.low >>> 0, object.uf_id.high >>> 0).toNumber();
            if (object.uf_content != null)
                message.uf_content = String(object.uf_content);
            if (object.uf_status != null)
                message.uf_status = object.uf_status | 0;
            if (object.uf_read != null)
                message.uf_read = object.uf_read | 0;
            if (object.uf_reply != null)
                message.uf_reply = String(object.uf_reply);
            if (object.reply_time != null)
                if ($util.Long)
                    (message.reply_time = $util.Long.fromValue(object.reply_time)).unsigned = false;
                else if (typeof object.reply_time === "string")
                    message.reply_time = parseInt(object.reply_time, 10);
                else if (typeof object.reply_time === "number")
                    message.reply_time = object.reply_time;
                else if (typeof object.reply_time === "object")
                    message.reply_time = new $util.LongBits(object.reply_time.low >>> 0, object.reply_time.high >>> 0).toNumber();
            if (object.create_time != null)
                if ($util.Long)
                    (message.create_time = $util.Long.fromValue(object.create_time)).unsigned = false;
                else if (typeof object.create_time === "string")
                    message.create_time = parseInt(object.create_time, 10);
                else if (typeof object.create_time === "number")
                    message.create_time = object.create_time;
                else if (typeof object.create_time === "object")
                    message.create_time = new $util.LongBits(object.create_time.low >>> 0, object.create_time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a FeedbackItemRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.FeedbackItemRes
         * @static
         * @param {Lobby.FeedbackItemRes} message FeedbackItemRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        FeedbackItemRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.uf_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.uf_id = options.longs === String ? "0" : 0;
                object.uf_content = "";
                object.uf_status = 0;
                object.uf_read = 0;
                object.uf_reply = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.reply_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.reply_time = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.create_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.create_time = options.longs === String ? "0" : 0;
            }
            if (message.uf_id != null && message.hasOwnProperty("uf_id"))
                if (typeof message.uf_id === "number")
                    object.uf_id = options.longs === String ? String(message.uf_id) : message.uf_id;
                else
                    object.uf_id = options.longs === String ? $util.Long.prototype.toString.call(message.uf_id) : options.longs === Number ? new $util.LongBits(message.uf_id.low >>> 0, message.uf_id.high >>> 0).toNumber() : message.uf_id;
            if (message.uf_content != null && message.hasOwnProperty("uf_content"))
                object.uf_content = message.uf_content;
            if (message.uf_status != null && message.hasOwnProperty("uf_status"))
                object.uf_status = message.uf_status;
            if (message.uf_read != null && message.hasOwnProperty("uf_read"))
                object.uf_read = message.uf_read;
            if (message.uf_reply != null && message.hasOwnProperty("uf_reply"))
                object.uf_reply = message.uf_reply;
            if (message.reply_time != null && message.hasOwnProperty("reply_time"))
                if (typeof message.reply_time === "number")
                    object.reply_time = options.longs === String ? String(message.reply_time) : message.reply_time;
                else
                    object.reply_time = options.longs === String ? $util.Long.prototype.toString.call(message.reply_time) : options.longs === Number ? new $util.LongBits(message.reply_time.low >>> 0, message.reply_time.high >>> 0).toNumber() : message.reply_time;
            if (message.create_time != null && message.hasOwnProperty("create_time"))
                if (typeof message.create_time === "number")
                    object.create_time = options.longs === String ? String(message.create_time) : message.create_time;
                else
                    object.create_time = options.longs === String ? $util.Long.prototype.toString.call(message.create_time) : options.longs === Number ? new $util.LongBits(message.create_time.low >>> 0, message.create_time.high >>> 0).toNumber() : message.create_time;
            return object;
        };

        /**
         * Converts this FeedbackItemRes to JSON.
         * @function toJSON
         * @memberof Lobby.FeedbackItemRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        FeedbackItemRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return FeedbackItemRes;
    })();

    Lobby.RankReq = (function() {

        /**
         * Properties of a RankReq.
         * @memberof Lobby
         * @interface IRankReq
         * @property {number|null} [handle_type] RankReq handle_type
         */

        /**
         * Constructs a new RankReq.
         * @memberof Lobby
         * @classdesc Represents a RankReq.
         * @implements IRankReq
         * @constructor
         * @param {Lobby.IRankReq=} [properties] Properties to set
         */
        function RankReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RankReq handle_type.
         * @member {number} handle_type
         * @memberof Lobby.RankReq
         * @instance
         */
        RankReq.prototype.handle_type = 0;

        /**
         * Creates a new RankReq instance using the specified properties.
         * @function create
         * @memberof Lobby.RankReq
         * @static
         * @param {Lobby.IRankReq=} [properties] Properties to set
         * @returns {Lobby.RankReq} RankReq instance
         */
        RankReq.create = function create(properties) {
            return new RankReq(properties);
        };

        /**
         * Encodes the specified RankReq message. Does not implicitly {@link Lobby.RankReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.RankReq
         * @static
         * @param {Lobby.IRankReq} message RankReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RankReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            return writer;
        };

        /**
         * Encodes the specified RankReq message, length delimited. Does not implicitly {@link Lobby.RankReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.RankReq
         * @static
         * @param {Lobby.IRankReq} message RankReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RankReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RankReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.RankReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.RankReq} RankReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RankReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.RankReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RankReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.RankReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.RankReq} RankReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RankReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RankReq message.
         * @function verify
         * @memberof Lobby.RankReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RankReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            return null;
        };

        /**
         * Creates a RankReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.RankReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.RankReq} RankReq
         */
        RankReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.RankReq)
                return object;
            var message = new $root.Lobby.RankReq();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            return message;
        };

        /**
         * Creates a plain object from a RankReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.RankReq
         * @static
         * @param {Lobby.RankReq} message RankReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RankReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.handle_type = 0;
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            return object;
        };

        /**
         * Converts this RankReq to JSON.
         * @function toJSON
         * @memberof Lobby.RankReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RankReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RankReq;
    })();

    Lobby.RankRes = (function() {

        /**
         * Properties of a RankRes.
         * @memberof Lobby
         * @interface IRankRes
         * @property {number|null} [handle_type] RankRes handle_type
         * @property {Array.<Lobby.IRankItemRes>|null} [rank_list] RankRes rank_list
         * @property {Lobby.IRankItemRes|null} [self_item] RankRes self_item
         * @property {number|Long|null} [rank_num] RankRes rank_num
         */

        /**
         * Constructs a new RankRes.
         * @memberof Lobby
         * @classdesc Represents a RankRes.
         * @implements IRankRes
         * @constructor
         * @param {Lobby.IRankRes=} [properties] Properties to set
         */
        function RankRes(properties) {
            this.rank_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RankRes handle_type.
         * @member {number} handle_type
         * @memberof Lobby.RankRes
         * @instance
         */
        RankRes.prototype.handle_type = 0;

        /**
         * RankRes rank_list.
         * @member {Array.<Lobby.IRankItemRes>} rank_list
         * @memberof Lobby.RankRes
         * @instance
         */
        RankRes.prototype.rank_list = $util.emptyArray;

        /**
         * RankRes self_item.
         * @member {Lobby.IRankItemRes|null|undefined} self_item
         * @memberof Lobby.RankRes
         * @instance
         */
        RankRes.prototype.self_item = null;

        /**
         * RankRes rank_num.
         * @member {number|Long} rank_num
         * @memberof Lobby.RankRes
         * @instance
         */
        RankRes.prototype.rank_num = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new RankRes instance using the specified properties.
         * @function create
         * @memberof Lobby.RankRes
         * @static
         * @param {Lobby.IRankRes=} [properties] Properties to set
         * @returns {Lobby.RankRes} RankRes instance
         */
        RankRes.create = function create(properties) {
            return new RankRes(properties);
        };

        /**
         * Encodes the specified RankRes message. Does not implicitly {@link Lobby.RankRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.RankRes
         * @static
         * @param {Lobby.IRankRes} message RankRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RankRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.rank_list != null && message.rank_list.length)
                for (var i = 0; i < message.rank_list.length; ++i)
                    $root.Lobby.RankItemRes.encode(message.rank_list[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.self_item != null && message.hasOwnProperty("self_item"))
                $root.Lobby.RankItemRes.encode(message.self_item, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.rank_num != null && message.hasOwnProperty("rank_num"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.rank_num);
            return writer;
        };

        /**
         * Encodes the specified RankRes message, length delimited. Does not implicitly {@link Lobby.RankRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.RankRes
         * @static
         * @param {Lobby.IRankRes} message RankRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RankRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RankRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.RankRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.RankRes} RankRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RankRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.RankRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    if (!(message.rank_list && message.rank_list.length))
                        message.rank_list = [];
                    message.rank_list.push($root.Lobby.RankItemRes.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.self_item = $root.Lobby.RankItemRes.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.rank_num = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RankRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.RankRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.RankRes} RankRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RankRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RankRes message.
         * @function verify
         * @memberof Lobby.RankRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RankRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.rank_list != null && message.hasOwnProperty("rank_list")) {
                if (!Array.isArray(message.rank_list))
                    return "rank_list: array expected";
                for (var i = 0; i < message.rank_list.length; ++i) {
                    var error = $root.Lobby.RankItemRes.verify(message.rank_list[i]);
                    if (error)
                        return "rank_list." + error;
                }
            }
            if (message.self_item != null && message.hasOwnProperty("self_item")) {
                var error = $root.Lobby.RankItemRes.verify(message.self_item);
                if (error)
                    return "self_item." + error;
            }
            if (message.rank_num != null && message.hasOwnProperty("rank_num"))
                if (!$util.isInteger(message.rank_num) && !(message.rank_num && $util.isInteger(message.rank_num.low) && $util.isInteger(message.rank_num.high)))
                    return "rank_num: integer|Long expected";
            return null;
        };

        /**
         * Creates a RankRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.RankRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.RankRes} RankRes
         */
        RankRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.RankRes)
                return object;
            var message = new $root.Lobby.RankRes();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.rank_list) {
                if (!Array.isArray(object.rank_list))
                    throw TypeError(".Lobby.RankRes.rank_list: array expected");
                message.rank_list = [];
                for (var i = 0; i < object.rank_list.length; ++i) {
                    if (typeof object.rank_list[i] !== "object")
                        throw TypeError(".Lobby.RankRes.rank_list: object expected");
                    message.rank_list[i] = $root.Lobby.RankItemRes.fromObject(object.rank_list[i]);
                }
            }
            if (object.self_item != null) {
                if (typeof object.self_item !== "object")
                    throw TypeError(".Lobby.RankRes.self_item: object expected");
                message.self_item = $root.Lobby.RankItemRes.fromObject(object.self_item);
            }
            if (object.rank_num != null)
                if ($util.Long)
                    (message.rank_num = $util.Long.fromValue(object.rank_num)).unsigned = false;
                else if (typeof object.rank_num === "string")
                    message.rank_num = parseInt(object.rank_num, 10);
                else if (typeof object.rank_num === "number")
                    message.rank_num = object.rank_num;
                else if (typeof object.rank_num === "object")
                    message.rank_num = new $util.LongBits(object.rank_num.low >>> 0, object.rank_num.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a RankRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.RankRes
         * @static
         * @param {Lobby.RankRes} message RankRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RankRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.rank_list = [];
            if (options.defaults) {
                object.handle_type = 0;
                object.self_item = null;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.rank_num = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.rank_num = options.longs === String ? "0" : 0;
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.rank_list && message.rank_list.length) {
                object.rank_list = [];
                for (var j = 0; j < message.rank_list.length; ++j)
                    object.rank_list[j] = $root.Lobby.RankItemRes.toObject(message.rank_list[j], options);
            }
            if (message.self_item != null && message.hasOwnProperty("self_item"))
                object.self_item = $root.Lobby.RankItemRes.toObject(message.self_item, options);
            if (message.rank_num != null && message.hasOwnProperty("rank_num"))
                if (typeof message.rank_num === "number")
                    object.rank_num = options.longs === String ? String(message.rank_num) : message.rank_num;
                else
                    object.rank_num = options.longs === String ? $util.Long.prototype.toString.call(message.rank_num) : options.longs === Number ? new $util.LongBits(message.rank_num.low >>> 0, message.rank_num.high >>> 0).toNumber() : message.rank_num;
            return object;
        };

        /**
         * Converts this RankRes to JSON.
         * @function toJSON
         * @memberof Lobby.RankRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RankRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RankRes;
    })();

    Lobby.RankItemRes = (function() {

        /**
         * Properties of a RankItemRes.
         * @memberof Lobby
         * @interface IRankItemRes
         * @property {string|null} [head_img_url] RankItemRes head_img_url
         * @property {string|null} [nick_name] RankItemRes nick_name
         * @property {number|Long|null} [user_id] RankItemRes user_id
         * @property {number|null} [dan] RankItemRes dan
         * @property {number|Long|null} [score] RankItemRes score
         * @property {number|null} [skin_head] RankItemRes skin_head
         */

        /**
         * Constructs a new RankItemRes.
         * @memberof Lobby
         * @classdesc Represents a RankItemRes.
         * @implements IRankItemRes
         * @constructor
         * @param {Lobby.IRankItemRes=} [properties] Properties to set
         */
        function RankItemRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RankItemRes head_img_url.
         * @member {string} head_img_url
         * @memberof Lobby.RankItemRes
         * @instance
         */
        RankItemRes.prototype.head_img_url = "";

        /**
         * RankItemRes nick_name.
         * @member {string} nick_name
         * @memberof Lobby.RankItemRes
         * @instance
         */
        RankItemRes.prototype.nick_name = "";

        /**
         * RankItemRes user_id.
         * @member {number|Long} user_id
         * @memberof Lobby.RankItemRes
         * @instance
         */
        RankItemRes.prototype.user_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RankItemRes dan.
         * @member {number} dan
         * @memberof Lobby.RankItemRes
         * @instance
         */
        RankItemRes.prototype.dan = 0;

        /**
         * RankItemRes score.
         * @member {number|Long} score
         * @memberof Lobby.RankItemRes
         * @instance
         */
        RankItemRes.prototype.score = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * RankItemRes skin_head.
         * @member {number} skin_head
         * @memberof Lobby.RankItemRes
         * @instance
         */
        RankItemRes.prototype.skin_head = 0;

        /**
         * Creates a new RankItemRes instance using the specified properties.
         * @function create
         * @memberof Lobby.RankItemRes
         * @static
         * @param {Lobby.IRankItemRes=} [properties] Properties to set
         * @returns {Lobby.RankItemRes} RankItemRes instance
         */
        RankItemRes.create = function create(properties) {
            return new RankItemRes(properties);
        };

        /**
         * Encodes the specified RankItemRes message. Does not implicitly {@link Lobby.RankItemRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.RankItemRes
         * @static
         * @param {Lobby.IRankItemRes} message RankItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RankItemRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.head_img_url != null && message.hasOwnProperty("head_img_url"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.head_img_url);
            if (message.nick_name != null && message.hasOwnProperty("nick_name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nick_name);
            if (message.user_id != null && message.hasOwnProperty("user_id"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.user_id);
            if (message.dan != null && message.hasOwnProperty("dan"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.dan);
            if (message.score != null && message.hasOwnProperty("score"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.score);
            if (message.skin_head != null && message.hasOwnProperty("skin_head"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.skin_head);
            return writer;
        };

        /**
         * Encodes the specified RankItemRes message, length delimited. Does not implicitly {@link Lobby.RankItemRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.RankItemRes
         * @static
         * @param {Lobby.IRankItemRes} message RankItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RankItemRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RankItemRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.RankItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.RankItemRes} RankItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RankItemRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.RankItemRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.head_img_url = reader.string();
                    break;
                case 2:
                    message.nick_name = reader.string();
                    break;
                case 3:
                    message.user_id = reader.int64();
                    break;
                case 4:
                    message.dan = reader.int32();
                    break;
                case 5:
                    message.score = reader.int64();
                    break;
                case 6:
                    message.skin_head = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RankItemRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.RankItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.RankItemRes} RankItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RankItemRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RankItemRes message.
         * @function verify
         * @memberof Lobby.RankItemRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RankItemRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.head_img_url != null && message.hasOwnProperty("head_img_url"))
                if (!$util.isString(message.head_img_url))
                    return "head_img_url: string expected";
            if (message.nick_name != null && message.hasOwnProperty("nick_name"))
                if (!$util.isString(message.nick_name))
                    return "nick_name: string expected";
            if (message.user_id != null && message.hasOwnProperty("user_id"))
                if (!$util.isInteger(message.user_id) && !(message.user_id && $util.isInteger(message.user_id.low) && $util.isInteger(message.user_id.high)))
                    return "user_id: integer|Long expected";
            if (message.dan != null && message.hasOwnProperty("dan"))
                if (!$util.isInteger(message.dan))
                    return "dan: integer expected";
            if (message.score != null && message.hasOwnProperty("score"))
                if (!$util.isInteger(message.score) && !(message.score && $util.isInteger(message.score.low) && $util.isInteger(message.score.high)))
                    return "score: integer|Long expected";
            if (message.skin_head != null && message.hasOwnProperty("skin_head"))
                if (!$util.isInteger(message.skin_head))
                    return "skin_head: integer expected";
            return null;
        };

        /**
         * Creates a RankItemRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.RankItemRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.RankItemRes} RankItemRes
         */
        RankItemRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.RankItemRes)
                return object;
            var message = new $root.Lobby.RankItemRes();
            if (object.head_img_url != null)
                message.head_img_url = String(object.head_img_url);
            if (object.nick_name != null)
                message.nick_name = String(object.nick_name);
            if (object.user_id != null)
                if ($util.Long)
                    (message.user_id = $util.Long.fromValue(object.user_id)).unsigned = false;
                else if (typeof object.user_id === "string")
                    message.user_id = parseInt(object.user_id, 10);
                else if (typeof object.user_id === "number")
                    message.user_id = object.user_id;
                else if (typeof object.user_id === "object")
                    message.user_id = new $util.LongBits(object.user_id.low >>> 0, object.user_id.high >>> 0).toNumber();
            if (object.dan != null)
                message.dan = object.dan | 0;
            if (object.score != null)
                if ($util.Long)
                    (message.score = $util.Long.fromValue(object.score)).unsigned = false;
                else if (typeof object.score === "string")
                    message.score = parseInt(object.score, 10);
                else if (typeof object.score === "number")
                    message.score = object.score;
                else if (typeof object.score === "object")
                    message.score = new $util.LongBits(object.score.low >>> 0, object.score.high >>> 0).toNumber();
            if (object.skin_head != null)
                message.skin_head = object.skin_head | 0;
            return message;
        };

        /**
         * Creates a plain object from a RankItemRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.RankItemRes
         * @static
         * @param {Lobby.RankItemRes} message RankItemRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RankItemRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.head_img_url = "";
                object.nick_name = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.user_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.user_id = options.longs === String ? "0" : 0;
                object.dan = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.score = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.score = options.longs === String ? "0" : 0;
                object.skin_head = 0;
            }
            if (message.head_img_url != null && message.hasOwnProperty("head_img_url"))
                object.head_img_url = message.head_img_url;
            if (message.nick_name != null && message.hasOwnProperty("nick_name"))
                object.nick_name = message.nick_name;
            if (message.user_id != null && message.hasOwnProperty("user_id"))
                if (typeof message.user_id === "number")
                    object.user_id = options.longs === String ? String(message.user_id) : message.user_id;
                else
                    object.user_id = options.longs === String ? $util.Long.prototype.toString.call(message.user_id) : options.longs === Number ? new $util.LongBits(message.user_id.low >>> 0, message.user_id.high >>> 0).toNumber() : message.user_id;
            if (message.dan != null && message.hasOwnProperty("dan"))
                object.dan = message.dan;
            if (message.score != null && message.hasOwnProperty("score"))
                if (typeof message.score === "number")
                    object.score = options.longs === String ? String(message.score) : message.score;
                else
                    object.score = options.longs === String ? $util.Long.prototype.toString.call(message.score) : options.longs === Number ? new $util.LongBits(message.score.low >>> 0, message.score.high >>> 0).toNumber() : message.score;
            if (message.skin_head != null && message.hasOwnProperty("skin_head"))
                object.skin_head = message.skin_head;
            return object;
        };

        /**
         * Converts this RankItemRes to JSON.
         * @function toJSON
         * @memberof Lobby.RankItemRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RankItemRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RankItemRes;
    })();

    Lobby.MailReq = (function() {

        /**
         * Properties of a MailReq.
         * @memberof Lobby
         * @interface IMailReq
         * @property {number|null} [handle_type] MailReq handle_type
         * @property {number|Long|null} [handle_value] MailReq handle_value
         */

        /**
         * Constructs a new MailReq.
         * @memberof Lobby
         * @classdesc Represents a MailReq.
         * @implements IMailReq
         * @constructor
         * @param {Lobby.IMailReq=} [properties] Properties to set
         */
        function MailReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MailReq handle_type.
         * @member {number} handle_type
         * @memberof Lobby.MailReq
         * @instance
         */
        MailReq.prototype.handle_type = 0;

        /**
         * MailReq handle_value.
         * @member {number|Long} handle_value
         * @memberof Lobby.MailReq
         * @instance
         */
        MailReq.prototype.handle_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new MailReq instance using the specified properties.
         * @function create
         * @memberof Lobby.MailReq
         * @static
         * @param {Lobby.IMailReq=} [properties] Properties to set
         * @returns {Lobby.MailReq} MailReq instance
         */
        MailReq.create = function create(properties) {
            return new MailReq(properties);
        };

        /**
         * Encodes the specified MailReq message. Does not implicitly {@link Lobby.MailReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.MailReq
         * @static
         * @param {Lobby.IMailReq} message MailReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MailReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.handle_value);
            return writer;
        };

        /**
         * Encodes the specified MailReq message, length delimited. Does not implicitly {@link Lobby.MailReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.MailReq
         * @static
         * @param {Lobby.IMailReq} message MailReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MailReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MailReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.MailReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.MailReq} MailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MailReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.MailReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MailReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.MailReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.MailReq} MailReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MailReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MailReq message.
         * @function verify
         * @memberof Lobby.MailReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MailReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isInteger(message.handle_value) && !(message.handle_value && $util.isInteger(message.handle_value.low) && $util.isInteger(message.handle_value.high)))
                    return "handle_value: integer|Long expected";
            return null;
        };

        /**
         * Creates a MailReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.MailReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.MailReq} MailReq
         */
        MailReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.MailReq)
                return object;
            var message = new $root.Lobby.MailReq();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                if ($util.Long)
                    (message.handle_value = $util.Long.fromValue(object.handle_value)).unsigned = false;
                else if (typeof object.handle_value === "string")
                    message.handle_value = parseInt(object.handle_value, 10);
                else if (typeof object.handle_value === "number")
                    message.handle_value = object.handle_value;
                else if (typeof object.handle_value === "object")
                    message.handle_value = new $util.LongBits(object.handle_value.low >>> 0, object.handle_value.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a MailReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.MailReq
         * @static
         * @param {Lobby.MailReq} message MailReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MailReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.handle_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.handle_value = options.longs === String ? "0" : 0;
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (typeof message.handle_value === "number")
                    object.handle_value = options.longs === String ? String(message.handle_value) : message.handle_value;
                else
                    object.handle_value = options.longs === String ? $util.Long.prototype.toString.call(message.handle_value) : options.longs === Number ? new $util.LongBits(message.handle_value.low >>> 0, message.handle_value.high >>> 0).toNumber() : message.handle_value;
            return object;
        };

        /**
         * Converts this MailReq to JSON.
         * @function toJSON
         * @memberof Lobby.MailReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MailReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MailReq;
    })();

    Lobby.MailRes = (function() {

        /**
         * Properties of a MailRes.
         * @memberof Lobby
         * @interface IMailRes
         * @property {number|null} [handle_type] MailRes handle_type
         * @property {number|Long|null} [handle_value] MailRes handle_value
         * @property {Lobby.IMailItemRes|null} [mail_info] MailRes mail_info
         * @property {Array.<Lobby.IMailItemRes>|null} [mail_list] MailRes mail_list
         */

        /**
         * Constructs a new MailRes.
         * @memberof Lobby
         * @classdesc Represents a MailRes.
         * @implements IMailRes
         * @constructor
         * @param {Lobby.IMailRes=} [properties] Properties to set
         */
        function MailRes(properties) {
            this.mail_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MailRes handle_type.
         * @member {number} handle_type
         * @memberof Lobby.MailRes
         * @instance
         */
        MailRes.prototype.handle_type = 0;

        /**
         * MailRes handle_value.
         * @member {number|Long} handle_value
         * @memberof Lobby.MailRes
         * @instance
         */
        MailRes.prototype.handle_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * MailRes mail_info.
         * @member {Lobby.IMailItemRes|null|undefined} mail_info
         * @memberof Lobby.MailRes
         * @instance
         */
        MailRes.prototype.mail_info = null;

        /**
         * MailRes mail_list.
         * @member {Array.<Lobby.IMailItemRes>} mail_list
         * @memberof Lobby.MailRes
         * @instance
         */
        MailRes.prototype.mail_list = $util.emptyArray;

        /**
         * Creates a new MailRes instance using the specified properties.
         * @function create
         * @memberof Lobby.MailRes
         * @static
         * @param {Lobby.IMailRes=} [properties] Properties to set
         * @returns {Lobby.MailRes} MailRes instance
         */
        MailRes.create = function create(properties) {
            return new MailRes(properties);
        };

        /**
         * Encodes the specified MailRes message. Does not implicitly {@link Lobby.MailRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.MailRes
         * @static
         * @param {Lobby.IMailRes} message MailRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MailRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.handle_value);
            if (message.mail_info != null && message.hasOwnProperty("mail_info"))
                $root.Lobby.MailItemRes.encode(message.mail_info, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.mail_list != null && message.mail_list.length)
                for (var i = 0; i < message.mail_list.length; ++i)
                    $root.Lobby.MailItemRes.encode(message.mail_list[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified MailRes message, length delimited. Does not implicitly {@link Lobby.MailRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.MailRes
         * @static
         * @param {Lobby.IMailRes} message MailRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MailRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MailRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.MailRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.MailRes} MailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MailRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.MailRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.int64();
                    break;
                case 3:
                    message.mail_info = $root.Lobby.MailItemRes.decode(reader, reader.uint32());
                    break;
                case 4:
                    if (!(message.mail_list && message.mail_list.length))
                        message.mail_list = [];
                    message.mail_list.push($root.Lobby.MailItemRes.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MailRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.MailRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.MailRes} MailRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MailRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MailRes message.
         * @function verify
         * @memberof Lobby.MailRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MailRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isInteger(message.handle_value) && !(message.handle_value && $util.isInteger(message.handle_value.low) && $util.isInteger(message.handle_value.high)))
                    return "handle_value: integer|Long expected";
            if (message.mail_info != null && message.hasOwnProperty("mail_info")) {
                var error = $root.Lobby.MailItemRes.verify(message.mail_info);
                if (error)
                    return "mail_info." + error;
            }
            if (message.mail_list != null && message.hasOwnProperty("mail_list")) {
                if (!Array.isArray(message.mail_list))
                    return "mail_list: array expected";
                for (var i = 0; i < message.mail_list.length; ++i) {
                    var error = $root.Lobby.MailItemRes.verify(message.mail_list[i]);
                    if (error)
                        return "mail_list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a MailRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.MailRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.MailRes} MailRes
         */
        MailRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.MailRes)
                return object;
            var message = new $root.Lobby.MailRes();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                if ($util.Long)
                    (message.handle_value = $util.Long.fromValue(object.handle_value)).unsigned = false;
                else if (typeof object.handle_value === "string")
                    message.handle_value = parseInt(object.handle_value, 10);
                else if (typeof object.handle_value === "number")
                    message.handle_value = object.handle_value;
                else if (typeof object.handle_value === "object")
                    message.handle_value = new $util.LongBits(object.handle_value.low >>> 0, object.handle_value.high >>> 0).toNumber();
            if (object.mail_info != null) {
                if (typeof object.mail_info !== "object")
                    throw TypeError(".Lobby.MailRes.mail_info: object expected");
                message.mail_info = $root.Lobby.MailItemRes.fromObject(object.mail_info);
            }
            if (object.mail_list) {
                if (!Array.isArray(object.mail_list))
                    throw TypeError(".Lobby.MailRes.mail_list: array expected");
                message.mail_list = [];
                for (var i = 0; i < object.mail_list.length; ++i) {
                    if (typeof object.mail_list[i] !== "object")
                        throw TypeError(".Lobby.MailRes.mail_list: object expected");
                    message.mail_list[i] = $root.Lobby.MailItemRes.fromObject(object.mail_list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a MailRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.MailRes
         * @static
         * @param {Lobby.MailRes} message MailRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MailRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.mail_list = [];
            if (options.defaults) {
                object.handle_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.handle_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.handle_value = options.longs === String ? "0" : 0;
                object.mail_info = null;
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (typeof message.handle_value === "number")
                    object.handle_value = options.longs === String ? String(message.handle_value) : message.handle_value;
                else
                    object.handle_value = options.longs === String ? $util.Long.prototype.toString.call(message.handle_value) : options.longs === Number ? new $util.LongBits(message.handle_value.low >>> 0, message.handle_value.high >>> 0).toNumber() : message.handle_value;
            if (message.mail_info != null && message.hasOwnProperty("mail_info"))
                object.mail_info = $root.Lobby.MailItemRes.toObject(message.mail_info, options);
            if (message.mail_list && message.mail_list.length) {
                object.mail_list = [];
                for (var j = 0; j < message.mail_list.length; ++j)
                    object.mail_list[j] = $root.Lobby.MailItemRes.toObject(message.mail_list[j], options);
            }
            return object;
        };

        /**
         * Converts this MailRes to JSON.
         * @function toJSON
         * @memberof Lobby.MailRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MailRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MailRes;
    })();

    Lobby.MailItemRes = (function() {

        /**
         * Properties of a MailItemRes.
         * @memberof Lobby
         * @interface IMailItemRes
         * @property {number|Long|null} [um_id] MailItemRes um_id
         * @property {number|null} [mail_type] MailItemRes mail_type
         * @property {string|null} [title] MailItemRes title
         * @property {number|null} [mail_state] MailItemRes mail_state
         * @property {string|null} [context] MailItemRes context
         * @property {number|null} [coin_a] MailItemRes coin_a
         * @property {number|null} [coin_b] MailItemRes coin_b
         * @property {number|null} [coin_c] MailItemRes coin_c
         * @property {number|Long|null} [create_time] MailItemRes create_time
         */

        /**
         * Constructs a new MailItemRes.
         * @memberof Lobby
         * @classdesc Represents a MailItemRes.
         * @implements IMailItemRes
         * @constructor
         * @param {Lobby.IMailItemRes=} [properties] Properties to set
         */
        function MailItemRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MailItemRes um_id.
         * @member {number|Long} um_id
         * @memberof Lobby.MailItemRes
         * @instance
         */
        MailItemRes.prototype.um_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * MailItemRes mail_type.
         * @member {number} mail_type
         * @memberof Lobby.MailItemRes
         * @instance
         */
        MailItemRes.prototype.mail_type = 0;

        /**
         * MailItemRes title.
         * @member {string} title
         * @memberof Lobby.MailItemRes
         * @instance
         */
        MailItemRes.prototype.title = "";

        /**
         * MailItemRes mail_state.
         * @member {number} mail_state
         * @memberof Lobby.MailItemRes
         * @instance
         */
        MailItemRes.prototype.mail_state = 0;

        /**
         * MailItemRes context.
         * @member {string} context
         * @memberof Lobby.MailItemRes
         * @instance
         */
        MailItemRes.prototype.context = "";

        /**
         * MailItemRes coin_a.
         * @member {number} coin_a
         * @memberof Lobby.MailItemRes
         * @instance
         */
        MailItemRes.prototype.coin_a = 0;

        /**
         * MailItemRes coin_b.
         * @member {number} coin_b
         * @memberof Lobby.MailItemRes
         * @instance
         */
        MailItemRes.prototype.coin_b = 0;

        /**
         * MailItemRes coin_c.
         * @member {number} coin_c
         * @memberof Lobby.MailItemRes
         * @instance
         */
        MailItemRes.prototype.coin_c = 0;

        /**
         * MailItemRes create_time.
         * @member {number|Long} create_time
         * @memberof Lobby.MailItemRes
         * @instance
         */
        MailItemRes.prototype.create_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new MailItemRes instance using the specified properties.
         * @function create
         * @memberof Lobby.MailItemRes
         * @static
         * @param {Lobby.IMailItemRes=} [properties] Properties to set
         * @returns {Lobby.MailItemRes} MailItemRes instance
         */
        MailItemRes.create = function create(properties) {
            return new MailItemRes(properties);
        };

        /**
         * Encodes the specified MailItemRes message. Does not implicitly {@link Lobby.MailItemRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.MailItemRes
         * @static
         * @param {Lobby.IMailItemRes} message MailItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MailItemRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.um_id != null && message.hasOwnProperty("um_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.um_id);
            if (message.mail_type != null && message.hasOwnProperty("mail_type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.mail_type);
            if (message.title != null && message.hasOwnProperty("title"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.title);
            if (message.mail_state != null && message.hasOwnProperty("mail_state"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.mail_state);
            if (message.context != null && message.hasOwnProperty("context"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.context);
            if (message.coin_a != null && message.hasOwnProperty("coin_a"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.coin_a);
            if (message.coin_b != null && message.hasOwnProperty("coin_b"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.coin_b);
            if (message.coin_c != null && message.hasOwnProperty("coin_c"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.coin_c);
            if (message.create_time != null && message.hasOwnProperty("create_time"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.create_time);
            return writer;
        };

        /**
         * Encodes the specified MailItemRes message, length delimited. Does not implicitly {@link Lobby.MailItemRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.MailItemRes
         * @static
         * @param {Lobby.IMailItemRes} message MailItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MailItemRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MailItemRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.MailItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.MailItemRes} MailItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MailItemRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.MailItemRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.um_id = reader.int64();
                    break;
                case 2:
                    message.mail_type = reader.int32();
                    break;
                case 3:
                    message.title = reader.string();
                    break;
                case 4:
                    message.mail_state = reader.int32();
                    break;
                case 5:
                    message.context = reader.string();
                    break;
                case 6:
                    message.coin_a = reader.int32();
                    break;
                case 7:
                    message.coin_b = reader.int32();
                    break;
                case 8:
                    message.coin_c = reader.int32();
                    break;
                case 9:
                    message.create_time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a MailItemRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.MailItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.MailItemRes} MailItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MailItemRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MailItemRes message.
         * @function verify
         * @memberof Lobby.MailItemRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MailItemRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.um_id != null && message.hasOwnProperty("um_id"))
                if (!$util.isInteger(message.um_id) && !(message.um_id && $util.isInteger(message.um_id.low) && $util.isInteger(message.um_id.high)))
                    return "um_id: integer|Long expected";
            if (message.mail_type != null && message.hasOwnProperty("mail_type"))
                if (!$util.isInteger(message.mail_type))
                    return "mail_type: integer expected";
            if (message.title != null && message.hasOwnProperty("title"))
                if (!$util.isString(message.title))
                    return "title: string expected";
            if (message.mail_state != null && message.hasOwnProperty("mail_state"))
                if (!$util.isInteger(message.mail_state))
                    return "mail_state: integer expected";
            if (message.context != null && message.hasOwnProperty("context"))
                if (!$util.isString(message.context))
                    return "context: string expected";
            if (message.coin_a != null && message.hasOwnProperty("coin_a"))
                if (!$util.isInteger(message.coin_a))
                    return "coin_a: integer expected";
            if (message.coin_b != null && message.hasOwnProperty("coin_b"))
                if (!$util.isInteger(message.coin_b))
                    return "coin_b: integer expected";
            if (message.coin_c != null && message.hasOwnProperty("coin_c"))
                if (!$util.isInteger(message.coin_c))
                    return "coin_c: integer expected";
            if (message.create_time != null && message.hasOwnProperty("create_time"))
                if (!$util.isInteger(message.create_time) && !(message.create_time && $util.isInteger(message.create_time.low) && $util.isInteger(message.create_time.high)))
                    return "create_time: integer|Long expected";
            return null;
        };

        /**
         * Creates a MailItemRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.MailItemRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.MailItemRes} MailItemRes
         */
        MailItemRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.MailItemRes)
                return object;
            var message = new $root.Lobby.MailItemRes();
            if (object.um_id != null)
                if ($util.Long)
                    (message.um_id = $util.Long.fromValue(object.um_id)).unsigned = false;
                else if (typeof object.um_id === "string")
                    message.um_id = parseInt(object.um_id, 10);
                else if (typeof object.um_id === "number")
                    message.um_id = object.um_id;
                else if (typeof object.um_id === "object")
                    message.um_id = new $util.LongBits(object.um_id.low >>> 0, object.um_id.high >>> 0).toNumber();
            if (object.mail_type != null)
                message.mail_type = object.mail_type | 0;
            if (object.title != null)
                message.title = String(object.title);
            if (object.mail_state != null)
                message.mail_state = object.mail_state | 0;
            if (object.context != null)
                message.context = String(object.context);
            if (object.coin_a != null)
                message.coin_a = object.coin_a | 0;
            if (object.coin_b != null)
                message.coin_b = object.coin_b | 0;
            if (object.coin_c != null)
                message.coin_c = object.coin_c | 0;
            if (object.create_time != null)
                if ($util.Long)
                    (message.create_time = $util.Long.fromValue(object.create_time)).unsigned = false;
                else if (typeof object.create_time === "string")
                    message.create_time = parseInt(object.create_time, 10);
                else if (typeof object.create_time === "number")
                    message.create_time = object.create_time;
                else if (typeof object.create_time === "object")
                    message.create_time = new $util.LongBits(object.create_time.low >>> 0, object.create_time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a MailItemRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.MailItemRes
         * @static
         * @param {Lobby.MailItemRes} message MailItemRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MailItemRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.um_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.um_id = options.longs === String ? "0" : 0;
                object.mail_type = 0;
                object.title = "";
                object.mail_state = 0;
                object.context = "";
                object.coin_a = 0;
                object.coin_b = 0;
                object.coin_c = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.create_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.create_time = options.longs === String ? "0" : 0;
            }
            if (message.um_id != null && message.hasOwnProperty("um_id"))
                if (typeof message.um_id === "number")
                    object.um_id = options.longs === String ? String(message.um_id) : message.um_id;
                else
                    object.um_id = options.longs === String ? $util.Long.prototype.toString.call(message.um_id) : options.longs === Number ? new $util.LongBits(message.um_id.low >>> 0, message.um_id.high >>> 0).toNumber() : message.um_id;
            if (message.mail_type != null && message.hasOwnProperty("mail_type"))
                object.mail_type = message.mail_type;
            if (message.title != null && message.hasOwnProperty("title"))
                object.title = message.title;
            if (message.mail_state != null && message.hasOwnProperty("mail_state"))
                object.mail_state = message.mail_state;
            if (message.context != null && message.hasOwnProperty("context"))
                object.context = message.context;
            if (message.coin_a != null && message.hasOwnProperty("coin_a"))
                object.coin_a = message.coin_a;
            if (message.coin_b != null && message.hasOwnProperty("coin_b"))
                object.coin_b = message.coin_b;
            if (message.coin_c != null && message.hasOwnProperty("coin_c"))
                object.coin_c = message.coin_c;
            if (message.create_time != null && message.hasOwnProperty("create_time"))
                if (typeof message.create_time === "number")
                    object.create_time = options.longs === String ? String(message.create_time) : message.create_time;
                else
                    object.create_time = options.longs === String ? $util.Long.prototype.toString.call(message.create_time) : options.longs === Number ? new $util.LongBits(message.create_time.low >>> 0, message.create_time.high >>> 0).toNumber() : message.create_time;
            return object;
        };

        /**
         * Converts this MailItemRes to JSON.
         * @function toJSON
         * @memberof Lobby.MailItemRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MailItemRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MailItemRes;
    })();

    Lobby.UserGameDataReq = (function() {

        /**
         * Properties of a UserGameDataReq.
         * @memberof Lobby
         * @interface IUserGameDataReq
         */

        /**
         * Constructs a new UserGameDataReq.
         * @memberof Lobby
         * @classdesc Represents a UserGameDataReq.
         * @implements IUserGameDataReq
         * @constructor
         * @param {Lobby.IUserGameDataReq=} [properties] Properties to set
         */
        function UserGameDataReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new UserGameDataReq instance using the specified properties.
         * @function create
         * @memberof Lobby.UserGameDataReq
         * @static
         * @param {Lobby.IUserGameDataReq=} [properties] Properties to set
         * @returns {Lobby.UserGameDataReq} UserGameDataReq instance
         */
        UserGameDataReq.create = function create(properties) {
            return new UserGameDataReq(properties);
        };

        /**
         * Encodes the specified UserGameDataReq message. Does not implicitly {@link Lobby.UserGameDataReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserGameDataReq
         * @static
         * @param {Lobby.IUserGameDataReq} message UserGameDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserGameDataReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified UserGameDataReq message, length delimited. Does not implicitly {@link Lobby.UserGameDataReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserGameDataReq
         * @static
         * @param {Lobby.IUserGameDataReq} message UserGameDataReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserGameDataReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserGameDataReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserGameDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserGameDataReq} UserGameDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserGameDataReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserGameDataReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserGameDataReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserGameDataReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserGameDataReq} UserGameDataReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserGameDataReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserGameDataReq message.
         * @function verify
         * @memberof Lobby.UserGameDataReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserGameDataReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a UserGameDataReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserGameDataReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserGameDataReq} UserGameDataReq
         */
        UserGameDataReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserGameDataReq)
                return object;
            return new $root.Lobby.UserGameDataReq();
        };

        /**
         * Creates a plain object from a UserGameDataReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserGameDataReq
         * @static
         * @param {Lobby.UserGameDataReq} message UserGameDataReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserGameDataReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this UserGameDataReq to JSON.
         * @function toJSON
         * @memberof Lobby.UserGameDataReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserGameDataReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserGameDataReq;
    })();

    Lobby.UserGameDataRes = (function() {

        /**
         * Properties of a UserGameDataRes.
         * @memberof Lobby
         * @interface IUserGameDataRes
         * @property {number|null} [cur_dan] UserGameDataRes cur_dan
         * @property {number|null} [cur_star] UserGameDataRes cur_star
         * @property {number|null} [max_dan] UserGameDataRes max_dan
         * @property {number|null} [max_star] UserGameDataRes max_star
         * @property {number|null} [play_count] UserGameDataRes play_count
         * @property {number|null} [victory_count] UserGameDataRes victory_count
         * @property {number|null} [spring_count] UserGameDataRes spring_count
         * @property {number|null} [bomb_count] UserGameDataRes bomb_count
         * @property {number|null} [max_multiple] UserGameDataRes max_multiple
         * @property {number|null} [max_victory] UserGameDataRes max_victory
         * @property {number|null} [victory_rate] UserGameDataRes victory_rate
         */

        /**
         * Constructs a new UserGameDataRes.
         * @memberof Lobby
         * @classdesc Represents a UserGameDataRes.
         * @implements IUserGameDataRes
         * @constructor
         * @param {Lobby.IUserGameDataRes=} [properties] Properties to set
         */
        function UserGameDataRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserGameDataRes cur_dan.
         * @member {number} cur_dan
         * @memberof Lobby.UserGameDataRes
         * @instance
         */
        UserGameDataRes.prototype.cur_dan = 0;

        /**
         * UserGameDataRes cur_star.
         * @member {number} cur_star
         * @memberof Lobby.UserGameDataRes
         * @instance
         */
        UserGameDataRes.prototype.cur_star = 0;

        /**
         * UserGameDataRes max_dan.
         * @member {number} max_dan
         * @memberof Lobby.UserGameDataRes
         * @instance
         */
        UserGameDataRes.prototype.max_dan = 0;

        /**
         * UserGameDataRes max_star.
         * @member {number} max_star
         * @memberof Lobby.UserGameDataRes
         * @instance
         */
        UserGameDataRes.prototype.max_star = 0;

        /**
         * UserGameDataRes play_count.
         * @member {number} play_count
         * @memberof Lobby.UserGameDataRes
         * @instance
         */
        UserGameDataRes.prototype.play_count = 0;

        /**
         * UserGameDataRes victory_count.
         * @member {number} victory_count
         * @memberof Lobby.UserGameDataRes
         * @instance
         */
        UserGameDataRes.prototype.victory_count = 0;

        /**
         * UserGameDataRes spring_count.
         * @member {number} spring_count
         * @memberof Lobby.UserGameDataRes
         * @instance
         */
        UserGameDataRes.prototype.spring_count = 0;

        /**
         * UserGameDataRes bomb_count.
         * @member {number} bomb_count
         * @memberof Lobby.UserGameDataRes
         * @instance
         */
        UserGameDataRes.prototype.bomb_count = 0;

        /**
         * UserGameDataRes max_multiple.
         * @member {number} max_multiple
         * @memberof Lobby.UserGameDataRes
         * @instance
         */
        UserGameDataRes.prototype.max_multiple = 0;

        /**
         * UserGameDataRes max_victory.
         * @member {number} max_victory
         * @memberof Lobby.UserGameDataRes
         * @instance
         */
        UserGameDataRes.prototype.max_victory = 0;

        /**
         * UserGameDataRes victory_rate.
         * @member {number} victory_rate
         * @memberof Lobby.UserGameDataRes
         * @instance
         */
        UserGameDataRes.prototype.victory_rate = 0;

        /**
         * Creates a new UserGameDataRes instance using the specified properties.
         * @function create
         * @memberof Lobby.UserGameDataRes
         * @static
         * @param {Lobby.IUserGameDataRes=} [properties] Properties to set
         * @returns {Lobby.UserGameDataRes} UserGameDataRes instance
         */
        UserGameDataRes.create = function create(properties) {
            return new UserGameDataRes(properties);
        };

        /**
         * Encodes the specified UserGameDataRes message. Does not implicitly {@link Lobby.UserGameDataRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserGameDataRes
         * @static
         * @param {Lobby.IUserGameDataRes} message UserGameDataRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserGameDataRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.cur_dan != null && message.hasOwnProperty("cur_dan"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.cur_dan);
            if (message.cur_star != null && message.hasOwnProperty("cur_star"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.cur_star);
            if (message.max_dan != null && message.hasOwnProperty("max_dan"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.max_dan);
            if (message.max_star != null && message.hasOwnProperty("max_star"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.max_star);
            if (message.play_count != null && message.hasOwnProperty("play_count"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.play_count);
            if (message.victory_count != null && message.hasOwnProperty("victory_count"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.victory_count);
            if (message.spring_count != null && message.hasOwnProperty("spring_count"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.spring_count);
            if (message.bomb_count != null && message.hasOwnProperty("bomb_count"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.bomb_count);
            if (message.max_multiple != null && message.hasOwnProperty("max_multiple"))
                writer.uint32(/* id 9, wireType 0 =*/72).int32(message.max_multiple);
            if (message.max_victory != null && message.hasOwnProperty("max_victory"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.max_victory);
            if (message.victory_rate != null && message.hasOwnProperty("victory_rate"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.victory_rate);
            return writer;
        };

        /**
         * Encodes the specified UserGameDataRes message, length delimited. Does not implicitly {@link Lobby.UserGameDataRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserGameDataRes
         * @static
         * @param {Lobby.IUserGameDataRes} message UserGameDataRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserGameDataRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserGameDataRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserGameDataRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserGameDataRes} UserGameDataRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserGameDataRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserGameDataRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.cur_dan = reader.int32();
                    break;
                case 2:
                    message.cur_star = reader.int32();
                    break;
                case 3:
                    message.max_dan = reader.int32();
                    break;
                case 4:
                    message.max_star = reader.int32();
                    break;
                case 5:
                    message.play_count = reader.int32();
                    break;
                case 6:
                    message.victory_count = reader.int32();
                    break;
                case 7:
                    message.spring_count = reader.int32();
                    break;
                case 8:
                    message.bomb_count = reader.int32();
                    break;
                case 9:
                    message.max_multiple = reader.int32();
                    break;
                case 10:
                    message.max_victory = reader.int32();
                    break;
                case 11:
                    message.victory_rate = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserGameDataRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserGameDataRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserGameDataRes} UserGameDataRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserGameDataRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserGameDataRes message.
         * @function verify
         * @memberof Lobby.UserGameDataRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserGameDataRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.cur_dan != null && message.hasOwnProperty("cur_dan"))
                if (!$util.isInteger(message.cur_dan))
                    return "cur_dan: integer expected";
            if (message.cur_star != null && message.hasOwnProperty("cur_star"))
                if (!$util.isInteger(message.cur_star))
                    return "cur_star: integer expected";
            if (message.max_dan != null && message.hasOwnProperty("max_dan"))
                if (!$util.isInteger(message.max_dan))
                    return "max_dan: integer expected";
            if (message.max_star != null && message.hasOwnProperty("max_star"))
                if (!$util.isInteger(message.max_star))
                    return "max_star: integer expected";
            if (message.play_count != null && message.hasOwnProperty("play_count"))
                if (!$util.isInteger(message.play_count))
                    return "play_count: integer expected";
            if (message.victory_count != null && message.hasOwnProperty("victory_count"))
                if (!$util.isInteger(message.victory_count))
                    return "victory_count: integer expected";
            if (message.spring_count != null && message.hasOwnProperty("spring_count"))
                if (!$util.isInteger(message.spring_count))
                    return "spring_count: integer expected";
            if (message.bomb_count != null && message.hasOwnProperty("bomb_count"))
                if (!$util.isInteger(message.bomb_count))
                    return "bomb_count: integer expected";
            if (message.max_multiple != null && message.hasOwnProperty("max_multiple"))
                if (!$util.isInteger(message.max_multiple))
                    return "max_multiple: integer expected";
            if (message.max_victory != null && message.hasOwnProperty("max_victory"))
                if (!$util.isInteger(message.max_victory))
                    return "max_victory: integer expected";
            if (message.victory_rate != null && message.hasOwnProperty("victory_rate"))
                if (!$util.isInteger(message.victory_rate))
                    return "victory_rate: integer expected";
            return null;
        };

        /**
         * Creates a UserGameDataRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserGameDataRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserGameDataRes} UserGameDataRes
         */
        UserGameDataRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserGameDataRes)
                return object;
            var message = new $root.Lobby.UserGameDataRes();
            if (object.cur_dan != null)
                message.cur_dan = object.cur_dan | 0;
            if (object.cur_star != null)
                message.cur_star = object.cur_star | 0;
            if (object.max_dan != null)
                message.max_dan = object.max_dan | 0;
            if (object.max_star != null)
                message.max_star = object.max_star | 0;
            if (object.play_count != null)
                message.play_count = object.play_count | 0;
            if (object.victory_count != null)
                message.victory_count = object.victory_count | 0;
            if (object.spring_count != null)
                message.spring_count = object.spring_count | 0;
            if (object.bomb_count != null)
                message.bomb_count = object.bomb_count | 0;
            if (object.max_multiple != null)
                message.max_multiple = object.max_multiple | 0;
            if (object.max_victory != null)
                message.max_victory = object.max_victory | 0;
            if (object.victory_rate != null)
                message.victory_rate = object.victory_rate | 0;
            return message;
        };

        /**
         * Creates a plain object from a UserGameDataRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserGameDataRes
         * @static
         * @param {Lobby.UserGameDataRes} message UserGameDataRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserGameDataRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.cur_dan = 0;
                object.cur_star = 0;
                object.max_dan = 0;
                object.max_star = 0;
                object.play_count = 0;
                object.victory_count = 0;
                object.spring_count = 0;
                object.bomb_count = 0;
                object.max_multiple = 0;
                object.max_victory = 0;
                object.victory_rate = 0;
            }
            if (message.cur_dan != null && message.hasOwnProperty("cur_dan"))
                object.cur_dan = message.cur_dan;
            if (message.cur_star != null && message.hasOwnProperty("cur_star"))
                object.cur_star = message.cur_star;
            if (message.max_dan != null && message.hasOwnProperty("max_dan"))
                object.max_dan = message.max_dan;
            if (message.max_star != null && message.hasOwnProperty("max_star"))
                object.max_star = message.max_star;
            if (message.play_count != null && message.hasOwnProperty("play_count"))
                object.play_count = message.play_count;
            if (message.victory_count != null && message.hasOwnProperty("victory_count"))
                object.victory_count = message.victory_count;
            if (message.spring_count != null && message.hasOwnProperty("spring_count"))
                object.spring_count = message.spring_count;
            if (message.bomb_count != null && message.hasOwnProperty("bomb_count"))
                object.bomb_count = message.bomb_count;
            if (message.max_multiple != null && message.hasOwnProperty("max_multiple"))
                object.max_multiple = message.max_multiple;
            if (message.max_victory != null && message.hasOwnProperty("max_victory"))
                object.max_victory = message.max_victory;
            if (message.victory_rate != null && message.hasOwnProperty("victory_rate"))
                object.victory_rate = message.victory_rate;
            return object;
        };

        /**
         * Converts this UserGameDataRes to JSON.
         * @function toJSON
         * @memberof Lobby.UserGameDataRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserGameDataRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserGameDataRes;
    })();

    Lobby.SkinReq = (function() {

        /**
         * Properties of a SkinReq.
         * @memberof Lobby
         * @interface ISkinReq
         * @property {number|null} [handle_type] SkinReq handle_type
         * @property {number|Long|null} [handle_value] SkinReq handle_value
         */

        /**
         * Constructs a new SkinReq.
         * @memberof Lobby
         * @classdesc Represents a SkinReq.
         * @implements ISkinReq
         * @constructor
         * @param {Lobby.ISkinReq=} [properties] Properties to set
         */
        function SkinReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SkinReq handle_type.
         * @member {number} handle_type
         * @memberof Lobby.SkinReq
         * @instance
         */
        SkinReq.prototype.handle_type = 0;

        /**
         * SkinReq handle_value.
         * @member {number|Long} handle_value
         * @memberof Lobby.SkinReq
         * @instance
         */
        SkinReq.prototype.handle_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new SkinReq instance using the specified properties.
         * @function create
         * @memberof Lobby.SkinReq
         * @static
         * @param {Lobby.ISkinReq=} [properties] Properties to set
         * @returns {Lobby.SkinReq} SkinReq instance
         */
        SkinReq.create = function create(properties) {
            return new SkinReq(properties);
        };

        /**
         * Encodes the specified SkinReq message. Does not implicitly {@link Lobby.SkinReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.SkinReq
         * @static
         * @param {Lobby.ISkinReq} message SkinReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SkinReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.handle_value);
            return writer;
        };

        /**
         * Encodes the specified SkinReq message, length delimited. Does not implicitly {@link Lobby.SkinReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.SkinReq
         * @static
         * @param {Lobby.ISkinReq} message SkinReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SkinReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SkinReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.SkinReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.SkinReq} SkinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SkinReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.SkinReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SkinReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.SkinReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.SkinReq} SkinReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SkinReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SkinReq message.
         * @function verify
         * @memberof Lobby.SkinReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SkinReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isInteger(message.handle_value) && !(message.handle_value && $util.isInteger(message.handle_value.low) && $util.isInteger(message.handle_value.high)))
                    return "handle_value: integer|Long expected";
            return null;
        };

        /**
         * Creates a SkinReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.SkinReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.SkinReq} SkinReq
         */
        SkinReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.SkinReq)
                return object;
            var message = new $root.Lobby.SkinReq();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                if ($util.Long)
                    (message.handle_value = $util.Long.fromValue(object.handle_value)).unsigned = false;
                else if (typeof object.handle_value === "string")
                    message.handle_value = parseInt(object.handle_value, 10);
                else if (typeof object.handle_value === "number")
                    message.handle_value = object.handle_value;
                else if (typeof object.handle_value === "object")
                    message.handle_value = new $util.LongBits(object.handle_value.low >>> 0, object.handle_value.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a SkinReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.SkinReq
         * @static
         * @param {Lobby.SkinReq} message SkinReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SkinReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.handle_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.handle_value = options.longs === String ? "0" : 0;
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (typeof message.handle_value === "number")
                    object.handle_value = options.longs === String ? String(message.handle_value) : message.handle_value;
                else
                    object.handle_value = options.longs === String ? $util.Long.prototype.toString.call(message.handle_value) : options.longs === Number ? new $util.LongBits(message.handle_value.low >>> 0, message.handle_value.high >>> 0).toNumber() : message.handle_value;
            return object;
        };

        /**
         * Converts this SkinReq to JSON.
         * @function toJSON
         * @memberof Lobby.SkinReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SkinReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SkinReq;
    })();

    Lobby.SkinRes = (function() {

        /**
         * Properties of a SkinRes.
         * @memberof Lobby
         * @interface ISkinRes
         * @property {number|null} [handle_type] SkinRes handle_type
         * @property {number|Long|null} [handle_value] SkinRes handle_value
         * @property {number|null} [code] SkinRes code
         * @property {string|null} [message] SkinRes message
         * @property {Array.<Lobby.ISkinItemRes>|null} [touxiang_list] SkinRes touxiang_list
         * @property {Array.<Lobby.ISkinItemRes>|null} [naozhong_list] SkinRes naozhong_list
         * @property {Array.<Lobby.ISkinItemRes>|null} [qipao_list] SkinRes qipao_list
         */

        /**
         * Constructs a new SkinRes.
         * @memberof Lobby
         * @classdesc Represents a SkinRes.
         * @implements ISkinRes
         * @constructor
         * @param {Lobby.ISkinRes=} [properties] Properties to set
         */
        function SkinRes(properties) {
            this.touxiang_list = [];
            this.naozhong_list = [];
            this.qipao_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SkinRes handle_type.
         * @member {number} handle_type
         * @memberof Lobby.SkinRes
         * @instance
         */
        SkinRes.prototype.handle_type = 0;

        /**
         * SkinRes handle_value.
         * @member {number|Long} handle_value
         * @memberof Lobby.SkinRes
         * @instance
         */
        SkinRes.prototype.handle_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SkinRes code.
         * @member {number} code
         * @memberof Lobby.SkinRes
         * @instance
         */
        SkinRes.prototype.code = 0;

        /**
         * SkinRes message.
         * @member {string} message
         * @memberof Lobby.SkinRes
         * @instance
         */
        SkinRes.prototype.message = "";

        /**
         * SkinRes touxiang_list.
         * @member {Array.<Lobby.ISkinItemRes>} touxiang_list
         * @memberof Lobby.SkinRes
         * @instance
         */
        SkinRes.prototype.touxiang_list = $util.emptyArray;

        /**
         * SkinRes naozhong_list.
         * @member {Array.<Lobby.ISkinItemRes>} naozhong_list
         * @memberof Lobby.SkinRes
         * @instance
         */
        SkinRes.prototype.naozhong_list = $util.emptyArray;

        /**
         * SkinRes qipao_list.
         * @member {Array.<Lobby.ISkinItemRes>} qipao_list
         * @memberof Lobby.SkinRes
         * @instance
         */
        SkinRes.prototype.qipao_list = $util.emptyArray;

        /**
         * Creates a new SkinRes instance using the specified properties.
         * @function create
         * @memberof Lobby.SkinRes
         * @static
         * @param {Lobby.ISkinRes=} [properties] Properties to set
         * @returns {Lobby.SkinRes} SkinRes instance
         */
        SkinRes.create = function create(properties) {
            return new SkinRes(properties);
        };

        /**
         * Encodes the specified SkinRes message. Does not implicitly {@link Lobby.SkinRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.SkinRes
         * @static
         * @param {Lobby.ISkinRes} message SkinRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SkinRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.handle_value);
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.code);
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.message);
            if (message.touxiang_list != null && message.touxiang_list.length)
                for (var i = 0; i < message.touxiang_list.length; ++i)
                    $root.Lobby.SkinItemRes.encode(message.touxiang_list[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.naozhong_list != null && message.naozhong_list.length)
                for (var i = 0; i < message.naozhong_list.length; ++i)
                    $root.Lobby.SkinItemRes.encode(message.naozhong_list[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.qipao_list != null && message.qipao_list.length)
                for (var i = 0; i < message.qipao_list.length; ++i)
                    $root.Lobby.SkinItemRes.encode(message.qipao_list[i], writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SkinRes message, length delimited. Does not implicitly {@link Lobby.SkinRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.SkinRes
         * @static
         * @param {Lobby.ISkinRes} message SkinRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SkinRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SkinRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.SkinRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.SkinRes} SkinRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SkinRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.SkinRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.int64();
                    break;
                case 3:
                    message.code = reader.int32();
                    break;
                case 4:
                    message.message = reader.string();
                    break;
                case 5:
                    if (!(message.touxiang_list && message.touxiang_list.length))
                        message.touxiang_list = [];
                    message.touxiang_list.push($root.Lobby.SkinItemRes.decode(reader, reader.uint32()));
                    break;
                case 6:
                    if (!(message.naozhong_list && message.naozhong_list.length))
                        message.naozhong_list = [];
                    message.naozhong_list.push($root.Lobby.SkinItemRes.decode(reader, reader.uint32()));
                    break;
                case 7:
                    if (!(message.qipao_list && message.qipao_list.length))
                        message.qipao_list = [];
                    message.qipao_list.push($root.Lobby.SkinItemRes.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SkinRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.SkinRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.SkinRes} SkinRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SkinRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SkinRes message.
         * @function verify
         * @memberof Lobby.SkinRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SkinRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isInteger(message.handle_value) && !(message.handle_value && $util.isInteger(message.handle_value.low) && $util.isInteger(message.handle_value.high)))
                    return "handle_value: integer|Long expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            if (message.touxiang_list != null && message.hasOwnProperty("touxiang_list")) {
                if (!Array.isArray(message.touxiang_list))
                    return "touxiang_list: array expected";
                for (var i = 0; i < message.touxiang_list.length; ++i) {
                    var error = $root.Lobby.SkinItemRes.verify(message.touxiang_list[i]);
                    if (error)
                        return "touxiang_list." + error;
                }
            }
            if (message.naozhong_list != null && message.hasOwnProperty("naozhong_list")) {
                if (!Array.isArray(message.naozhong_list))
                    return "naozhong_list: array expected";
                for (var i = 0; i < message.naozhong_list.length; ++i) {
                    var error = $root.Lobby.SkinItemRes.verify(message.naozhong_list[i]);
                    if (error)
                        return "naozhong_list." + error;
                }
            }
            if (message.qipao_list != null && message.hasOwnProperty("qipao_list")) {
                if (!Array.isArray(message.qipao_list))
                    return "qipao_list: array expected";
                for (var i = 0; i < message.qipao_list.length; ++i) {
                    var error = $root.Lobby.SkinItemRes.verify(message.qipao_list[i]);
                    if (error)
                        return "qipao_list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a SkinRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.SkinRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.SkinRes} SkinRes
         */
        SkinRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.SkinRes)
                return object;
            var message = new $root.Lobby.SkinRes();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                if ($util.Long)
                    (message.handle_value = $util.Long.fromValue(object.handle_value)).unsigned = false;
                else if (typeof object.handle_value === "string")
                    message.handle_value = parseInt(object.handle_value, 10);
                else if (typeof object.handle_value === "number")
                    message.handle_value = object.handle_value;
                else if (typeof object.handle_value === "object")
                    message.handle_value = new $util.LongBits(object.handle_value.low >>> 0, object.handle_value.high >>> 0).toNumber();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.message != null)
                message.message = String(object.message);
            if (object.touxiang_list) {
                if (!Array.isArray(object.touxiang_list))
                    throw TypeError(".Lobby.SkinRes.touxiang_list: array expected");
                message.touxiang_list = [];
                for (var i = 0; i < object.touxiang_list.length; ++i) {
                    if (typeof object.touxiang_list[i] !== "object")
                        throw TypeError(".Lobby.SkinRes.touxiang_list: object expected");
                    message.touxiang_list[i] = $root.Lobby.SkinItemRes.fromObject(object.touxiang_list[i]);
                }
            }
            if (object.naozhong_list) {
                if (!Array.isArray(object.naozhong_list))
                    throw TypeError(".Lobby.SkinRes.naozhong_list: array expected");
                message.naozhong_list = [];
                for (var i = 0; i < object.naozhong_list.length; ++i) {
                    if (typeof object.naozhong_list[i] !== "object")
                        throw TypeError(".Lobby.SkinRes.naozhong_list: object expected");
                    message.naozhong_list[i] = $root.Lobby.SkinItemRes.fromObject(object.naozhong_list[i]);
                }
            }
            if (object.qipao_list) {
                if (!Array.isArray(object.qipao_list))
                    throw TypeError(".Lobby.SkinRes.qipao_list: array expected");
                message.qipao_list = [];
                for (var i = 0; i < object.qipao_list.length; ++i) {
                    if (typeof object.qipao_list[i] !== "object")
                        throw TypeError(".Lobby.SkinRes.qipao_list: object expected");
                    message.qipao_list[i] = $root.Lobby.SkinItemRes.fromObject(object.qipao_list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a SkinRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.SkinRes
         * @static
         * @param {Lobby.SkinRes} message SkinRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SkinRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.touxiang_list = [];
                object.naozhong_list = [];
                object.qipao_list = [];
            }
            if (options.defaults) {
                object.handle_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.handle_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.handle_value = options.longs === String ? "0" : 0;
                object.code = 0;
                object.message = "";
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (typeof message.handle_value === "number")
                    object.handle_value = options.longs === String ? String(message.handle_value) : message.handle_value;
                else
                    object.handle_value = options.longs === String ? $util.Long.prototype.toString.call(message.handle_value) : options.longs === Number ? new $util.LongBits(message.handle_value.low >>> 0, message.handle_value.high >>> 0).toNumber() : message.handle_value;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            if (message.touxiang_list && message.touxiang_list.length) {
                object.touxiang_list = [];
                for (var j = 0; j < message.touxiang_list.length; ++j)
                    object.touxiang_list[j] = $root.Lobby.SkinItemRes.toObject(message.touxiang_list[j], options);
            }
            if (message.naozhong_list && message.naozhong_list.length) {
                object.naozhong_list = [];
                for (var j = 0; j < message.naozhong_list.length; ++j)
                    object.naozhong_list[j] = $root.Lobby.SkinItemRes.toObject(message.naozhong_list[j], options);
            }
            if (message.qipao_list && message.qipao_list.length) {
                object.qipao_list = [];
                for (var j = 0; j < message.qipao_list.length; ++j)
                    object.qipao_list[j] = $root.Lobby.SkinItemRes.toObject(message.qipao_list[j], options);
            }
            return object;
        };

        /**
         * Converts this SkinRes to JSON.
         * @function toJSON
         * @memberof Lobby.SkinRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SkinRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SkinRes;
    })();

    Lobby.SkinItemRes = (function() {

        /**
         * Properties of a SkinItemRes.
         * @memberof Lobby
         * @interface ISkinItemRes
         * @property {number|Long|null} [us_id] SkinItemRes us_id
         * @property {number|null} [skin_id] SkinItemRes skin_id
         * @property {number|null} [skin_type] SkinItemRes skin_type
         * @property {number|Long|null} [expire_time] SkinItemRes expire_time
         */

        /**
         * Constructs a new SkinItemRes.
         * @memberof Lobby
         * @classdesc Represents a SkinItemRes.
         * @implements ISkinItemRes
         * @constructor
         * @param {Lobby.ISkinItemRes=} [properties] Properties to set
         */
        function SkinItemRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SkinItemRes us_id.
         * @member {number|Long} us_id
         * @memberof Lobby.SkinItemRes
         * @instance
         */
        SkinItemRes.prototype.us_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SkinItemRes skin_id.
         * @member {number} skin_id
         * @memberof Lobby.SkinItemRes
         * @instance
         */
        SkinItemRes.prototype.skin_id = 0;

        /**
         * SkinItemRes skin_type.
         * @member {number} skin_type
         * @memberof Lobby.SkinItemRes
         * @instance
         */
        SkinItemRes.prototype.skin_type = 0;

        /**
         * SkinItemRes expire_time.
         * @member {number|Long} expire_time
         * @memberof Lobby.SkinItemRes
         * @instance
         */
        SkinItemRes.prototype.expire_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new SkinItemRes instance using the specified properties.
         * @function create
         * @memberof Lobby.SkinItemRes
         * @static
         * @param {Lobby.ISkinItemRes=} [properties] Properties to set
         * @returns {Lobby.SkinItemRes} SkinItemRes instance
         */
        SkinItemRes.create = function create(properties) {
            return new SkinItemRes(properties);
        };

        /**
         * Encodes the specified SkinItemRes message. Does not implicitly {@link Lobby.SkinItemRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.SkinItemRes
         * @static
         * @param {Lobby.ISkinItemRes} message SkinItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SkinItemRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.us_id != null && message.hasOwnProperty("us_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.us_id);
            if (message.skin_id != null && message.hasOwnProperty("skin_id"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.skin_id);
            if (message.skin_type != null && message.hasOwnProperty("skin_type"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.skin_type);
            if (message.expire_time != null && message.hasOwnProperty("expire_time"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.expire_time);
            return writer;
        };

        /**
         * Encodes the specified SkinItemRes message, length delimited. Does not implicitly {@link Lobby.SkinItemRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.SkinItemRes
         * @static
         * @param {Lobby.ISkinItemRes} message SkinItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SkinItemRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SkinItemRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.SkinItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.SkinItemRes} SkinItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SkinItemRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.SkinItemRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.us_id = reader.int64();
                    break;
                case 2:
                    message.skin_id = reader.int32();
                    break;
                case 3:
                    message.skin_type = reader.int32();
                    break;
                case 4:
                    message.expire_time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SkinItemRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.SkinItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.SkinItemRes} SkinItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SkinItemRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SkinItemRes message.
         * @function verify
         * @memberof Lobby.SkinItemRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SkinItemRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.us_id != null && message.hasOwnProperty("us_id"))
                if (!$util.isInteger(message.us_id) && !(message.us_id && $util.isInteger(message.us_id.low) && $util.isInteger(message.us_id.high)))
                    return "us_id: integer|Long expected";
            if (message.skin_id != null && message.hasOwnProperty("skin_id"))
                if (!$util.isInteger(message.skin_id))
                    return "skin_id: integer expected";
            if (message.skin_type != null && message.hasOwnProperty("skin_type"))
                if (!$util.isInteger(message.skin_type))
                    return "skin_type: integer expected";
            if (message.expire_time != null && message.hasOwnProperty("expire_time"))
                if (!$util.isInteger(message.expire_time) && !(message.expire_time && $util.isInteger(message.expire_time.low) && $util.isInteger(message.expire_time.high)))
                    return "expire_time: integer|Long expected";
            return null;
        };

        /**
         * Creates a SkinItemRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.SkinItemRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.SkinItemRes} SkinItemRes
         */
        SkinItemRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.SkinItemRes)
                return object;
            var message = new $root.Lobby.SkinItemRes();
            if (object.us_id != null)
                if ($util.Long)
                    (message.us_id = $util.Long.fromValue(object.us_id)).unsigned = false;
                else if (typeof object.us_id === "string")
                    message.us_id = parseInt(object.us_id, 10);
                else if (typeof object.us_id === "number")
                    message.us_id = object.us_id;
                else if (typeof object.us_id === "object")
                    message.us_id = new $util.LongBits(object.us_id.low >>> 0, object.us_id.high >>> 0).toNumber();
            if (object.skin_id != null)
                message.skin_id = object.skin_id | 0;
            if (object.skin_type != null)
                message.skin_type = object.skin_type | 0;
            if (object.expire_time != null)
                if ($util.Long)
                    (message.expire_time = $util.Long.fromValue(object.expire_time)).unsigned = false;
                else if (typeof object.expire_time === "string")
                    message.expire_time = parseInt(object.expire_time, 10);
                else if (typeof object.expire_time === "number")
                    message.expire_time = object.expire_time;
                else if (typeof object.expire_time === "object")
                    message.expire_time = new $util.LongBits(object.expire_time.low >>> 0, object.expire_time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a SkinItemRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.SkinItemRes
         * @static
         * @param {Lobby.SkinItemRes} message SkinItemRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SkinItemRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.us_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.us_id = options.longs === String ? "0" : 0;
                object.skin_id = 0;
                object.skin_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.expire_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.expire_time = options.longs === String ? "0" : 0;
            }
            if (message.us_id != null && message.hasOwnProperty("us_id"))
                if (typeof message.us_id === "number")
                    object.us_id = options.longs === String ? String(message.us_id) : message.us_id;
                else
                    object.us_id = options.longs === String ? $util.Long.prototype.toString.call(message.us_id) : options.longs === Number ? new $util.LongBits(message.us_id.low >>> 0, message.us_id.high >>> 0).toNumber() : message.us_id;
            if (message.skin_id != null && message.hasOwnProperty("skin_id"))
                object.skin_id = message.skin_id;
            if (message.skin_type != null && message.hasOwnProperty("skin_type"))
                object.skin_type = message.skin_type;
            if (message.expire_time != null && message.hasOwnProperty("expire_time"))
                if (typeof message.expire_time === "number")
                    object.expire_time = options.longs === String ? String(message.expire_time) : message.expire_time;
                else
                    object.expire_time = options.longs === String ? $util.Long.prototype.toString.call(message.expire_time) : options.longs === Number ? new $util.LongBits(message.expire_time.low >>> 0, message.expire_time.high >>> 0).toNumber() : message.expire_time;
            return object;
        };

        /**
         * Converts this SkinItemRes to JSON.
         * @function toJSON
         * @memberof Lobby.SkinItemRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SkinItemRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SkinItemRes;
    })();

    Lobby.SeasonReq = (function() {

        /**
         * Properties of a SeasonReq.
         * @memberof Lobby
         * @interface ISeasonReq
         * @property {number|null} [handle_type] SeasonReq handle_type
         * @property {number|Long|null} [handle_value] SeasonReq handle_value
         */

        /**
         * Constructs a new SeasonReq.
         * @memberof Lobby
         * @classdesc Represents a SeasonReq.
         * @implements ISeasonReq
         * @constructor
         * @param {Lobby.ISeasonReq=} [properties] Properties to set
         */
        function SeasonReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeasonReq handle_type.
         * @member {number} handle_type
         * @memberof Lobby.SeasonReq
         * @instance
         */
        SeasonReq.prototype.handle_type = 0;

        /**
         * SeasonReq handle_value.
         * @member {number|Long} handle_value
         * @memberof Lobby.SeasonReq
         * @instance
         */
        SeasonReq.prototype.handle_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new SeasonReq instance using the specified properties.
         * @function create
         * @memberof Lobby.SeasonReq
         * @static
         * @param {Lobby.ISeasonReq=} [properties] Properties to set
         * @returns {Lobby.SeasonReq} SeasonReq instance
         */
        SeasonReq.create = function create(properties) {
            return new SeasonReq(properties);
        };

        /**
         * Encodes the specified SeasonReq message. Does not implicitly {@link Lobby.SeasonReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.SeasonReq
         * @static
         * @param {Lobby.ISeasonReq} message SeasonReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeasonReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.handle_value);
            return writer;
        };

        /**
         * Encodes the specified SeasonReq message, length delimited. Does not implicitly {@link Lobby.SeasonReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.SeasonReq
         * @static
         * @param {Lobby.ISeasonReq} message SeasonReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeasonReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeasonReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.SeasonReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.SeasonReq} SeasonReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeasonReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.SeasonReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SeasonReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.SeasonReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.SeasonReq} SeasonReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeasonReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SeasonReq message.
         * @function verify
         * @memberof Lobby.SeasonReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeasonReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isInteger(message.handle_value) && !(message.handle_value && $util.isInteger(message.handle_value.low) && $util.isInteger(message.handle_value.high)))
                    return "handle_value: integer|Long expected";
            return null;
        };

        /**
         * Creates a SeasonReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.SeasonReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.SeasonReq} SeasonReq
         */
        SeasonReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.SeasonReq)
                return object;
            var message = new $root.Lobby.SeasonReq();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                if ($util.Long)
                    (message.handle_value = $util.Long.fromValue(object.handle_value)).unsigned = false;
                else if (typeof object.handle_value === "string")
                    message.handle_value = parseInt(object.handle_value, 10);
                else if (typeof object.handle_value === "number")
                    message.handle_value = object.handle_value;
                else if (typeof object.handle_value === "object")
                    message.handle_value = new $util.LongBits(object.handle_value.low >>> 0, object.handle_value.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a SeasonReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.SeasonReq
         * @static
         * @param {Lobby.SeasonReq} message SeasonReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeasonReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.handle_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.handle_value = options.longs === String ? "0" : 0;
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (typeof message.handle_value === "number")
                    object.handle_value = options.longs === String ? String(message.handle_value) : message.handle_value;
                else
                    object.handle_value = options.longs === String ? $util.Long.prototype.toString.call(message.handle_value) : options.longs === Number ? new $util.LongBits(message.handle_value.low >>> 0, message.handle_value.high >>> 0).toNumber() : message.handle_value;
            return object;
        };

        /**
         * Converts this SeasonReq to JSON.
         * @function toJSON
         * @memberof Lobby.SeasonReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeasonReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeasonReq;
    })();

    Lobby.SeasonRes = (function() {

        /**
         * Properties of a SeasonRes.
         * @memberof Lobby
         * @interface ISeasonRes
         * @property {number|null} [handle_type] SeasonRes handle_type
         * @property {number|Long|null} [handle_value] SeasonRes handle_value
         * @property {Array.<Lobby.ISeasonItemRes>|null} [season_list] SeasonRes season_list
         * @property {Lobby.ISeasonItemRes|null} [season_item] SeasonRes season_item
         * @property {Lobby.ISeasonItemRes|null} [last_season_item] SeasonRes last_season_item
         */

        /**
         * Constructs a new SeasonRes.
         * @memberof Lobby
         * @classdesc Represents a SeasonRes.
         * @implements ISeasonRes
         * @constructor
         * @param {Lobby.ISeasonRes=} [properties] Properties to set
         */
        function SeasonRes(properties) {
            this.season_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeasonRes handle_type.
         * @member {number} handle_type
         * @memberof Lobby.SeasonRes
         * @instance
         */
        SeasonRes.prototype.handle_type = 0;

        /**
         * SeasonRes handle_value.
         * @member {number|Long} handle_value
         * @memberof Lobby.SeasonRes
         * @instance
         */
        SeasonRes.prototype.handle_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SeasonRes season_list.
         * @member {Array.<Lobby.ISeasonItemRes>} season_list
         * @memberof Lobby.SeasonRes
         * @instance
         */
        SeasonRes.prototype.season_list = $util.emptyArray;

        /**
         * SeasonRes season_item.
         * @member {Lobby.ISeasonItemRes|null|undefined} season_item
         * @memberof Lobby.SeasonRes
         * @instance
         */
        SeasonRes.prototype.season_item = null;

        /**
         * SeasonRes last_season_item.
         * @member {Lobby.ISeasonItemRes|null|undefined} last_season_item
         * @memberof Lobby.SeasonRes
         * @instance
         */
        SeasonRes.prototype.last_season_item = null;

        /**
         * Creates a new SeasonRes instance using the specified properties.
         * @function create
         * @memberof Lobby.SeasonRes
         * @static
         * @param {Lobby.ISeasonRes=} [properties] Properties to set
         * @returns {Lobby.SeasonRes} SeasonRes instance
         */
        SeasonRes.create = function create(properties) {
            return new SeasonRes(properties);
        };

        /**
         * Encodes the specified SeasonRes message. Does not implicitly {@link Lobby.SeasonRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.SeasonRes
         * @static
         * @param {Lobby.ISeasonRes} message SeasonRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeasonRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.handle_value);
            if (message.season_list != null && message.season_list.length)
                for (var i = 0; i < message.season_list.length; ++i)
                    $root.Lobby.SeasonItemRes.encode(message.season_list[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.season_item != null && message.hasOwnProperty("season_item"))
                $root.Lobby.SeasonItemRes.encode(message.season_item, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.last_season_item != null && message.hasOwnProperty("last_season_item"))
                $root.Lobby.SeasonItemRes.encode(message.last_season_item, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified SeasonRes message, length delimited. Does not implicitly {@link Lobby.SeasonRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.SeasonRes
         * @static
         * @param {Lobby.ISeasonRes} message SeasonRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeasonRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeasonRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.SeasonRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.SeasonRes} SeasonRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeasonRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.SeasonRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.int64();
                    break;
                case 3:
                    if (!(message.season_list && message.season_list.length))
                        message.season_list = [];
                    message.season_list.push($root.Lobby.SeasonItemRes.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.season_item = $root.Lobby.SeasonItemRes.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.last_season_item = $root.Lobby.SeasonItemRes.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SeasonRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.SeasonRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.SeasonRes} SeasonRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeasonRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SeasonRes message.
         * @function verify
         * @memberof Lobby.SeasonRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeasonRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isInteger(message.handle_value) && !(message.handle_value && $util.isInteger(message.handle_value.low) && $util.isInteger(message.handle_value.high)))
                    return "handle_value: integer|Long expected";
            if (message.season_list != null && message.hasOwnProperty("season_list")) {
                if (!Array.isArray(message.season_list))
                    return "season_list: array expected";
                for (var i = 0; i < message.season_list.length; ++i) {
                    var error = $root.Lobby.SeasonItemRes.verify(message.season_list[i]);
                    if (error)
                        return "season_list." + error;
                }
            }
            if (message.season_item != null && message.hasOwnProperty("season_item")) {
                var error = $root.Lobby.SeasonItemRes.verify(message.season_item);
                if (error)
                    return "season_item." + error;
            }
            if (message.last_season_item != null && message.hasOwnProperty("last_season_item")) {
                var error = $root.Lobby.SeasonItemRes.verify(message.last_season_item);
                if (error)
                    return "last_season_item." + error;
            }
            return null;
        };

        /**
         * Creates a SeasonRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.SeasonRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.SeasonRes} SeasonRes
         */
        SeasonRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.SeasonRes)
                return object;
            var message = new $root.Lobby.SeasonRes();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                if ($util.Long)
                    (message.handle_value = $util.Long.fromValue(object.handle_value)).unsigned = false;
                else if (typeof object.handle_value === "string")
                    message.handle_value = parseInt(object.handle_value, 10);
                else if (typeof object.handle_value === "number")
                    message.handle_value = object.handle_value;
                else if (typeof object.handle_value === "object")
                    message.handle_value = new $util.LongBits(object.handle_value.low >>> 0, object.handle_value.high >>> 0).toNumber();
            if (object.season_list) {
                if (!Array.isArray(object.season_list))
                    throw TypeError(".Lobby.SeasonRes.season_list: array expected");
                message.season_list = [];
                for (var i = 0; i < object.season_list.length; ++i) {
                    if (typeof object.season_list[i] !== "object")
                        throw TypeError(".Lobby.SeasonRes.season_list: object expected");
                    message.season_list[i] = $root.Lobby.SeasonItemRes.fromObject(object.season_list[i]);
                }
            }
            if (object.season_item != null) {
                if (typeof object.season_item !== "object")
                    throw TypeError(".Lobby.SeasonRes.season_item: object expected");
                message.season_item = $root.Lobby.SeasonItemRes.fromObject(object.season_item);
            }
            if (object.last_season_item != null) {
                if (typeof object.last_season_item !== "object")
                    throw TypeError(".Lobby.SeasonRes.last_season_item: object expected");
                message.last_season_item = $root.Lobby.SeasonItemRes.fromObject(object.last_season_item);
            }
            return message;
        };

        /**
         * Creates a plain object from a SeasonRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.SeasonRes
         * @static
         * @param {Lobby.SeasonRes} message SeasonRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeasonRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.season_list = [];
            if (options.defaults) {
                object.handle_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.handle_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.handle_value = options.longs === String ? "0" : 0;
                object.season_item = null;
                object.last_season_item = null;
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (typeof message.handle_value === "number")
                    object.handle_value = options.longs === String ? String(message.handle_value) : message.handle_value;
                else
                    object.handle_value = options.longs === String ? $util.Long.prototype.toString.call(message.handle_value) : options.longs === Number ? new $util.LongBits(message.handle_value.low >>> 0, message.handle_value.high >>> 0).toNumber() : message.handle_value;
            if (message.season_list && message.season_list.length) {
                object.season_list = [];
                for (var j = 0; j < message.season_list.length; ++j)
                    object.season_list[j] = $root.Lobby.SeasonItemRes.toObject(message.season_list[j], options);
            }
            if (message.season_item != null && message.hasOwnProperty("season_item"))
                object.season_item = $root.Lobby.SeasonItemRes.toObject(message.season_item, options);
            if (message.last_season_item != null && message.hasOwnProperty("last_season_item"))
                object.last_season_item = $root.Lobby.SeasonItemRes.toObject(message.last_season_item, options);
            return object;
        };

        /**
         * Converts this SeasonRes to JSON.
         * @function toJSON
         * @memberof Lobby.SeasonRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeasonRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeasonRes;
    })();

    Lobby.SeasonItemRes = (function() {

        /**
         * Properties of a SeasonItemRes.
         * @memberof Lobby
         * @interface ISeasonItemRes
         * @property {number|Long|null} [us_id] SeasonItemRes us_id
         * @property {string|null} [season_name] SeasonItemRes season_name
         * @property {number|null} [season_dan] SeasonItemRes season_dan
         * @property {number|null} [season_star] SeasonItemRes season_star
         * @property {number|null} [play_count] SeasonItemRes play_count
         * @property {number|null} [victory_count] SeasonItemRes victory_count
         * @property {number|null} [victory_rate] SeasonItemRes victory_rate
         * @property {number|null} [continuous_victory] SeasonItemRes continuous_victory
         * @property {number|Long|null} [season_start_time] SeasonItemRes season_start_time
         * @property {number|Long|null} [season_end_time] SeasonItemRes season_end_time
         * @property {number|null} [reward_receive_state] SeasonItemRes reward_receive_state
         */

        /**
         * Constructs a new SeasonItemRes.
         * @memberof Lobby
         * @classdesc Represents a SeasonItemRes.
         * @implements ISeasonItemRes
         * @constructor
         * @param {Lobby.ISeasonItemRes=} [properties] Properties to set
         */
        function SeasonItemRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SeasonItemRes us_id.
         * @member {number|Long} us_id
         * @memberof Lobby.SeasonItemRes
         * @instance
         */
        SeasonItemRes.prototype.us_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SeasonItemRes season_name.
         * @member {string} season_name
         * @memberof Lobby.SeasonItemRes
         * @instance
         */
        SeasonItemRes.prototype.season_name = "";

        /**
         * SeasonItemRes season_dan.
         * @member {number} season_dan
         * @memberof Lobby.SeasonItemRes
         * @instance
         */
        SeasonItemRes.prototype.season_dan = 0;

        /**
         * SeasonItemRes season_star.
         * @member {number} season_star
         * @memberof Lobby.SeasonItemRes
         * @instance
         */
        SeasonItemRes.prototype.season_star = 0;

        /**
         * SeasonItemRes play_count.
         * @member {number} play_count
         * @memberof Lobby.SeasonItemRes
         * @instance
         */
        SeasonItemRes.prototype.play_count = 0;

        /**
         * SeasonItemRes victory_count.
         * @member {number} victory_count
         * @memberof Lobby.SeasonItemRes
         * @instance
         */
        SeasonItemRes.prototype.victory_count = 0;

        /**
         * SeasonItemRes victory_rate.
         * @member {number} victory_rate
         * @memberof Lobby.SeasonItemRes
         * @instance
         */
        SeasonItemRes.prototype.victory_rate = 0;

        /**
         * SeasonItemRes continuous_victory.
         * @member {number} continuous_victory
         * @memberof Lobby.SeasonItemRes
         * @instance
         */
        SeasonItemRes.prototype.continuous_victory = 0;

        /**
         * SeasonItemRes season_start_time.
         * @member {number|Long} season_start_time
         * @memberof Lobby.SeasonItemRes
         * @instance
         */
        SeasonItemRes.prototype.season_start_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SeasonItemRes season_end_time.
         * @member {number|Long} season_end_time
         * @memberof Lobby.SeasonItemRes
         * @instance
         */
        SeasonItemRes.prototype.season_end_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * SeasonItemRes reward_receive_state.
         * @member {number} reward_receive_state
         * @memberof Lobby.SeasonItemRes
         * @instance
         */
        SeasonItemRes.prototype.reward_receive_state = 0;

        /**
         * Creates a new SeasonItemRes instance using the specified properties.
         * @function create
         * @memberof Lobby.SeasonItemRes
         * @static
         * @param {Lobby.ISeasonItemRes=} [properties] Properties to set
         * @returns {Lobby.SeasonItemRes} SeasonItemRes instance
         */
        SeasonItemRes.create = function create(properties) {
            return new SeasonItemRes(properties);
        };

        /**
         * Encodes the specified SeasonItemRes message. Does not implicitly {@link Lobby.SeasonItemRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.SeasonItemRes
         * @static
         * @param {Lobby.ISeasonItemRes} message SeasonItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeasonItemRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.us_id != null && message.hasOwnProperty("us_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.us_id);
            if (message.season_name != null && message.hasOwnProperty("season_name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.season_name);
            if (message.season_dan != null && message.hasOwnProperty("season_dan"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.season_dan);
            if (message.season_star != null && message.hasOwnProperty("season_star"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.season_star);
            if (message.play_count != null && message.hasOwnProperty("play_count"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.play_count);
            if (message.victory_count != null && message.hasOwnProperty("victory_count"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.victory_count);
            if (message.victory_rate != null && message.hasOwnProperty("victory_rate"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.victory_rate);
            if (message.continuous_victory != null && message.hasOwnProperty("continuous_victory"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.continuous_victory);
            if (message.season_start_time != null && message.hasOwnProperty("season_start_time"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.season_start_time);
            if (message.season_end_time != null && message.hasOwnProperty("season_end_time"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.season_end_time);
            if (message.reward_receive_state != null && message.hasOwnProperty("reward_receive_state"))
                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.reward_receive_state);
            return writer;
        };

        /**
         * Encodes the specified SeasonItemRes message, length delimited. Does not implicitly {@link Lobby.SeasonItemRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.SeasonItemRes
         * @static
         * @param {Lobby.ISeasonItemRes} message SeasonItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SeasonItemRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SeasonItemRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.SeasonItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.SeasonItemRes} SeasonItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeasonItemRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.SeasonItemRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.us_id = reader.int64();
                    break;
                case 2:
                    message.season_name = reader.string();
                    break;
                case 3:
                    message.season_dan = reader.int32();
                    break;
                case 4:
                    message.season_star = reader.int32();
                    break;
                case 5:
                    message.play_count = reader.int32();
                    break;
                case 6:
                    message.victory_count = reader.int32();
                    break;
                case 7:
                    message.victory_rate = reader.int32();
                    break;
                case 8:
                    message.continuous_victory = reader.int32();
                    break;
                case 9:
                    message.season_start_time = reader.int64();
                    break;
                case 10:
                    message.season_end_time = reader.int64();
                    break;
                case 11:
                    message.reward_receive_state = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a SeasonItemRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.SeasonItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.SeasonItemRes} SeasonItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SeasonItemRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SeasonItemRes message.
         * @function verify
         * @memberof Lobby.SeasonItemRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SeasonItemRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.us_id != null && message.hasOwnProperty("us_id"))
                if (!$util.isInteger(message.us_id) && !(message.us_id && $util.isInteger(message.us_id.low) && $util.isInteger(message.us_id.high)))
                    return "us_id: integer|Long expected";
            if (message.season_name != null && message.hasOwnProperty("season_name"))
                if (!$util.isString(message.season_name))
                    return "season_name: string expected";
            if (message.season_dan != null && message.hasOwnProperty("season_dan"))
                if (!$util.isInteger(message.season_dan))
                    return "season_dan: integer expected";
            if (message.season_star != null && message.hasOwnProperty("season_star"))
                if (!$util.isInteger(message.season_star))
                    return "season_star: integer expected";
            if (message.play_count != null && message.hasOwnProperty("play_count"))
                if (!$util.isInteger(message.play_count))
                    return "play_count: integer expected";
            if (message.victory_count != null && message.hasOwnProperty("victory_count"))
                if (!$util.isInteger(message.victory_count))
                    return "victory_count: integer expected";
            if (message.victory_rate != null && message.hasOwnProperty("victory_rate"))
                if (!$util.isInteger(message.victory_rate))
                    return "victory_rate: integer expected";
            if (message.continuous_victory != null && message.hasOwnProperty("continuous_victory"))
                if (!$util.isInteger(message.continuous_victory))
                    return "continuous_victory: integer expected";
            if (message.season_start_time != null && message.hasOwnProperty("season_start_time"))
                if (!$util.isInteger(message.season_start_time) && !(message.season_start_time && $util.isInteger(message.season_start_time.low) && $util.isInteger(message.season_start_time.high)))
                    return "season_start_time: integer|Long expected";
            if (message.season_end_time != null && message.hasOwnProperty("season_end_time"))
                if (!$util.isInteger(message.season_end_time) && !(message.season_end_time && $util.isInteger(message.season_end_time.low) && $util.isInteger(message.season_end_time.high)))
                    return "season_end_time: integer|Long expected";
            if (message.reward_receive_state != null && message.hasOwnProperty("reward_receive_state"))
                if (!$util.isInteger(message.reward_receive_state))
                    return "reward_receive_state: integer expected";
            return null;
        };

        /**
         * Creates a SeasonItemRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.SeasonItemRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.SeasonItemRes} SeasonItemRes
         */
        SeasonItemRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.SeasonItemRes)
                return object;
            var message = new $root.Lobby.SeasonItemRes();
            if (object.us_id != null)
                if ($util.Long)
                    (message.us_id = $util.Long.fromValue(object.us_id)).unsigned = false;
                else if (typeof object.us_id === "string")
                    message.us_id = parseInt(object.us_id, 10);
                else if (typeof object.us_id === "number")
                    message.us_id = object.us_id;
                else if (typeof object.us_id === "object")
                    message.us_id = new $util.LongBits(object.us_id.low >>> 0, object.us_id.high >>> 0).toNumber();
            if (object.season_name != null)
                message.season_name = String(object.season_name);
            if (object.season_dan != null)
                message.season_dan = object.season_dan | 0;
            if (object.season_star != null)
                message.season_star = object.season_star | 0;
            if (object.play_count != null)
                message.play_count = object.play_count | 0;
            if (object.victory_count != null)
                message.victory_count = object.victory_count | 0;
            if (object.victory_rate != null)
                message.victory_rate = object.victory_rate | 0;
            if (object.continuous_victory != null)
                message.continuous_victory = object.continuous_victory | 0;
            if (object.season_start_time != null)
                if ($util.Long)
                    (message.season_start_time = $util.Long.fromValue(object.season_start_time)).unsigned = false;
                else if (typeof object.season_start_time === "string")
                    message.season_start_time = parseInt(object.season_start_time, 10);
                else if (typeof object.season_start_time === "number")
                    message.season_start_time = object.season_start_time;
                else if (typeof object.season_start_time === "object")
                    message.season_start_time = new $util.LongBits(object.season_start_time.low >>> 0, object.season_start_time.high >>> 0).toNumber();
            if (object.season_end_time != null)
                if ($util.Long)
                    (message.season_end_time = $util.Long.fromValue(object.season_end_time)).unsigned = false;
                else if (typeof object.season_end_time === "string")
                    message.season_end_time = parseInt(object.season_end_time, 10);
                else if (typeof object.season_end_time === "number")
                    message.season_end_time = object.season_end_time;
                else if (typeof object.season_end_time === "object")
                    message.season_end_time = new $util.LongBits(object.season_end_time.low >>> 0, object.season_end_time.high >>> 0).toNumber();
            if (object.reward_receive_state != null)
                message.reward_receive_state = object.reward_receive_state | 0;
            return message;
        };

        /**
         * Creates a plain object from a SeasonItemRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.SeasonItemRes
         * @static
         * @param {Lobby.SeasonItemRes} message SeasonItemRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SeasonItemRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.us_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.us_id = options.longs === String ? "0" : 0;
                object.season_name = "";
                object.season_dan = 0;
                object.season_star = 0;
                object.play_count = 0;
                object.victory_count = 0;
                object.victory_rate = 0;
                object.continuous_victory = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.season_start_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.season_start_time = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.season_end_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.season_end_time = options.longs === String ? "0" : 0;
                object.reward_receive_state = 0;
            }
            if (message.us_id != null && message.hasOwnProperty("us_id"))
                if (typeof message.us_id === "number")
                    object.us_id = options.longs === String ? String(message.us_id) : message.us_id;
                else
                    object.us_id = options.longs === String ? $util.Long.prototype.toString.call(message.us_id) : options.longs === Number ? new $util.LongBits(message.us_id.low >>> 0, message.us_id.high >>> 0).toNumber() : message.us_id;
            if (message.season_name != null && message.hasOwnProperty("season_name"))
                object.season_name = message.season_name;
            if (message.season_dan != null && message.hasOwnProperty("season_dan"))
                object.season_dan = message.season_dan;
            if (message.season_star != null && message.hasOwnProperty("season_star"))
                object.season_star = message.season_star;
            if (message.play_count != null && message.hasOwnProperty("play_count"))
                object.play_count = message.play_count;
            if (message.victory_count != null && message.hasOwnProperty("victory_count"))
                object.victory_count = message.victory_count;
            if (message.victory_rate != null && message.hasOwnProperty("victory_rate"))
                object.victory_rate = message.victory_rate;
            if (message.continuous_victory != null && message.hasOwnProperty("continuous_victory"))
                object.continuous_victory = message.continuous_victory;
            if (message.season_start_time != null && message.hasOwnProperty("season_start_time"))
                if (typeof message.season_start_time === "number")
                    object.season_start_time = options.longs === String ? String(message.season_start_time) : message.season_start_time;
                else
                    object.season_start_time = options.longs === String ? $util.Long.prototype.toString.call(message.season_start_time) : options.longs === Number ? new $util.LongBits(message.season_start_time.low >>> 0, message.season_start_time.high >>> 0).toNumber() : message.season_start_time;
            if (message.season_end_time != null && message.hasOwnProperty("season_end_time"))
                if (typeof message.season_end_time === "number")
                    object.season_end_time = options.longs === String ? String(message.season_end_time) : message.season_end_time;
                else
                    object.season_end_time = options.longs === String ? $util.Long.prototype.toString.call(message.season_end_time) : options.longs === Number ? new $util.LongBits(message.season_end_time.low >>> 0, message.season_end_time.high >>> 0).toNumber() : message.season_end_time;
            if (message.reward_receive_state != null && message.hasOwnProperty("reward_receive_state"))
                object.reward_receive_state = message.reward_receive_state;
            return object;
        };

        /**
         * Converts this SeasonItemRes to JSON.
         * @function toJSON
         * @memberof Lobby.SeasonItemRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SeasonItemRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SeasonItemRes;
    })();

    Lobby.UserGameLogReq = (function() {

        /**
         * Properties of a UserGameLogReq.
         * @memberof Lobby
         * @interface IUserGameLogReq
         */

        /**
         * Constructs a new UserGameLogReq.
         * @memberof Lobby
         * @classdesc Represents a UserGameLogReq.
         * @implements IUserGameLogReq
         * @constructor
         * @param {Lobby.IUserGameLogReq=} [properties] Properties to set
         */
        function UserGameLogReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new UserGameLogReq instance using the specified properties.
         * @function create
         * @memberof Lobby.UserGameLogReq
         * @static
         * @param {Lobby.IUserGameLogReq=} [properties] Properties to set
         * @returns {Lobby.UserGameLogReq} UserGameLogReq instance
         */
        UserGameLogReq.create = function create(properties) {
            return new UserGameLogReq(properties);
        };

        /**
         * Encodes the specified UserGameLogReq message. Does not implicitly {@link Lobby.UserGameLogReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserGameLogReq
         * @static
         * @param {Lobby.IUserGameLogReq} message UserGameLogReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserGameLogReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified UserGameLogReq message, length delimited. Does not implicitly {@link Lobby.UserGameLogReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserGameLogReq
         * @static
         * @param {Lobby.IUserGameLogReq} message UserGameLogReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserGameLogReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserGameLogReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserGameLogReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserGameLogReq} UserGameLogReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserGameLogReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserGameLogReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserGameLogReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserGameLogReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserGameLogReq} UserGameLogReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserGameLogReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserGameLogReq message.
         * @function verify
         * @memberof Lobby.UserGameLogReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserGameLogReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a UserGameLogReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserGameLogReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserGameLogReq} UserGameLogReq
         */
        UserGameLogReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserGameLogReq)
                return object;
            return new $root.Lobby.UserGameLogReq();
        };

        /**
         * Creates a plain object from a UserGameLogReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserGameLogReq
         * @static
         * @param {Lobby.UserGameLogReq} message UserGameLogReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserGameLogReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this UserGameLogReq to JSON.
         * @function toJSON
         * @memberof Lobby.UserGameLogReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserGameLogReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserGameLogReq;
    })();

    Lobby.UserGameLogRes = (function() {

        /**
         * Properties of a UserGameLogRes.
         * @memberof Lobby
         * @interface IUserGameLogRes
         * @property {Array.<Lobby.IUserGameLogItemRes>|null} [game_log_list] UserGameLogRes game_log_list
         */

        /**
         * Constructs a new UserGameLogRes.
         * @memberof Lobby
         * @classdesc Represents a UserGameLogRes.
         * @implements IUserGameLogRes
         * @constructor
         * @param {Lobby.IUserGameLogRes=} [properties] Properties to set
         */
        function UserGameLogRes(properties) {
            this.game_log_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserGameLogRes game_log_list.
         * @member {Array.<Lobby.IUserGameLogItemRes>} game_log_list
         * @memberof Lobby.UserGameLogRes
         * @instance
         */
        UserGameLogRes.prototype.game_log_list = $util.emptyArray;

        /**
         * Creates a new UserGameLogRes instance using the specified properties.
         * @function create
         * @memberof Lobby.UserGameLogRes
         * @static
         * @param {Lobby.IUserGameLogRes=} [properties] Properties to set
         * @returns {Lobby.UserGameLogRes} UserGameLogRes instance
         */
        UserGameLogRes.create = function create(properties) {
            return new UserGameLogRes(properties);
        };

        /**
         * Encodes the specified UserGameLogRes message. Does not implicitly {@link Lobby.UserGameLogRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserGameLogRes
         * @static
         * @param {Lobby.IUserGameLogRes} message UserGameLogRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserGameLogRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.game_log_list != null && message.game_log_list.length)
                for (var i = 0; i < message.game_log_list.length; ++i)
                    $root.Lobby.UserGameLogItemRes.encode(message.game_log_list[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified UserGameLogRes message, length delimited. Does not implicitly {@link Lobby.UserGameLogRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserGameLogRes
         * @static
         * @param {Lobby.IUserGameLogRes} message UserGameLogRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserGameLogRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserGameLogRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserGameLogRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserGameLogRes} UserGameLogRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserGameLogRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserGameLogRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.game_log_list && message.game_log_list.length))
                        message.game_log_list = [];
                    message.game_log_list.push($root.Lobby.UserGameLogItemRes.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserGameLogRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserGameLogRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserGameLogRes} UserGameLogRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserGameLogRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserGameLogRes message.
         * @function verify
         * @memberof Lobby.UserGameLogRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserGameLogRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.game_log_list != null && message.hasOwnProperty("game_log_list")) {
                if (!Array.isArray(message.game_log_list))
                    return "game_log_list: array expected";
                for (var i = 0; i < message.game_log_list.length; ++i) {
                    var error = $root.Lobby.UserGameLogItemRes.verify(message.game_log_list[i]);
                    if (error)
                        return "game_log_list." + error;
                }
            }
            return null;
        };

        /**
         * Creates a UserGameLogRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserGameLogRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserGameLogRes} UserGameLogRes
         */
        UserGameLogRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserGameLogRes)
                return object;
            var message = new $root.Lobby.UserGameLogRes();
            if (object.game_log_list) {
                if (!Array.isArray(object.game_log_list))
                    throw TypeError(".Lobby.UserGameLogRes.game_log_list: array expected");
                message.game_log_list = [];
                for (var i = 0; i < object.game_log_list.length; ++i) {
                    if (typeof object.game_log_list[i] !== "object")
                        throw TypeError(".Lobby.UserGameLogRes.game_log_list: object expected");
                    message.game_log_list[i] = $root.Lobby.UserGameLogItemRes.fromObject(object.game_log_list[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a UserGameLogRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserGameLogRes
         * @static
         * @param {Lobby.UserGameLogRes} message UserGameLogRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserGameLogRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.game_log_list = [];
            if (message.game_log_list && message.game_log_list.length) {
                object.game_log_list = [];
                for (var j = 0; j < message.game_log_list.length; ++j)
                    object.game_log_list[j] = $root.Lobby.UserGameLogItemRes.toObject(message.game_log_list[j], options);
            }
            return object;
        };

        /**
         * Converts this UserGameLogRes to JSON.
         * @function toJSON
         * @memberof Lobby.UserGameLogRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserGameLogRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserGameLogRes;
    })();

    Lobby.UserGameLogItemRes = (function() {

        /**
         * Properties of a UserGameLogItemRes.
         * @memberof Lobby
         * @interface IUserGameLogItemRes
         * @property {number|null} [user_type] UserGameLogItemRes user_type
         * @property {number|null} [game_result] UserGameLogItemRes game_result
         * @property {number|null} [coin] UserGameLogItemRes coin
         * @property {number|null} [multiple] UserGameLogItemRes multiple
         * @property {string|null} [game_name] UserGameLogItemRes game_name
         * @property {number|Long|null} [create_time] UserGameLogItemRes create_time
         * @property {string|null} [game_name_sub] UserGameLogItemRes game_name_sub
         */

        /**
         * Constructs a new UserGameLogItemRes.
         * @memberof Lobby
         * @classdesc Represents a UserGameLogItemRes.
         * @implements IUserGameLogItemRes
         * @constructor
         * @param {Lobby.IUserGameLogItemRes=} [properties] Properties to set
         */
        function UserGameLogItemRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserGameLogItemRes user_type.
         * @member {number} user_type
         * @memberof Lobby.UserGameLogItemRes
         * @instance
         */
        UserGameLogItemRes.prototype.user_type = 0;

        /**
         * UserGameLogItemRes game_result.
         * @member {number} game_result
         * @memberof Lobby.UserGameLogItemRes
         * @instance
         */
        UserGameLogItemRes.prototype.game_result = 0;

        /**
         * UserGameLogItemRes coin.
         * @member {number} coin
         * @memberof Lobby.UserGameLogItemRes
         * @instance
         */
        UserGameLogItemRes.prototype.coin = 0;

        /**
         * UserGameLogItemRes multiple.
         * @member {number} multiple
         * @memberof Lobby.UserGameLogItemRes
         * @instance
         */
        UserGameLogItemRes.prototype.multiple = 0;

        /**
         * UserGameLogItemRes game_name.
         * @member {string} game_name
         * @memberof Lobby.UserGameLogItemRes
         * @instance
         */
        UserGameLogItemRes.prototype.game_name = "";

        /**
         * UserGameLogItemRes create_time.
         * @member {number|Long} create_time
         * @memberof Lobby.UserGameLogItemRes
         * @instance
         */
        UserGameLogItemRes.prototype.create_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * UserGameLogItemRes game_name_sub.
         * @member {string} game_name_sub
         * @memberof Lobby.UserGameLogItemRes
         * @instance
         */
        UserGameLogItemRes.prototype.game_name_sub = "";

        /**
         * Creates a new UserGameLogItemRes instance using the specified properties.
         * @function create
         * @memberof Lobby.UserGameLogItemRes
         * @static
         * @param {Lobby.IUserGameLogItemRes=} [properties] Properties to set
         * @returns {Lobby.UserGameLogItemRes} UserGameLogItemRes instance
         */
        UserGameLogItemRes.create = function create(properties) {
            return new UserGameLogItemRes(properties);
        };

        /**
         * Encodes the specified UserGameLogItemRes message. Does not implicitly {@link Lobby.UserGameLogItemRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserGameLogItemRes
         * @static
         * @param {Lobby.IUserGameLogItemRes} message UserGameLogItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserGameLogItemRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.user_type != null && message.hasOwnProperty("user_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.user_type);
            if (message.game_result != null && message.hasOwnProperty("game_result"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.game_result);
            if (message.coin != null && message.hasOwnProperty("coin"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.coin);
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.multiple);
            if (message.game_name != null && message.hasOwnProperty("game_name"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.game_name);
            if (message.create_time != null && message.hasOwnProperty("create_time"))
                writer.uint32(/* id 6, wireType 0 =*/48).int64(message.create_time);
            if (message.game_name_sub != null && message.hasOwnProperty("game_name_sub"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.game_name_sub);
            return writer;
        };

        /**
         * Encodes the specified UserGameLogItemRes message, length delimited. Does not implicitly {@link Lobby.UserGameLogItemRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserGameLogItemRes
         * @static
         * @param {Lobby.IUserGameLogItemRes} message UserGameLogItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserGameLogItemRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserGameLogItemRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserGameLogItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserGameLogItemRes} UserGameLogItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserGameLogItemRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserGameLogItemRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.user_type = reader.int32();
                    break;
                case 2:
                    message.game_result = reader.int32();
                    break;
                case 3:
                    message.coin = reader.int32();
                    break;
                case 4:
                    message.multiple = reader.int32();
                    break;
                case 5:
                    message.game_name = reader.string();
                    break;
                case 6:
                    message.create_time = reader.int64();
                    break;
                case 7:
                    message.game_name_sub = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserGameLogItemRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserGameLogItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserGameLogItemRes} UserGameLogItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserGameLogItemRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserGameLogItemRes message.
         * @function verify
         * @memberof Lobby.UserGameLogItemRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserGameLogItemRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.user_type != null && message.hasOwnProperty("user_type"))
                if (!$util.isInteger(message.user_type))
                    return "user_type: integer expected";
            if (message.game_result != null && message.hasOwnProperty("game_result"))
                if (!$util.isInteger(message.game_result))
                    return "game_result: integer expected";
            if (message.coin != null && message.hasOwnProperty("coin"))
                if (!$util.isInteger(message.coin))
                    return "coin: integer expected";
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                if (!$util.isInteger(message.multiple))
                    return "multiple: integer expected";
            if (message.game_name != null && message.hasOwnProperty("game_name"))
                if (!$util.isString(message.game_name))
                    return "game_name: string expected";
            if (message.create_time != null && message.hasOwnProperty("create_time"))
                if (!$util.isInteger(message.create_time) && !(message.create_time && $util.isInteger(message.create_time.low) && $util.isInteger(message.create_time.high)))
                    return "create_time: integer|Long expected";
            if (message.game_name_sub != null && message.hasOwnProperty("game_name_sub"))
                if (!$util.isString(message.game_name_sub))
                    return "game_name_sub: string expected";
            return null;
        };

        /**
         * Creates a UserGameLogItemRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserGameLogItemRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserGameLogItemRes} UserGameLogItemRes
         */
        UserGameLogItemRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserGameLogItemRes)
                return object;
            var message = new $root.Lobby.UserGameLogItemRes();
            if (object.user_type != null)
                message.user_type = object.user_type | 0;
            if (object.game_result != null)
                message.game_result = object.game_result | 0;
            if (object.coin != null)
                message.coin = object.coin | 0;
            if (object.multiple != null)
                message.multiple = object.multiple | 0;
            if (object.game_name != null)
                message.game_name = String(object.game_name);
            if (object.create_time != null)
                if ($util.Long)
                    (message.create_time = $util.Long.fromValue(object.create_time)).unsigned = false;
                else if (typeof object.create_time === "string")
                    message.create_time = parseInt(object.create_time, 10);
                else if (typeof object.create_time === "number")
                    message.create_time = object.create_time;
                else if (typeof object.create_time === "object")
                    message.create_time = new $util.LongBits(object.create_time.low >>> 0, object.create_time.high >>> 0).toNumber();
            if (object.game_name_sub != null)
                message.game_name_sub = String(object.game_name_sub);
            return message;
        };

        /**
         * Creates a plain object from a UserGameLogItemRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserGameLogItemRes
         * @static
         * @param {Lobby.UserGameLogItemRes} message UserGameLogItemRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserGameLogItemRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.user_type = 0;
                object.game_result = 0;
                object.coin = 0;
                object.multiple = 0;
                object.game_name = "";
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.create_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.create_time = options.longs === String ? "0" : 0;
                object.game_name_sub = "";
            }
            if (message.user_type != null && message.hasOwnProperty("user_type"))
                object.user_type = message.user_type;
            if (message.game_result != null && message.hasOwnProperty("game_result"))
                object.game_result = message.game_result;
            if (message.coin != null && message.hasOwnProperty("coin"))
                object.coin = message.coin;
            if (message.multiple != null && message.hasOwnProperty("multiple"))
                object.multiple = message.multiple;
            if (message.game_name != null && message.hasOwnProperty("game_name"))
                object.game_name = message.game_name;
            if (message.create_time != null && message.hasOwnProperty("create_time"))
                if (typeof message.create_time === "number")
                    object.create_time = options.longs === String ? String(message.create_time) : message.create_time;
                else
                    object.create_time = options.longs === String ? $util.Long.prototype.toString.call(message.create_time) : options.longs === Number ? new $util.LongBits(message.create_time.low >>> 0, message.create_time.high >>> 0).toNumber() : message.create_time;
            if (message.game_name_sub != null && message.hasOwnProperty("game_name_sub"))
                object.game_name_sub = message.game_name_sub;
            return object;
        };

        /**
         * Converts this UserGameLogItemRes to JSON.
         * @function toJSON
         * @memberof Lobby.UserGameLogItemRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserGameLogItemRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserGameLogItemRes;
    })();

    Lobby.VipReq = (function() {

        /**
         * Properties of a VipReq.
         * @memberof Lobby
         * @interface IVipReq
         * @property {number|null} [handle_type] VipReq handle_type
         * @property {number|null} [handle_value] VipReq handle_value
         */

        /**
         * Constructs a new VipReq.
         * @memberof Lobby
         * @classdesc Represents a VipReq.
         * @implements IVipReq
         * @constructor
         * @param {Lobby.IVipReq=} [properties] Properties to set
         */
        function VipReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VipReq handle_type.
         * @member {number} handle_type
         * @memberof Lobby.VipReq
         * @instance
         */
        VipReq.prototype.handle_type = 0;

        /**
         * VipReq handle_value.
         * @member {number} handle_value
         * @memberof Lobby.VipReq
         * @instance
         */
        VipReq.prototype.handle_value = 0;

        /**
         * Creates a new VipReq instance using the specified properties.
         * @function create
         * @memberof Lobby.VipReq
         * @static
         * @param {Lobby.IVipReq=} [properties] Properties to set
         * @returns {Lobby.VipReq} VipReq instance
         */
        VipReq.create = function create(properties) {
            return new VipReq(properties);
        };

        /**
         * Encodes the specified VipReq message. Does not implicitly {@link Lobby.VipReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.VipReq
         * @static
         * @param {Lobby.IVipReq} message VipReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VipReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.handle_value);
            return writer;
        };

        /**
         * Encodes the specified VipReq message, length delimited. Does not implicitly {@link Lobby.VipReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.VipReq
         * @static
         * @param {Lobby.IVipReq} message VipReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VipReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VipReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.VipReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.VipReq} VipReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VipReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.VipReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a VipReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.VipReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.VipReq} VipReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VipReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VipReq message.
         * @function verify
         * @memberof Lobby.VipReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VipReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isInteger(message.handle_value))
                    return "handle_value: integer expected";
            return null;
        };

        /**
         * Creates a VipReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.VipReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.VipReq} VipReq
         */
        VipReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.VipReq)
                return object;
            var message = new $root.Lobby.VipReq();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                message.handle_value = object.handle_value | 0;
            return message;
        };

        /**
         * Creates a plain object from a VipReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.VipReq
         * @static
         * @param {Lobby.VipReq} message VipReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VipReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                object.handle_value = 0;
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                object.handle_value = message.handle_value;
            return object;
        };

        /**
         * Converts this VipReq to JSON.
         * @function toJSON
         * @memberof Lobby.VipReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VipReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return VipReq;
    })();

    Lobby.VipRes = (function() {

        /**
         * Properties of a VipRes.
         * @memberof Lobby
         * @interface IVipRes
         * @property {number|null} [handle_type] VipRes handle_type
         * @property {number|null} [handle_value] VipRes handle_value
         * @property {string|null} [first_reward_level_str] VipRes first_reward_level_str
         * @property {number|null} [day_reward_state] VipRes day_reward_state
         */

        /**
         * Constructs a new VipRes.
         * @memberof Lobby
         * @classdesc Represents a VipRes.
         * @implements IVipRes
         * @constructor
         * @param {Lobby.IVipRes=} [properties] Properties to set
         */
        function VipRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * VipRes handle_type.
         * @member {number} handle_type
         * @memberof Lobby.VipRes
         * @instance
         */
        VipRes.prototype.handle_type = 0;

        /**
         * VipRes handle_value.
         * @member {number} handle_value
         * @memberof Lobby.VipRes
         * @instance
         */
        VipRes.prototype.handle_value = 0;

        /**
         * VipRes first_reward_level_str.
         * @member {string} first_reward_level_str
         * @memberof Lobby.VipRes
         * @instance
         */
        VipRes.prototype.first_reward_level_str = "";

        /**
         * VipRes day_reward_state.
         * @member {number} day_reward_state
         * @memberof Lobby.VipRes
         * @instance
         */
        VipRes.prototype.day_reward_state = 0;

        /**
         * Creates a new VipRes instance using the specified properties.
         * @function create
         * @memberof Lobby.VipRes
         * @static
         * @param {Lobby.IVipRes=} [properties] Properties to set
         * @returns {Lobby.VipRes} VipRes instance
         */
        VipRes.create = function create(properties) {
            return new VipRes(properties);
        };

        /**
         * Encodes the specified VipRes message. Does not implicitly {@link Lobby.VipRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.VipRes
         * @static
         * @param {Lobby.IVipRes} message VipRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VipRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.handle_value);
            if (message.first_reward_level_str != null && message.hasOwnProperty("first_reward_level_str"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.first_reward_level_str);
            if (message.day_reward_state != null && message.hasOwnProperty("day_reward_state"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.day_reward_state);
            return writer;
        };

        /**
         * Encodes the specified VipRes message, length delimited. Does not implicitly {@link Lobby.VipRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.VipRes
         * @static
         * @param {Lobby.IVipRes} message VipRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VipRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VipRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.VipRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.VipRes} VipRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VipRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.VipRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.int32();
                    break;
                case 3:
                    message.first_reward_level_str = reader.string();
                    break;
                case 4:
                    message.day_reward_state = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a VipRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.VipRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.VipRes} VipRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VipRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VipRes message.
         * @function verify
         * @memberof Lobby.VipRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VipRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isInteger(message.handle_value))
                    return "handle_value: integer expected";
            if (message.first_reward_level_str != null && message.hasOwnProperty("first_reward_level_str"))
                if (!$util.isString(message.first_reward_level_str))
                    return "first_reward_level_str: string expected";
            if (message.day_reward_state != null && message.hasOwnProperty("day_reward_state"))
                if (!$util.isInteger(message.day_reward_state))
                    return "day_reward_state: integer expected";
            return null;
        };

        /**
         * Creates a VipRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.VipRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.VipRes} VipRes
         */
        VipRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.VipRes)
                return object;
            var message = new $root.Lobby.VipRes();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                message.handle_value = object.handle_value | 0;
            if (object.first_reward_level_str != null)
                message.first_reward_level_str = String(object.first_reward_level_str);
            if (object.day_reward_state != null)
                message.day_reward_state = object.day_reward_state | 0;
            return message;
        };

        /**
         * Creates a plain object from a VipRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.VipRes
         * @static
         * @param {Lobby.VipRes} message VipRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VipRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                object.handle_value = 0;
                object.first_reward_level_str = "";
                object.day_reward_state = 0;
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                object.handle_value = message.handle_value;
            if (message.first_reward_level_str != null && message.hasOwnProperty("first_reward_level_str"))
                object.first_reward_level_str = message.first_reward_level_str;
            if (message.day_reward_state != null && message.hasOwnProperty("day_reward_state"))
                object.day_reward_state = message.day_reward_state;
            return object;
        };

        /**
         * Converts this VipRes to JSON.
         * @function toJSON
         * @memberof Lobby.VipRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VipRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return VipRes;
    })();

    Lobby.UserRealReq = (function() {

        /**
         * Properties of a UserRealReq.
         * @memberof Lobby
         * @interface IUserRealReq
         * @property {number|null} [handle_type] UserRealReq handle_type
         * @property {string|null} [handle_value_str] UserRealReq handle_value_str
         */

        /**
         * Constructs a new UserRealReq.
         * @memberof Lobby
         * @classdesc Represents a UserRealReq.
         * @implements IUserRealReq
         * @constructor
         * @param {Lobby.IUserRealReq=} [properties] Properties to set
         */
        function UserRealReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserRealReq handle_type.
         * @member {number} handle_type
         * @memberof Lobby.UserRealReq
         * @instance
         */
        UserRealReq.prototype.handle_type = 0;

        /**
         * UserRealReq handle_value_str.
         * @member {string} handle_value_str
         * @memberof Lobby.UserRealReq
         * @instance
         */
        UserRealReq.prototype.handle_value_str = "";

        /**
         * Creates a new UserRealReq instance using the specified properties.
         * @function create
         * @memberof Lobby.UserRealReq
         * @static
         * @param {Lobby.IUserRealReq=} [properties] Properties to set
         * @returns {Lobby.UserRealReq} UserRealReq instance
         */
        UserRealReq.create = function create(properties) {
            return new UserRealReq(properties);
        };

        /**
         * Encodes the specified UserRealReq message. Does not implicitly {@link Lobby.UserRealReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserRealReq
         * @static
         * @param {Lobby.IUserRealReq} message UserRealReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRealReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value_str != null && message.hasOwnProperty("handle_value_str"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.handle_value_str);
            return writer;
        };

        /**
         * Encodes the specified UserRealReq message, length delimited. Does not implicitly {@link Lobby.UserRealReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserRealReq
         * @static
         * @param {Lobby.IUserRealReq} message UserRealReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRealReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserRealReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserRealReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserRealReq} UserRealReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRealReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserRealReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value_str = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserRealReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserRealReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserRealReq} UserRealReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRealReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserRealReq message.
         * @function verify
         * @memberof Lobby.UserRealReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserRealReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value_str != null && message.hasOwnProperty("handle_value_str"))
                if (!$util.isString(message.handle_value_str))
                    return "handle_value_str: string expected";
            return null;
        };

        /**
         * Creates a UserRealReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserRealReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserRealReq} UserRealReq
         */
        UserRealReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserRealReq)
                return object;
            var message = new $root.Lobby.UserRealReq();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value_str != null)
                message.handle_value_str = String(object.handle_value_str);
            return message;
        };

        /**
         * Creates a plain object from a UserRealReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserRealReq
         * @static
         * @param {Lobby.UserRealReq} message UserRealReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserRealReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                object.handle_value_str = "";
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value_str != null && message.hasOwnProperty("handle_value_str"))
                object.handle_value_str = message.handle_value_str;
            return object;
        };

        /**
         * Converts this UserRealReq to JSON.
         * @function toJSON
         * @memberof Lobby.UserRealReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserRealReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserRealReq;
    })();

    Lobby.UserRealRes = (function() {

        /**
         * Properties of a UserRealRes.
         * @memberof Lobby
         * @interface IUserRealRes
         * @property {number|null} [handle_type] UserRealRes handle_type
         * @property {number|null} [code] UserRealRes code
         * @property {string|null} [message] UserRealRes message
         */

        /**
         * Constructs a new UserRealRes.
         * @memberof Lobby
         * @classdesc Represents a UserRealRes.
         * @implements IUserRealRes
         * @constructor
         * @param {Lobby.IUserRealRes=} [properties] Properties to set
         */
        function UserRealRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UserRealRes handle_type.
         * @member {number} handle_type
         * @memberof Lobby.UserRealRes
         * @instance
         */
        UserRealRes.prototype.handle_type = 0;

        /**
         * UserRealRes code.
         * @member {number} code
         * @memberof Lobby.UserRealRes
         * @instance
         */
        UserRealRes.prototype.code = 0;

        /**
         * UserRealRes message.
         * @member {string} message
         * @memberof Lobby.UserRealRes
         * @instance
         */
        UserRealRes.prototype.message = "";

        /**
         * Creates a new UserRealRes instance using the specified properties.
         * @function create
         * @memberof Lobby.UserRealRes
         * @static
         * @param {Lobby.IUserRealRes=} [properties] Properties to set
         * @returns {Lobby.UserRealRes} UserRealRes instance
         */
        UserRealRes.create = function create(properties) {
            return new UserRealRes(properties);
        };

        /**
         * Encodes the specified UserRealRes message. Does not implicitly {@link Lobby.UserRealRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UserRealRes
         * @static
         * @param {Lobby.IUserRealRes} message UserRealRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRealRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.code);
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified UserRealRes message, length delimited. Does not implicitly {@link Lobby.UserRealRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UserRealRes
         * @static
         * @param {Lobby.IUserRealRes} message UserRealRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UserRealRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a UserRealRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UserRealRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UserRealRes} UserRealRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRealRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UserRealRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.code = reader.int32();
                    break;
                case 3:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a UserRealRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UserRealRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UserRealRes} UserRealRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UserRealRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a UserRealRes message.
         * @function verify
         * @memberof Lobby.UserRealRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UserRealRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates a UserRealRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UserRealRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UserRealRes} UserRealRes
         */
        UserRealRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UserRealRes)
                return object;
            var message = new $root.Lobby.UserRealRes();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.code != null)
                message.code = object.code | 0;
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from a UserRealRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UserRealRes
         * @static
         * @param {Lobby.UserRealRes} message UserRealRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UserRealRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                object.code = 0;
                object.message = "";
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this UserRealRes to JSON.
         * @function toJSON
         * @memberof Lobby.UserRealRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UserRealRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UserRealRes;
    })();

    Lobby.ActiveReq = (function() {

        /**
         * Properties of an ActiveReq.
         * @memberof Lobby
         * @interface IActiveReq
         * @property {number|null} [handle_type] ActiveReq handle_type
         * @property {number|null} [active_type] ActiveReq active_type
         * @property {string|null} [handle_value] ActiveReq handle_value
         */

        /**
         * Constructs a new ActiveReq.
         * @memberof Lobby
         * @classdesc Represents an ActiveReq.
         * @implements IActiveReq
         * @constructor
         * @param {Lobby.IActiveReq=} [properties] Properties to set
         */
        function ActiveReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ActiveReq handle_type.
         * @member {number} handle_type
         * @memberof Lobby.ActiveReq
         * @instance
         */
        ActiveReq.prototype.handle_type = 0;

        /**
         * ActiveReq active_type.
         * @member {number} active_type
         * @memberof Lobby.ActiveReq
         * @instance
         */
        ActiveReq.prototype.active_type = 0;

        /**
         * ActiveReq handle_value.
         * @member {string} handle_value
         * @memberof Lobby.ActiveReq
         * @instance
         */
        ActiveReq.prototype.handle_value = "";

        /**
         * Creates a new ActiveReq instance using the specified properties.
         * @function create
         * @memberof Lobby.ActiveReq
         * @static
         * @param {Lobby.IActiveReq=} [properties] Properties to set
         * @returns {Lobby.ActiveReq} ActiveReq instance
         */
        ActiveReq.create = function create(properties) {
            return new ActiveReq(properties);
        };

        /**
         * Encodes the specified ActiveReq message. Does not implicitly {@link Lobby.ActiveReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.ActiveReq
         * @static
         * @param {Lobby.IActiveReq} message ActiveReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActiveReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.active_type != null && message.hasOwnProperty("active_type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.active_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.handle_value);
            return writer;
        };

        /**
         * Encodes the specified ActiveReq message, length delimited. Does not implicitly {@link Lobby.ActiveReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.ActiveReq
         * @static
         * @param {Lobby.IActiveReq} message ActiveReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActiveReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ActiveReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.ActiveReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.ActiveReq} ActiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActiveReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.ActiveReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.active_type = reader.int32();
                    break;
                case 3:
                    message.handle_value = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ActiveReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.ActiveReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.ActiveReq} ActiveReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActiveReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ActiveReq message.
         * @function verify
         * @memberof Lobby.ActiveReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ActiveReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.active_type != null && message.hasOwnProperty("active_type"))
                if (!$util.isInteger(message.active_type))
                    return "active_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isString(message.handle_value))
                    return "handle_value: string expected";
            return null;
        };

        /**
         * Creates an ActiveReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.ActiveReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.ActiveReq} ActiveReq
         */
        ActiveReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.ActiveReq)
                return object;
            var message = new $root.Lobby.ActiveReq();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.active_type != null)
                message.active_type = object.active_type | 0;
            if (object.handle_value != null)
                message.handle_value = String(object.handle_value);
            return message;
        };

        /**
         * Creates a plain object from an ActiveReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.ActiveReq
         * @static
         * @param {Lobby.ActiveReq} message ActiveReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ActiveReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                object.active_type = 0;
                object.handle_value = "";
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.active_type != null && message.hasOwnProperty("active_type"))
                object.active_type = message.active_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                object.handle_value = message.handle_value;
            return object;
        };

        /**
         * Converts this ActiveReq to JSON.
         * @function toJSON
         * @memberof Lobby.ActiveReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ActiveReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ActiveReq;
    })();

    Lobby.ActiveRes = (function() {

        /**
         * Properties of an ActiveRes.
         * @memberof Lobby
         * @interface IActiveRes
         * @property {number|null} [handle_type] ActiveRes handle_type
         * @property {number|null} [active_type] ActiveRes active_type
         * @property {string|null} [handle_value] ActiveRes handle_value
         * @property {string|null} [handle_value_json_res] ActiveRes handle_value_json_res
         */

        /**
         * Constructs a new ActiveRes.
         * @memberof Lobby
         * @classdesc Represents an ActiveRes.
         * @implements IActiveRes
         * @constructor
         * @param {Lobby.IActiveRes=} [properties] Properties to set
         */
        function ActiveRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ActiveRes handle_type.
         * @member {number} handle_type
         * @memberof Lobby.ActiveRes
         * @instance
         */
        ActiveRes.prototype.handle_type = 0;

        /**
         * ActiveRes active_type.
         * @member {number} active_type
         * @memberof Lobby.ActiveRes
         * @instance
         */
        ActiveRes.prototype.active_type = 0;

        /**
         * ActiveRes handle_value.
         * @member {string} handle_value
         * @memberof Lobby.ActiveRes
         * @instance
         */
        ActiveRes.prototype.handle_value = "";

        /**
         * ActiveRes handle_value_json_res.
         * @member {string} handle_value_json_res
         * @memberof Lobby.ActiveRes
         * @instance
         */
        ActiveRes.prototype.handle_value_json_res = "";

        /**
         * Creates a new ActiveRes instance using the specified properties.
         * @function create
         * @memberof Lobby.ActiveRes
         * @static
         * @param {Lobby.IActiveRes=} [properties] Properties to set
         * @returns {Lobby.ActiveRes} ActiveRes instance
         */
        ActiveRes.create = function create(properties) {
            return new ActiveRes(properties);
        };

        /**
         * Encodes the specified ActiveRes message. Does not implicitly {@link Lobby.ActiveRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.ActiveRes
         * @static
         * @param {Lobby.IActiveRes} message ActiveRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActiveRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.active_type != null && message.hasOwnProperty("active_type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.active_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.handle_value);
            if (message.handle_value_json_res != null && message.hasOwnProperty("handle_value_json_res"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.handle_value_json_res);
            return writer;
        };

        /**
         * Encodes the specified ActiveRes message, length delimited. Does not implicitly {@link Lobby.ActiveRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.ActiveRes
         * @static
         * @param {Lobby.IActiveRes} message ActiveRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ActiveRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ActiveRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.ActiveRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.ActiveRes} ActiveRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActiveRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.ActiveRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.active_type = reader.int32();
                    break;
                case 3:
                    message.handle_value = reader.string();
                    break;
                case 4:
                    message.handle_value_json_res = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an ActiveRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.ActiveRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.ActiveRes} ActiveRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ActiveRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ActiveRes message.
         * @function verify
         * @memberof Lobby.ActiveRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ActiveRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.active_type != null && message.hasOwnProperty("active_type"))
                if (!$util.isInteger(message.active_type))
                    return "active_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isString(message.handle_value))
                    return "handle_value: string expected";
            if (message.handle_value_json_res != null && message.hasOwnProperty("handle_value_json_res"))
                if (!$util.isString(message.handle_value_json_res))
                    return "handle_value_json_res: string expected";
            return null;
        };

        /**
         * Creates an ActiveRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.ActiveRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.ActiveRes} ActiveRes
         */
        ActiveRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.ActiveRes)
                return object;
            var message = new $root.Lobby.ActiveRes();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.active_type != null)
                message.active_type = object.active_type | 0;
            if (object.handle_value != null)
                message.handle_value = String(object.handle_value);
            if (object.handle_value_json_res != null)
                message.handle_value_json_res = String(object.handle_value_json_res);
            return message;
        };

        /**
         * Creates a plain object from an ActiveRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.ActiveRes
         * @static
         * @param {Lobby.ActiveRes} message ActiveRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ActiveRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                object.active_type = 0;
                object.handle_value = "";
                object.handle_value_json_res = "";
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.active_type != null && message.hasOwnProperty("active_type"))
                object.active_type = message.active_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                object.handle_value = message.handle_value;
            if (message.handle_value_json_res != null && message.hasOwnProperty("handle_value_json_res"))
                object.handle_value_json_res = message.handle_value_json_res;
            return object;
        };

        /**
         * Converts this ActiveRes to JSON.
         * @function toJSON
         * @memberof Lobby.ActiveRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ActiveRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ActiveRes;
    })();

    Lobby.UpdateUserReq = (function() {

        /**
         * Properties of an UpdateUserReq.
         * @memberof Lobby
         * @interface IUpdateUserReq
         * @property {number|null} [handle_type] UpdateUserReq handle_type
         * @property {string|null} [handle_value] UpdateUserReq handle_value
         */

        /**
         * Constructs a new UpdateUserReq.
         * @memberof Lobby
         * @classdesc Represents an UpdateUserReq.
         * @implements IUpdateUserReq
         * @constructor
         * @param {Lobby.IUpdateUserReq=} [properties] Properties to set
         */
        function UpdateUserReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpdateUserReq handle_type.
         * @member {number} handle_type
         * @memberof Lobby.UpdateUserReq
         * @instance
         */
        UpdateUserReq.prototype.handle_type = 0;

        /**
         * UpdateUserReq handle_value.
         * @member {string} handle_value
         * @memberof Lobby.UpdateUserReq
         * @instance
         */
        UpdateUserReq.prototype.handle_value = "";

        /**
         * Creates a new UpdateUserReq instance using the specified properties.
         * @function create
         * @memberof Lobby.UpdateUserReq
         * @static
         * @param {Lobby.IUpdateUserReq=} [properties] Properties to set
         * @returns {Lobby.UpdateUserReq} UpdateUserReq instance
         */
        UpdateUserReq.create = function create(properties) {
            return new UpdateUserReq(properties);
        };

        /**
         * Encodes the specified UpdateUserReq message. Does not implicitly {@link Lobby.UpdateUserReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UpdateUserReq
         * @static
         * @param {Lobby.IUpdateUserReq} message UpdateUserReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateUserReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.handle_value);
            return writer;
        };

        /**
         * Encodes the specified UpdateUserReq message, length delimited. Does not implicitly {@link Lobby.UpdateUserReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UpdateUserReq
         * @static
         * @param {Lobby.IUpdateUserReq} message UpdateUserReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateUserReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UpdateUserReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UpdateUserReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UpdateUserReq} UpdateUserReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateUserReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UpdateUserReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UpdateUserReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UpdateUserReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UpdateUserReq} UpdateUserReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateUserReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpdateUserReq message.
         * @function verify
         * @memberof Lobby.UpdateUserReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UpdateUserReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isString(message.handle_value))
                    return "handle_value: string expected";
            return null;
        };

        /**
         * Creates an UpdateUserReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UpdateUserReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UpdateUserReq} UpdateUserReq
         */
        UpdateUserReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UpdateUserReq)
                return object;
            var message = new $root.Lobby.UpdateUserReq();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                message.handle_value = String(object.handle_value);
            return message;
        };

        /**
         * Creates a plain object from an UpdateUserReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UpdateUserReq
         * @static
         * @param {Lobby.UpdateUserReq} message UpdateUserReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpdateUserReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                object.handle_value = "";
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                object.handle_value = message.handle_value;
            return object;
        };

        /**
         * Converts this UpdateUserReq to JSON.
         * @function toJSON
         * @memberof Lobby.UpdateUserReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpdateUserReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UpdateUserReq;
    })();

    Lobby.UpdateUserRes = (function() {

        /**
         * Properties of an UpdateUserRes.
         * @memberof Lobby
         * @interface IUpdateUserRes
         * @property {number|null} [handle_type] UpdateUserRes handle_type
         * @property {string|null} [show_json] UpdateUserRes show_json
         * @property {Lobby.IUserInfoRes|null} [user_info] UpdateUserRes user_info
         * @property {Lobby.IUserOtherInfoRes|null} [user_other_info] UpdateUserRes user_other_info
         * @property {Lobby.IUserUsePropRes|null} [user_use_prop_info] UpdateUserRes user_use_prop_info
         * @property {string|null} [reason_type] UpdateUserRes reason_type
         */

        /**
         * Constructs a new UpdateUserRes.
         * @memberof Lobby
         * @classdesc Represents an UpdateUserRes.
         * @implements IUpdateUserRes
         * @constructor
         * @param {Lobby.IUpdateUserRes=} [properties] Properties to set
         */
        function UpdateUserRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * UpdateUserRes handle_type.
         * @member {number} handle_type
         * @memberof Lobby.UpdateUserRes
         * @instance
         */
        UpdateUserRes.prototype.handle_type = 0;

        /**
         * UpdateUserRes show_json.
         * @member {string} show_json
         * @memberof Lobby.UpdateUserRes
         * @instance
         */
        UpdateUserRes.prototype.show_json = "";

        /**
         * UpdateUserRes user_info.
         * @member {Lobby.IUserInfoRes|null|undefined} user_info
         * @memberof Lobby.UpdateUserRes
         * @instance
         */
        UpdateUserRes.prototype.user_info = null;

        /**
         * UpdateUserRes user_other_info.
         * @member {Lobby.IUserOtherInfoRes|null|undefined} user_other_info
         * @memberof Lobby.UpdateUserRes
         * @instance
         */
        UpdateUserRes.prototype.user_other_info = null;

        /**
         * UpdateUserRes user_use_prop_info.
         * @member {Lobby.IUserUsePropRes|null|undefined} user_use_prop_info
         * @memberof Lobby.UpdateUserRes
         * @instance
         */
        UpdateUserRes.prototype.user_use_prop_info = null;

        /**
         * UpdateUserRes reason_type.
         * @member {string} reason_type
         * @memberof Lobby.UpdateUserRes
         * @instance
         */
        UpdateUserRes.prototype.reason_type = "";

        /**
         * Creates a new UpdateUserRes instance using the specified properties.
         * @function create
         * @memberof Lobby.UpdateUserRes
         * @static
         * @param {Lobby.IUpdateUserRes=} [properties] Properties to set
         * @returns {Lobby.UpdateUserRes} UpdateUserRes instance
         */
        UpdateUserRes.create = function create(properties) {
            return new UpdateUserRes(properties);
        };

        /**
         * Encodes the specified UpdateUserRes message. Does not implicitly {@link Lobby.UpdateUserRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.UpdateUserRes
         * @static
         * @param {Lobby.IUpdateUserRes} message UpdateUserRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateUserRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.show_json != null && message.hasOwnProperty("show_json"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.show_json);
            if (message.user_info != null && message.hasOwnProperty("user_info"))
                $root.Lobby.UserInfoRes.encode(message.user_info, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.user_other_info != null && message.hasOwnProperty("user_other_info"))
                $root.Lobby.UserOtherInfoRes.encode(message.user_other_info, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.user_use_prop_info != null && message.hasOwnProperty("user_use_prop_info"))
                $root.Lobby.UserUsePropRes.encode(message.user_use_prop_info, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.reason_type != null && message.hasOwnProperty("reason_type"))
                writer.uint32(/* id 6, wireType 2 =*/50).string(message.reason_type);
            return writer;
        };

        /**
         * Encodes the specified UpdateUserRes message, length delimited. Does not implicitly {@link Lobby.UpdateUserRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.UpdateUserRes
         * @static
         * @param {Lobby.IUpdateUserRes} message UpdateUserRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        UpdateUserRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an UpdateUserRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.UpdateUserRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.UpdateUserRes} UpdateUserRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateUserRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.UpdateUserRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.show_json = reader.string();
                    break;
                case 3:
                    message.user_info = $root.Lobby.UserInfoRes.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.user_other_info = $root.Lobby.UserOtherInfoRes.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.user_use_prop_info = $root.Lobby.UserUsePropRes.decode(reader, reader.uint32());
                    break;
                case 6:
                    message.reason_type = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an UpdateUserRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.UpdateUserRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.UpdateUserRes} UpdateUserRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        UpdateUserRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an UpdateUserRes message.
         * @function verify
         * @memberof Lobby.UpdateUserRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        UpdateUserRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.show_json != null && message.hasOwnProperty("show_json"))
                if (!$util.isString(message.show_json))
                    return "show_json: string expected";
            if (message.user_info != null && message.hasOwnProperty("user_info")) {
                var error = $root.Lobby.UserInfoRes.verify(message.user_info);
                if (error)
                    return "user_info." + error;
            }
            if (message.user_other_info != null && message.hasOwnProperty("user_other_info")) {
                var error = $root.Lobby.UserOtherInfoRes.verify(message.user_other_info);
                if (error)
                    return "user_other_info." + error;
            }
            if (message.user_use_prop_info != null && message.hasOwnProperty("user_use_prop_info")) {
                var error = $root.Lobby.UserUsePropRes.verify(message.user_use_prop_info);
                if (error)
                    return "user_use_prop_info." + error;
            }
            if (message.reason_type != null && message.hasOwnProperty("reason_type"))
                if (!$util.isString(message.reason_type))
                    return "reason_type: string expected";
            return null;
        };

        /**
         * Creates an UpdateUserRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.UpdateUserRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.UpdateUserRes} UpdateUserRes
         */
        UpdateUserRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.UpdateUserRes)
                return object;
            var message = new $root.Lobby.UpdateUserRes();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.show_json != null)
                message.show_json = String(object.show_json);
            if (object.user_info != null) {
                if (typeof object.user_info !== "object")
                    throw TypeError(".Lobby.UpdateUserRes.user_info: object expected");
                message.user_info = $root.Lobby.UserInfoRes.fromObject(object.user_info);
            }
            if (object.user_other_info != null) {
                if (typeof object.user_other_info !== "object")
                    throw TypeError(".Lobby.UpdateUserRes.user_other_info: object expected");
                message.user_other_info = $root.Lobby.UserOtherInfoRes.fromObject(object.user_other_info);
            }
            if (object.user_use_prop_info != null) {
                if (typeof object.user_use_prop_info !== "object")
                    throw TypeError(".Lobby.UpdateUserRes.user_use_prop_info: object expected");
                message.user_use_prop_info = $root.Lobby.UserUsePropRes.fromObject(object.user_use_prop_info);
            }
            if (object.reason_type != null)
                message.reason_type = String(object.reason_type);
            return message;
        };

        /**
         * Creates a plain object from an UpdateUserRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.UpdateUserRes
         * @static
         * @param {Lobby.UpdateUserRes} message UpdateUserRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        UpdateUserRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                object.show_json = "";
                object.user_info = null;
                object.user_other_info = null;
                object.user_use_prop_info = null;
                object.reason_type = "";
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.show_json != null && message.hasOwnProperty("show_json"))
                object.show_json = message.show_json;
            if (message.user_info != null && message.hasOwnProperty("user_info"))
                object.user_info = $root.Lobby.UserInfoRes.toObject(message.user_info, options);
            if (message.user_other_info != null && message.hasOwnProperty("user_other_info"))
                object.user_other_info = $root.Lobby.UserOtherInfoRes.toObject(message.user_other_info, options);
            if (message.user_use_prop_info != null && message.hasOwnProperty("user_use_prop_info"))
                object.user_use_prop_info = $root.Lobby.UserUsePropRes.toObject(message.user_use_prop_info, options);
            if (message.reason_type != null && message.hasOwnProperty("reason_type"))
                object.reason_type = message.reason_type;
            return object;
        };

        /**
         * Converts this UpdateUserRes to JSON.
         * @function toJSON
         * @memberof Lobby.UpdateUserRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        UpdateUserRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return UpdateUserRes;
    })();

    Lobby.HeadImgReq = (function() {

        /**
         * Properties of a HeadImgReq.
         * @memberof Lobby
         * @interface IHeadImgReq
         */

        /**
         * Constructs a new HeadImgReq.
         * @memberof Lobby
         * @classdesc Represents a HeadImgReq.
         * @implements IHeadImgReq
         * @constructor
         * @param {Lobby.IHeadImgReq=} [properties] Properties to set
         */
        function HeadImgReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new HeadImgReq instance using the specified properties.
         * @function create
         * @memberof Lobby.HeadImgReq
         * @static
         * @param {Lobby.IHeadImgReq=} [properties] Properties to set
         * @returns {Lobby.HeadImgReq} HeadImgReq instance
         */
        HeadImgReq.create = function create(properties) {
            return new HeadImgReq(properties);
        };

        /**
         * Encodes the specified HeadImgReq message. Does not implicitly {@link Lobby.HeadImgReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.HeadImgReq
         * @static
         * @param {Lobby.IHeadImgReq} message HeadImgReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeadImgReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified HeadImgReq message, length delimited. Does not implicitly {@link Lobby.HeadImgReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.HeadImgReq
         * @static
         * @param {Lobby.IHeadImgReq} message HeadImgReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeadImgReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeadImgReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.HeadImgReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.HeadImgReq} HeadImgReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeadImgReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.HeadImgReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeadImgReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.HeadImgReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.HeadImgReq} HeadImgReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeadImgReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeadImgReq message.
         * @function verify
         * @memberof Lobby.HeadImgReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeadImgReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a HeadImgReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.HeadImgReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.HeadImgReq} HeadImgReq
         */
        HeadImgReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.HeadImgReq)
                return object;
            return new $root.Lobby.HeadImgReq();
        };

        /**
         * Creates a plain object from a HeadImgReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.HeadImgReq
         * @static
         * @param {Lobby.HeadImgReq} message HeadImgReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeadImgReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this HeadImgReq to JSON.
         * @function toJSON
         * @memberof Lobby.HeadImgReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeadImgReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HeadImgReq;
    })();

    Lobby.HeadImgRes = (function() {

        /**
         * Properties of a HeadImgRes.
         * @memberof Lobby
         * @interface IHeadImgRes
         * @property {Array.<string>|null} [head_img_str] HeadImgRes head_img_str
         */

        /**
         * Constructs a new HeadImgRes.
         * @memberof Lobby
         * @classdesc Represents a HeadImgRes.
         * @implements IHeadImgRes
         * @constructor
         * @param {Lobby.IHeadImgRes=} [properties] Properties to set
         */
        function HeadImgRes(properties) {
            this.head_img_str = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HeadImgRes head_img_str.
         * @member {Array.<string>} head_img_str
         * @memberof Lobby.HeadImgRes
         * @instance
         */
        HeadImgRes.prototype.head_img_str = $util.emptyArray;

        /**
         * Creates a new HeadImgRes instance using the specified properties.
         * @function create
         * @memberof Lobby.HeadImgRes
         * @static
         * @param {Lobby.IHeadImgRes=} [properties] Properties to set
         * @returns {Lobby.HeadImgRes} HeadImgRes instance
         */
        HeadImgRes.create = function create(properties) {
            return new HeadImgRes(properties);
        };

        /**
         * Encodes the specified HeadImgRes message. Does not implicitly {@link Lobby.HeadImgRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.HeadImgRes
         * @static
         * @param {Lobby.IHeadImgRes} message HeadImgRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeadImgRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.head_img_str != null && message.head_img_str.length)
                for (var i = 0; i < message.head_img_str.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.head_img_str[i]);
            return writer;
        };

        /**
         * Encodes the specified HeadImgRes message, length delimited. Does not implicitly {@link Lobby.HeadImgRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.HeadImgRes
         * @static
         * @param {Lobby.IHeadImgRes} message HeadImgRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeadImgRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeadImgRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.HeadImgRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.HeadImgRes} HeadImgRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeadImgRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.HeadImgRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.head_img_str && message.head_img_str.length))
                        message.head_img_str = [];
                    message.head_img_str.push(reader.string());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeadImgRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.HeadImgRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.HeadImgRes} HeadImgRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeadImgRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeadImgRes message.
         * @function verify
         * @memberof Lobby.HeadImgRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeadImgRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.head_img_str != null && message.hasOwnProperty("head_img_str")) {
                if (!Array.isArray(message.head_img_str))
                    return "head_img_str: array expected";
                for (var i = 0; i < message.head_img_str.length; ++i)
                    if (!$util.isString(message.head_img_str[i]))
                        return "head_img_str: string[] expected";
            }
            return null;
        };

        /**
         * Creates a HeadImgRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.HeadImgRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.HeadImgRes} HeadImgRes
         */
        HeadImgRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.HeadImgRes)
                return object;
            var message = new $root.Lobby.HeadImgRes();
            if (object.head_img_str) {
                if (!Array.isArray(object.head_img_str))
                    throw TypeError(".Lobby.HeadImgRes.head_img_str: array expected");
                message.head_img_str = [];
                for (var i = 0; i < object.head_img_str.length; ++i)
                    message.head_img_str[i] = String(object.head_img_str[i]);
            }
            return message;
        };

        /**
         * Creates a plain object from a HeadImgRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.HeadImgRes
         * @static
         * @param {Lobby.HeadImgRes} message HeadImgRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeadImgRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.head_img_str = [];
            if (message.head_img_str && message.head_img_str.length) {
                object.head_img_str = [];
                for (var j = 0; j < message.head_img_str.length; ++j)
                    object.head_img_str[j] = message.head_img_str[j];
            }
            return object;
        };

        /**
         * Converts this HeadImgRes to JSON.
         * @function toJSON
         * @memberof Lobby.HeadImgRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeadImgRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HeadImgRes;
    })();

    Lobby.HeartBeatReq = (function() {

        /**
         * Properties of a HeartBeatReq.
         * @memberof Lobby
         * @interface IHeartBeatReq
         * @property {number|Long|null} [req_time] HeartBeatReq req_time
         */

        /**
         * Constructs a new HeartBeatReq.
         * @memberof Lobby
         * @classdesc Represents a HeartBeatReq.
         * @implements IHeartBeatReq
         * @constructor
         * @param {Lobby.IHeartBeatReq=} [properties] Properties to set
         */
        function HeartBeatReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HeartBeatReq req_time.
         * @member {number|Long} req_time
         * @memberof Lobby.HeartBeatReq
         * @instance
         */
        HeartBeatReq.prototype.req_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new HeartBeatReq instance using the specified properties.
         * @function create
         * @memberof Lobby.HeartBeatReq
         * @static
         * @param {Lobby.IHeartBeatReq=} [properties] Properties to set
         * @returns {Lobby.HeartBeatReq} HeartBeatReq instance
         */
        HeartBeatReq.create = function create(properties) {
            return new HeartBeatReq(properties);
        };

        /**
         * Encodes the specified HeartBeatReq message. Does not implicitly {@link Lobby.HeartBeatReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.HeartBeatReq
         * @static
         * @param {Lobby.IHeartBeatReq} message HeartBeatReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeatReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.req_time != null && message.hasOwnProperty("req_time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.req_time);
            return writer;
        };

        /**
         * Encodes the specified HeartBeatReq message, length delimited. Does not implicitly {@link Lobby.HeartBeatReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.HeartBeatReq
         * @static
         * @param {Lobby.IHeartBeatReq} message HeartBeatReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeatReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeartBeatReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.HeartBeatReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.HeartBeatReq} HeartBeatReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeatReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.HeartBeatReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.req_time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeartBeatReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.HeartBeatReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.HeartBeatReq} HeartBeatReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeatReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeartBeatReq message.
         * @function verify
         * @memberof Lobby.HeartBeatReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeartBeatReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.req_time != null && message.hasOwnProperty("req_time"))
                if (!$util.isInteger(message.req_time) && !(message.req_time && $util.isInteger(message.req_time.low) && $util.isInteger(message.req_time.high)))
                    return "req_time: integer|Long expected";
            return null;
        };

        /**
         * Creates a HeartBeatReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.HeartBeatReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.HeartBeatReq} HeartBeatReq
         */
        HeartBeatReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.HeartBeatReq)
                return object;
            var message = new $root.Lobby.HeartBeatReq();
            if (object.req_time != null)
                if ($util.Long)
                    (message.req_time = $util.Long.fromValue(object.req_time)).unsigned = false;
                else if (typeof object.req_time === "string")
                    message.req_time = parseInt(object.req_time, 10);
                else if (typeof object.req_time === "number")
                    message.req_time = object.req_time;
                else if (typeof object.req_time === "object")
                    message.req_time = new $util.LongBits(object.req_time.low >>> 0, object.req_time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a HeartBeatReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.HeartBeatReq
         * @static
         * @param {Lobby.HeartBeatReq} message HeartBeatReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeartBeatReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.req_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.req_time = options.longs === String ? "0" : 0;
            if (message.req_time != null && message.hasOwnProperty("req_time"))
                if (typeof message.req_time === "number")
                    object.req_time = options.longs === String ? String(message.req_time) : message.req_time;
                else
                    object.req_time = options.longs === String ? $util.Long.prototype.toString.call(message.req_time) : options.longs === Number ? new $util.LongBits(message.req_time.low >>> 0, message.req_time.high >>> 0).toNumber() : message.req_time;
            return object;
        };

        /**
         * Converts this HeartBeatReq to JSON.
         * @function toJSON
         * @memberof Lobby.HeartBeatReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeartBeatReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HeartBeatReq;
    })();

    Lobby.HeartBeatRes = (function() {

        /**
         * Properties of a HeartBeatRes.
         * @memberof Lobby
         * @interface IHeartBeatRes
         * @property {number|Long|null} [req_time] HeartBeatRes req_time
         * @property {number|Long|null} [server_time] HeartBeatRes server_time
         */

        /**
         * Constructs a new HeartBeatRes.
         * @memberof Lobby
         * @classdesc Represents a HeartBeatRes.
         * @implements IHeartBeatRes
         * @constructor
         * @param {Lobby.IHeartBeatRes=} [properties] Properties to set
         */
        function HeartBeatRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HeartBeatRes req_time.
         * @member {number|Long} req_time
         * @memberof Lobby.HeartBeatRes
         * @instance
         */
        HeartBeatRes.prototype.req_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * HeartBeatRes server_time.
         * @member {number|Long} server_time
         * @memberof Lobby.HeartBeatRes
         * @instance
         */
        HeartBeatRes.prototype.server_time = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * Creates a new HeartBeatRes instance using the specified properties.
         * @function create
         * @memberof Lobby.HeartBeatRes
         * @static
         * @param {Lobby.IHeartBeatRes=} [properties] Properties to set
         * @returns {Lobby.HeartBeatRes} HeartBeatRes instance
         */
        HeartBeatRes.create = function create(properties) {
            return new HeartBeatRes(properties);
        };

        /**
         * Encodes the specified HeartBeatRes message. Does not implicitly {@link Lobby.HeartBeatRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.HeartBeatRes
         * @static
         * @param {Lobby.IHeartBeatRes} message HeartBeatRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeatRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.req_time != null && message.hasOwnProperty("req_time"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.req_time);
            if (message.server_time != null && message.hasOwnProperty("server_time"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.server_time);
            return writer;
        };

        /**
         * Encodes the specified HeartBeatRes message, length delimited. Does not implicitly {@link Lobby.HeartBeatRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.HeartBeatRes
         * @static
         * @param {Lobby.IHeartBeatRes} message HeartBeatRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HeartBeatRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HeartBeatRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.HeartBeatRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.HeartBeatRes} HeartBeatRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeatRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.HeartBeatRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.req_time = reader.int64();
                    break;
                case 2:
                    message.server_time = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HeartBeatRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.HeartBeatRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.HeartBeatRes} HeartBeatRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HeartBeatRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HeartBeatRes message.
         * @function verify
         * @memberof Lobby.HeartBeatRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        HeartBeatRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.req_time != null && message.hasOwnProperty("req_time"))
                if (!$util.isInteger(message.req_time) && !(message.req_time && $util.isInteger(message.req_time.low) && $util.isInteger(message.req_time.high)))
                    return "req_time: integer|Long expected";
            if (message.server_time != null && message.hasOwnProperty("server_time"))
                if (!$util.isInteger(message.server_time) && !(message.server_time && $util.isInteger(message.server_time.low) && $util.isInteger(message.server_time.high)))
                    return "server_time: integer|Long expected";
            return null;
        };

        /**
         * Creates a HeartBeatRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.HeartBeatRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.HeartBeatRes} HeartBeatRes
         */
        HeartBeatRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.HeartBeatRes)
                return object;
            var message = new $root.Lobby.HeartBeatRes();
            if (object.req_time != null)
                if ($util.Long)
                    (message.req_time = $util.Long.fromValue(object.req_time)).unsigned = false;
                else if (typeof object.req_time === "string")
                    message.req_time = parseInt(object.req_time, 10);
                else if (typeof object.req_time === "number")
                    message.req_time = object.req_time;
                else if (typeof object.req_time === "object")
                    message.req_time = new $util.LongBits(object.req_time.low >>> 0, object.req_time.high >>> 0).toNumber();
            if (object.server_time != null)
                if ($util.Long)
                    (message.server_time = $util.Long.fromValue(object.server_time)).unsigned = false;
                else if (typeof object.server_time === "string")
                    message.server_time = parseInt(object.server_time, 10);
                else if (typeof object.server_time === "number")
                    message.server_time = object.server_time;
                else if (typeof object.server_time === "object")
                    message.server_time = new $util.LongBits(object.server_time.low >>> 0, object.server_time.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a HeartBeatRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.HeartBeatRes
         * @static
         * @param {Lobby.HeartBeatRes} message HeartBeatRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HeartBeatRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.req_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.req_time = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.server_time = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.server_time = options.longs === String ? "0" : 0;
            }
            if (message.req_time != null && message.hasOwnProperty("req_time"))
                if (typeof message.req_time === "number")
                    object.req_time = options.longs === String ? String(message.req_time) : message.req_time;
                else
                    object.req_time = options.longs === String ? $util.Long.prototype.toString.call(message.req_time) : options.longs === Number ? new $util.LongBits(message.req_time.low >>> 0, message.req_time.high >>> 0).toNumber() : message.req_time;
            if (message.server_time != null && message.hasOwnProperty("server_time"))
                if (typeof message.server_time === "number")
                    object.server_time = options.longs === String ? String(message.server_time) : message.server_time;
                else
                    object.server_time = options.longs === String ? $util.Long.prototype.toString.call(message.server_time) : options.longs === Number ? new $util.LongBits(message.server_time.low >>> 0, message.server_time.high >>> 0).toNumber() : message.server_time;
            return object;
        };

        /**
         * Converts this HeartBeatRes to JSON.
         * @function toJSON
         * @memberof Lobby.HeartBeatRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        HeartBeatRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return HeartBeatRes;
    })();

    Lobby.InviteReq = (function() {

        /**
         * Properties of an InviteReq.
         * @memberof Lobby
         * @interface IInviteReq
         * @property {number|null} [handle_type] InviteReq handle_type
         * @property {number|Long|null} [handle_value] InviteReq handle_value
         * @property {number|null} [reward_id] InviteReq reward_id
         */

        /**
         * Constructs a new InviteReq.
         * @memberof Lobby
         * @classdesc Represents an InviteReq.
         * @implements IInviteReq
         * @constructor
         * @param {Lobby.IInviteReq=} [properties] Properties to set
         */
        function InviteReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InviteReq handle_type.
         * @member {number} handle_type
         * @memberof Lobby.InviteReq
         * @instance
         */
        InviteReq.prototype.handle_type = 0;

        /**
         * InviteReq handle_value.
         * @member {number|Long} handle_value
         * @memberof Lobby.InviteReq
         * @instance
         */
        InviteReq.prototype.handle_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * InviteReq reward_id.
         * @member {number} reward_id
         * @memberof Lobby.InviteReq
         * @instance
         */
        InviteReq.prototype.reward_id = 0;

        /**
         * Creates a new InviteReq instance using the specified properties.
         * @function create
         * @memberof Lobby.InviteReq
         * @static
         * @param {Lobby.IInviteReq=} [properties] Properties to set
         * @returns {Lobby.InviteReq} InviteReq instance
         */
        InviteReq.create = function create(properties) {
            return new InviteReq(properties);
        };

        /**
         * Encodes the specified InviteReq message. Does not implicitly {@link Lobby.InviteReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.InviteReq
         * @static
         * @param {Lobby.IInviteReq} message InviteReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InviteReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.handle_value);
            if (message.reward_id != null && message.hasOwnProperty("reward_id"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.reward_id);
            return writer;
        };

        /**
         * Encodes the specified InviteReq message, length delimited. Does not implicitly {@link Lobby.InviteReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.InviteReq
         * @static
         * @param {Lobby.IInviteReq} message InviteReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InviteReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InviteReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.InviteReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.InviteReq} InviteReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InviteReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.InviteReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.int64();
                    break;
                case 3:
                    message.reward_id = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InviteReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.InviteReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.InviteReq} InviteReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InviteReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InviteReq message.
         * @function verify
         * @memberof Lobby.InviteReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InviteReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isInteger(message.handle_value) && !(message.handle_value && $util.isInteger(message.handle_value.low) && $util.isInteger(message.handle_value.high)))
                    return "handle_value: integer|Long expected";
            if (message.reward_id != null && message.hasOwnProperty("reward_id"))
                if (!$util.isInteger(message.reward_id))
                    return "reward_id: integer expected";
            return null;
        };

        /**
         * Creates an InviteReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.InviteReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.InviteReq} InviteReq
         */
        InviteReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.InviteReq)
                return object;
            var message = new $root.Lobby.InviteReq();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                if ($util.Long)
                    (message.handle_value = $util.Long.fromValue(object.handle_value)).unsigned = false;
                else if (typeof object.handle_value === "string")
                    message.handle_value = parseInt(object.handle_value, 10);
                else if (typeof object.handle_value === "number")
                    message.handle_value = object.handle_value;
                else if (typeof object.handle_value === "object")
                    message.handle_value = new $util.LongBits(object.handle_value.low >>> 0, object.handle_value.high >>> 0).toNumber();
            if (object.reward_id != null)
                message.reward_id = object.reward_id | 0;
            return message;
        };

        /**
         * Creates a plain object from an InviteReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.InviteReq
         * @static
         * @param {Lobby.InviteReq} message InviteReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InviteReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.handle_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.handle_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.handle_value = options.longs === String ? "0" : 0;
                object.reward_id = 0;
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (typeof message.handle_value === "number")
                    object.handle_value = options.longs === String ? String(message.handle_value) : message.handle_value;
                else
                    object.handle_value = options.longs === String ? $util.Long.prototype.toString.call(message.handle_value) : options.longs === Number ? new $util.LongBits(message.handle_value.low >>> 0, message.handle_value.high >>> 0).toNumber() : message.handle_value;
            if (message.reward_id != null && message.hasOwnProperty("reward_id"))
                object.reward_id = message.reward_id;
            return object;
        };

        /**
         * Converts this InviteReq to JSON.
         * @function toJSON
         * @memberof Lobby.InviteReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InviteReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return InviteReq;
    })();

    Lobby.InviteRes = (function() {

        /**
         * Properties of an InviteRes.
         * @memberof Lobby
         * @interface IInviteRes
         * @property {number|null} [handle_type] InviteRes handle_type
         * @property {number|Long|null} [handle_value] InviteRes handle_value
         * @property {number|null} [reward_id] InviteRes reward_id
         * @property {Array.<Lobby.IInviteItemRes>|null} [invite_item_list] InviteRes invite_item_list
         * @property {Lobby.IInviteItemRes|null} [invite_item] InviteRes invite_item
         */

        /**
         * Constructs a new InviteRes.
         * @memberof Lobby
         * @classdesc Represents an InviteRes.
         * @implements IInviteRes
         * @constructor
         * @param {Lobby.IInviteRes=} [properties] Properties to set
         */
        function InviteRes(properties) {
            this.invite_item_list = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InviteRes handle_type.
         * @member {number} handle_type
         * @memberof Lobby.InviteRes
         * @instance
         */
        InviteRes.prototype.handle_type = 0;

        /**
         * InviteRes handle_value.
         * @member {number|Long} handle_value
         * @memberof Lobby.InviteRes
         * @instance
         */
        InviteRes.prototype.handle_value = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * InviteRes reward_id.
         * @member {number} reward_id
         * @memberof Lobby.InviteRes
         * @instance
         */
        InviteRes.prototype.reward_id = 0;

        /**
         * InviteRes invite_item_list.
         * @member {Array.<Lobby.IInviteItemRes>} invite_item_list
         * @memberof Lobby.InviteRes
         * @instance
         */
        InviteRes.prototype.invite_item_list = $util.emptyArray;

        /**
         * InviteRes invite_item.
         * @member {Lobby.IInviteItemRes|null|undefined} invite_item
         * @memberof Lobby.InviteRes
         * @instance
         */
        InviteRes.prototype.invite_item = null;

        /**
         * Creates a new InviteRes instance using the specified properties.
         * @function create
         * @memberof Lobby.InviteRes
         * @static
         * @param {Lobby.IInviteRes=} [properties] Properties to set
         * @returns {Lobby.InviteRes} InviteRes instance
         */
        InviteRes.create = function create(properties) {
            return new InviteRes(properties);
        };

        /**
         * Encodes the specified InviteRes message. Does not implicitly {@link Lobby.InviteRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.InviteRes
         * @static
         * @param {Lobby.IInviteRes} message InviteRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InviteRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.handle_type);
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.handle_value);
            if (message.reward_id != null && message.hasOwnProperty("reward_id"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.reward_id);
            if (message.invite_item_list != null && message.invite_item_list.length)
                for (var i = 0; i < message.invite_item_list.length; ++i)
                    $root.Lobby.InviteItemRes.encode(message.invite_item_list[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.invite_item != null && message.hasOwnProperty("invite_item"))
                $root.Lobby.InviteItemRes.encode(message.invite_item, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified InviteRes message, length delimited. Does not implicitly {@link Lobby.InviteRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.InviteRes
         * @static
         * @param {Lobby.IInviteRes} message InviteRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InviteRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InviteRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.InviteRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.InviteRes} InviteRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InviteRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.InviteRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.handle_type = reader.int32();
                    break;
                case 2:
                    message.handle_value = reader.int64();
                    break;
                case 3:
                    message.reward_id = reader.int32();
                    break;
                case 4:
                    if (!(message.invite_item_list && message.invite_item_list.length))
                        message.invite_item_list = [];
                    message.invite_item_list.push($root.Lobby.InviteItemRes.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.invite_item = $root.Lobby.InviteItemRes.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InviteRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.InviteRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.InviteRes} InviteRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InviteRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InviteRes message.
         * @function verify
         * @memberof Lobby.InviteRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InviteRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                if (!$util.isInteger(message.handle_type))
                    return "handle_type: integer expected";
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (!$util.isInteger(message.handle_value) && !(message.handle_value && $util.isInteger(message.handle_value.low) && $util.isInteger(message.handle_value.high)))
                    return "handle_value: integer|Long expected";
            if (message.reward_id != null && message.hasOwnProperty("reward_id"))
                if (!$util.isInteger(message.reward_id))
                    return "reward_id: integer expected";
            if (message.invite_item_list != null && message.hasOwnProperty("invite_item_list")) {
                if (!Array.isArray(message.invite_item_list))
                    return "invite_item_list: array expected";
                for (var i = 0; i < message.invite_item_list.length; ++i) {
                    var error = $root.Lobby.InviteItemRes.verify(message.invite_item_list[i]);
                    if (error)
                        return "invite_item_list." + error;
                }
            }
            if (message.invite_item != null && message.hasOwnProperty("invite_item")) {
                var error = $root.Lobby.InviteItemRes.verify(message.invite_item);
                if (error)
                    return "invite_item." + error;
            }
            return null;
        };

        /**
         * Creates an InviteRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.InviteRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.InviteRes} InviteRes
         */
        InviteRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.InviteRes)
                return object;
            var message = new $root.Lobby.InviteRes();
            if (object.handle_type != null)
                message.handle_type = object.handle_type | 0;
            if (object.handle_value != null)
                if ($util.Long)
                    (message.handle_value = $util.Long.fromValue(object.handle_value)).unsigned = false;
                else if (typeof object.handle_value === "string")
                    message.handle_value = parseInt(object.handle_value, 10);
                else if (typeof object.handle_value === "number")
                    message.handle_value = object.handle_value;
                else if (typeof object.handle_value === "object")
                    message.handle_value = new $util.LongBits(object.handle_value.low >>> 0, object.handle_value.high >>> 0).toNumber();
            if (object.reward_id != null)
                message.reward_id = object.reward_id | 0;
            if (object.invite_item_list) {
                if (!Array.isArray(object.invite_item_list))
                    throw TypeError(".Lobby.InviteRes.invite_item_list: array expected");
                message.invite_item_list = [];
                for (var i = 0; i < object.invite_item_list.length; ++i) {
                    if (typeof object.invite_item_list[i] !== "object")
                        throw TypeError(".Lobby.InviteRes.invite_item_list: object expected");
                    message.invite_item_list[i] = $root.Lobby.InviteItemRes.fromObject(object.invite_item_list[i]);
                }
            }
            if (object.invite_item != null) {
                if (typeof object.invite_item !== "object")
                    throw TypeError(".Lobby.InviteRes.invite_item: object expected");
                message.invite_item = $root.Lobby.InviteItemRes.fromObject(object.invite_item);
            }
            return message;
        };

        /**
         * Creates a plain object from an InviteRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.InviteRes
         * @static
         * @param {Lobby.InviteRes} message InviteRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InviteRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.invite_item_list = [];
            if (options.defaults) {
                object.handle_type = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.handle_value = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.handle_value = options.longs === String ? "0" : 0;
                object.reward_id = 0;
                object.invite_item = null;
            }
            if (message.handle_type != null && message.hasOwnProperty("handle_type"))
                object.handle_type = message.handle_type;
            if (message.handle_value != null && message.hasOwnProperty("handle_value"))
                if (typeof message.handle_value === "number")
                    object.handle_value = options.longs === String ? String(message.handle_value) : message.handle_value;
                else
                    object.handle_value = options.longs === String ? $util.Long.prototype.toString.call(message.handle_value) : options.longs === Number ? new $util.LongBits(message.handle_value.low >>> 0, message.handle_value.high >>> 0).toNumber() : message.handle_value;
            if (message.reward_id != null && message.hasOwnProperty("reward_id"))
                object.reward_id = message.reward_id;
            if (message.invite_item_list && message.invite_item_list.length) {
                object.invite_item_list = [];
                for (var j = 0; j < message.invite_item_list.length; ++j)
                    object.invite_item_list[j] = $root.Lobby.InviteItemRes.toObject(message.invite_item_list[j], options);
            }
            if (message.invite_item != null && message.hasOwnProperty("invite_item"))
                object.invite_item = $root.Lobby.InviteItemRes.toObject(message.invite_item, options);
            return object;
        };

        /**
         * Converts this InviteRes to JSON.
         * @function toJSON
         * @memberof Lobby.InviteRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InviteRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return InviteRes;
    })();

    Lobby.InviteItemRes = (function() {

        /**
         * Properties of an InviteItemRes.
         * @memberof Lobby
         * @interface IInviteItemRes
         * @property {number|Long|null} [ui_id] InviteItemRes ui_id
         * @property {string|null} [head_img_url] InviteItemRes head_img_url
         * @property {number|null} [reward_one] InviteItemRes reward_one
         * @property {number|null} [reward_two] InviteItemRes reward_two
         * @property {number|null} [reward_three] InviteItemRes reward_three
         * @property {number|null} [reward_four] InviteItemRes reward_four
         */

        /**
         * Constructs a new InviteItemRes.
         * @memberof Lobby
         * @classdesc Represents an InviteItemRes.
         * @implements IInviteItemRes
         * @constructor
         * @param {Lobby.IInviteItemRes=} [properties] Properties to set
         */
        function InviteItemRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * InviteItemRes ui_id.
         * @member {number|Long} ui_id
         * @memberof Lobby.InviteItemRes
         * @instance
         */
        InviteItemRes.prototype.ui_id = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

        /**
         * InviteItemRes head_img_url.
         * @member {string} head_img_url
         * @memberof Lobby.InviteItemRes
         * @instance
         */
        InviteItemRes.prototype.head_img_url = "";

        /**
         * InviteItemRes reward_one.
         * @member {number} reward_one
         * @memberof Lobby.InviteItemRes
         * @instance
         */
        InviteItemRes.prototype.reward_one = 0;

        /**
         * InviteItemRes reward_two.
         * @member {number} reward_two
         * @memberof Lobby.InviteItemRes
         * @instance
         */
        InviteItemRes.prototype.reward_two = 0;

        /**
         * InviteItemRes reward_three.
         * @member {number} reward_three
         * @memberof Lobby.InviteItemRes
         * @instance
         */
        InviteItemRes.prototype.reward_three = 0;

        /**
         * InviteItemRes reward_four.
         * @member {number} reward_four
         * @memberof Lobby.InviteItemRes
         * @instance
         */
        InviteItemRes.prototype.reward_four = 0;

        /**
         * Creates a new InviteItemRes instance using the specified properties.
         * @function create
         * @memberof Lobby.InviteItemRes
         * @static
         * @param {Lobby.IInviteItemRes=} [properties] Properties to set
         * @returns {Lobby.InviteItemRes} InviteItemRes instance
         */
        InviteItemRes.create = function create(properties) {
            return new InviteItemRes(properties);
        };

        /**
         * Encodes the specified InviteItemRes message. Does not implicitly {@link Lobby.InviteItemRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.InviteItemRes
         * @static
         * @param {Lobby.IInviteItemRes} message InviteItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InviteItemRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ui_id != null && message.hasOwnProperty("ui_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.ui_id);
            if (message.head_img_url != null && message.hasOwnProperty("head_img_url"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.head_img_url);
            if (message.reward_one != null && message.hasOwnProperty("reward_one"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.reward_one);
            if (message.reward_two != null && message.hasOwnProperty("reward_two"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.reward_two);
            if (message.reward_three != null && message.hasOwnProperty("reward_three"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.reward_three);
            if (message.reward_four != null && message.hasOwnProperty("reward_four"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.reward_four);
            return writer;
        };

        /**
         * Encodes the specified InviteItemRes message, length delimited. Does not implicitly {@link Lobby.InviteItemRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.InviteItemRes
         * @static
         * @param {Lobby.IInviteItemRes} message InviteItemRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        InviteItemRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an InviteItemRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.InviteItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.InviteItemRes} InviteItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InviteItemRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.InviteItemRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ui_id = reader.int64();
                    break;
                case 2:
                    message.head_img_url = reader.string();
                    break;
                case 3:
                    message.reward_one = reader.int32();
                    break;
                case 4:
                    message.reward_two = reader.int32();
                    break;
                case 5:
                    message.reward_three = reader.int32();
                    break;
                case 6:
                    message.reward_four = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an InviteItemRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.InviteItemRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.InviteItemRes} InviteItemRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        InviteItemRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an InviteItemRes message.
         * @function verify
         * @memberof Lobby.InviteItemRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        InviteItemRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ui_id != null && message.hasOwnProperty("ui_id"))
                if (!$util.isInteger(message.ui_id) && !(message.ui_id && $util.isInteger(message.ui_id.low) && $util.isInteger(message.ui_id.high)))
                    return "ui_id: integer|Long expected";
            if (message.head_img_url != null && message.hasOwnProperty("head_img_url"))
                if (!$util.isString(message.head_img_url))
                    return "head_img_url: string expected";
            if (message.reward_one != null && message.hasOwnProperty("reward_one"))
                if (!$util.isInteger(message.reward_one))
                    return "reward_one: integer expected";
            if (message.reward_two != null && message.hasOwnProperty("reward_two"))
                if (!$util.isInteger(message.reward_two))
                    return "reward_two: integer expected";
            if (message.reward_three != null && message.hasOwnProperty("reward_three"))
                if (!$util.isInteger(message.reward_three))
                    return "reward_three: integer expected";
            if (message.reward_four != null && message.hasOwnProperty("reward_four"))
                if (!$util.isInteger(message.reward_four))
                    return "reward_four: integer expected";
            return null;
        };

        /**
         * Creates an InviteItemRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.InviteItemRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.InviteItemRes} InviteItemRes
         */
        InviteItemRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.InviteItemRes)
                return object;
            var message = new $root.Lobby.InviteItemRes();
            if (object.ui_id != null)
                if ($util.Long)
                    (message.ui_id = $util.Long.fromValue(object.ui_id)).unsigned = false;
                else if (typeof object.ui_id === "string")
                    message.ui_id = parseInt(object.ui_id, 10);
                else if (typeof object.ui_id === "number")
                    message.ui_id = object.ui_id;
                else if (typeof object.ui_id === "object")
                    message.ui_id = new $util.LongBits(object.ui_id.low >>> 0, object.ui_id.high >>> 0).toNumber();
            if (object.head_img_url != null)
                message.head_img_url = String(object.head_img_url);
            if (object.reward_one != null)
                message.reward_one = object.reward_one | 0;
            if (object.reward_two != null)
                message.reward_two = object.reward_two | 0;
            if (object.reward_three != null)
                message.reward_three = object.reward_three | 0;
            if (object.reward_four != null)
                message.reward_four = object.reward_four | 0;
            return message;
        };

        /**
         * Creates a plain object from an InviteItemRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.InviteItemRes
         * @static
         * @param {Lobby.InviteItemRes} message InviteItemRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        InviteItemRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ui_id = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ui_id = options.longs === String ? "0" : 0;
                object.head_img_url = "";
                object.reward_one = 0;
                object.reward_two = 0;
                object.reward_three = 0;
                object.reward_four = 0;
            }
            if (message.ui_id != null && message.hasOwnProperty("ui_id"))
                if (typeof message.ui_id === "number")
                    object.ui_id = options.longs === String ? String(message.ui_id) : message.ui_id;
                else
                    object.ui_id = options.longs === String ? $util.Long.prototype.toString.call(message.ui_id) : options.longs === Number ? new $util.LongBits(message.ui_id.low >>> 0, message.ui_id.high >>> 0).toNumber() : message.ui_id;
            if (message.head_img_url != null && message.hasOwnProperty("head_img_url"))
                object.head_img_url = message.head_img_url;
            if (message.reward_one != null && message.hasOwnProperty("reward_one"))
                object.reward_one = message.reward_one;
            if (message.reward_two != null && message.hasOwnProperty("reward_two"))
                object.reward_two = message.reward_two;
            if (message.reward_three != null && message.hasOwnProperty("reward_three"))
                object.reward_three = message.reward_three;
            if (message.reward_four != null && message.hasOwnProperty("reward_four"))
                object.reward_four = message.reward_four;
            return object;
        };

        /**
         * Converts this InviteItemRes to JSON.
         * @function toJSON
         * @memberof Lobby.InviteItemRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        InviteItemRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return InviteItemRes;
    })();

    Lobby.AdReq = (function() {

        /**
         * Properties of an AdReq.
         * @memberof Lobby
         * @interface IAdReq
         */

        /**
         * Constructs a new AdReq.
         * @memberof Lobby
         * @classdesc Represents an AdReq.
         * @implements IAdReq
         * @constructor
         * @param {Lobby.IAdReq=} [properties] Properties to set
         */
        function AdReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new AdReq instance using the specified properties.
         * @function create
         * @memberof Lobby.AdReq
         * @static
         * @param {Lobby.IAdReq=} [properties] Properties to set
         * @returns {Lobby.AdReq} AdReq instance
         */
        AdReq.create = function create(properties) {
            return new AdReq(properties);
        };

        /**
         * Encodes the specified AdReq message. Does not implicitly {@link Lobby.AdReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.AdReq
         * @static
         * @param {Lobby.IAdReq} message AdReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified AdReq message, length delimited. Does not implicitly {@link Lobby.AdReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.AdReq
         * @static
         * @param {Lobby.IAdReq} message AdReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AdReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.AdReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.AdReq} AdReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.AdReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AdReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.AdReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.AdReq} AdReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdReq message.
         * @function verify
         * @memberof Lobby.AdReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates an AdReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.AdReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.AdReq} AdReq
         */
        AdReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.AdReq)
                return object;
            return new $root.Lobby.AdReq();
        };

        /**
         * Creates a plain object from an AdReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.AdReq
         * @static
         * @param {Lobby.AdReq} message AdReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdReq.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this AdReq to JSON.
         * @function toJSON
         * @memberof Lobby.AdReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AdReq;
    })();

    Lobby.AdRes = (function() {

        /**
         * Properties of an AdRes.
         * @memberof Lobby
         * @interface IAdRes
         * @property {string|null} [ad_id] AdRes ad_id
         */

        /**
         * Constructs a new AdRes.
         * @memberof Lobby
         * @classdesc Represents an AdRes.
         * @implements IAdRes
         * @constructor
         * @param {Lobby.IAdRes=} [properties] Properties to set
         */
        function AdRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdRes ad_id.
         * @member {string} ad_id
         * @memberof Lobby.AdRes
         * @instance
         */
        AdRes.prototype.ad_id = "";

        /**
         * Creates a new AdRes instance using the specified properties.
         * @function create
         * @memberof Lobby.AdRes
         * @static
         * @param {Lobby.IAdRes=} [properties] Properties to set
         * @returns {Lobby.AdRes} AdRes instance
         */
        AdRes.create = function create(properties) {
            return new AdRes(properties);
        };

        /**
         * Encodes the specified AdRes message. Does not implicitly {@link Lobby.AdRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.AdRes
         * @static
         * @param {Lobby.IAdRes} message AdRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ad_id != null && message.hasOwnProperty("ad_id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.ad_id);
            return writer;
        };

        /**
         * Encodes the specified AdRes message, length delimited. Does not implicitly {@link Lobby.AdRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.AdRes
         * @static
         * @param {Lobby.IAdRes} message AdRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AdRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.AdRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.AdRes} AdRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.AdRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.ad_id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an AdRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.AdRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.AdRes} AdRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdRes message.
         * @function verify
         * @memberof Lobby.AdRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ad_id != null && message.hasOwnProperty("ad_id"))
                if (!$util.isString(message.ad_id))
                    return "ad_id: string expected";
            return null;
        };

        /**
         * Creates an AdRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.AdRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.AdRes} AdRes
         */
        AdRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.AdRes)
                return object;
            var message = new $root.Lobby.AdRes();
            if (object.ad_id != null)
                message.ad_id = String(object.ad_id);
            return message;
        };

        /**
         * Creates a plain object from an AdRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.AdRes
         * @static
         * @param {Lobby.AdRes} message AdRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.ad_id = "";
            if (message.ad_id != null && message.hasOwnProperty("ad_id"))
                object.ad_id = message.ad_id;
            return object;
        };

        /**
         * Converts this AdRes to JSON.
         * @function toJSON
         * @memberof Lobby.AdRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AdRes;
    })();

    Lobby.EnterDdzGoldGameReq = (function() {

        /**
         * Properties of an EnterDdzGoldGameReq.
         * @memberof Lobby
         * @interface IEnterDdzGoldGameReq
         * @property {number|null} [gwc_id] EnterDdzGoldGameReq gwc_id
         * @property {Lobby.IEnterDdzGoldParam|null} [ddz_start_param] EnterDdzGoldGameReq ddz_start_param
         */

        /**
         * Constructs a new EnterDdzGoldGameReq.
         * @memberof Lobby
         * @classdesc Represents an EnterDdzGoldGameReq.
         * @implements IEnterDdzGoldGameReq
         * @constructor
         * @param {Lobby.IEnterDdzGoldGameReq=} [properties] Properties to set
         */
        function EnterDdzGoldGameReq(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterDdzGoldGameReq gwc_id.
         * @member {number} gwc_id
         * @memberof Lobby.EnterDdzGoldGameReq
         * @instance
         */
        EnterDdzGoldGameReq.prototype.gwc_id = 0;

        /**
         * EnterDdzGoldGameReq ddz_start_param.
         * @member {Lobby.IEnterDdzGoldParam|null|undefined} ddz_start_param
         * @memberof Lobby.EnterDdzGoldGameReq
         * @instance
         */
        EnterDdzGoldGameReq.prototype.ddz_start_param = null;

        /**
         * Creates a new EnterDdzGoldGameReq instance using the specified properties.
         * @function create
         * @memberof Lobby.EnterDdzGoldGameReq
         * @static
         * @param {Lobby.IEnterDdzGoldGameReq=} [properties] Properties to set
         * @returns {Lobby.EnterDdzGoldGameReq} EnterDdzGoldGameReq instance
         */
        EnterDdzGoldGameReq.create = function create(properties) {
            return new EnterDdzGoldGameReq(properties);
        };

        /**
         * Encodes the specified EnterDdzGoldGameReq message. Does not implicitly {@link Lobby.EnterDdzGoldGameReq.verify|verify} messages.
         * @function encode
         * @memberof Lobby.EnterDdzGoldGameReq
         * @static
         * @param {Lobby.IEnterDdzGoldGameReq} message EnterDdzGoldGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterDdzGoldGameReq.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gwc_id != null && message.hasOwnProperty("gwc_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gwc_id);
            if (message.ddz_start_param != null && message.hasOwnProperty("ddz_start_param"))
                $root.Lobby.EnterDdzGoldParam.encode(message.ddz_start_param, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified EnterDdzGoldGameReq message, length delimited. Does not implicitly {@link Lobby.EnterDdzGoldGameReq.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.EnterDdzGoldGameReq
         * @static
         * @param {Lobby.IEnterDdzGoldGameReq} message EnterDdzGoldGameReq message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterDdzGoldGameReq.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterDdzGoldGameReq message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.EnterDdzGoldGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.EnterDdzGoldGameReq} EnterDdzGoldGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterDdzGoldGameReq.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.EnterDdzGoldGameReq();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gwc_id = reader.int32();
                    break;
                case 2:
                    message.ddz_start_param = $root.Lobby.EnterDdzGoldParam.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnterDdzGoldGameReq message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.EnterDdzGoldGameReq
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.EnterDdzGoldGameReq} EnterDdzGoldGameReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterDdzGoldGameReq.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterDdzGoldGameReq message.
         * @function verify
         * @memberof Lobby.EnterDdzGoldGameReq
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterDdzGoldGameReq.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gwc_id != null && message.hasOwnProperty("gwc_id"))
                if (!$util.isInteger(message.gwc_id))
                    return "gwc_id: integer expected";
            if (message.ddz_start_param != null && message.hasOwnProperty("ddz_start_param")) {
                var error = $root.Lobby.EnterDdzGoldParam.verify(message.ddz_start_param);
                if (error)
                    return "ddz_start_param." + error;
            }
            return null;
        };

        /**
         * Creates an EnterDdzGoldGameReq message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.EnterDdzGoldGameReq
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.EnterDdzGoldGameReq} EnterDdzGoldGameReq
         */
        EnterDdzGoldGameReq.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.EnterDdzGoldGameReq)
                return object;
            var message = new $root.Lobby.EnterDdzGoldGameReq();
            if (object.gwc_id != null)
                message.gwc_id = object.gwc_id | 0;
            if (object.ddz_start_param != null) {
                if (typeof object.ddz_start_param !== "object")
                    throw TypeError(".Lobby.EnterDdzGoldGameReq.ddz_start_param: object expected");
                message.ddz_start_param = $root.Lobby.EnterDdzGoldParam.fromObject(object.ddz_start_param);
            }
            return message;
        };

        /**
         * Creates a plain object from an EnterDdzGoldGameReq message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.EnterDdzGoldGameReq
         * @static
         * @param {Lobby.EnterDdzGoldGameReq} message EnterDdzGoldGameReq
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnterDdzGoldGameReq.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gwc_id = 0;
                object.ddz_start_param = null;
            }
            if (message.gwc_id != null && message.hasOwnProperty("gwc_id"))
                object.gwc_id = message.gwc_id;
            if (message.ddz_start_param != null && message.hasOwnProperty("ddz_start_param"))
                object.ddz_start_param = $root.Lobby.EnterDdzGoldParam.toObject(message.ddz_start_param, options);
            return object;
        };

        /**
         * Converts this EnterDdzGoldGameReq to JSON.
         * @function toJSON
         * @memberof Lobby.EnterDdzGoldGameReq
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnterDdzGoldGameReq.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EnterDdzGoldGameReq;
    })();

    Lobby.EnterDdzGoldGameRes = (function() {

        /**
         * Properties of an EnterDdzGoldGameRes.
         * @memberof Lobby
         * @interface IEnterDdzGoldGameRes
         * @property {number|null} [gwc_id] EnterDdzGoldGameRes gwc_id
         * @property {Lobby.IEnterDdzGoldParam|null} [ddz_start_param] EnterDdzGoldGameRes ddz_start_param
         * @property {number|null} [code] EnterDdzGoldGameRes code
         * @property {string|null} [message] EnterDdzGoldGameRes message
         */

        /**
         * Constructs a new EnterDdzGoldGameRes.
         * @memberof Lobby
         * @classdesc Represents an EnterDdzGoldGameRes.
         * @implements IEnterDdzGoldGameRes
         * @constructor
         * @param {Lobby.IEnterDdzGoldGameRes=} [properties] Properties to set
         */
        function EnterDdzGoldGameRes(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterDdzGoldGameRes gwc_id.
         * @member {number} gwc_id
         * @memberof Lobby.EnterDdzGoldGameRes
         * @instance
         */
        EnterDdzGoldGameRes.prototype.gwc_id = 0;

        /**
         * EnterDdzGoldGameRes ddz_start_param.
         * @member {Lobby.IEnterDdzGoldParam|null|undefined} ddz_start_param
         * @memberof Lobby.EnterDdzGoldGameRes
         * @instance
         */
        EnterDdzGoldGameRes.prototype.ddz_start_param = null;

        /**
         * EnterDdzGoldGameRes code.
         * @member {number} code
         * @memberof Lobby.EnterDdzGoldGameRes
         * @instance
         */
        EnterDdzGoldGameRes.prototype.code = 0;

        /**
         * EnterDdzGoldGameRes message.
         * @member {string} message
         * @memberof Lobby.EnterDdzGoldGameRes
         * @instance
         */
        EnterDdzGoldGameRes.prototype.message = "";

        /**
         * Creates a new EnterDdzGoldGameRes instance using the specified properties.
         * @function create
         * @memberof Lobby.EnterDdzGoldGameRes
         * @static
         * @param {Lobby.IEnterDdzGoldGameRes=} [properties] Properties to set
         * @returns {Lobby.EnterDdzGoldGameRes} EnterDdzGoldGameRes instance
         */
        EnterDdzGoldGameRes.create = function create(properties) {
            return new EnterDdzGoldGameRes(properties);
        };

        /**
         * Encodes the specified EnterDdzGoldGameRes message. Does not implicitly {@link Lobby.EnterDdzGoldGameRes.verify|verify} messages.
         * @function encode
         * @memberof Lobby.EnterDdzGoldGameRes
         * @static
         * @param {Lobby.IEnterDdzGoldGameRes} message EnterDdzGoldGameRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterDdzGoldGameRes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gwc_id != null && message.hasOwnProperty("gwc_id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gwc_id);
            if (message.ddz_start_param != null && message.hasOwnProperty("ddz_start_param"))
                $root.Lobby.EnterDdzGoldParam.encode(message.ddz_start_param, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.code);
            if (message.message != null && message.hasOwnProperty("message"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.message);
            return writer;
        };

        /**
         * Encodes the specified EnterDdzGoldGameRes message, length delimited. Does not implicitly {@link Lobby.EnterDdzGoldGameRes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.EnterDdzGoldGameRes
         * @static
         * @param {Lobby.IEnterDdzGoldGameRes} message EnterDdzGoldGameRes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterDdzGoldGameRes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterDdzGoldGameRes message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.EnterDdzGoldGameRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.EnterDdzGoldGameRes} EnterDdzGoldGameRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterDdzGoldGameRes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.EnterDdzGoldGameRes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.gwc_id = reader.int32();
                    break;
                case 2:
                    message.ddz_start_param = $root.Lobby.EnterDdzGoldParam.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.code = reader.int32();
                    break;
                case 4:
                    message.message = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnterDdzGoldGameRes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.EnterDdzGoldGameRes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.EnterDdzGoldGameRes} EnterDdzGoldGameRes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterDdzGoldGameRes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterDdzGoldGameRes message.
         * @function verify
         * @memberof Lobby.EnterDdzGoldGameRes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterDdzGoldGameRes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gwc_id != null && message.hasOwnProperty("gwc_id"))
                if (!$util.isInteger(message.gwc_id))
                    return "gwc_id: integer expected";
            if (message.ddz_start_param != null && message.hasOwnProperty("ddz_start_param")) {
                var error = $root.Lobby.EnterDdzGoldParam.verify(message.ddz_start_param);
                if (error)
                    return "ddz_start_param." + error;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.message != null && message.hasOwnProperty("message"))
                if (!$util.isString(message.message))
                    return "message: string expected";
            return null;
        };

        /**
         * Creates an EnterDdzGoldGameRes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.EnterDdzGoldGameRes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.EnterDdzGoldGameRes} EnterDdzGoldGameRes
         */
        EnterDdzGoldGameRes.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.EnterDdzGoldGameRes)
                return object;
            var message = new $root.Lobby.EnterDdzGoldGameRes();
            if (object.gwc_id != null)
                message.gwc_id = object.gwc_id | 0;
            if (object.ddz_start_param != null) {
                if (typeof object.ddz_start_param !== "object")
                    throw TypeError(".Lobby.EnterDdzGoldGameRes.ddz_start_param: object expected");
                message.ddz_start_param = $root.Lobby.EnterDdzGoldParam.fromObject(object.ddz_start_param);
            }
            if (object.code != null)
                message.code = object.code | 0;
            if (object.message != null)
                message.message = String(object.message);
            return message;
        };

        /**
         * Creates a plain object from an EnterDdzGoldGameRes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.EnterDdzGoldGameRes
         * @static
         * @param {Lobby.EnterDdzGoldGameRes} message EnterDdzGoldGameRes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnterDdzGoldGameRes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gwc_id = 0;
                object.ddz_start_param = null;
                object.code = 0;
                object.message = "";
            }
            if (message.gwc_id != null && message.hasOwnProperty("gwc_id"))
                object.gwc_id = message.gwc_id;
            if (message.ddz_start_param != null && message.hasOwnProperty("ddz_start_param"))
                object.ddz_start_param = $root.Lobby.EnterDdzGoldParam.toObject(message.ddz_start_param, options);
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.message != null && message.hasOwnProperty("message"))
                object.message = message.message;
            return object;
        };

        /**
         * Converts this EnterDdzGoldGameRes to JSON.
         * @function toJSON
         * @memberof Lobby.EnterDdzGoldGameRes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnterDdzGoldGameRes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EnterDdzGoldGameRes;
    })();

    Lobby.EnterDdzGoldParam = (function() {

        /**
         * Properties of an EnterDdzGoldParam.
         * @memberof Lobby
         * @interface IEnterDdzGoldParam
         * @property {boolean|null} [change_room] EnterDdzGoldParam change_room
         * @property {string|null} [room_unique_id] EnterDdzGoldParam room_unique_id
         * @property {boolean|null} [ming_pk] EnterDdzGoldParam ming_pk
         * @property {boolean|null} [prop_jiaxinka] EnterDdzGoldParam prop_jiaxinka
         * @property {string|null} [prop_jiaxinka_ad_id] EnterDdzGoldParam prop_jiaxinka_ad_id
         * @property {boolean|null} [prop_chakandipai] EnterDdzGoldParam prop_chakandipai
         * @property {string|null} [prop_chakandipai_ad_id] EnterDdzGoldParam prop_chakandipai_ad_id
         */

        /**
         * Constructs a new EnterDdzGoldParam.
         * @memberof Lobby
         * @classdesc Represents an EnterDdzGoldParam.
         * @implements IEnterDdzGoldParam
         * @constructor
         * @param {Lobby.IEnterDdzGoldParam=} [properties] Properties to set
         */
        function EnterDdzGoldParam(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * EnterDdzGoldParam change_room.
         * @member {boolean} change_room
         * @memberof Lobby.EnterDdzGoldParam
         * @instance
         */
        EnterDdzGoldParam.prototype.change_room = false;

        /**
         * EnterDdzGoldParam room_unique_id.
         * @member {string} room_unique_id
         * @memberof Lobby.EnterDdzGoldParam
         * @instance
         */
        EnterDdzGoldParam.prototype.room_unique_id = "";

        /**
         * EnterDdzGoldParam ming_pk.
         * @member {boolean} ming_pk
         * @memberof Lobby.EnterDdzGoldParam
         * @instance
         */
        EnterDdzGoldParam.prototype.ming_pk = false;

        /**
         * EnterDdzGoldParam prop_jiaxinka.
         * @member {boolean} prop_jiaxinka
         * @memberof Lobby.EnterDdzGoldParam
         * @instance
         */
        EnterDdzGoldParam.prototype.prop_jiaxinka = false;

        /**
         * EnterDdzGoldParam prop_jiaxinka_ad_id.
         * @member {string} prop_jiaxinka_ad_id
         * @memberof Lobby.EnterDdzGoldParam
         * @instance
         */
        EnterDdzGoldParam.prototype.prop_jiaxinka_ad_id = "";

        /**
         * EnterDdzGoldParam prop_chakandipai.
         * @member {boolean} prop_chakandipai
         * @memberof Lobby.EnterDdzGoldParam
         * @instance
         */
        EnterDdzGoldParam.prototype.prop_chakandipai = false;

        /**
         * EnterDdzGoldParam prop_chakandipai_ad_id.
         * @member {string} prop_chakandipai_ad_id
         * @memberof Lobby.EnterDdzGoldParam
         * @instance
         */
        EnterDdzGoldParam.prototype.prop_chakandipai_ad_id = "";

        /**
         * Creates a new EnterDdzGoldParam instance using the specified properties.
         * @function create
         * @memberof Lobby.EnterDdzGoldParam
         * @static
         * @param {Lobby.IEnterDdzGoldParam=} [properties] Properties to set
         * @returns {Lobby.EnterDdzGoldParam} EnterDdzGoldParam instance
         */
        EnterDdzGoldParam.create = function create(properties) {
            return new EnterDdzGoldParam(properties);
        };

        /**
         * Encodes the specified EnterDdzGoldParam message. Does not implicitly {@link Lobby.EnterDdzGoldParam.verify|verify} messages.
         * @function encode
         * @memberof Lobby.EnterDdzGoldParam
         * @static
         * @param {Lobby.IEnterDdzGoldParam} message EnterDdzGoldParam message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterDdzGoldParam.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.change_room != null && message.hasOwnProperty("change_room"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.change_room);
            if (message.room_unique_id != null && message.hasOwnProperty("room_unique_id"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.room_unique_id);
            if (message.ming_pk != null && message.hasOwnProperty("ming_pk"))
                writer.uint32(/* id 3, wireType 0 =*/24).bool(message.ming_pk);
            if (message.prop_jiaxinka != null && message.hasOwnProperty("prop_jiaxinka"))
                writer.uint32(/* id 4, wireType 0 =*/32).bool(message.prop_jiaxinka);
            if (message.prop_jiaxinka_ad_id != null && message.hasOwnProperty("prop_jiaxinka_ad_id"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.prop_jiaxinka_ad_id);
            if (message.prop_chakandipai != null && message.hasOwnProperty("prop_chakandipai"))
                writer.uint32(/* id 6, wireType 0 =*/48).bool(message.prop_chakandipai);
            if (message.prop_chakandipai_ad_id != null && message.hasOwnProperty("prop_chakandipai_ad_id"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.prop_chakandipai_ad_id);
            return writer;
        };

        /**
         * Encodes the specified EnterDdzGoldParam message, length delimited. Does not implicitly {@link Lobby.EnterDdzGoldParam.verify|verify} messages.
         * @function encodeDelimited
         * @memberof Lobby.EnterDdzGoldParam
         * @static
         * @param {Lobby.IEnterDdzGoldParam} message EnterDdzGoldParam message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        EnterDdzGoldParam.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an EnterDdzGoldParam message from the specified reader or buffer.
         * @function decode
         * @memberof Lobby.EnterDdzGoldParam
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {Lobby.EnterDdzGoldParam} EnterDdzGoldParam
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterDdzGoldParam.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.Lobby.EnterDdzGoldParam();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.change_room = reader.bool();
                    break;
                case 2:
                    message.room_unique_id = reader.string();
                    break;
                case 3:
                    message.ming_pk = reader.bool();
                    break;
                case 4:
                    message.prop_jiaxinka = reader.bool();
                    break;
                case 5:
                    message.prop_jiaxinka_ad_id = reader.string();
                    break;
                case 6:
                    message.prop_chakandipai = reader.bool();
                    break;
                case 7:
                    message.prop_chakandipai_ad_id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an EnterDdzGoldParam message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof Lobby.EnterDdzGoldParam
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {Lobby.EnterDdzGoldParam} EnterDdzGoldParam
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        EnterDdzGoldParam.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an EnterDdzGoldParam message.
         * @function verify
         * @memberof Lobby.EnterDdzGoldParam
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        EnterDdzGoldParam.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.change_room != null && message.hasOwnProperty("change_room"))
                if (typeof message.change_room !== "boolean")
                    return "change_room: boolean expected";
            if (message.room_unique_id != null && message.hasOwnProperty("room_unique_id"))
                if (!$util.isString(message.room_unique_id))
                    return "room_unique_id: string expected";
            if (message.ming_pk != null && message.hasOwnProperty("ming_pk"))
                if (typeof message.ming_pk !== "boolean")
                    return "ming_pk: boolean expected";
            if (message.prop_jiaxinka != null && message.hasOwnProperty("prop_jiaxinka"))
                if (typeof message.prop_jiaxinka !== "boolean")
                    return "prop_jiaxinka: boolean expected";
            if (message.prop_jiaxinka_ad_id != null && message.hasOwnProperty("prop_jiaxinka_ad_id"))
                if (!$util.isString(message.prop_jiaxinka_ad_id))
                    return "prop_jiaxinka_ad_id: string expected";
            if (message.prop_chakandipai != null && message.hasOwnProperty("prop_chakandipai"))
                if (typeof message.prop_chakandipai !== "boolean")
                    return "prop_chakandipai: boolean expected";
            if (message.prop_chakandipai_ad_id != null && message.hasOwnProperty("prop_chakandipai_ad_id"))
                if (!$util.isString(message.prop_chakandipai_ad_id))
                    return "prop_chakandipai_ad_id: string expected";
            return null;
        };

        /**
         * Creates an EnterDdzGoldParam message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof Lobby.EnterDdzGoldParam
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {Lobby.EnterDdzGoldParam} EnterDdzGoldParam
         */
        EnterDdzGoldParam.fromObject = function fromObject(object) {
            if (object instanceof $root.Lobby.EnterDdzGoldParam)
                return object;
            var message = new $root.Lobby.EnterDdzGoldParam();
            if (object.change_room != null)
                message.change_room = Boolean(object.change_room);
            if (object.room_unique_id != null)
                message.room_unique_id = String(object.room_unique_id);
            if (object.ming_pk != null)
                message.ming_pk = Boolean(object.ming_pk);
            if (object.prop_jiaxinka != null)
                message.prop_jiaxinka = Boolean(object.prop_jiaxinka);
            if (object.prop_jiaxinka_ad_id != null)
                message.prop_jiaxinka_ad_id = String(object.prop_jiaxinka_ad_id);
            if (object.prop_chakandipai != null)
                message.prop_chakandipai = Boolean(object.prop_chakandipai);
            if (object.prop_chakandipai_ad_id != null)
                message.prop_chakandipai_ad_id = String(object.prop_chakandipai_ad_id);
            return message;
        };

        /**
         * Creates a plain object from an EnterDdzGoldParam message. Also converts values to other types if specified.
         * @function toObject
         * @memberof Lobby.EnterDdzGoldParam
         * @static
         * @param {Lobby.EnterDdzGoldParam} message EnterDdzGoldParam
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        EnterDdzGoldParam.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.change_room = false;
                object.room_unique_id = "";
                object.ming_pk = false;
                object.prop_jiaxinka = false;
                object.prop_jiaxinka_ad_id = "";
                object.prop_chakandipai = false;
                object.prop_chakandipai_ad_id = "";
            }
            if (message.change_room != null && message.hasOwnProperty("change_room"))
                object.change_room = message.change_room;
            if (message.room_unique_id != null && message.hasOwnProperty("room_unique_id"))
                object.room_unique_id = message.room_unique_id;
            if (message.ming_pk != null && message.hasOwnProperty("ming_pk"))
                object.ming_pk = message.ming_pk;
            if (message.prop_jiaxinka != null && message.hasOwnProperty("prop_jiaxinka"))
                object.prop_jiaxinka = message.prop_jiaxinka;
            if (message.prop_jiaxinka_ad_id != null && message.hasOwnProperty("prop_jiaxinka_ad_id"))
                object.prop_jiaxinka_ad_id = message.prop_jiaxinka_ad_id;
            if (message.prop_chakandipai != null && message.hasOwnProperty("prop_chakandipai"))
                object.prop_chakandipai = message.prop_chakandipai;
            if (message.prop_chakandipai_ad_id != null && message.hasOwnProperty("prop_chakandipai_ad_id"))
                object.prop_chakandipai_ad_id = message.prop_chakandipai_ad_id;
            return object;
        };

        /**
         * Converts this EnterDdzGoldParam to JSON.
         * @function toJSON
         * @memberof Lobby.EnterDdzGoldParam
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        EnterDdzGoldParam.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return EnterDdzGoldParam;
    })();

    return Lobby;
})();

module.exports = $root;
