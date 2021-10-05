"use strict";
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
const wrapException_1 = __importDefault(require("../../middleware/wrapException"));
const jwtCheck_1 = __importDefault(require("../../middleware/jwtCheck"));
exports.default = {
    Query: {
        tabs: (0, wrapException_1.default)((0, jwtCheck_1.default)((parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { username } = context.user;
            const tabs = yield context.services.tabService.getTabs(username);
            return {
                __typename: "TabsSuccess",
                message: "Tabs success",
                tabs,
            };
        }))),
    },
    Mutation: {
        updateTabs: (0, wrapException_1.default)((0, jwtCheck_1.default)((parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const { username } = context.user;
            const { openTabs, selectedTab } = args;
            yield context.services.tabService.updateTabStatus({ username, openTabs, selectedTab });
            return {
                __typename: "UpdateTabsSuccess",
                message: "Update tabs success",
            };
        }))),
    },
    Tab: {
        user: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            return context.loaders.userLoader.load(parent.username);
        }),
    },
};
//# sourceMappingURL=resolver.js.map