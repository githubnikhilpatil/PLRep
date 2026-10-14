import { Deal } from '../entities/Deal';
import { TestData } from '../utils/TestDataReader';

export class DealDataMapper {

    public static createDeal(data: TestData): Deal {

        return {
            DealsTitle: data.DealsTitle,
            UserAccess: data.UserAccess,
            Company: data.Company,
            Products: data.Products,
            Contacts: data.Contacts,
            Isclosed: 
            String(data.Isclosed).toLowerCase() === 'yes', 
            closeDate: data.closeDate,
            Description: data.Description,
            Probability: Number(data.Probability),
            Amount: Number(data.Amount),
            Commission: Number(data.Commission),
            Stage: data.Stage,
            Status: data.Status,
            NextSteps: data.NextSteps,
            Type: data.Type,
            Source: data.Source
        };
    }
}