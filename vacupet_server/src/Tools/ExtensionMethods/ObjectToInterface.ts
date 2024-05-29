import {IQuestionOption} from "../../Models/Database/Interfaces/IQuestionOption";
import {QuestionOption} from "../../Models/Database/Entities/QuestionOption";
import {IQuestionType} from "../../Models/Database/Interfaces/IQuestionType";
import {QuestionType} from "../../Models/Database/Entities/QuestionType";
import {IOptionType} from "../../Models/Database/Interfaces/TaxCodeForm/IOptionType";
import {OptionType} from "../../Models/Database/Entities/TaxCodeForms/OptionType";
import {IRelation} from "../../Models/Database/Interfaces/Person/IRelation";
import {Relation} from "../../Models/Database/Entities/Person/Relation";
import {ITaxCodeType} from "../../Models/Database/Interfaces/ITaxCodeType";
import {TaxCodeType} from "../../Models/Database/Entities/TaxCodeType";
import {IState} from "../../Models/Database/Interfaces/IState";
import {State} from "../../Models/Database/Entities/State";
import {IOffice} from "../../Models/Database/Interfaces/IOffice";
import {Office} from "../../Models/Database/Entities/Office";
import {IBank} from "../../Models/Database/Interfaces/IBank";
import {Bank} from "../../Models/Database/Entities/Bank";
import {ISetting} from "../../Models/Database/Interfaces/ISetting";
import {Setting} from "../../Models/Database/Entities/Setting";
import {User} from "../../Models/Database/Entities/Person/User";
import {FirebaseUser} from "../../Models/Interfaces/FirebaseUser";
import {IQuestion} from "../../Models/Database/Interfaces/IQuestion";
import {Question} from "../../Models/Database/Entities/Question";
import {ITaxCode} from "../../Models/Database/Interfaces/ITaxCode";
import {TaxCode} from "../../Models/Database/Entities/TaxCode";
import {IUser} from "../../Models/Database/Interfaces/IUser";
import {UserType} from "../../Models/Database/Entities/UserType";
import {IUserType} from "../../Models/Database/Interfaces/IUserType";
import {IIncomeForm} from "../../Models/Database/Interfaces/TaxCodeForm/Income/IIncomeForm";
import {IncomeForm} from "../../Models/Database/Entities/TaxCodeForms/Income/IncomeForm";
import {IncomeFormOption} from "../../Models/Database/Entities/TaxCodeForms/Income/IncomeFormOption";
import {IIncomeFormOption} from "../../Models/Database/Interfaces/TaxCodeForm/Income/IIncomeFormOption";
import {DeductionForm} from "../../Models/Database/Entities/TaxCodeForms/Deduction/DeductionForm";
import {IDeductionForm} from "../../Models/Database/Interfaces/TaxCodeForm/Deduction/IDeductionForm";
import {DeductionFormOption} from "../../Models/Database/Entities/TaxCodeForms/Deduction/DeductionFormOption";
import {IDeductionFormOption} from "../../Models/Database/Interfaces/TaxCodeForm/Deduction/IDeductionFormOption";
import {OtherItemForm} from "../../Models/Database/Entities/TaxCodeForms/OtherItem/OtherItemForm";
import {IOtherItemForm} from "../../Models/Database/Interfaces/TaxCodeForm/OtherItem/IOtherItemForm";
import {OtherItemFormOption} from "../../Models/Database/Entities/TaxCodeForms/OtherItem/OtherItemFormOption";
import {IOtherItemFormOption} from "../../Models/Database/Interfaces/TaxCodeForm/OtherItem/IOtherItemFormOption";
import {ITaxpayer} from "../../Models/Database/Interfaces/Person/ITaxpayer";
import {Taxpayer} from "../../Models/Database/Entities/Person/Owner";
import {IBankMethodType} from "../../Models/Database/Interfaces/IBankMethodType";
import {BankMethodType} from "../../Models/Database/Entities/BankMethodType";
import {TransferMethod} from "../../Models/Database/Entities/TransferMethod";
import {IAccountType} from "../../Models/Database/Interfaces/IAccountType";
import {AccountType} from "../../Models/Database/Entities/AccountType";
import {ITransferMethod} from "../../Models/Database/Interfaces/ITransferMethod";

export class ObjectToInterface {
    public static ToBankMethodType(userType: BankMethodType): IBankMethodType {
        return {
            Id: userType.Id,
            Name: userType.Name
        };
    }

