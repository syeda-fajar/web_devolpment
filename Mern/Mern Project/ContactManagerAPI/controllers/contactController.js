import Contact from "../models/Contact.js";
export const getAllContacts = async (req, res) => {
    try {
        const contact = await Contact.find()
        res.status(200).json({
            success: true,
            counts: contact.length,
            data: contact
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        })

    }
}

export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        res.status(200).json({
            success: true,
            data: contact
        })

    }
    catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });


    }
}

export const createContact = async (req, res) => {
    try {

        const { name, email, phone, address } = req.body;
        const existingContact = await Contact.findOne({ email });
        if (existingContact) {
            return res.status(400).json({
                success: false,
                message: 'Contact with this email already exists'
            });}
            const contact = await Contact.create({
                name,
                email,
                phone,
                address
            })
        
        res.status(201).json({
            success: true,
            data: contact
        });


    }
    catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages
            });

        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });

    }
}
//UPDATE////////////////

export const updateContact = async (req, res) => {
    try {

        const { name, email, phone, address } = req.body;
        let contact = Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }
        if (email && email !== contact.email) {
            const emailExists = await Contact.findOne({ email });

            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already in use by another contact'
                });
            }}

            contact =  await Contact.findByIdAndUpdate(req.params.id,{name,email,phone,address},{new:true,runValidators:true})
            res.status(201).json({
                success: true,
                data: contact
            });


        }
    catch (error) {
            if (error.name === 'ValidationError') {
                const messages = Object.values(error.errors).map(err => err.message);
                return res.status(400).json({
                    success: false,
                    message: messages
                });

            }
            res.status(500).json({
                success: false,
                message: 'Server Error',
                error: error.message
            });

        }
    }

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    await Contact.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Contact deleted successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};