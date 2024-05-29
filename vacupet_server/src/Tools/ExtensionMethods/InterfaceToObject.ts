import {IBank} from "../../Models/Database/Interfaces/IBank";
import {Bank} from "../../Models/Database/Entities/Bank";
import {IOffice} from "../../Models/Database/Interfaces/IOffice";
import {Office} from "../../Models/Database/Entities/Office";
import {IOptionType} from "../../Models/Database/Interfaces/TaxCodeForm/IOptionType";
import {OptionType} from "../../Models/Database/Entities/TaxCodeForms/OptionType";
import {QuestionType} from "../../Models/Database/Entities/QuestionType";
import {IQuestionType} from "../../Models/Database/Interfaces/IQuestionType";
import {IRelation} from "../../Models/Database/Interfaces/Person/IRelation";
import {Relation} from "../../Models/Database/Entities/Person/Relation";
import {State} from "../../Models/Database/Entities/State";
import {IState} from "../../Models/Database/Interfaces/IState";
import {TaxCodeType} from "../../Models/Database/Entities/TaxCodeType";
import {ITaxCodeType} from "../../Models/Database/Interfaces/ITaxCodeType";
import {IQuestionOption} from "../../Models/Database/Interfaces/IQuestionOption";
import {QuestionOption} from "../../Models/Database/Entities/QuestionOption";
import {IQuestion} from "../../Models/Database/Interfaces/IQuestion";
import {Question} from "../../Models/Database/Entities/Question";
import {ISetting} from "../../Models/Database/Interfaces/ISetting";
import {Setting} from "../../Models/Database/Entities/Setting";
import {ITaxCode} from "../../Models/Database/Interfaces/ITaxCode";
import {TaxCode} from "../../Models/Database/Entities/TaxCode";
import {IIncomeForm} from "../../Models/Database/Interfaces/TaxCodeForm/Income/IIncomeForm";
import {IncomeForm} from "../../Models/Database/Entities/TaxCodeForms/Income/IncomeForm";
import {IncomeFormOption} from "../../Models/Database/Entities/TaxCodeForms/Income/IncomeFormOption";
import {IIncomeFormOption} from "../../Models/Database/Interfaces/TaxCodeForm/Income/IIncomeFormOption";
import {IDeductionFormOption} from "../../Models/Database/Interfaces/TaxCodeForm/Deduction/IDeductionFormOption";
import {DeductionFormOption} from "../../Models/Database/Entities/TaxCodeForms/Deduction/DeductionFormOption";
import {IDeductionForm} from "../../Models/Database/Interfaces/TaxCodeForm/Deduction/IDeductionForm";
import {DeductionForm} from "../../Models/Database/Entities/TaxCodeForms/Deduction/DeductionForm";
import {OtherItemForm} from "../../Models/Database/Entities/TaxCodeForms/OtherItem/OtherItemForm";
import {IOtherItemForm} from "../../Models/Database/Interfaces/TaxCodeForm/OtherItem/IOtherItemForm";
import {OtherItemFormOption} from "../../Models/Database/Entities/TaxCodeForms/OtherItem/OtherItemFormOption";
import {IOtherItemFormOption} from "../../Models/Database/Interfaces/TaxCodeForm/OtherItem/IOtherItemFormOption";
import {ITaxpayer} from "../../Models/Database/Interfaces/Person/ITaxpayer";
import {Taxpayer} from "../../Models/Database/Entities/Person/Owner";
import {IBankMethodType} from "../../Models/Database/Interfaces/IBankMethodType";
import {BankMethodType} from "../../Models/Database/Entities/BankMethodType";
import {IAccountType} from "../../Models/Database/Interfaces/IAccountType";
import {AccountType} from "../../Models/Database/Entities/AccountType";
import {ITransferMethod} from "../../Models/Database/Interfaces/ITransferMethod";
import {TransferMethod} from "../../Models/Database/Entities/TransferMethod";

export class InterfaceToObject {
    public static ToBankMethodType(iBankMethodType: IBankMethodType): BankMethodType {
        const bankMethodType = new BankMethodType()
        if (iBankMethodType.Id)
            bankMethodType.Id = iBankMethodType.Id;
        bankMethodType.Name = iBankMethodType.Name;
        return bankMethodType;
    }

    public static ToQuestionOption(iQuestionOption: IQuestionOption): QuestionOption {
        const questionOption = new QuestionOption()
        if (iQuestionOption.Id)
            questionOption.Id = iQuestionOption.Id;
        if (iQuestionOption.Order)
            questionOption.Order = iQuestionOption.Order;
        questionOption.Option = iQuestionOption.Option;
        return questionOption;
    }

    public static ToQuestionType(iQuestionType: IQuestionType): QuestionType {
        const questionType = new QuestionType()
        if (iQuestionType.Id)
            questionType.Id = iQuestionType.Id;
        questionType.Name = iQuestionType.Name;
        return questionType;
    }

    public static ToOptionType(iOptionType: IOptionType): OptionType {
        const optionType = new OptionType()
        if (iOptionType.Id)
            optionType.Id = iOptionType.Id;
        optionType.Name = iOptionType.Name;
        return optionType;
    }

