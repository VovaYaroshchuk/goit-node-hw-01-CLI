const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

module.exports = { listContacts, getContactById, removeContact, addContact };

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        console.table(JSON.parse(data));
    } catch (error) {
        console.log(error.message);
    }
    }

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        const contact = contacts.find(contact => Number(contact.id) === contactId);
        console.table(contact);
    } catch (error) {
        console.log(error.message);
    }
}

async function removeContact(contactId) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        const newContacts = contacts.filter(contact => Number(contact.id) !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(newContacts));
        console.table(newContacts);
    } catch (error) {
        console.log(error.message);
    }
}

async function addContact(name, email, phone) {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        const newContact = { id: contacts.length + 1, name, email, phone };
        contacts.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        console.table(contacts);
    
    } catch (error) {
        console.log(error.message);
    }
}