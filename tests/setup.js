// Test setup file
import { vi } from 'vitest';

// Mock global objects
global.window = global.window || {};
global.document = global.document || {};
global.localStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};

// Mock fetch for payment tests
global.fetch = vi.fn();

// Mock import.meta.env
global.import = {
  meta: {
    env: {
      NODE_ENV: 'test',
      VITE_STRIPE_PUBLIC_KEY: 'pk_test_mock',
      VITE_PAYPAL_CLIENT_ID: 'mock_paypal_id'
    }
  }
};