    public static ToRelation(iRelation: IRelation): Relation {
        const relation = new Relation()
        if (iRelation.Id)
            relation.Id = iRelation.Id;
        relation.Name = iRelation.Name;
        return relation;
    }

    public static ToTaxCodeType(iTaxCodeType: ITaxCodeType): TaxCodeType {
        const taxCodeType = new TaxCodeType()
        if (iTaxCodeType.Id)
            taxCodeType.Id = iTaxCodeType.Id;
        taxCodeType.Name = iTaxCodeType.Name;
        return taxCodeType;
    }

    public static ToAccountType(iAccountType: IAccountType): AccountType {
        const accountType = new AccountType()
        if (iAccountType.Id)
            accountType.Id = iAccountType.Id;
        accountType.Name = iAccountType.Name;
        return accountType;
    }

    public static ToTransferMethod(iTransferMethod: ITransferMethod): TransferMethod {
        const transferMethod = new TransferMethod()
        if (iTransferMethod.Id)
            transferMethod.Id = iTransferMethod.Id;
        transferMethod.Name = iTransferMethod.Name;
        transferMethod.Abbreviation = iTransferMethod.Abbreviation;
        return transferMethod;
    }

    public static ToState(iState: IState): State {
        const state = new State()
        if (iState.Id)
            state.Id = iState.Id;
        if (iState.Order)
            state.Order = iState.Order;
        state.Name = iState.Name;
        state.Abbreviation = iState.Abbreviation;
        return state;
    }

    public static ToOffice(iOffice: IOffice): Office {
        const office = new Office()
        if (iOffice.Id)
            office.Id = iOffice.Id;
        office.Name = iOffice.Name;
        office.Abbreviation = iOffice.Abbreviation;
        return office;
    }

    public static ToBank(iBank: IBank): Bank {
        const bank = new Bank()
        if (iBank.Id)
            bank.Id = iBank.Id;
        bank.Name = iBank.Name;
        bank.Abbreviation = iBank.Abbreviation;
        bank.Routing = iBank.Routing;
        return bank;
    }

    public static ToSetting(iSetting: ISetting): Setting {
        const setting = new Setting()
        if (iSetting.Id)
            setting.Id = iSetting.Id;
        setting.Name = iSetting.Name;
        setting.Description = iSetting.Description;
        setting.Value = iSetting.Value;
        return setting;
    }

    public static ToQuestion(iQuestion: IQuestion): Question {
        const question = new Question()
        const options: QuestionOption[] = [];
        if (iQuestion.Id)
            question.Id = iQuestion.Id;
        if (iQuestion.Order)
            question.Order = iQuestion.Order;
        question.Question = iQuestion.Question;
        question.Length = iQuestion.Length;
        question.QuestionType = iQuestion.QuestionType ? this.ToQuestionType(iQuestion.QuestionType) : null;
        if (iQuestion.Options && iQuestion.Options.length > 0) {
            iQuestion.Options.forEach(option => {
                options.push(this.ToQuestionOption(option));
            });
            question.Options = options;
        }
        return question;
    }

    public static ToTaxCode(iTaxCode: ITaxCode): TaxCode {
        const taxcode = new TaxCode()
        const questions: Question[] = [];
        if (iTaxCode.Id)
            taxcode.Id = iTaxCode.Id;
        if (iTaxCode.Order)
            taxcode.Order = iTaxCode.Order;

        taxcode.Name = iTaxCode.Name;
        taxcode.Description = iTaxCode.Description;
        taxcode.Since = iTaxCode.Since;
        taxcode.TaxCodeType = iTaxCode.TaxCodeType ? this.ToTaxCodeType(iTaxCode.TaxCodeType) : null;
        taxcode.IncomeForm = iTaxCode.IncomeForm ? this.ToIncomeForm(iTaxCode.IncomeForm) : null;
        taxcode.DeductionForm = iTaxCode.DeductionForm ? this.ToDeductionForm(iTaxCode.DeductionForm) : null;
        taxcode.OtherItemForm = iTaxCode.OtherItemForm ? this.ToOtherItemForm(iTaxCode.OtherItemForm) : null;
        if (iTaxCode.Questions && iTaxCode.Questions.length > 0) {
            iTaxCode.Questions.forEach(question => {
                questions.push(this.ToQuestion(question));
            });
            taxcode.Questions = questions;
        }
        return taxcode;
    }

    public static ToIncomeForm(iIncomeForm: IIncomeForm): IncomeForm {
        const incomeform = new IncomeForm()
        const incomeforms: IncomeFormOption[] = [];
        if (iIncomeForm.Id)
            incomeform.Id = iIncomeForm.Id;
        incomeform.NumForm = iIncomeForm.NumForm ? this.ToOptionType(iIncomeForm.NumForm) : null;
        incomeform.Taxpayer = iIncomeForm.Taxpayer ? this.ToOptionType(iIncomeForm.Taxpayer) : null;
        incomeform.Spouse = iIncomeForm.Spouse ? this.ToOptionType(iIncomeForm.Spouse) : null;
        if (iIncomeForm.IncomeFormOptions && iIncomeForm.IncomeFormOptions.length > 0) {
            iIncomeForm.IncomeFormOptions.forEach(incomeform => {
                incomeforms.push(this.ToIncomeFormOption(incomeform));
            });
            incomeform.IncomeFormOptions = incomeforms;
        }
        return incomeform;
    }

