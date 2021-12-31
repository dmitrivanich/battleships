import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'games',
  initialState: {
    fieldSize: 40,
    playersNames: ["GEORGY BOTTO"],
    playersFields: [[...new Array(40).fill(new Array(40).fill(0))]]
  },
  reducers: {
    changeSizeOfField(state, action) {
      state.fieldSize = +action.payload
    },
    addPlayer(state, action) {
      let size = state.fieldSize
      state.playersNames.push(action.payload)
      state.playersFields.push(new Array(size).fill(new Array(size).fill(0)))
    },
    removePlayer(state, action) {
      state.playersNames.splice(action.payload, 1)
      state.playersFields.splice(action.payload, 1)
    },
    addField(state, action) {
      const index = action.payload.index
      const newField = action.payload.field
      state.playersFields.splice(index, 1, newField)
    },

  }
})

export const { addPlayer, removePlayer, changeSizeOfField, addField } = gameSlice.actions;
export default gameSlice.reducer;