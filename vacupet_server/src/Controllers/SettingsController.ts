import {DataSource} from "typeorm";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {ISetting} from "../Models/Database/Interfaces/ISetting";
import {SettingRepository} from "../Database/Repositories/SettingRepository";
import {InterfaceToObject} from "../Tools/ExtensionMethods/InterfaceToObject";
import {Logger} from "logger-colors";

export class SettingsController {
    private logger: Logger;
    private _settingsRepository: SettingRepository;

    constructor(logger: Logger, dataSource: DataSource) {
        this.logger = logger;
        this._settingsRepository = new SettingRepository(dataSource);
    }

    public async createUpdateSetting(setting: ISetting): Promise<ISetting> {
        try {
            let addSetting = await this._settingsRepository.createUpdateSetting(InterfaceToObject.ToSetting(setting));
            return addSetting;
        } catch (e) {
            this.logger.error("An error occurred while adding a new setting", e);
            throw e;
        }

    }

    public async getAllSettings(): Promise<ISetting[]> {
        let settings = await this._settingsRepository.getAllSettings();
        try {
            if (settings) {
                let parsedSettings = settings.map(setting => ObjectToInterface.ToSetting(setting));
                return parsedSettings;
            }
            return null;
        } catch (e) {
            this.logger.error("Error while getting all settings", e);
            throw new Error(e);
        }
    }
}
