
import createApplier from './createApplier'

export const setColor = createApplier('color', 'color')

export const setBackgroundColor = createApplier(undefined, 'backgroundColor')

// todo: avoid generate extra span element