import { createSelector } from 'reselect';

const selectcart = state => state.cart;

export const selectItems = createSelector(
    [selectcart], cart => cart.cartItems
);

export const selectItemsCount = createSelector(
    [selectItems], cartItems => cartItems.reduce((acc, cur) => acc + cur.quantity, 0)
);