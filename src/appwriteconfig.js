import { Client,Account,Databases } from 'appwrite';
import conf from './conf/conf';

const client = new Client();

client
    .setEndpoint(conf.appwrite_url)
    .setProject(conf.appwrite_Project_ID);

export const account = new Account(client);
export const database = new Databases(client);
export default client;