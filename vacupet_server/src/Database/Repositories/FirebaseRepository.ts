import {getAuth} from "firebase-admin/auth";
import {FirebaseUser} from "../../Models/Interfaces/FirebaseUser";
import {FirebaseResponse} from "../../Models/Interfaces/FirebaseResponse";

export class FirebaseRepository {
    async addUser(user: FirebaseUser): Promise<FirebaseResponse> {
        let uid = "";
        if (!user)
            return {Success: false, Message: "User is null"};
        if (!user.Password)
            return {Success: false, Message: "Password is null"};
        try {
            let userResponse = await getAuth().createUser({
                email: user.Email,
                emailVerified: true,
                phoneNumber: `+52${user.PhoneNumber}`,
                password: user.Password,
                displayName: `${user.Name} ${user.LastName}`,
                disabled: false,
            });

            uid = userResponse.uid;
        } catch (e) {
            console.error("Error", e.message);
            return {Success: false, Message: e.message};
        }
        return {Success: true, Uid: uid};
    }

    async deleteUser(uid: string): Promise<FirebaseResponse> {
        try {
            await getAuth().deleteUser(uid);
        } catch (e) {
            return {Success: false, Message: e.message};
        }
        return {Success: true};
    }

    async updateUser(user: FirebaseUser): Promise<FirebaseResponse> {
        if (!user)
            return {Success: false, Message: "User is null"};
        if (!user.Uid)
            return {Success: false, Message: "Uid is null"};
        try {
            let props = {
                email: user.Email,
                phoneNumber: `+1${user.PhoneNumber}`,
                displayName: `${user.Name} ${user.LastName}`,
                disabled: user.Disabled,
                emailVerified: true,
            };
            if (user.Password) {
                props["password"] = user.Password;
            }
            await getAuth().updateUser(user.Uid, props);
        } catch (e) {
            return {Success: false, Message: e.message};
        }
        return {Success: true};
    }
}


