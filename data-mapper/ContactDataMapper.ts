import { Contact } from '../entities/Contact';
import { TestData } from '../utils/TestDataReader';

export class ContactDataMapper {

    public static createContact(
        data: TestData
    ): Contact {

        return {

            firstName: data.FirstName,

            lastName: data.LastName,

            category: data.Category,

            status: data.Status,

            isDoNotCall:
                String(data.Is_Do_not_Call).toLowerCase() === 'yes',

            isDoNotText:
                String(data.Is_Do_not_Text).toLowerCase() === 'yes',

            isDoNotEmail:
                String(data.Is_Do_not_Email).toLowerCase() === 'yes',

            birthDay: Number(data.Birth_Day),

            birthMonth: Number(data.Birth_Month),

            birthYear: Number(data.Birth_Year),

            referredBy: data.Referred_By,

            rating: Number(data.Rating)
        };
    }
}