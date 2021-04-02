export const global = (function () {
	const dataLoc = {
		root: '/abstracts/data/',
		global: 'global.json'
	};
	const els = {
		body: document.querySelector('body')
	};

	function fetchFn(dataSrc) {
		const dataFetch = fetch(`${dataLoc.root}${dataSrc}`).then(res => res.json());

		return dataFetch;
	}

	function getGlobalData() {
		const dataFetch = fetchFn(dataLoc.global);

		return dataFetch;
	}

	return {
		dataLoc,
		els,

		fetchFn,
		getGlobalData
	};
})();
