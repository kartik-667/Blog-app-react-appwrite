import conf from "../../conf";

import {Client ,ID, Databases,Storage } from "appwrite";

class Service{
    client=new Client()
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwrite_url).setProject(conf.project_id);
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)


    }

    async createPost({title,content,featuredImage,status,userId,slug}){ 
        try {
            const result=await this.databases.createDocument({
                databaseId:conf.database_url,
                collectionId:conf.collection_id,
                documentId:slug,
                data:{
                    title,content,featuredImage,status,
                    userId
    
    
                }
    
            })
            
        } catch (error) {
            console.log("some error occured",error);
            
            
        }

    }
    
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            const result=await this.databases.updateDocument(
                conf.database_url,
                conf.collection_id,
                slug,
                {
                    title,content,featuredImage,status
                }


            )

            
        } catch (error) {
            console.log("some error occured",error);
            
        }
    }
    
    async deletePost(slug){
        try {
            const result = await this.databases.deleteDocument(
                conf.database_url, // databaseId
                conf.collection_id, // collectionId
                slug // documentId
            );
            return true;
            
            
        } catch (error) {
            console.log("some error occured",error);
            
        }
    }
}

const dbService=new Service()

export default dbService