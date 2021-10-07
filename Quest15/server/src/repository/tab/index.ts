import Tab from "@entity/tab";

export default interface TabRepository {
    findAllByUsername(username: string): Promise<Tab[]>;
    save(tabStatus: { username: string, openTabs: string[], selectedTab: string}): Promise<void>;
    findAllIn(usernames: string[]): Promise<Tab[]>;
}