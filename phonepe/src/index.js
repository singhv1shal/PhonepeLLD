const container = require('./di');
const aggregationMetaService = container.resolve('aggregationMetaService');
const aggregationComputationService = container.resolve('aggregationComputationService');
const eventService = container.resolve('eventService');
const logger = container.resolve('logger');
const cron = require('node-cron');

// ----- Error Handling -----
process.on('uncaughtException', (err) => {
	console.log(err);
	container?.resolve('logger').error('UncaughtException', { err });
});
process.on('unhandledRejection', (err) => {
	container?.resolve('logger').error('UnhandledRejection', { err });
	console.log(err);
});
process.on('warning', (warning) => {
	console.log(warning);
	console.log(warning.stack);
	container?.resolve('logger').error('Process warning', { stack: warning.stack });
});


function createAndGetMeta() {
	const mockAggMeta = {
		aggregationName: "installCountUser",
		eventType: "APP_INSTALL_COMPLETED",
		aggregationType: "count",
		aggregationKey: "eventData.userId",
		aggregationField: "eventData.spaceInMb",
		filterRules: [
			{
				"field": "eventData.spaceInMb",
				"op": "gt",
				"value": 2
			}
		]
	};
	aggregationMetaService.createMeta(mockAggMeta);
	logger.log(aggregationMetaService.getData('AggregationMeta_installCountUser'));
	aggregationMetaService.deleteData('AggregationMeta_installCountUser');
	logger.log(aggregationMetaService.getData('AggregationMeta_installCountUser'));
}

function computeAggregations() {
	// '* * * * *' represents every minute
	cron.schedule('* * * * *', aggregationComputationService.computeAggregations()); 
}

async function createAndSaveEvent() {
	
}


async function main() {
	// computeAggregations();
	// Example usage
	createAndGetMeta();
}

main();