import {DataSource} from "typeorm";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {ISetting} from "../Models/Database/Interfaces/ISetting";
import {SettingRepository} from "../Database/Repositories/SettingRepository";
import {InterfaceToObject} from "../Tools/ExtensionMethods/InterfaceToObject";

export class SettingsController {
    private _settingsRepository: SettingRepository;

    constructor(dataSource: DataSource) {
        this._settingsRepository = new SettingRepository(dataSource);
    }

    public async createSetting(setting: ISetting): Promise<ISetting> {
        try {
            let addSetting = await this._settingsRepository.createUpdateSetting(InterfaceToObject.ToSetting(setting));
            return addSetting;
        } catch (e) {
            throw e;
        }

    }

    public async updateSetting(setting: ISetting) {
        try {
            await this._settingsRepository.partiallyUpdateSetting(setting.Id, InterfaceToObject.ToSetting(setting));
        } catch (e) {
            throw e;
        }
    }

    public async getAllSettings(): Promise<ISetting[]> {
        let settings = await this._settingsRepository.getAllSettings();
        if (settings) {
            let parsedSettings = settings.map(setting => ObjectToInterface.ToSetting(setting));
            return parsedSettings;
        }
        return null;
    }
}
