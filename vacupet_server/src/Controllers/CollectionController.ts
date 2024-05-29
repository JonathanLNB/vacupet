import {DataSource} from "typeorm";
import {UserTypeRepository} from "../Database/Repositories/UserTypeRepository";
import {StateRepository} from "../Database/Repositories/StateRepository";
import {IUserType} from "../Models/Database/Interfaces/IUserType";
import {ObjectToInterface} from "../Tools/ExtensionMethods/ObjectToInterface";
import {IState} from "../Models/Database/Interfaces/IState";
import {OptionTypeRepository} from "../Database/Repositories/TaxCodeForms/OptionTypeRepository";
import {QuestionTypeRepository} from "../Database/Repositories/QuestionTypeRepository";
import {TaxCodeTypeRepository} from "../Database/Repositories/TaxCodeTypeRepository";
import {RelationRepository} from "../Database/Repositories/Person/RelationRepository";
import {IOptionType} from "../Models/Database/Interfaces/TaxCodeForm/IOptionType";
import {IQuestionType} from "../Models/Database/Interfaces/IQuestionType";
import {ITaxCodeType} from "../Models/Database/Interfaces/ITaxCodeType";
import {IRelation} from "../Models/Database/Interfaces/Person/IRelation";
import {BankMethodTypeRepository} from "../Database/Repositories/BankMethodTypeRepository";
import {IBankMethodType} from "../Models/Database/Interfaces/IBankMethodType";
import {IAccountType} from "../Models/Database/Interfaces/IAccountType";
import {AccountTypeRepository} from "../Database/Repositories/AccountTypeRepository";
import {TransferMethodRepository} from "../Database/Repositories/TransferMethodRepository";
import {ITransferMethod} from "../Models/Database/Interfaces/ITransferMethod";

export class CollectionController {

    _dataSource: DataSource;
    _userTypeRepository: UserTypeRepository;
    _optionTypeRepository: OptionTypeRepository;
    _questionTypeRepository: QuestionTypeRepository;
    _taxcodeTypeRepository: TaxCodeTypeRepository;
    _questionOptionRepository: RelationRepository;
    _statesRepository: StateRepository;
    _bankMethodTypeRepository: BankMethodTypeRepository;
    _accountTypeRepository: AccountTypeRepository;
    _transferMethodRepository: TransferMethodRepository;

    constructor(dataSource: DataSource) {
        this._userTypeRepository = new UserTypeRepository(dataSource)
        this._statesRepository = new StateRepository(dataSource);
        this._optionTypeRepository = new OptionTypeRepository(dataSource);
        this._questionTypeRepository = new QuestionTypeRepository(dataSource);
        this._taxcodeTypeRepository = new TaxCodeTypeRepository(dataSource);
        this._questionOptionRepository = new RelationRepository(dataSource);
        this._bankMethodTypeRepository = new BankMethodTypeRepository(dataSource);
        this._accountTypeRepository = new AccountTypeRepository(dataSource);
        this._transferMethodRepository = new TransferMethodRepository(dataSource);
    }

    public async getAllUserTypes(): Promise<IUserType[]> {
        let userTypes: IUserType[]
        try {
            let userTypesAux = await this._userTypeRepository.getAllUserTypes();
            if (userTypesAux) {
                userTypes = userTypesAux.map((userType) => {
                    return ObjectToInterface.ToUserType(userType);
                });
            }
            return userTypes;
        } catch (e) {
            console.error("Error while getting all user types", e);
            throw new Error(e);
        }
    }

    public async getAllStates(): Promise<IState[]> {
        let states: IState[]
        try {
            let statesAux = await this._statesRepository.getAllStates();
            if (statesAux) {
                states = statesAux.map((state) => {
                    return ObjectToInterface.ToState(state);
                });
            }
            return states;
        } catch (e) {
            console.error("Error while getting all cities", e);
            throw new Error(e);
        }
    }

    public async getAllOptionTypes(): Promise<IOptionType[]> {
        let options: IOptionType[]
        try {
            let optionsAux = await this._optionTypeRepository.getAllOptionTypes();
            if (optionsAux) {
                options = optionsAux.map((option) => {
                    return ObjectToInterface.ToOptionType(option);
                });
            }
            return options;
        } catch (e) {
            console.error("Error while getting all cities", e);
            throw new Error(e);
        }
    }

    public async getAllQuestionTypes(): Promise<IQuestionType[]> {
        let questionTypes: IQuestionType[]
        try {
            let questionTypesAux = await this._questionTypeRepository.getAllQuestionTypes();
            if (questionTypesAux) {
                questionTypes = questionTypesAux.map((questionType) => {
                    return ObjectToInterface.ToQuestionType(questionType);
                });
            }
            return questionTypes;
        } catch (e) {
            console.error("Error while getting all cities", e);
            throw new Error(e);
        }
    }

    public async getAllTaxCodeType(): Promise<ITaxCodeType[]> {
        let taxcodetypes: ITaxCodeType[]
        try {
            let taxcodetypesAux = await this._taxcodeTypeRepository.getAllTaxCodeTypes();
            if (taxcodetypesAux) {
                taxcodetypes = taxcodetypesAux.map((taxcodetype) => {
                    return ObjectToInterface.ToTaxCodeType(taxcodetype);
                });
            }
            return taxcodetypes;
        } catch (e) {
            console.error("Error while getting all cities", e);
            throw new Error(e);
        }
    }

    public async getAllRelation(): Promise<IRelation[]> {
        let questionOptions: IRelation[]
        try {
            let questionOptionsAux = await this._questionOptionRepository.getAllRelations();
            if (questionOptionsAux) {
                questionOptions = questionOptionsAux.map((questionOption) => {
                    return ObjectToInterface.ToRelation(questionOption);
                });
            }
            return questionOptions;
        } catch (e) {
            console.error("Error while getting all cities", e);
            throw new Error(e);
        }
    }

    public async getAllBankMethodType(): Promise<IBankMethodType[]> {
        let bankMethodType: IBankMethodType[]
        try {
            let bankMethodTypeAux = await this._bankMethodTypeRepository.getAllBankMethodsType();
            if (bankMethodTypeAux) {
                bankMethodType = bankMethodTypeAux.map((bankMethodType) => {
                    return ObjectToInterface.ToBankMethodType(bankMethodType);
                });
            }
            return bankMethodType;
        } catch (e) {
            console.error("Error while getting all cities", e);
            throw new Error(e);
        }
    }

    public async getAllAccountTypes(): Promise<IAccountType[]> {
        let accountType: IAccountType[]
        try {
            let accountTypeAux = await this._accountTypeRepository.getAllAccountTypes();
            if (accountTypeAux) {
                accountType = accountTypeAux.map((accountType) => {
                    return ObjectToInterface.ToAccountType(accountType);
                });
            }
            return accountType;
        } catch (e) {
            console.error("Error while getting all cities", e);
            throw new Error(e);
        }
    }

    public async getAllTranferMethods(): Promise<ITransferMethod[]> {
        let transferMethod: ITransferMethod[]
        try {
            let transferMethodAux = await this._transferMethodRepository.getAllTransferMethods();
            if (transferMethodAux) {
                transferMethod = transferMethodAux.map((transferMethod) => {
                    return ObjectToInterface.ToTransferMethod(transferMethod);
                });
            }
            return transferMethod;
        } catch (e) {
            console.error("Error while getting all cities", e);
            throw new Error(e);
        }
    }
}
