const User = require("../models/userModel");

const registerUser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Validate required fields
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }


        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
  
        // Create new user
        const newUser = new User({
            name,
            email,
            password,
            phone          
        });

        // Save user to database
        const saveUser = await newUser.save();

        res.status(200).json({message : "success", data : saveUser});
    } catch (error) {
        res.status(500).json({message : "fail", data : error});
    }

   
}

const updateUSer =async (req, res)=>{
    try {
       
        
        const { userId } = req.params;
        console.log("userId", userId);
        
        //check user with userId exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        //create updated user data
        const updateOptions = {new : true, runValidators : true};
        const updatedData = {};
        if(req.body.name){
            updatedData.name = req.body.name;
        }
        if(req.body.email){
            return res.status(400).json({ message: 'Email cannot be updated' });
        }
        if(req.body.phone){
            updatedData.phone = req.body.phone;
        }
        if(req.body.password){
            updatedData.password = req.body.password;
        }

 
        const  userUpdated = await User.findByIdAndUpdate(userId,  updatedData, updateOptions);
        console.log("updateUSer called");
        if (!userUpdated) {
            return res.status(400).json({ message: 'User update failed' });
        }
        res.status(200).json({ message: 'success', data: userUpdated });
        
    } catch (error) {
        res.status(500).json({message : "fail", data : error.message});
        
    }

}
module.exports ={ registerUser, updateUSer };