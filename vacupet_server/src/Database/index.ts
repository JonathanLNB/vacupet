import "reflect-metadata"
import {DataSource} from "typeorm"
import 'dotenv/config'
import {Person} from "../Models/Database/Entities/Person/Person";
import {Taxpayer} from "../Models/Database/Entities/Person/Owner";
import {Bank} from "../Models/Database/Entities/Bank";
import {Office} from "../Models/Database/Entities/Office";
import {OptionType} from "../Models/Database/Entities/TaxCodeForms/OptionType";
import {Question} from "../Models/Database/Entities/Question";
import {QuestionOption} from "../Models/Database/Entities/QuestionOption";
import {QuestionType} from "../Models/Database/Entities/QuestionType";
import {Relation} from "../Models/Database/Entities/Person/Relation";
import {Setting} from "../Models/Database/Entities/Setting";
import {State} from "../Models/Database/Entities/State";
import {TaxCode} from "../Models/Database/Entities/TaxCode";
import {TaxCodeType} from "../Models/Database/Entities/TaxCodeType";
import {User} from "../Models/Database/Entities/Person/User";
import {UserType} from "../Models/Database/Entities/UserType";
import {IncomeForm} from "../Models/Database/Entities/TaxCodeForms/Income/IncomeForm";
import {IncomeFormOption} from "../Models/Database/Entities/TaxCodeForms/Income/IncomeFormOption";
import {DeductionForm} from "../Models/Database/Entities/TaxCodeForms/Deduction/DeductionForm";
import {DeductionFormOption} from "../Models/Database/Entities/TaxCodeForms/Deduction/DeductionFormOption";
import {OtherItemForm} from "../Models/Database/Entities/TaxCodeForms/OtherItem/OtherItemForm";
import {OtherItemFormOption} from "../Models/Database/Entities/TaxCodeForms/OtherItem/OtherItemFormOption";
import {BankMethodType} from "../Models/Database/Entities/BankMethodType";
import {AccountType} from "../Models/Database/Entities/AccountType";
import {TransferMethod} from "../Models/Database/Entities/TransferMethod";

const AppDataSource = new DataSource({

    type: "postgres",
    host: process.env.PSQL_DATABASE_HOST,
    port: Number.parseInt(process.env.PSQL_DATABASE_PORT),
    username: process.env.PSQL_DATABASE_USER,
    password: process.env.PSQL_DATABASE_PASSWORD,
    database: process.env.PSQL_DATABASE_DB,
    synchronize: true,
    logging: false,
    entities: [Person, Taxpayer, Bank, Office, IncomeForm, IncomeFormOption,
        DeductionForm, DeductionFormOption, OtherItemForm, OtherItemFormOption, OptionType, Question, QuestionOption,
        QuestionType, Relation, Setting, State, TaxCode, TaxCodeType, User, UserType, BankMethodType, AccountType, TransferMethod],
    migrations: ["src/migrations/**/*.ts"]
});
export default AppDataSource;
