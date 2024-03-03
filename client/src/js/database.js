import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  
  console.log("Post this to the database!");

  const jateDB = await openDB('jate', 1); // create connection

  const transaction = jateDB.transaction('jate', 'readwrite'); // create transaction and specify database

  const store = transaction.objectStore('jate'); // open store

  const request = store.add({ content }); 

  const result = await request;
  console.log('Data saved to the database', result);
};

// logic for a method that gets all the content from the database
export const getDb = async () => {
  
  console.log('Get stuff from the database');

  const jateDB = await openDB('jate', 1); // create connection

  const transaction = jateDB.transaction('jate', 'readonly'); // create transaction and specify database

  const store = transaction.objectStore('jate'); // open store

  const request = store.getAll(); 

  const result = await request;
  console.log('result.value', result);
}; 

/* // TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');
 */

initdb();
