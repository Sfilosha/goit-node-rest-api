import HttpError from "../helpers/HttpError.js";
import Contact from "../db/models/contacts.js";

export async function listContacts() {
  return await Contact.findAll();
}

export async function getContactById(contactId) {
  return Contact.findByPk(contactId);
}

export async function removeContact(contactId) {
  return Contact.destroy({
    where: {
      id: contactId,
    },
  });
}

export async function addContact(data) {
  return await Contact.create(data);
}

export async function updateContactByID(contactId, data) {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  return await Contact.update(data, {
    where: { id: contactId },
    returning: true,
  });
}

export default {
  addContact,
  removeContact,
  listContacts,
  getContactById,
  updateContactByID,
};
