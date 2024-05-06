// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('/cableModems', () => {

	describe(':/GET', () => {
		describe('GET All', () => {
			it('should return all cable modems', async () => {
				const request = new IncomingRequest('http://127.0.0.1:8787/cableModems');
				const ctx = createExecutionContext();
				const response = await worker.fetch(request, env, ctx);
	
				await waitOnExecutionContext(ctx);
	
				const result = await response.json();
		
				// TODO TESTING
				// ESTO DEVUELVE TODOS LOS CABLE MODEMS EN FORMATO JSON, FALTA TIEMPO :(
				console.log(result)
			});
	
			it('should throws a HTTPException with status if there is an error');
		});

		describe('GET by Id', () => {
			it('should be tested with different values for the "id" parameter, including valid and invalid formats');
		});
	})

	describe(':/POST', () => {
		it('should validates the payload before create a modem');
		it('should return a JSON response with status code 201 for a successful post');
		it('should be tested with different values for the "id" parameter, including valid and invalid formats');
	})

	describe(':/PUT', () => {
		it('should validates the payload before updating modem');
		it('should return a JSON response with status code 200 for a successful update');
		it('should return 404 if the uuid doesnt exists');
		it('should be tested with different values for the "id" parameter, including valid and invalid formats');
	});

	describe(':/DELETE', () => {
		it('should be deleted successfully');
	})
});
