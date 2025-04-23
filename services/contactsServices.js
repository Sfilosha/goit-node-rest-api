import HttpError from "../helpers/HttpError.js";
import Contact from "../db/models/contacts.js";

export async function listContacts(query) {
  return await Contact.findAll({
    where: query,
  });
}

export async function getContact(query) {
  return Contact.findOne({ where: query });
}

export async function removeContact(query) {
  const contact = await Contact.findOne({ where: query });
  await Contact.destroy({ where: query });
  return contact;
}

export async function addContact(data) {
  return await Contact.create(data);
}

export async function updateContact(query, data) {
  const contact = await getContact(query);
  if (!contact) return null;
  const [count, [updatedContact]] = await Contact.update(data, {
    where: query,
    returning: true,
  });
  return updatedContact;
}
