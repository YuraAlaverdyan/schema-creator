import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ISchema } from "../types";

export interface CounterState {
  schemas: ISchema[];
}

const initialState: CounterState = {
  schemas: [],
};

export const schemeSlice = createSlice({
  name: "scheme",
  initialState,
  reducers: {
    addSchemaToSchemaList: (state, action: PayloadAction<ISchema>) => {
      state.schemas = [...state.schemas, action.payload];
    },
    deleteSchemaFromList: (state, action: PayloadAction<string>) => {
      state.schemas = state.schemas.filter((s) => s.id !== action.payload);
    },
    resetAllAtributesFromSchema: (state, action: PayloadAction<string>) => {
      const schemaId = action.payload;
      const schemaIndex = state.schemas.findIndex(
        (schema) => schema.id === schemaId
      );

      if (schemaIndex !== -1) {
        state.schemas[schemaIndex].properties = [];
      }
    },
  },
});

export const {
  deleteSchemaFromList,
  addSchemaToSchemaList,
  resetAllAtributesFromSchema,
} = schemeSlice.actions;

export default schemeSlice.reducer;
