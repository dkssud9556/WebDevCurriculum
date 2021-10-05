"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_cookie_1 = __importDefault(require("fastify-cookie"));
const apollo_server_fastify_1 = require("apollo-server-fastify");
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = __importDefault(require("./schema/index"));
const dataLoader_1 = require("./dataLoader");
const index_2 = __importDefault(require("./model/index"));
const services = __importStar(require("./service/index"));
const server = new apollo_server_fastify_1.ApolloServer({
    schema: index_1.default,
    context: ({ request, reply }) => {
        return {
            loaders: {
                userLoader: (0, dataLoader_1.userLoader)(),
                filesLoader: (0, dataLoader_1.filesLoader)(),
                tabsLoader: (0, dataLoader_1.tabsLoader)(),
            },
            services,
            reply,
            token: request.cookies.token,
        };
    },
});
const app = (0, fastify_1.default)({
    logger: true,
});
app.register(fastify_cookie_1.default);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield index_2.default.sync({ force: true });
    yield index_2.default.models.User.bulkCreate([
        {
            username: "user1",
            password: bcrypt_1.default.hashSync("pass1", bcrypt_1.default.genSaltSync(10)),
        },
        {
            username: "user2",
            password: bcrypt_1.default.hashSync("pass2", bcrypt_1.default.genSaltSync(10)),
        },
        {
            username: "user3",
            password: bcrypt_1.default.hashSync("pass3", bcrypt_1.default.genSaltSync(10)),
        },
    ]);
    yield server.start();
    app.register(server.createHandler({
        cors: { origin: "http://localhost:3000", credentials: true },
    }));
    yield app.listen(8000);
}))();
//# sourceMappingURL=app.js.map