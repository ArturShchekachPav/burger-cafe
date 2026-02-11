/// <reference types="cypress" />

import { BASE_URL } from '@/utils/constants';

import type { TGetIngredientsData, TIngredient } from '@/types/types';

let TEST_INGREDIENT: TIngredient;

describe('modal tests', () => {
  before(() => {
    cy.fixture('ingredients.json').then((response: TGetIngredientsData) => {
      TEST_INGREDIENT = response.data[0];
    });
  });

  beforeEach(() => {
    cy.intercept('GET', `${BASE_URL}ingredients`, { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('http://localhost:5173/');

    cy.wait(['@getIngredients']);

    cy.get(`[data-testid="ingredient-preview-${TEST_INGREDIENT._id}"]`).as(
      'ingredientPreview'
    );
  });

  it('should open and close ingredient details modal', () => {
    cy.get('@ingredientPreview').click();

    cy.get('[data-testid="modal"]').should('exist');
  });

  describe('modal close tests', () => {
    beforeEach(() => {
      cy.get('@ingredientPreview').click();

      cy.get('[data-testid="modal"]', { timeout: 10000 })
        .should('exist')
        .and('be.visible');
    });

    it('should close modal on overlay click', () => {
      cy.get('[data-testid="modal-overlay"]').should('exist').click({ force: true });

      cy.get('[data-testid="modal"]').should('not.exist');
    });

    it('should close modal on close button click', () => {
      cy.get('[data-testid="modal-close-button"]').click();

      cy.get('[data-testid="modal"]').should('not.exist');
    });

    it('should close modal on escape key press', () => {
      cy.get('body').type('{esc}');

      cy.get('[data-testid="modal"]').should('not.exist');
    });
  });
});
