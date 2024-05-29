import {DataSource, Repository} from "typeorm"
import {TaxCode} from "../../Models/Database/Entities/TaxCode";
import {TaxCodeTypes} from "../../Enums/TaxCodeTypes";

export class TaxCodeRepository {
    repository: Repository<TaxCode>;
    _dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this._dataSource = dataSource;
        this.repository = this._dataSource.getRepository(TaxCode);
    }

    public async createUpdateTaxCode(TaxCode: TaxCode): Promise<TaxCode> {
        try {
            return await this.repository.save(TaxCode);
        } catch (e) {
            console.error('Error saving a new TaxCode', e)
        }
    }

    public async deleteTaxCode(id: string, ids?: string[], conditions?: object) {
        try {
            if (conditions) {
                await this.repository.delete(conditions);
                return;
            }
            if (ids) {
                await this.repository.delete(ids);
                return;
            }
            await this.repository.delete(id);
        } catch (e) {
            console.error("Something went wrong while deleting the object", e)
        }
    }

    public async getAllTaxCodes(relations?: object): Promise<TaxCode[]> {
        if (relations) {
            return this.repository.find({
                relations: relations, order: {
                    Order: 'ASC'
                }
            });
        }
        return this.repository.find({order: {Order: 'ASC'}});
    }

    public async getTaxCodesByType(type: TaxCodeTypes, relations?: object): Promise<TaxCode[]> {
        if (relations) {
            return this.repository.find({
                where: {
                    TaxCodeType: {
                        Id: type
                    }
                },
                relations: relations,
                order: {
                    Order: 'ASC',
                    IncomeForm: {
                        IncomeFormOptions: {
                            Order: 'ASC'
                        }
                    },
                    DeductionForm: {
                        DeductionFormOptions: {
                            Order: 'ASC'
                        },
                    },
                    OtherItemForm: {
                        OtherItemFormOptions: {
                            Order: 'ASC'
                        }
                    },
                    Questions: {
                        Order: 'ASC',
                        Options: {
                            Order: 'ASC'
                        }
                    }
                }
            });
        }
        return this.repository.find({
            order: {
                Order: 'ASC',
                IncomeForm: {
                    IncomeFormOptions: {
                        Order: 'ASC'
                    }
                },
                DeductionForm: {
                    DeductionFormOptions: {
                        Order: 'ASC'
                    },
                },
                OtherItemForm: {
                    OtherItemFormOptions: {
                        Order: 'ASC'
                    }
                },
                Questions: {
                    Order: 'ASC',
                    Options: {
                        Order: 'ASC'
                    }
                }
            }
        });
    }
}
