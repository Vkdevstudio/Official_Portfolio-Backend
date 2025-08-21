
import Contact from "../model/Contact.js";


export  const createContactusService = async (data) => {
  return await Contact.create(data);
};


export const updateContactusService = async (id, data) => {
  return await Contact.findByIdAndUpdate(id, data, { new: true });
};

export const deleteContactusService = async (id) => {
  return await Contact.findByIdAndDelete(id);
};

export   const getAllContactusService = async () => {
  return await Contact.find();
};

