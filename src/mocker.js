'use strict';

import { EventEmitter } from 'events';
import { Pool } from 'pg';

class PoolMocked extends EventEmitter {
  constructor(options) {
    super();
    this.options = Object.assign({}, options);
  }

  /**
   * Returns a node pg pool connect function mocked.
   * @returns {Object} An object with two methods.
   */
  connect() {
    return {
      query: statement => this.options.mockedData[statement] || {},
      release: () => {},
    };
  }
}

/**
 * Returns a real or mocked node pg pool instance.
 * @param {Object} options - The options needed to initialize the pool.
 * @returns {Object} A Pool instance.
 */
const initPool = (options) => {
  if (options.mocked) return new PoolMocked(options);
  return new Pool(options);
};

module.exports.initPool = initPool;
