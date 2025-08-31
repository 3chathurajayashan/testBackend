
const Admin = require("../models/AdminModel");

//display admins
const getAllAdmins = async(req, res, next)=>{

let admins;

try{

    admins = await Admin.find();

}
catch(err)
{
    console.log(err);
}

if(!admins)
{
    return res.status(404).json({message:"Admins are not found at the moment!"});
}


return res.status(200).json({ admins});

}

//admins insert
 

const addAdmins = async (req, res, next) => {
  const { name, gmail, mobile, password, homeTown } = req.body;

  try {
    
    const existingAdmin = await Admin.findOne({ gmail });
    if (existingAdmin) {
      return res.status(400).json({ message: "Gmail already exists, use another!" });
    }

    // create new admin
    const admin = new Admin({
      name,
      gmail,
      mobile,
      password,
      homeTown,
    });

    await admin.save();
    return res.status(201).json({ admin });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
 
//get by ID

const getByID = async (req, res, next) => {

    const id= req.params.id;
    let admin;

    try{
        admin =await Admin.findById(id);

    }
    catch(err)
    {
        console.log(err);
    }

     //if not available users
 if(!admin)
 {
    return res.status(404).send({message:"Admin can not find!"});
 }
 else
 {
    return res.status(200).json({admin});
 }
};

//update Admin data

const updateAdmin = async (req, res, next) =>{

    const id= req.params.id;
    const {name, gmail, mobile, password, homeTown  } = req.body;

    let admins;

    try
    {
        admins = await Admin.findByIdAndUpdate(id,{ name, gmail, mobile, password, homeTown});
        admins = await admins.save();
    }
    catch(err)
    {
        console.log(err);

    }

    if(!admins)
 {
    return res.status(404).send({message:"unable to update admin details"});
 }
 else
 {
    return res.status(200).json({admins});
 }
};


//DELETE ADMIN
const deleteAdmins = async (req, res, next) =>{
  const id= req.params.id;

  let admin;

  try{
      admin =await Admin.findByIdAndDelete(id);
  }
  catch(err)
  {
console.log(err);
  }

  
    if(!admin)
 {
    return res.status(404).send({message:"unable to delete admin"});
 }
 else
 {
    return res.status(200).json({admin});
 }

}


exports.deleteAdmins = deleteAdmins;
exports.updateAdmin = updateAdmin;
exports.getByID = getByID;
exports.addAdmins = addAdmins;
exports.getAllAdmins = getAllAdmins;