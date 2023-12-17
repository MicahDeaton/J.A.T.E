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


  // TODO-Done: Add logic to a method that accepts some content and adds it to the database
  export const putDb = async (content) => 
  {
     // Write the content to the 'jate' store
    const tx = initdb.transaction('jate', 'readwrite');
    await tx.objectStore('jate').put(content, 'key');
    await tx.done;
  };


// TODO-Done: Add logic for a method that gets all the content from the database
export const getDb = async () =>
{
  // Read the content from the 'jate' store
  const tx = db.transaction('jate', 'readonly');
  const content = await tx.objectStore('jate').get('key');
  await tx.done;

  return content;
};

initdb();
