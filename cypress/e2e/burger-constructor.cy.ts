/// <reference types="cypress" />

import { SELECTORS } from 'cypress/utils/constants';
import { getIngredientPreviewSelector } from 'cypress/utils/utils';

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

    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );

    cy.visit('baseUrl');

    cy.get(SELECTORS.CONSTRUCTOR).as('constructor');

    cy.wait(['@getIngredients', '@getUser']);
  });

  describe('initial display tests', () => {
    it('should display all ingredients', () => {
      Object.values(TEST_INGREDIENTS).forEach((ingredient) => {
        cy.get(getIngredientPreviewSelector(ingredient._id)).should('exist');
      });
    });

    it('should display empty constructor', () => {
      cy.get('@constructor').should('exist');

      cy.get(SELECTORS.INGREDIENTS_LIST).should('not.exist');
      cy.get(SELECTORS.BUN_TOP).should('not.exist');
      cy.get(SELECTORS.BUN_BOTTOM).should('not.exist');

      cy.get(SELECTORS.ORDER_BUTTON).should('be.disabled');
    });
  });

  describe('ingredients drag and drop tests', () => {
    it('should add bun to constructor', () => {
      const { bun1 } = TEST_INGREDIENTS;

      cy.addIngredientToConstructor(bun1._id);

      cy.get(SELECTORS.BUN_TOP).should('contain', bun1.name);
      cy.get(SELECTORS.BUN_BOTTOM).should('contain', bun1.name);

      cy.get(getIngredientPreviewSelector(bun1._id))
        .find(SELECTORS.COUNTER)
        .contains('2');
    });

    it('should add ingredient to constructor', () => {
      const { ingredient1 } = TEST_INGREDIENTS;

      cy.addIngredientToConstructor(ingredient1._id);

      cy.get(SELECTORS.INGREDIENTS_LIST)
        .should('exist')
        .and('contain', ingredient1.name);

      cy.get(getIngredientPreviewSelector(ingredient1._id))
        .find(SELECTORS.COUNTER)
        .contains('1');
    });

    it('should replace bun in constructor', () => {
      const { bun1, bun2 } = TEST_INGREDIENTS;

      cy.addIngredientToConstructor(bun1._id);
      cy.addIngredientToConstructor(bun2._id);

      cy.get(SELECTORS.BUN_TOP).should('contain', bun2.name);
      cy.get(SELECTORS.BUN_BOTTOM).should('contain', bun2.name);
    });
  });

  describe('constructor operations tests', () => {
    beforeEach(() => {
      const { ingredient1, ingredient2 } = TEST_INGREDIENTS;

      cy.addIngredientToConstructor(ingredient1._id);
      cy.addIngredientToConstructor(ingredient2._id);

      cy.get(SELECTORS.INGREDIENTS_LIST).as('ingredientsList');
    });

    it('should move ingredient in constructor', () => {
      cy.get(SELECTORS.INGREDIENTS_LIST).within(() => {
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
        .find(SELECTORS.DELETE_BUTTON)
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

      cy.addIngredientToConstructor(bun1._id);
      cy.addIngredientToConstructor(ingredient1._id);
    });

    it('should enable order button when constructor is not empty', () => {
      cy.get(SELECTORS.ORDER_BUTTON)
        .should('not.be.disabled')
        .and('contain', 'Оформить заказ');
    });

    it('should create order successfully', () => {
      cy.createOrder();

      cy.get(SELECTORS.MODAL)
        .should('be.visible')
        .within(() => {
          cy.fixture('order.json').then((order: TCreateOrderData) => {
            cy.get(SELECTORS.ORDER_NUMBER).should(
              'contain',
              order.order.number.toString()
            );
          });
        });
    });

    it('should clear constructor after order', () => {
      cy.createOrder();

      cy.get(SELECTORS.INGREDIENTS_LIST).should('not.exist');
      cy.get(SELECTORS.BUN_TOP).should('not.exist');
      cy.get(SELECTORS.BUN_BOTTOM).should('not.exist');

      cy.get(SELECTORS.ORDER_BUTTON).should('be.disabled');
    });
  });
});
