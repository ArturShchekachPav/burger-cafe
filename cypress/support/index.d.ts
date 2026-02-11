/// <reference types="cypress" />

import type { TIngredient } from '@/types/types';

declare global {
  namespace Cypress {
    interface Chainable {
      addIngredientToConstructor(ingredientId: TIngredient['_id']): Chainable<void>;
      createOrder(): Chainable<void>;
      openIngredientModal(ingredientId: string): Chainable<void>;
      setAuthTokens(): Chainable<void>;
      
      waitForPageLoad(): Chainable<void>;
      clearAppState(): Chainable<void>;
    }
  }
}