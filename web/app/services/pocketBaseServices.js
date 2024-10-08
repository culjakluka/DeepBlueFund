import client from '../pocketbase/index';

export async function createRecord(collection, data) {
  try {
    const record = await client.collection(collection).create(data);
    return record;
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
}

export async function getRecordById(collection, id) {
  try {
    const record = await client.collection(collection).getOne(id);
    return record;
  } catch (error) {
    console.error('Error fetching record:', error);
    throw error;
  }
}

export async function updateRecord(collection, id, data) {
  try {
    const updatedRecord = await client.collection(collection).update(id, data);
    return updatedRecord;
  } catch (error) {
    console.error('Error updating record:', error);
    throw error;
  }
}

export async function deleteRecord(collection, id) {
  try {
    await client.collection(collection).delete(id);
    return { success: true };
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
}

export const getRecordByField = async (collection, field, value) => {
  try {
    const record = await client
      .collection(collection)
      .getFirstListItem(`${field}="${value}"`);
    return record;
  } catch (error) {
    throw new Error(`Error fetching record: ${error}`);
  }
};

export async function getAdminStatus(walletAddress) {
  try {
    const user = await client
      .collection('users')
      .getFirstListItem(`walletAddress="${walletAddress}"`);
    return user.isAdmin === true;
  } catch (error) {
    console.error('Error fetching admin status:', error);
    return false;
  }
}
