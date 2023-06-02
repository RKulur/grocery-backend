const express = require("express");
const UserSchema = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const GrocerySchema = require("../models/grocery");

const Register = async (req, res) => {
  try {
    const { name, phone, address, pinCode, email, password } = req.body;

    console.log({ name, phone, address, pinCode, email, password})

    let user = await UserSchema.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    user = new UserSchema({
      name,
      phone,
      address,
      pinCode,
      email,
      password: secPass,
    });

    let savedUser = await user.save();

    res.json({
      success: true,
      message: `User with name ${savedUser.name} added successfully`,
    });
  } catch (err) {
    console.log(err);
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await UserSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Incorrect Credentials" });
    }

    let comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(404).json({ success: false, message: "Invalid Credentials" });
    }

    let data = {
      user: {
        id: user.id,
      },
    };

    let authToken = jwt.sign(data, process.env.JWT_SECRET);
    res.json({ success: true, authToken });
  } catch (err) {
    console.log(err);
  }
};

const GetGroceries = async (req, res) => {
  try {
    const groceries = await GrocerySchema.find();
    res.json(groceries);
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const GetGroceryById = async (req, res) => {
  let id = req.params.id;
  if (id) {
    const groceryID = GrocerySchema.findOne({ _id: id });
    if (!groceryId)
      return res.json({ success: false, message: "Grocery not found" });
    const grocery = await GrocerySchema.findById(groceryID);
    res.json(grocery);
  }
};

const InsertCart = async (req, res) => {
  try {
    const { grocery_id, quantity, price } = req.body;
    const user_id = req.user.id;

    const isGroceryPresent = await CartSchema.findOne({ grocery_id, user_id });

    if (isGroceryPresent) {
      isGroceryPresent.quantity += quantity;
      await isGroceryPresent.save();
      return res.json({ success: true, message: `Added ${quantity}` });
    }

    const cart = new CartSchema({ user_id, grocery_id, quantity, price });

    const savedCart = await cart.save();
    res.json({ success: true, savedCart });
  } catch (err) {
    res.json({ success: false, message: 'unsuccessful' });
    console.log(err.message);
  }
};

const ViewCart = async(req,res)=>{
    try{
        let id=req.params.id

        const isUser = await userSchema.findById(id)
        const isCart = await CartSchema.findById(id)
        
        if(isUser){
            

            if(isUser){
                let cart = await CartSchema.find({user_id : id})
                res.json({success : true , cart})

                if(!cart){
                    return res.json({success:false,message:"Cart not found"})
                }
            }
            

        }
        else if(isCart){

            if(isCart){
                res.json({success : true,isCart})
            }else{
                res.json({success : false , message : 'No cart found'})
            }
        }
        else{
        let cart = await CartSchema.find() 
        res.json({success:true,cart})
        }
    }
    catch(err){
        res.json({success:false,message:"Internal server error!!!!"})
        console.log(err.message)
    }
}

const DeleteCart = async(req,res)=>{
  try{
      let id=req.params.id

      
      const isCart = await CartSchema.findById(id)
      
      if(isCart){
            let cart = await CartSchema.deleteOne() 
            res.json({success:true,cart})
          }else{
            res.json({success : false , message : 'No cart found'})
          }
          }
  catch(err){
      res.json({success:false,message:"Internal server error!!!!"})
      console.log(err.message)
  }
}


module.exports = { Register, Login, GetGroceries, InsertCart, ViewCart, DeleteCart };
