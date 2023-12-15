//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = (req,res) =>{
    res.status(200).json({message: 'Get Goals'})
}


//@desc set goals
//@route POST /api/goals
//@access Private
const setGoals = (req,res) =>{
    res.status(200).json({message :"set goals"});
}

//@desc Update goals
//@route  PUT/api/goals:id
//@access Private
const updateGoals = (req,res) =>{
    res.status(200).json({message :`update goal ${req.params.id}`});
}


//@desc DElete goals
//@route DELETE /api/goals
//@access Private
const deleteGoals = (req,res) =>{
    res.status(200).json({message :`delete goal ${req.params.id}`});
}

module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}