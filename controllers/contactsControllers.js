import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const data = await contactsService.listContacts();
  res.status(200).json(data);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.getContactById(id);

  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(data);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const data = await contactsService.removeContact(id);

  if (!data) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(data);
};

export const createContact = async (req, res) => {
  const data = await contactsService.addContact(req.body);
  res.status(201).json(data);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContactByID(id, req.body);
  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
};
