import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'games',
  initialState: {
    fieldSize: 10,
    shipsRate: [4, 3, 2, 1, 0.4],
    playersNames: ['Georgio', 'Antonio'],
    playersFields: [
      [
        [0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 2, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 2, 2, 0, 0, 4, 4, 4, 4, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [3, 3, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 2, 2],
        [0, 0, 3, 3, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
      [
        [0, 2, 0, 5, 0, 0, 0, 3, 0, 0],
        [0, 2, 0, 5, 0, 0, 0, 3, 0, 0],
        [0, 0, 0, 5, 0, 0, 0, 3, 0, 0],
        [1, 0, 0, 5, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 5, 0, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 5],
        [3, 0, 0, 0, 0, 0, 4, 0, 0, 5],
        [3, 0, 0, 0, 0, 0, 4, 0, 0, 5],
        [0, 0, 2, 2, 0, 0, 4, 0, 0, 5],
        [0, 0, 0, 0, 0, 0, 4, 0, 0, 5]
      ],
    ]
  },
  reducers: {
    updateField(state, action) {
      let index = action.payload.index
      let field = action.payload.field
      state.playersFields.splice(index, 1, field)
    },
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
  clearPlayers,
  updateField } = gameSlice.actions;

export default gameSlice.reducer;