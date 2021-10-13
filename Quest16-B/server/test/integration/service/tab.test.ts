import {Container} from "typedi";

import TabService from "@service/tab";
import TabRepository from "@repository/tab";
import SequelizeTabRepository from "@repository/tab/sequelize";
import {UserModel} from "@model/user";
import sequelize from "@model/index";
import {TabModel} from "@model/tab";
import Tab from "@entity/tab";
import DummyCreator from "../../dummyCreator";

describe('Tab service integration test', () => {
    const users = DummyCreator.createUsers();
    let tabService: TabService;
    let tabRepository: TabRepository;

    beforeAll(async () => {
        await sequelize.sync({ force: true });
        tabRepository = Container.get(SequelizeTabRepository);
        tabService = new TabService(tabRepository);
    });

    beforeEach(async () => {
        await UserModel.bulkCreate(users);
    })

    describe('updateTabStatus method', () => {
        test('updateTabStatus in common situation', async () => {
            const tabStatus = {
                username: users[0].username,
                openTabs: ['file1', 'file2', 'file3'],
                selectedTab: 'file2'
            };
            await tabService.updateTabStatus(tabStatus);

            const selectedTab = await TabModel.findOne({
                where: {
                    username: tabStatus.username,
                    isSelected: true
                }
            });
            const openTabs = await TabModel.findAll({ where: { username: tabStatus.username } });

            expect(selectedTab).toBeDefined();
            expect((selectedTab as Tab).fileName).toEqual(tabStatus.selectedTab);
            expect(openTabs).toHaveLength(3);
        })
    });
});