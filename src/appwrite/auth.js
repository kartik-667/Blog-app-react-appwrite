import conf from "../../conf";

import {Client,Account,ID} from "appwrite";

class Auth{
    client= new Client()
    account;

    constructor(){
        this.client.setEndpoint(conf.appwrite_url).setProject(conf.project_id);
        this.account=new Account(this.client)
        
    }

    async createUser({email,password,name}){
        try {
            const newuser=await this.account.create(ID.unique(),email,password,name);
            
            if(newuser){
                console.log("user created successfully",newuser);
                //login also here
                const login_session=await this.login({email,password})
                return login_session
                
            }else{
                throw new Error("some error occured while creating the user");
                
            }
            
        } catch (error) {
            console.log("some error occured while creating the user",error);
            
        }



    }

    async login({email,password}){
        try {
            const session=await this.account.createEmailPasswordSession(email,password)
            return session
            
            
        } catch (error) {
            console.log("some error occured while logging in",error);
            
        }

    }

    async getCurrentUser(){
        try {
            const user = await this.account.get();
            if(user) return user
            else throw new Error("user doesnt exist")
            // Logged in
        } catch (err) {
            // Not logged in
            console.log(err);
            
        }

        return null;
    }

    async logout(){
        try {
            const result=await this.account.deleteSessions()
            return result

            
        } catch (error) {
            console.log("some error occured",error);
            
        }
    }


}
const authService=new Auth();

export default authService; //returns an object of the class Auth
