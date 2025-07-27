const  User = require("../models/userModel");

//display method
const getAllUsers = async (req, res, next) => 
    {

    let users;

    try
    {
        users = await User.find();
    }
    catch(err)
    {
        console.log(err);
    }

    //if users not found
    if(!users)
    {
        return res.status(404).json({message:"users not found! try again"});
    }

    //display function
    return res.status(200).json({ users});
};

//data insert

const addUsers = async (req, res, next) => {

 const {name, age, email} = req.body;

 let users;

 try{

    users = new User ({name, age, email});
    await users.save();
 }
 catch(err)
 {
    console.log(err);
 }

 //if not insert users
 if(!users)
 {
    return res.status(404).send({message:"unable to add users!"});
 }
 else
 {
    return res.status(200).json({users});
 }

}

//get by ID

const getByID = async (req, res, next) => {

    const id= req.params.id;
    let user;

    try{
        user =await User.findById(id);

    }
    catch(err)
    {
        console.log(err);
    }

     //if not available users
 if(!user)
 {
    return res.status(404).send({message:"user can not find!"});
 }
 else
 {
    return res.status(200).json({user});
 }
};

//update user data

const updateUser = async (req, res, next) =>{

    const id= req.params.id;
    const {name, age, email} = req.body;

    let users;

    try
    {
        users = await User.findByIdAndUpdate(id,{ name:name, age:age, email:email});
        users = await users.save();
    }
    catch(err)
    {
        console.log(err);

    }

    if(!users)
 {
    return res.status(404).send({message:"unable to update user details"});
 }
 else
 {
    return res.status(200).json({users});
 }
};


//delete users
const deleteUsers = async (req, res, next) =>{
  const id= req.params.id;

  let user;

  try{
      user =await User.findByIdAndDelete(id);
  }
  catch(err)
  {
console.log(err);
  }

  
    if(!user)
 {
    return res.status(404).send({message:"unable to update user details"});
 }
 else
 {
    return res.status(200).json({user});
 }

}




exports.deleteUsers = deleteUsers;
exports.updateUser = updateUser;
exports.getByID = getByID;
exports.addUsers = addUsers;
exports.getAllUsers = getAllUsers;