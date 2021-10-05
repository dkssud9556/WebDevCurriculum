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
Object.defineProperty(exports, "__esModule", { value: true });
class TabService {
    constructor(tabRepository) {
        this.tabRepository = tabRepository;
    }
    getTabs(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.tabRepository.findAllByUsername(username);
        });
    }
    updateTabStatus(tabStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.tabRepository.save(tabStatus);
        });
    }
}
exports.default = TabService;
//# sourceMappingURL=tab.js.map