    public static ToIncomeFormOption(iIncomeformoption: IIncomeFormOption): IncomeFormOption {
        const incomeformoption = new IncomeFormOption()
        if (iIncomeformoption.Id)
            incomeformoption.Id = iIncomeformoption.Id;
        if (iIncomeformoption.Order)
            incomeformoption.Order = iIncomeformoption.Order;
        incomeformoption.Option = iIncomeformoption.Option;
        return incomeformoption;
    }

    public static ToDeductionForm(iDeductionForm: IDeductionForm): DeductionForm {
        const deductionform = new DeductionForm()
        const deductionforms: DeductionFormOption[] = [];
        if (iDeductionForm.Id)
            deductionform.Id = iDeductionForm.Id;
        deductionform.NumForm = iDeductionForm.NumForm ? this.ToOptionType(iDeductionForm.NumForm) : null;
        deductionform.Taxpayer = iDeductionForm.Taxpayer ? this.ToOptionType(iDeductionForm.Taxpayer) : null;
        deductionform.Spouse = iDeductionForm.Spouse ? this.ToOptionType(iDeductionForm.Spouse) : null;
        deductionform.Dependent = iDeductionForm.Dependent ? this.ToOptionType(iDeductionForm.Dependent) : null;
        if (iDeductionForm.DeductionFormOptions && iDeductionForm.DeductionFormOptions.length > 0) {
            iDeductionForm.DeductionFormOptions.forEach(deductionform => {
                deductionforms.push(this.ToDeductionFormOption(deductionform));
            });
            deductionform.DeductionFormOptions = deductionforms;
        }
        return deductionform;
    }

    public static ToDeductionFormOption(iDeductionformoption: IDeductionFormOption): DeductionFormOption {
        const deductionformoption = new DeductionFormOption()
        if (iDeductionformoption.Id)
            deductionformoption.Id = iDeductionformoption.Id;
        if (iDeductionformoption.Order)
            deductionformoption.Order = iDeductionformoption.Order;
        deductionformoption.Option = iDeductionformoption.Option;
        return deductionformoption;
    }

    public static ToOtherItemForm(iOtherItemForm: IOtherItemForm): OtherItemForm {
        const otheritemform = new OtherItemForm()
        const otheritemforms: OtherItemFormOption[] = [];
        if (iOtherItemForm.Id)
            otheritemform.Id = iOtherItemForm.Id;
        otheritemform.Taxpayer = iOtherItemForm.Taxpayer ? this.ToOptionType(iOtherItemForm.Taxpayer) : null;
        otheritemform.Spouse = iOtherItemForm.Spouse ? this.ToOptionType(iOtherItemForm.Spouse) : null;
        otheritemform.Dependent = iOtherItemForm.Dependent ? this.ToOptionType(iOtherItemForm.Dependent) : null;
        if (iOtherItemForm.OtherItemFormOptions && iOtherItemForm.OtherItemFormOptions.length > 0) {
            iOtherItemForm.OtherItemFormOptions.forEach(otheritemform => {
                otheritemforms.push(this.ToOtherItemFormOption(otheritemform));
            });
            otheritemform.OtherItemFormOptions = otheritemforms;
        }
        return otheritemform;
    }

    public static ToOtherItemFormOption(iOtherItemformoption: IOtherItemFormOption): OtherItemFormOption {
        const otheritemformoption = new OtherItemFormOption()
        if (iOtherItemformoption.Id)
            otheritemformoption.Id = iOtherItemformoption.Id;
        if (iOtherItemformoption.Order)
            otheritemformoption.Order = iOtherItemformoption.Order;
        otheritemformoption.Option = iOtherItemformoption.Option;
        return otheritemformoption;
    }

    public static ToTaxpayer(iTaxpayer: ITaxpayer): Taxpayer {
        const taxpayer = new Taxpayer()
        if (iTaxpayer.Id)
            taxpayer.Id = iTaxpayer.Id;
        if (iTaxpayer.ProSeriesID)
            taxpayer.ProSeriesID = iTaxpayer.ProSeriesID;
        taxpayer.Firstname = iTaxpayer.Firstname;
        taxpayer.Middlename = iTaxpayer.Middlename;
        taxpayer.Lastname = iTaxpayer.Lastname;
        taxpayer.SSN_ITIN = iTaxpayer.SSN_ITIN;
        taxpayer.Occupation = iTaxpayer.Occupation;
        taxpayer.PhoneNumber = iTaxpayer.PhoneNumber;
        taxpayer.Email = iTaxpayer.Email;
        taxpayer.DateOfBirth = iTaxpayer.DateOfBirth;
        taxpayer.Notes = iTaxpayer.Notes;
        return taxpayer;
    }
}
