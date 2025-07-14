import conf from "../../conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwrite_url).setProject(conf.project_id);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, featuredImage, status, userId, slug }) {
    try {
      const result = await this.databases.createDocument({
        databaseId: conf.database_url,
        collectionId: conf.collection_id,
        documentId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("some error occured", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      const result = await this.databases.updateDocument(
        conf.database_url,
        conf.collection_id,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("some error occured", error);
    }
  }

  async deletePost(slug) {
    try {
      const result = await this.databases.deleteDocument(
        conf.database_url, // databaseId
        conf.collection_id, // collectionId
        slug // documentId
      );
      return true;
    } catch (error) {
      console.log("some error occured", error);
    }
  }

  async getPost(slug) {
    try {
      const result = await this.databases.getDocument(
        conf.database_url,
        conf.collection_id,
        slug //this is doc id
      );
      if (result) return result;
      else return null;
    } catch (error) {
      console.log("some error occured", error);
    }
  }

  async getAllPosts() {
    try {
      const results = await this.databases.listDocuments(
        conf.database_url,
        conf.collection_id,
        [Query.equal("status", ["active"])]
      );
      return results;
      // if(results.length)
    } catch (error) {
      console.log("some error occured", error);
    }
  }

  //file upload functionality--

  async uploadFile(file) {
    try {
      const result = await this.bucket.createFile(
        conf.bucket_id,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("some error occured", error);
    }
}

    async deleteFile(fileId){
    try {
        const result=await this.bucket.deleteFile(conf.bucket_id,fileId)
        return true;
        
    } catch (error) {
        console.log("some error occured", error);
        
    }
    }
    async getFilePreview(fileId){
    try {
        const result=await this.bucket.getFilePreview(conf.bucket_id
            ,
            fileId
        )
        return result;
        
    } catch (error) {
        console.log("some error occured", error);
        
    }
    }

    




}

const dbService = new Service();

export default dbService;