    public static ToUserType(userType: UserType): IUserType {
        return {
            Id: userType.Id,
            Name: userType.Name
        };
    }

    public static ToQuestionOption(questionOption: QuestionOption): IQuestionOption {
        return {
            Id: questionOption.Id,
            Option: questionOption.Option,
            Order: questionOption.Order
        };
    }

    public static ToQuestionType(questionType: QuestionType): IQuestionType {
        return {
            Id: questionType.Id,
            Name: questionType.Name
        };
    }

    public static ToOptionType(optionType: OptionType): IOptionType {
        return {
            Id: optionType.Id,
            Name: optionType.Name
        };
    }

    public static ToRelation(relation: Relation): IRelation {
        return {
            Id: relation.Id,
            Name: relation.Name
        };
    }

    public static ToTaxCodeType(taxCodeType: TaxCodeType): ITaxCodeType {
        return {
            Id: taxCodeType.Id,
            Name: taxCodeType.Name
        };
    }

    public static ToAccountType(accountType: AccountType): IAccountType {
        return {
            Id: accountType.Id,
            Name: accountType.Name,
        };
    }

    public static ToTransferMethod(transferMethod: TransferMethod): ITransferMethod {
        return {
            Id: transferMethod.Id,
            Name: transferMethod.Name,
            Abbreviation: transferMethod.Abbreviation
        };
    }

    public static ToState(state: State): IState {
        return {
            Id: state.Id,
            Name: state.Name,
            Abbreviation: state.Abbreviation
        };
    }

    public static ToOffice(office: Office): IOffice {
        return {
            Id: office.Id,
            Name: office.Name,
            Abbreviation: office.Abbreviation
        };
    }

    public static ToBank(bank: Bank): IBank {
        return {
            Id: bank.Id,
            Name: bank.Name,
            Abbreviation: bank.Abbreviation,
            Routing: bank.Routing
        };
    }

    public static ToSetting(setting: Setting): ISetting {
        return {
            Id: setting.Id,
            Name: setting.Name,
            Description: setting.Description,
            Value: setting.Value
        };
    }

    public static ToUser(user: User): IUser {
        return {
            Id: user.Id,
            Firstname: user.Firstname,
            Middlename: user.Middlename,
            Lastname: user.Lastname,
            Email: user.Email,
            PhoneNumber: user.PhoneNumber,
            IsActive: user.IsActive,
            CreatedAt: user.CreatedAt,
            UpdatedAt: user.UpdatedAt,
            Birthdate: user.Birthdate,
            FirebaseId: user.FirebaseId,
            UserType: user.UserType ? this.ToUserType(user.UserType) : null,
        };
    }

    public static ToFirebaseUser(user: User, password?: string): FirebaseUser {
        let firebaseUser: FirebaseUser = {
            Email: user.Email,
            Disabled: false,
            Name: user.Firstname + " " + user.Middlename,
            LastName: user.Lastname,
            PhoneNumber: user.PhoneNumber,
        };

        if (user.FirebaseId)
            firebaseUser.Uid = user.FirebaseId

        if (password)
            firebaseUser.Password = password;

        return firebaseUser;
    }

    public static ToQuestion(question: Question): IQuestion {
        const questionO: IQuestion = {
            Id: question.Id,
            Question: question.Question,
            Length: question.Length,
            Order: question.Order,
            QuestionType: question.QuestionType ? this.ToQuestionType(question.QuestionType) : null,
        };
        if (question.Options && question.Options.length > 0)
            questionO.Options = question.Options.map(option => this.ToQuestionOption(option));
        else
            questionO.Options = [];
        return questionO
    }

    public static ToTaxCode(taxCode: TaxCode): ITaxCode {
        const taxCodeO: ITaxCode = {
            Id: taxCode.Id,
            Name: taxCode.Name,
            Description: taxCode.Description,
            Since: taxCode.Since,
            TaxCodeType: taxCode.TaxCodeType ? this.ToTaxCodeType(taxCode.TaxCodeType) : null,
            IncomeForm: taxCode.IncomeForm ? this.ToIncomeForm(taxCode.IncomeForm) : null,
            DeductionForm: taxCode.DeductionForm ? this.ToDeductionForm(taxCode.DeductionForm) : null,
            OtherItemForm: taxCode.OtherItemForm ? this.ToOtherItemForm(taxCode.OtherItemForm) : null
        };
        if (taxCode.Questions && taxCode.Questions.length > 0)
            taxCodeO.Questions = taxCode.Questions.map(question => this.ToQuestion(question));
        else
            taxCodeO.Questions = [];
        return taxCodeO;
    }

