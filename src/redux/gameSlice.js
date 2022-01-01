import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'games',
  initialState: {
    fieldSize: 10,
    shipsRate: [4, 3, 2, 1, 0.4],
    playersNames: [],
    playersFields: []
  },
  reducers: {
    changeShipsRate(state, action) {
      state.shipsRate = action.payload
    },
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

    clearPlayers(state) {
      state.playersNames = []
      state.playersFields = []
    }

  }
})

export const {
  addPlayer,
  removePlayer,
  changeSizeOfField,
  changeShipsRate,
  addField,
  clearPlayers } = gameSlice.actions;

export default gameSlice.reducer;