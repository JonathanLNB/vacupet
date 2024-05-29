import {Request, Response} from "express";
import {DataSource} from "typeorm";
import {ObjectToInterface} from "../../Tools/ExtensionMethods/ObjectToInterface";
import {ITaxpayer} from "../../Models/Database/Interfaces/Person/ITaxpayer";
import {TaxpayerRepository} from "../../Database/Repositories/Person/TaxpayerRepository";
import {InterfaceToObject} from "../../Tools/ExtensionMethods/InterfaceToObject";
import {SettingsController} from "../SettingsController";
import {ISetting} from "../../Models/Database/Interfaces/ISetting";
import {decrypt, formatDate} from "../../Tools/Utils";
import {Identifiers} from "../../Enums/Identifiers";
import {TaxCodesController} from "../TaxCodesController";
import {Logger} from "logger-colors";
import {TaxCodeTypes} from "../../Enums/TaxCodeTypes";
import {ITaxCode} from "../../Models/Database/Interfaces/ITaxCode";
import {Options} from "../../Enums/Options";
import {TransferMethods} from "../../Enums/TransferMethods";
import {BankMethodTypes} from "../../Enums/BankMethodTypes";
import {AccountTypes} from "../../Enums/AccountTypes";
import {QuestionTypes} from "../../Enums/QuestionTypes";
import {TaxCodes} from "../../Enums/TaxCodes";
import {BanksController} from "../BanksController";
import {CollectionController} from "../CollectionController";
import {IState} from "../../Models/Database/Interfaces/IState";
import {IBank} from "../../Models/Database/Interfaces/IBank";
import Handlebars = require("handlebars");
import * as path from "path";
import * as fs from "fs";
import {GenericResponse} from "../../Models/Interfaces/GenericResponse";
import {FileManager} from "../../Tools/FileManager";
import {FileUploaderType} from "../../Enums/FileUploaderType";

const Checklist = require("../../Models/Database/Mongo/Checklist");
const wkhtmltopdf = require('wkhtmltopdf');

export class TaxpayersController {
    private _taxpayersRepository: TaxpayerRepository;
    private _taxcodesController: TaxCodesController;
    private _settingsController: SettingsController;
    private _collectionController: CollectionController;
    private _banksController: BanksController;
    private logger: Logger;
    private states: IState[] = [];
    private banks: IBank[] = []

    constructor(logger: Logger, dataSource: DataSource) {
        this._taxpayersRepository = new TaxpayerRepository(dataSource);
        this._settingsController = new SettingsController(dataSource);
        this._taxcodesController = new TaxCodesController(logger, dataSource);
        this._banksController = new BanksController(dataSource);
        this._collectionController = new CollectionController(dataSource);
        this.logger = logger;
    }

    public async createTaxpayer(taxpayer: ITaxpayer): Promise<ITaxpayer> {
        try {
            const SSN_ITIN = decrypt(taxpayer.SSN_ITIN);
            if (SSN_ITIN === Identifiers.ITIN_IN_PROGRESS) {
                const settings: ISetting[] = await this._settingsController.getAllSettings()
                for (const setting of settings) {
                    if (setting.Name === 'ITIN_POSITION') {
                        taxpayer.ProSeriesID = decrypt(taxpayer.Lastname).trim().slice(0, 4).toUpperCase() + setting.Value.padStart(4, '0');
                        setting.Value = `${parseInt(setting.Value) + 1}`;
                        await this._settingsController.createSetting(setting)
                    }
                }
            } else
                taxpayer.ProSeriesID = decrypt(taxpayer.Lastname).trim().slice(0, 4).toUpperCase() + SSN_ITIN.slice(5);
            let addTaxpayer = await this._taxpayersRepository.createUpdateTaxpayer(InterfaceToObject.ToTaxpayer(taxpayer));
            return ObjectToInterface.ToTaxpayer(addTaxpayer);
        } catch (e) {
            throw e;
        }
    }

    public async createChecklist(checklist: any): Promise<any> {
        try {
            let mongoChecklist;
            if (checklist._id) {
                mongoChecklist = await Checklist.findById(checklist._id);
                mongoChecklist.overwrite(checklist);
            } else
                mongoChecklist = new Checklist(checklist);
            await mongoChecklist.save();
            return mongoChecklist;
        } catch (e) {
            throw e;
        }
    }

