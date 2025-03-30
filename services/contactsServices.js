import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";
import HttpError from "../helpers/HttpError.js";

const contactsPath = path.resolve("db", "contacts.json");

export async function writeFile(contactsList) {
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
}

export async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter((p) => p.id === contactId);

  if (filteredContacts.length === 0) {
    return null;
  }

  return filteredContacts;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((p) => p.id === contactId);

  if (index === -1) {
    return null;
  }
  const [newContacts] = contacts.splice(index, 1);
  await writeFile(contacts);
  return newContacts;
}

export async function addContact({ name, email, phone }) {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await writeFile(contacts);
  return newContact;
}

export async function updateContactByID(contactId, data) {
  const contacts = await listContacts();
  const index = contacts.findIndex((p) => p.id === contactId);

  if (index === -1) {
    return HttpError(404, "Not found");
  }
  const updatedContact = { ...contacts[index], ...data };
  contacts[index] = updatedContact;
  await writeFile(contacts);
  return updatedContact;
}

export default {
  addContact,
  removeContact,
  listContacts,
  getContactById,
  updateContactByID,
};
