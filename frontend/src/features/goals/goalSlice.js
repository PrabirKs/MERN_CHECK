import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";
const initialState = {
  goals: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
//create a new goal
export const createGoal = createAsyncThunk(
  "goals/create", //"sliceName/asyncActionName"
  async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token ; //thunkAPI has the power to access all the state of the store, so it can access "auth"
        return await goalService.createGoal(goalData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
//get user goal
export const getGoals = createAsyncThunk('goals/getAll',
async(_,thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token ; //thunkAPI has the power to access all the state of the store, so it can access "auth"
      return await goalService.getGoals(token)
    } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();

      return thunkAPI.rejectWithValue(message);
    }
})
//delete usergoal
export const deleteGoal = createAsyncThunk(
    "goals/delete", //"sliceName/asyncActionName"
    async (goalId, thunkAPI) => {
      try {
          const token = thunkAPI.getState().auth.user.token ; //thunkAPI has the power to access all the state of the store, so it can access "auth"
          return await goalService.deleteGoal(goalId, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString();
  
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState, // same values as initialstate, so directly assign
  },
  extraReducers: (builder) => {
    builder
        .addCase(createGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals.push(action.payload)
        })
        .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getGoals.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = (action.payload)
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = state.goals.filter(
                (goal) => goal._id !== action.payload.id)  // the id of the deleted
        })
        .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
  }
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
