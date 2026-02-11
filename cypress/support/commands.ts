/// <reference types="cypress" />

import { SELECTORS } from 'cypress/utils/constants';
import { getIngredientPreviewSelector } from 'cypress/utils/utils';

import type { TIngredient } from '@/types/types';

Cypress.Commands.add(
  'addIngredientToConstructor',
  (ingredientId: TIngredient['_id']) => {
    cy.get(getIngredientPreviewSelector(ingredientId)).trigger('dragstart');
    cy.get(SELECTORS.CONSTRUCTOR).trigger('drop');
  }
);

Cypress.Commands.add('createOrder', () => {
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('createOrder');
  cy.get(SELECTORS.ORDER_BUTTON).click();
  cy.wait('@createOrder');
});