    public async createDocumentChecklist(checklistId: string, res: Response) {
        const checklist = await Checklist.findById(checklistId);
        const checklistData = await this.configureChecklistData(JSON.parse(JSON.stringify(checklist)));
        const now = new Date();
        checklistData.ActualYear = now.getFullYear();
        try {
            let cssTemplate = 'Assets/style.css';
            let source = 'Assets/Medel-Checklist.html';
            let template = null, templateHeader = null;
            if (!source) {
                res.status(404).send({
                    error: {
                        code: 404,
                        message: 'Template not found',
                    },
                });
                return false;
            }

            source = path.resolve(__dirname, source);
            const sourceHTML = fs.readFileSync(source, {encoding: 'utf-8'});
            Handlebars.registerHelper("inc", function (value, options) {
                return parseInt(value) + 1;
            });
            template = Handlebars.compile(sourceHTML);
            const documentoHTML = template(checklistData);

            const rutaCSS = path.resolve(__dirname, cssTemplate);
            let HTML = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <style>
    ${fs.readFileSync(rutaCSS, {encoding: 'utf-8'})}
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    </head><body>`;

            const _HTML = documentoHTML.toString('utf8');
            HTML += _HTML;
            HTML += '</body></html>';
            this.logger.info('Building PDF');
            try {
                wkhtmltopdf(HTML, {
                    pageSize: "letter"
                }, (data) => {
                    this.logger.success('PDF created successfully');
                }).pipe(res);
            } catch (e) {
                this.logger.error(e);
                res.status(500).send({
                    error: {
                        code: 500,
                        message: 'Error creating th PDF',
                    },
                    result: null,
                });
            }
        } catch (e) {
            console.log("Error", e);
            res.status(500).send({
                error: {
                    code: 500,
                    message: e.Message,
                },
                result: null,
            });
        }
    }

    public async saveChecklistDocument(checklistId: string, req: Request) {
        let gResponse: GenericResponse;
        try {
            let checklistFile: string[];
            try {
                checklistFile = await FileManager.UploadFile(checklistId, req, FileUploaderType.Checklist);
                gResponse = {
                    Success: true,
                    Message: "Success uploading data"
                }
            } catch (error) {
                gResponse = {
                    Success: false,
                    Message: "Error uploading data"
                }
            }
            if (gResponse.Success && checklistFile.length > 0) {
                const checklist = await Checklist.findById(checklistId);
                checklist.Signed = checklistFile[0];
                checklist.save();
                gResponse = {
                    Success: true,
                    Message: "Success uploading data",
                }
            } else {
                gResponse = {
                    Success: false,
                    Message: "Error uploading data",
                }
            }
        } catch (e) {
            this.logger.error(e);
            gResponse = {
                Success: false,
                Message: "Error uploading data",
            }
        } finally {
            return gResponse;
        }
    }

    public async deleteTaxpayer(idTaxpayer: string) {
        try {
            await this._taxpayersRepository.deleteTaxpayer(idTaxpayer);
        } catch (e) {
            throw e;
        }
    }

    public async getAllTaxpayers(): Promise<ITaxpayer[]> {
        const now = new Date();
        const currentYear = (now.getFullYear() - 1).toString();
        let taxpayers = await this._taxpayersRepository.getAllTaxpayers();
        if (taxpayers) {
            let parsedTaxpayers = taxpayers.map(taxpayer => ObjectToInterface.ToTaxpayer(taxpayer));
            for (const taxpayer of parsedTaxpayers) {
                taxpayer.Checklist = await Checklist.find({'Taxpayer.IdTaxpayer': taxpayer.Id}).sort({CreateAt: 'desc'}).exec();
                for (const checklist of taxpayer.Checklist) {
                    if (checklist.Year === currentYear) {
                        if (!checklist.Draft)
                            taxpayer.Status = true;
                    }
                }
            }
            return parsedTaxpayers;
        }
        return null;
    }

    private async configureChecklistData(checklist: any):
        Promise<any> {
        const date = formatDate(checklist.CreateAt);
        if (!!this.states)
            this.states = await this._collectionController.getAllStates();
        if (!!this.banks)
            this.banks = await this._banksController.getAllBanks();
        const address = checklist.Address.split("\n");

        this.decryptData(checklist);

        const checklistData = {
            New: checklist.New,
            Date: date,
            Year: checklist.Year,
            AddressChanged: checklist.AddressChanged,
            Notes: checklist.Notes,
            Office: checklist.Office,
            Taxpayer: checklist.Taxpayer,
            HasWife: checklist.HasWife,
            Spouse: checklist.Spouse,
            Dependents: checklist.Dependents,
            BankInformation: checklist.BankInformation
        }

        if (address.length === 1) {
            checklistData["Address1"] = address[0];
        }
        if (address.length === 2) {
            checklistData["Address1"] = address[0];
            checklistData["Address2"] = address[1];
        }
        if (address.length === 3) {
            checklistData["Address1"] = address[0];
            checklistData["Address2"] = address[1];
            checklistData["Address3"] = address[2];
        }

        let promises: any[] = [
            this.generateIncomes(checklist.Income, checklist.HasWife, checklist.Dependents.length > 0),
            this.generateDeductions(checklist.Deduction, checklist.HasWife, checklist.Dependents.length > 0),
            this.generateOtherItems(checklist.OtherItem, checklist.HasWife, checklist.Dependents.length > 0)
        ];
        const responsePromises = await Promise.all(promises);

        checklistData["IncomesList"] = responsePromises[0];
        checklistData["DeductionsList"] = responsePromises[1];
        checklistData["OtherItemsList"] = responsePromises[2];

        const settings: ISetting[] = await this._settingsController.getAllSettings()
        for (const setting of settings) {
            if (setting.Name === 'DISCLAIMER') {
                checklistData["Disclaimer"] = setting.Value;
            }
        }
        return checklistData;
    }

    private decryptData(checklist: any) {
        const taxpayer = {};
        checklist.Taxpayer.ProSeriesID = decrypt(checklist.Taxpayer.ProSeriesID);
        checklist.Taxpayer.Firstname = decrypt(checklist.Taxpayer.Firstname);
        checklist.Taxpayer.Middlename = decrypt(checklist.Taxpayer.Middlename);
        checklist.Taxpayer.Lastname = decrypt(checklist.Taxpayer.Lastname);
        checklist.Taxpayer.SSN_ITIN = decrypt(checklist.Taxpayer.SSN_ITIN).replace(/^(\d{3})(\d{2})(\d{4})$/, '$1-$2-$3');
        checklist.Taxpayer.PhoneNumber = decrypt(checklist.Taxpayer.PhoneNumber).replace(/^(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3');
        checklist.Taxpayer.Email = decrypt(checklist.Taxpayer.Email);
        checklist.Taxpayer.Occupation = decrypt(checklist.Taxpayer.Occupation);
        checklist.Taxpayer.DateOfBirthS = formatDate(checklist.Taxpayer.DateOfBirth);

        if (checklist.HasWife) {
            checklist.Spouse.Firstname = decrypt(checklist.Spouse.Firstname);
            checklist.Spouse.Middlename = decrypt(checklist.Spouse.Middlename);
            checklist.Spouse.Lastname = decrypt(checklist.Spouse.Lastname);
            checklist.Spouse.SSN_ITIN = decrypt(checklist.Spouse.SSN_ITIN).replace(/^(\d{3})(\d{2})(\d{4})$/, '$1-$2-$3');
            checklist.Spouse.DateOfBirthS = formatDate(checklist.Spouse.DateOfBirth);
        }

        for (const dependent of checklist.Dependents) {
            dependent.Firstname = decrypt(dependent.Firstname!);
            dependent.Middlename = decrypt(dependent.Middlename!);
            dependent.Lastname = decrypt(dependent.Lastname!);
            dependent.SSN_ITIN = decrypt(dependent.SSN_ITIN!).replace(/^(\d{3})(\d{2})(\d{4})$/, '$1-$2-$3');
            dependent.DateOfBirthS = formatDate(dependent.DateOfBirth);
        }
        for (const bankInfo of <any[]>checklist.BankInformation) {
            if (bankInfo.TransferMethodType.Id === TransferMethods.DIRECT_DEPOSIT || bankInfo.TransferMethodType.Id === TransferMethods.EFT) {
                bankInfo.Account = decrypt(bankInfo.Account!);
                if (bankInfo.TransferMethodType.Id === TransferMethods.DIRECT_DEPOSIT)
                    bankInfo.IsDD = true;
                if (bankInfo.TransferMethodType.Id === TransferMethods.EFT) {
                    bankInfo.IsEFT = true;
                    bankInfo.EFTDateS = formatDate(bankInfo.EFTDate);
                }
            }
            if (bankInfo.TransferMethodType.Id === TransferMethods.CHECK)
                bankInfo.IsCK = true;
            if (bankInfo.BankMethodType?.Id !== BankMethodTypes.PAYMENT) {
                if (bankInfo.AccountType?.Id === AccountTypes.SAVINGS)
                    bankInfo.IsSaving = true
                else if (bankInfo.AccountType?.Id === AccountTypes.CHECKING)
                    bankInfo.IsChecking = true
            }
        }
    }

    private generateOptions(type: string, checklistTaxCode: any, originalTaxcode: ITaxCode, hasWife: boolean, hasDependents: boolean) {
        if (type === TaxCodeTypes.INCOME)
            checklistTaxCode.Options = [...originalTaxcode.IncomeForm.IncomeFormOptions];

        if (type === TaxCodeTypes.DEDUCTIONS)
            checklistTaxCode.Options = [...originalTaxcode.DeductionForm.DeductionFormOptions];

        if (type === TaxCodeTypes.OTHER_ITEMS)
            checklistTaxCode.Options = [...originalTaxcode.OtherItemForm.OtherItemFormOptions];
        for (const option of checklistTaxCode.Options) {
            if (checklistTaxCode.Taxpayer.AnswerResponse === option.Id)
                option.TaxpayerSelected = true;
            if (checklistTaxCode.Spouse.AnswerResponse === option.Id && hasWife)
                option.SpouseSelected = true;
            if (type === TaxCodeTypes.DEDUCTIONS || type === TaxCodeTypes.OTHER_ITEMS) {
                if (checklistTaxCode.Dependent.AnswerResponse === option.Id && hasDependents)
                    option.DependentSelected = true;
            }
        }
    }

    private generateQuestions(checklistTaxCode: any, originalTaxcode: ITaxCode) {
        const questions = [...originalTaxcode.Questions]
        for (const question of questions) {
            for (const q of checklistTaxCode.Questions) {
                if (q.IdQuestion === question.Id) {
                    q.Question = question.Question;
                    if (question.QuestionType.Id === QuestionTypes.CHECKBOX || question.QuestionType.Id === QuestionTypes.JUSTCHECK) {
                        q.Options = [...question.Options];
                        for (const option of q.Options) {
                            if (question.QuestionType.Id === QuestionTypes.CHECKBOX) {
                                const ids: string[] = q.AnswerResponse.AnswerResponse.split("|");
                                if (ids.length > 0) {
                                    if (ids.length > 1) {
                                        for (const Id of ids) {
                                            if (Id === option.Id)
                                                option.Selected = true
                                        }
                                    } else {
                                        if (ids[0] === option.Id)
                                            option.Selected = true
                                        if (q.Options.length === 1)
                                            q.Checkbox = true;
                                    }
                                }
                            }
                            if (q.AnswerResponse.AnswerResponse === option.Id)
                                option.Selected = true;
                        }
                    } else {
                        if (question.QuestionType.Id == QuestionTypes.STATES || question.QuestionType.Id === QuestionTypes.BANKS || question.QuestionType.Id === QuestionTypes.DATE) {
                            if (q.AnswerResponse.AnswerResponse !== Identifiers.NA) {
                                if (question.QuestionType.Id == QuestionTypes.STATES) {
                                    for (const state of this.states) {
                                        if (state.Id === q.AnswerResponse.AnswerResponse)
                                            q.Answer = state.Name;
                                    }
                                }
                            } else
                                q.Answer = Identifiers.NA;
                            if (question.QuestionType.Id === QuestionTypes.BANKS) {
                                if (q.AnswerResponse.AnswerResponse !== Identifiers.NA) {
                                    for (const bank of this.banks) {
                                        if (bank.Id === q.AnswerResponse.AnswerResponse) {
                                            q.Answer = bank.Name;
                                        }
                                    }
                                } else
                                    q.Answer = Identifiers.NA;
                            }
                            if (question.QuestionType.Id === QuestionTypes.DATE) {
                                if (q.AnswerResponse.AnswerResponse !== Identifiers.NA) {
                                    const formattedDate = formatDate(q.AnswerResponse.AnswerResponse);
                                    q.Answer = formattedDate;
                                } else
                                    q.Answer = Identifiers.NA;
                            }
                        } else if (question.QuestionType.Id === QuestionTypes.NUMERIC && q.AnswerResponse.AnswerResponse !== Identifiers.NA && question.Question.includes("$")) {
                            q.Answer = Number(q.AnswerResponse.AnswerResponse).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
                        } else
                            q.Answer = q.AnswerResponse.AnswerResponse;
                    }
                }
            }
        }
    }

    private async generateIncomes(incomes: any, hasWife: boolean, hasDependents: boolean) {
        let added: boolean = false;
        let taxcodes = await this._taxcodesController.getTaxCodesByType(TaxCodeTypes.INCOME);
        let income: any;
        const incomeList = []
        for (let i = 0; i < taxcodes.length; i++) {
            added = false;
            for (let j = 0; j < incomes.length; j++) {
                if (incomes[j].IdTaxCode === taxcodes[i].Id) {
                    added = true;
                    income = JSON.parse(JSON.stringify(incomes[j]));
                    income.Name = taxcodes[i].Name;
                    if (income.IdTaxCode === TaxCodes.INCOME_OTHER)
                        income.Description = income.OtherDescription;
                    else
                        income.Description = taxcodes[i].Description;
                    income.Since = taxcodes[i].Since;
                    income.TaxCodeType = taxcodes[i].TaxCodeType;
                    income.IncomeForm = taxcodes[i].IncomeForm;
                    income.Complete = true;

                    if (taxcodes[i].IncomeForm.NumForm.Id !== Options.NUMERIC)
                        this.generateOptions(TaxCodeTypes.INCOME, income, taxcodes[i], hasWife, hasDependents);
                    this.generateQuestions(income, taxcodes[i]);
                    incomeList.push(income);
                }
            }
            if (!added) {
                income = structuredClone(taxcodes[i]);
                income.Complete = false;
                incomeList.push(income);
            }
        }
        return incomeList;
    }

    private async generateDeductions(deductions: any, hasWife: boolean, hasDependents: boolean
    ) {
        let added: boolean = false;
        let taxcodes = await this._taxcodesController.getTaxCodesByType(TaxCodeTypes.DEDUCTIONS);
        const deductionsList = []
        let deduction: any;
        for (let i = 0; i < taxcodes.length; i++) {
            added = false;
            for (let j = 0; j < deductions.length; j++) {
                if (deductions[j].IdTaxCode === taxcodes[i].Id) {
                    added = true;
                    deduction = JSON.parse(JSON.stringify(deductions[j]));
                    deduction.Name = taxcodes[i].Name;
                    if (deduction.IdTaxCode === TaxCodes.DEDUCTION_OTHER)
                        deduction.Description = deduction.OtherDescription;
                    else
                        deduction.Description = taxcodes[i].Description;
                    deduction.Since = taxcodes[i].Since;
                    deduction.TaxCodeType = taxcodes[i].TaxCodeType;
                    deduction.DeductionForm = taxcodes[i].DeductionForm;
                    deduction.Complete = true;
                    if (taxcodes[i].DeductionForm.NumForm.Id !== Options.NUMERIC)
                        this.generateOptions(TaxCodeTypes.DEDUCTIONS, deduction, taxcodes[i], hasWife, hasDependents);
                    this.generateQuestions(deduction, taxcodes[i]);
                    deductionsList.push(deduction);
                }
            }
            if (!added) {
                deduction = structuredClone(taxcodes[i]);
                deduction.Complete = false;
                deductionsList.push(deduction);
            }
        }
        return deductionsList;
    }

    private async generateOtherItems(otherItems: any, hasWife: boolean, hasDependents: boolean) {
        let added: boolean = false;
        let taxcodes = await this._taxcodesController.getTaxCodesByType(TaxCodeTypes.OTHER_ITEMS);
        const otherItemsList = Array(taxcodes.length)
        let otherItem: any;
        for (let i = 0; i < taxcodes.length; i++) {
            added = false;
            for (let j = 0; j < otherItems.length; j++) {
                if (otherItems[j].IdTaxCode === taxcodes[i].Id) {
                    added = true;
                    otherItem = JSON.parse(JSON.stringify(otherItems[j]));
                    otherItem.Name = taxcodes[i].Name;
                    otherItem.Description = taxcodes[i].Description;
                    otherItem.Since = taxcodes[i].Since;
                    otherItem.TaxCodeType = taxcodes[i].TaxCodeType;
                    otherItem.OtherItemForm = taxcodes[i].OtherItemForm;
                    otherItem.Complete = true;
                    if (taxcodes[i].OtherItemForm.Taxpayer.Id !== Options.NUMERIC)
                        this.generateOptions(TaxCodeTypes.OTHER_ITEMS, otherItem, taxcodes[i], hasWife, hasDependents);
                    this.generateQuestions(otherItem, taxcodes[i]);
                    otherItemsList.push(otherItem);
                }
            }
            if (!added) {
                otherItem = structuredClone(taxcodes[i]);
                otherItem.Complete = false;
                otherItemsList.push(otherItem);
            }
        }
        return otherItemsList;
    }
}
