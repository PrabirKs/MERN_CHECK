const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User =  require('../models/userModel')
//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async(req,res) =>{
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
})


//@desc set goals
//@route POST /api/goals
//@access Private
const setGoals = asyncHandler(async(req,res) =>{
    if(!req.body.text){
        res.status(400);
        throw new Error('please add a text-field') ;
    }
   const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
   })
   res.status(200).json(goal)
})

//@desc Update goals
//@route  PUT/api/goals:id
//@access Private
const updateGoals = asyncHandler(async(req,res) =>{ 
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not Found');
    }

 
    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id.toString()){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new: true
    })
    if (!updatedGoal) {
        res.status(400);
        throw new Error('Failed to update goal');
    }
    res.status(200).json(updatedGoal);  
})


//@desc DElete goals
//@route DELETE /api/goals
//@access Private
const deleteGoals = asyncHandler(async(req,res) =>{
    const goal = await Goal.findById(req.params.id)
    console.log(goal);
    if(!goal){
        res.status(400)
        throw new Error('Goal not Found')
    }
    
    
    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id.toString()){
        res.status(401)
        throw new Error('User not authorized')
    }

    await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({id :req.params.id});
})

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}