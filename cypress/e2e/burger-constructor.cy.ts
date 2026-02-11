/// <reference types="cypress" />

import { BASE_URL } from '@/utils/constants';

import type { TGetIngredientsData, TIngredient, TCreateOrderData } from '@/types/types';

let TEST_INGREDIENTS: Record<string, TIngredient>;

describe('burger constructor', () => {
  before(() => {
    cy.fixture('ingredients.json').then((response: TGetIngredientsData) => {
      const buns = response.data.filter((item) => item.type === 'bun');
      const ingredients = response.data.filter((item) => item.type !== 'bun');

      TEST_INGREDIENTS = {
        bun1: buns[0],
        bun2: buns[1] || buns[0],
        ingredient1: ingredients[0],
        ingredient2: ingredients[1] || ingredients[0],
      };
    });
  });

  beforeEach(() => {
    cy.clearLocalStorage();

    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'test-refresh-token');
      win.localStorage.setItem('accessToken', 'Bearer test-access-token');
    });

    cy.intercept('GET', `${BASE_URL}auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', `${BASE_URL}ingredients`, { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('http://localhost:5173/');

    cy.wait(['@getIngredients', '@getUser']);
  });

  describe('initial display tests', () => {
    it('should display all ingredients', () => {
      Object.values(TEST_INGREDIENTS).forEach((ingredient) => {
        cy.get(`[data-testid="ingredient-preview-${ingredient._id}"]`).should('exist');
      });
    });

    it('should display empty constructor', () => {
      cy.get('[data-testid="constructor"]').should('exist');

      cy.get('[data-testid="ingredients-list"]').should('not.exist');
      cy.get('[data-testid="bun-top"]').should('not.exist');
      cy.get('[data-testid="bun-bottom"]').should('not.exist');

      cy.get('[data-testid="order-button"]').should('be.disabled');
    });
  });

  describe('ingredients drag and drop tests', () => {
    it('should add bun to constructor', () => {
      const { bun1 } = TEST_INGREDIENTS;

      cy.get(`[data-testid="ingredient-preview-${bun1._id}"]`)
        .as('ingredient')
        .trigger('dragstart');
      cy.get('[data-testid="constructor"]').trigger('drop');

      cy.get('[data-testid="bun-top"]').should('contain', bun1.name);
      cy.get('[data-testid="bun-bottom"]').should('contain', bun1.name);

      cy.get('@ingredient').find('.counter').contains('2');
    });

    it('should add ingredient to constructor', () => {
      const { ingredient1 } = TEST_INGREDIENTS;

      cy.get(`[data-testid="ingredient-preview-${ingredient1._id}"]`)
        .as('ingredient')
        .trigger('dragstart');
      cy.get('[data-testid="constructor"]').trigger('drop');

      cy.get('[data-testid="ingredients-list"]')
        .should('exist')
        .and('contain', ingredient1.name);

      cy.get('@ingredient').find('.counter').contains('1');
    });

    it('should replace bun in constructor', () => {
      const { bun1, bun2 } = TEST_INGREDIENTS;

      cy.get(`[data-testid="ingredient-preview-${bun1._id}"]`).trigger('dragstart');
      cy.get('[data-testid="constructor"]').trigger('drop');

      cy.get(`[data-testid="ingredient-preview-${bun2._id}"]`).trigger('dragstart');
      cy.get('[data-testid="constructor"]').trigger('drop');

      cy.get('[data-testid="bun-top"]').should('contain', bun2.name);
      cy.get('[data-testid="bun-bottom"]').should('contain', bun2.name);
    });
  });

  describe('constructor operations tests', () => {
    beforeEach(() => {
      const { ingredient1, ingredient2 } = TEST_INGREDIENTS;

      cy.get(`[data-testid="ingredient-preview-${ingredient1._id}"]`).trigger(
        'dragstart'
      );
      cy.get('[data-testid="constructor"]').trigger('drop');
      cy.get(`[data-testid="ingredient-preview-${ingredient2._id}"]`).trigger(
        'dragstart'
      );
      cy.get('[data-testid="constructor"]').trigger('drop');

      cy.get('[data-testid="ingredients-list"]').as('ingredientsList');
    });

    it('should move ingredient in constructor', () => {
      cy.get('[data-testid="ingredients-list"]').within(() => {
        cy.get('@ingredientsList')
          .children()
          .should('have.length', 2)
          .last()
          .trigger('dragstart');

        cy.get('@ingredientsList').children().first().trigger('drop');

        cy.get('@ingredientsList')
          .children()
          .first()
          .should('contain', TEST_INGREDIENTS.ingredient2.name);
      });
    });

    it('should delete ingredient from constructor', () => {
      cy.get('@ingredientsList')
        .children()
        .first()
        .find('span.constructor-element__action')
        .click();

      cy.get('@ingredientsList')
        .children()
        .should('have.length', 1)
        .first()
        .should('contain', TEST_INGREDIENTS.ingredient2.name);
    });
  });

  describe('order creation tests', () => {
    beforeEach(() => {
      const { bun1, ingredient1 } = TEST_INGREDIENTS;

      cy.get(`[data-testid="ingredient-preview-${bun1._id}"]`).trigger('dragstart');
      cy.get('[data-testid="constructor"]').trigger('drop');
      cy.get(`[data-testid="ingredient-preview-${ingredient1._id}"]`).trigger(
        'dragstart'
      );
      cy.get('[data-testid="constructor"]').trigger('drop');
    });

    it('should enable order button when constructor is not empty', () => {
      cy.get('[data-testid="order-button"]')
        .should('not.be.disabled')
        .and('contain', 'Оформить заказ');
    });

    it('should create order successfully', () => {
      cy.intercept('POST', `${BASE_URL}orders/`, { fixture: 'order.json' }).as(
        'createOrder'
      );

      cy.get('[data-testid="order-button"]').click();
      cy.wait('@createOrder');

      cy.get('[data-testid="modal"]')
        .should('be.visible')
        .within(() => {
          cy.fixture('order.json').then((order: TCreateOrderData) => {
            cy.get('[data-testid="order-number"]').should(
              'contain',
              order.order.number.toString()
            );
          });
        });
    });

    it('should clear constructor after order', () => {
      cy.intercept('POST', `${BASE_URL}orders/`, { fixture: 'order.json' }).as(
        'createOrder'
      );

      cy.get('[data-testid="order-button"]').click();
      cy.wait('@createOrder');

      cy.get('[data-testid="ingredients-list"]').should('not.exist');
      cy.get('[data-testid="bun-top"]').should('not.exist');
      cy.get('[data-testid="bun-bottom"]').should('not.exist');

      cy.get('[data-testid="order-button"]').should('be.disabled');
    });
  });
});