    public static ToIncomeForm(incomeForm: IncomeForm): IIncomeForm {
        const iIncomeForm: IIncomeForm = {
            Id: incomeForm.Id,
            NumForm: incomeForm.NumForm ? this.ToOptionType(incomeForm.NumForm) : null,
            Taxpayer: incomeForm.Taxpayer ? this.ToOptionType(incomeForm.Taxpayer) : null,
            Spouse: incomeForm.Spouse ? this.ToOptionType(incomeForm.Spouse) : null,
        };
        if (incomeForm.IncomeFormOptions && incomeForm.IncomeFormOptions.length > 0)
            iIncomeForm.IncomeFormOptions = incomeForm.IncomeFormOptions.map(incomeformoption => this.ToIncomeFormOption(incomeformoption));
        else
            iIncomeForm.IncomeFormOptions = [];
        return iIncomeForm;
    }

    public static ToIncomeFormOption(incomeformoption: IncomeFormOption): IIncomeFormOption {
        return {
            Id: incomeformoption.Id,
            Option: incomeformoption.Option,
            Order: incomeformoption.Order
        };
    }

    public static ToDeductionForm(deductionForm: DeductionForm): IDeductionForm {
        const iDeductionForm: IDeductionForm = {
            Id: deductionForm.Id,
            NumForm: deductionForm.NumForm ? this.ToOptionType(deductionForm.NumForm) : null,
            Taxpayer: deductionForm.Taxpayer ? this.ToOptionType(deductionForm.Taxpayer) : null,
            Spouse: deductionForm.Spouse ? this.ToOptionType(deductionForm.Spouse) : null,
            Dependent: deductionForm.Dependent ? this.ToOptionType(deductionForm.Dependent) : null,
        };
        if (deductionForm.DeductionFormOptions && deductionForm.DeductionFormOptions.length > 0)
            iDeductionForm.DeductionFormOptions = deductionForm.DeductionFormOptions.map(deductionformoption => this.ToDeductionFormOption(deductionformoption));
        else
            iDeductionForm.DeductionFormOptions = [];
        return iDeductionForm;
    }

    public static ToDeductionFormOption(deductionformoption: DeductionFormOption): IDeductionFormOption {
        return {
            Id: deductionformoption.Id,
            Option: deductionformoption.Option,
            Order: deductionformoption.Order
        };
    }

    public static ToOtherItemForm(otheritemForm: OtherItemForm): IOtherItemForm {
        const iOtherItemForm: IOtherItemForm = {
            Id: otheritemForm.Id,
            Taxpayer: otheritemForm.Taxpayer ? this.ToOptionType(otheritemForm.Taxpayer) : null,
            Spouse: otheritemForm.Spouse ? this.ToOptionType(otheritemForm.Spouse) : null,
            Dependent: otheritemForm.Spouse ? this.ToOptionType(otheritemForm.Dependent) : null,
        };
        if (otheritemForm.OtherItemFormOptions && otheritemForm.OtherItemFormOptions.length > 0)
            iOtherItemForm.OtherItemFormOptions = otheritemForm.OtherItemFormOptions.map(otheritemformoption => this.ToOtherItemFormOption(otheritemformoption));
        else
            iOtherItemForm.OtherItemFormOptions = [];
        return iOtherItemForm;
    }

    public static ToOtherItemFormOption(otheritemformoption: OtherItemFormOption): IOtherItemFormOption {
        return {
            Id: otheritemformoption.Id,
            Option: otheritemformoption.Option,
            Order: otheritemformoption.Order
        };
    }

    public static ToTaxpayer(taxpayer: Taxpayer): ITaxpayer {
        return {
            Id: taxpayer.Id,
            DateOfBirth: taxpayer.DateOfBirth,
            Email: taxpayer.Email,
            Firstname: taxpayer.Firstname,
            Lastname: taxpayer.Lastname,
            Middlename: taxpayer.Middlename,
            Occupation: taxpayer.Occupation,
            PhoneNumber: taxpayer.PhoneNumber,
            ProSeriesID: taxpayer.ProSeriesID,
            SSN_ITIN: taxpayer.SSN_ITIN,
            Status: false,
            Notes: taxpayer.Notes,
        };
    }
}
