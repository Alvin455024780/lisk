/*
 * Copyright © 2018 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

'use strict';

const sql = require('../sql').votes;

/**
 * Votes database interaction module
 * @memberof module:accounts
 * @class
 * @param {Database} db - Instance of database object from pg-promise
 * @param {Object} pgp - pg-promise instance to utilize helpers
 * @constructor
 * @return {VotesRepository}
 */
class VotesRepository {
	constructor(db, pgp) {
		this.db = db;
		this.pgp = pgp;

		// TODO: A proper repository shouldn't need to export any properties like this:
		this.sortFields = ['username', 'address', 'publicKey'];
	}

	/**
	 * Searches votes for delegate with an address
	 * @param {Object} params
	 * @param {string} params.address
	 * @param {int} params.limit
	 * @param {int} params.offset
	 * @return {Promise}
	 */
	list(params) {
		// TODO: Should use a result-specific method, not .query
		return this.db.query(sql.getVotes, params);
	}

	/**
	 * Counts votes for a delegate with an address
	 * @param {string} address
	 * @return {Promise<number>}
	 */
	count(address) {
		return this.db.one(sql.getVotesCount, address, a => +a.count);
	}
}

module.exports = VotesRepository;
