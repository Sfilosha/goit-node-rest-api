import ctrlWrapper from "../helpers/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import validateBody from "../helpers/validateBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import * as contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const data = await contactsService.listContacts({ owner });
  res.status(200).json(data);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.getContact({ id, owner });

  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(data);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const data = await contactsService.removeContact({ id, owner });

  if (!data) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(data);
};

export const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const data = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(data);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const result = await contactsService.updateContact({ id, owner }, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const { favorite } = req.body;
  console.log(id, owner, favorite);
  const result = await contactsService.updateContact(
    { id, owner },
    { favorite }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
